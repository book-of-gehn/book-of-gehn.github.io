FROM alpine:3.8

# Based on https://github.com/tianon/docker-bash/tree/master/4.1

# gpg: key 64EA74AB: public key "Chet Ramey <chet@cwru.edu>" imported
ENV _BASH_GPG_KEY 7C0135FB088AAF6C66C650B9BB5869F064EA74AB

# https://ftp.gnu.org/gnu/bash/?C=M;O=D
ENV _BASH_VERSION 4.1
ENV _BASH_PATCH_LEVEL 0
# https://ftp.gnu.org/gnu/bash/bash-4.1-patches/?C=M;O=Da
# Patch number 11 is the last one before Shellshock series of patches
ENV _BASH_LATEST_PATCH 11
# prefixed with "_" since "$BASH..." have meaning in Bash parlance

RUN set -ex; \
	\
	apk add --no-cache --virtual .build-deps \
		bison \
		ca-certificates \
		coreutils \
		dpkg-dev dpkg \
		gcc \
		gnupg \
		libc-dev \
		make \
		ncurses-dev \
		openssl \
		patch \
		tar \
	; \
	\
	version="$_BASH_VERSION"; \
	if [ "$_BASH_PATCH_LEVEL" -gt 0 ]; then \
		version="$version.$_BASH_PATCH_LEVEL"; \
	fi; \
	wget -O bash.tar.gz "https://ftp.gnu.org/gnu/bash/bash-$version.tar.gz"; \
	wget -O bash.tar.gz.sig "https://ftp.gnu.org/gnu/bash/bash-$version.tar.gz.sig"; \
	\
	if [ "$_BASH_LATEST_PATCH" -gt "$_BASH_PATCH_LEVEL" ]; then \
		mkdir -p bash-patches; \
		first="$(printf '%03d' "$(( _BASH_PATCH_LEVEL + 1 ))")"; \
		last="$(printf '%03d' "$_BASH_LATEST_PATCH")"; \
		for patch in $(seq -w "$first" "$last"); do \
			url="https://ftp.gnu.org/gnu/bash/bash-$_BASH_VERSION-patches/bash${_BASH_VERSION//./}-$patch"; \
			wget -O "bash-patches/$patch" "$url"; \
			wget -O "bash-patches/$patch.sig" "$url.sig"; \
		done; \
	fi; \
	\
	export GNUPGHOME="$(mktemp -d)"; \
	gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$_BASH_GPG_KEY"; \
	gpg --batch --verify bash.tar.gz.sig bash.tar.gz; \
	gpgconf --kill all; \
	rm bash.tar.gz.sig; \
	if [ -d bash-patches ]; then \
		for sig in bash-patches/*.sig; do \
			p="${sig%.sig}"; \
			gpg --batch --verify "$sig" "$p"; \
			rm "$sig"; \
		done; \
                gpgconf --kill all; \
	fi; \
	rm -rf "$GNUPGHOME"; \
	\
	mkdir -p /usr/src/bash; \
	tar \
		--extract \
		--file=bash.tar.gz \
		--strip-components=1 \
		--directory=/usr/src/bash \
	; \
	rm bash.tar.gz; \
	\
	if [ -d bash-patches ]; then \
		for p in bash-patches/*; do \
			patch \
				--directory=/usr/src/bash \
				--input="$(readlink -f "$p")" \
				--strip=0 \
			; \
			rm "$p"; \
		done; \
		rmdir bash-patches; \
	fi; \
	\
	cd /usr/src/bash; \
	gnuArch="$(dpkg-architecture --query DEB_BUILD_GNU_TYPE)"; \
	./configure \
		--enable-readline \
		--with-curses \
# musl does not implement brk/sbrk (they simply return -ENOMEM)
#   bash: xmalloc: locale.c:81: cannot allocate 18 bytes (0 bytes allocated)
# See https://patchwork.ozlabs.org/patch/766115/
		--without-bash-malloc \
	|| { \
		cat >&2 config.log; \
		false; \
	}; \
	make -j "$(nproc)"; \
	make install; \
	cd /; \
	rm -r /usr/src/bash; \
	\
# delete a few installed bits for smaller image size
	rm -r \
		/usr/local/share/info \
		/usr/local/share/locale \
		/usr/local/share/man \
	; \
	\
	runDeps="$( \
		scanelf --needed --nobanner --format '%n#p' --recursive /usr/local \
			| tr ',' '\n' \
			| sort -u \
			| awk 'system("[ -e /usr/local/lib/" $1 " ]") == 0 { next } { print "so:" $1 }' \
	)"; \
	apk add --no-cache --virtual .bash-rundeps $runDeps; \
	apk del .build-deps; \
	\
	[ "$(which bash)" = '/usr/local/bin/bash' ]; \
	bash --version; \
	[ "$(bash -c 'echo "${BASH_VERSION%%[^0-9.]*}"')" = "$_BASH_VERSION.$_BASH_LATEST_PATCH" ]; \
# make a symlink so others can call it /bin/bash and /bin/sh
	rm -f /bin/bash /bin/sh; \
	ln -s /usr/local/bin/bash /bin/bash; \
	ln -s /usr/local/bin/bash /bin/sh; \
        \
# make default shells to all the users in the box to be bash
	sed -i -e "s/bin\/ash/bin\/bash/" /etc/passwd; \
# install additional software to play with them
	apk add --no-cache python openssh-server openssh wget openvpn openssl;  \
	/usr/bin/ssh-keygen -A;

# These last two needs to be done manually inside the docker
#   mkdir -p /dev/net/ ;
#   mknod /dev/net/tun c 10 200;

COPY files/* /tmp/
RUN set -ex; \
        cd /tmp; \
        chmod u+x env.sh login.sh /bin/egrep; \
        mv sshd_config /etc/ssh/sshd_config; \
        mv ssh_config /etc/ssh/ssh_config; \
        mv egrep /bin/egrep; \
        mv * /;

CMD ["/bin/bash"]

