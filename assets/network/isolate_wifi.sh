#!/bin/bash
#
# Isolate a wifi card to separate a network traffic so one part of it
# can go through the wifi card and the other through any other interface.
#
# Example 1:
#
#     $ isolate-wifi.sh linus wlan0
#
# Move the wifi card ``wlan0`` to its own Network Namespace and open
# a shell as the user ``linus``. In that shell, any program will only see
# the wifi card and the rest of the programs running outside will not.
#
# Example 2:
#
#     $ isolate-wifi.sh linus wlan0 starbucks_ap OPEN 192.168.0.5 192.168.0.1 24 8.8.8.8 
#
# Like before but this time also connect to the access point ``starbucks_ap``
# which it is an ``OPEN`` wifi network and configure the wifi interface to
# have ``192.168.0.5``, ``192.168.0.1`` and ``8.8.8.8`` as its IP address,
# Gateway and DNS resolver. The interface should be ready to be used to navigate.
# Then, as before, open a shell as the ``linus`` user.
#
# Show the usage and more examples:
#
#     $ isolate-wifi.sh
#

USER=
MODE=
SSID=

IFNAME=

IP=
GATEWAY=

SUBNET=24
DNS=8.8.8.8
NSNAME=starbucks

CONFIGURE_IF='no'
USE_DHCLIENT='no'

usage () {
    echo
    echo "Usage: $0 USER IFNAME [NSNAME]"
    echo
    echo "  Set the namespace named NSNAME ($NSNAME) and move the interface IFNAME to it."
    echo "  Run a shell as USER in that namespace."
    echo
    echo "Usage: $0 USER IFNAME SSID MODE [IP GATEWAY [SUBNET [DNS [NSNAME]]]]"
    echo
    echo "  Set the namespace named NSNAME ($NSNAME), move the interface IFNAME to it and connect to the SSID in mode MODE"
    echo "  MODE must be one of OPEN, WEP, WPA, WPA2, NONE."
    echo "  Optionally, set up the interface with address IP and gateway GATEWAY, SUBNET ($SUBNET) and DNS ($DNS)"
    echo "  If not IP is given, don't configure the interface."
    echo "  Run a shell as USER in that namespace."
    echo
    echo "Usage: $0 USER IFNAME SSID MODE bootstrap [NSNAME]"
    echo "  Set the namespace named NSNAME ($NSNAME), move the interface IFNAME to it and connect to the SSID in mode MODE"
    echo "  MODE must be one of OPEN, WEP, WPA, WPA2, NONE."
    echo "  Then, set up the interface running dhclient (experimental; not working yet)"
    echo
    echo "Example:"
    echo "  $0 linus wlan0"
    echo "  $0 linus wlan0 starbucks_ap OPEN 192.168.0.5 192.168.0.1 24 8.8.8.8 starbucks"
}

create_working_space () {
    rm -Rf "/etc/netns/$NSNAME"
    mkdir -p "/etc/netns/$NSNAME"

    ip netns add "$NSNAME"

    WPA_SUPPLICANT_PASS_FILE="/tmp/tmp_${NSNAME}_wpa_supplicant_pass.conf"
}

get_wifi_phy_number () {
    echo $(iw dev "$IFNAME" info | sed -n 's/^.*wiphy \([0-9]\+\)$/\1/p')
}

# Move the interface IFNAME with physical number PHYNUM (and name PHY)
# into the network space named NSNAME
# It is assumed that IFNAME represent a wifi interface.
#
# An error is shown if the interface "moved" actually it still there in the
# default/root namespace or the interface is not there but it is also not in
# in the network namespace destine.
move_wifi_interface () {
    if [ $(ifconfig -a | grep -c "$IFNAME") = '0' ]
    then
        echo "Wifi interface not found: the wifi interface $IFNAME is not in the 'root/default' network namespace. Is it missing?"
        echo "Try to unplug and plug the wifi card."
        close_everything
        exit 1
    fi

    PHYNUM=$(get_wifi_phy_number)
    PHY="phy$PHYNUM"

    ip netns exec "$NSNAME" sleep 3 &
    local PID=$!

    iw phy "$PHY" set netns "$PID"
    if [ $(ifconfig -a | grep -c "$IFNAME") != '0' ]
    then
        echo "Movement failed: the wifi interface $IFNAME is still in the 'root/default' network namespace"
        close_everything
        exit 1
    fi

    if [ $(ip netns exec "$NSNAME" ifconfig -a | grep -c "$IFNAME") != '1' ]
    then
        echo "Movement failed: the wifi interface $IFNAME was moved from the 'root/default' network namespace but it is not in the destination namespace. Is it missing?!"
        close_everything
        exit 1
    fi
}

# Unlock the wireless card, and set up the wifi and the loopback interface
# Don't set any ip nor call to dhcp client.
set_up_interface () {
    ip netns exec "$NSNAME" rfkill unblock "$PHYNUM"
    ip -n "$NSNAME" link set "$IFNAME" up
    ip -n "$NSNAME" link set "lo" up
}

