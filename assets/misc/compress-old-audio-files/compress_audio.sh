#!/bin/bash

set -euo pipefail
shopt -s nocaseglob

if [ "$#" != "1" ]; then
    echo "Usage $0 <target dir>"
    exit 1
fi

cd "$1"
echo  "Processing $(pwd)..."

IFS=$'\n'
for fn in $(ls *.mp3 *.ogg *.wav *.wma *.m4a *.avi *.opus); do
    name=$(basename -- "$fn")
    ext="${name##*.}"
    name="${name%.*}"

    # Take the input (-i) file, ignore any video stream (-vn)
    # and change its audio codec (-acodec) tto the codec libopus
    # and change its audio bitrate (-b:a) to 50k
    # and save it under the same name but with .webm extension
    ffmpeg -i "$fn" -vn -acodec libopus  -b:a 50k "$name.webm"

    rm "$fn"
done

