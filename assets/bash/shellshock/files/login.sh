#!/bin/sh
echo "Username: $username"
echo "Password: $password"

if [ -z "$password" ]; then
    exit 1
else
    exit 0
fi