# Stablish a connection with the wireless network SSID based in MODE.
# Connect to an OPEN wireless; WEP protected wireless; or WPA/WPA2 protected wireless.
connect_to_access_point () {
    if [ "$MODE" = "OPEN" ]
    then
        # connect without pass
        ip netns exec "$NSNAME" iw "$IFNAME" connect -w "$SSID"


    elif [ "$MODE" = "WEP" ]
    then
        # WEP (not tested)
        ip netns exec "$NSNAME" iw "$IFNAME" connect -w "$SSID" key "0:$PASS"

    elif [ "$MODE" = "WPA" -o "$MODE" = "WPA2" ]
    then
        # WPA/WPA2
        echo "  - Please, enter the password for $SSID"
        wpa_passphrase "$SSID" > "$WPA_SUPPLICANT_PASS_FILE"
        ip netns exec "$NSNAME" wpa_supplicant -B -i "$IFNAME" -c "$WPA_SUPPLICANT_PASS_FILE" 

    else
        echo "Invalid mode '$MODE', valid ones: OPEN, WEP, WPA, WPA2"
        close_everything
        exit 1
    fi

    echo "  - connecting.... (waiting)"
    sleep 10
    if [ $(show_wifi_link_in_space | grep -c "Not connected") != '0' ]
    then
        echo "  - Connection failed. Maybe it's taking more time that I'm expecting... Continuing..."
    fi
}

# Configure the wifi interface. Set:
#  - the ip address of the interface
#  - the subnet (like 24 and not 255.255.255.0)
#  - the inteface, of course
#  - and the network namespace where the inteface lives
#
# EXPERIMENTAl (not working yet): run a dhcp client and set those automatically
configure_interface () {
    if [ "$USE_DHCLIENT" = 'yes' ]  # dhcp (not working yet)
    then
        ip netns exec "$NSNAME" dhclient "$IFNAME"
        echo "Warning. Probably you will need to configure the DNS yourself. Something like echo 'nameserver 8.8.8.8' > '/etc/netns/$NSNAME/resolv.conf'"

    else
        # IP static / gateway / dns
        ip -n "$NSNAME" addr add "$IP/$SUBNET" dev "$IFNAME"
        ip -n "$NSNAME" route add default via "$GATEWAY" dev "$IFNAME"
        mkdir -p "/etc/netns/$NSNAME"
        echo "nameserver $DNS" > "/etc/netns/$NSNAME/resolv.conf"
    fi
}

show_ifconfig_in_space () {
    ip netns exec "$NSNAME" ifconfig
}

show_wifi_link_in_space () {
    ip netns exec "$NSNAME" iw dev $IFNAME link
}

initialize_everything () {
    echo " ** Creating Network Namespace $NSNAME to isolate $IFNAME..."
    create_working_space
    move_wifi_interface
    set_up_interface

    if [  "$MODE" != 'NONE' ]
    then
        echo " ** Connecting to $SSID..."
        connect_to_access_point
        if [ "$CONFIGURE_IF" = 'yes' ]
        then
            echo "  - Configuring the interface $IFNAME..."
            configure_interface
        else
            echo "  - Don't configuring anything"
        fi
    else
        echo "  - No attempting to connect to any SSID."
    fi

}

# Enter in the network nameserver NSNAME and run a shell as USER
enter_into_shell () {
    echo " ** Entering in the shell in the Network Namespace $NSNAME:"
    echo "  - Wifi Link"
    show_wifi_link_in_space
    echo "  - Interface Configurations"
    show_ifconfig_in_space
    ip netns exec "$NSNAME" su -l "$USER"                      # virtualbox / firefox
}

kill_any_process_in_ns() {
    ip netns pids "$NSNAME" | xargs kill -15 # be polite
    sleep 5
    ip netns pids "$NSNAME" | xargs kill -9  # but being evil is more fun
}

close_everything () {
    # shutdown
    echo " ** Closing the interface and deleting the namespace..."
    kill_any_process_in_ns
    ip netns exec "$NSNAME" rfkill block "$PHYNUM"
    ip netns delete "$NSNAME"

    rm -R "/etc/netns/$NSNAME"
    rm -f "$WPA_SUPPLICANT_PASS_FILE"

    echo "Your wifi card was disabled (blocked), you can reenable it with:"
    echo "     rfkill unblock '$PHYNUM'"
}

if [ $# -lt 2 -o $# -gt 9 ]
then
    usage
    exit 1

elif [ $# -le 3 ] # "Usage: $0 USER IFNAME [NSNAME]"
then
    USER=$1
    IFNAME=$2
    NSNAME=${3:-$NSNAME}
    MODE="NONE"

elif [ $# -eq 4 ] # "Usage: $0 USER IFNAME SSID MODE [X X [X [X [X]]]]"
then
    USER=$1
    IFNAME=$2
    SSID=$3
    MODE=$4

    CONFIGURE_IF='no'

elif [ $# -eq 5 ] # "Usage: $0 USER IFNAME SSID MODE bootstrap [X]"
then
    USER=$1
    IFNAME=$2
    SSID=$3
    MODE=$4

    if [ $5 != "bootstrap" ]
    then
        usage
        exit 1
    fi

    CONFIGURE_IF='yes'
    USE_DHCLIENT='yes'

else              # "Usage: $0 USER IFNAME SSID MODE IP GATEWAY [SUBNET [DNS [NSNAME]]]"
                  # "Usage: $0 USER IFNAME SSID MODE bootstrap NSNAME"
    USER=$1
    IFNAME=$2
    SSID=$3
    MODE=$4

    if [ $5 = "bootstrap" ]     # "Usage: $0 USER IFNAME SSID MODE bootstrap NSNAME"
    then
        NSNAME=${6:-$NSNAME}
        USE_DHCLIENT='yes'

    else                        # "Usage: $0 USER IFNAME SSID MODE IP GATEWAY [SUBNET [DNS [NSNAME]]]"
        IP=$5
        GATEWAY=$6

        SUBNET=${7:-$SUBNET}
        DNS=${8:-$DNS}
        NSNAME=${9:-$NSNAME}

        USE_DHCLIENT='no'
    fi

    CONFIGURE_IF='yes'
fi

if [ $(id -u) != 0 ]
then
    echo "Run me as root."
    exit 1
fi


initialize_everything
enter_into_shell
close_everything



