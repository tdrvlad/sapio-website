#!/usr/bin/env bash

set -euo pipefail

# Usage: ./process_video.sh <input_path_under_public_videos>
# Example: ./process_video.sh eniac_1.mp4

INPUT_REL_PATH=${1:-}
if [[ -z "$INPUT_REL_PATH" ]]; then
  echo "Usage: $0 <input_path_under_public_videos>"
  exit 1
fi

ROOT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
VIDEOS_DIR="$ROOT_DIR/public/videos"
PROCESSED_DIR="$VIDEOS_DIR/processed"

INPUT_PATH="$VIDEOS_DIR/$INPUT_REL_PATH"
if [[ ! -f "$INPUT_PATH" ]]; then
  echo "Input file not found: $INPUT_PATH"
  exit 1
fi

BASENAME=$(basename -- "$INPUT_PATH")
BASENAME_NO_EXT=${BASENAME%.*}

mkdir -p "$PROCESSED_DIR"

# WebM (VP9)
ffmpeg -y -i "$INPUT_PATH" -vf scale=1280:-2:force_original_aspect_ratio=decrease,hue=s=0 \
  -c:v libvpx-vp9 -b:v 0 -crf 32 -row-mt 1 -pix_fmt yuv420p -an \
  "$PROCESSED_DIR/${BASENAME_NO_EXT}-1280.webm"

# MP4 (H.264)
ffmpeg -y -i "$INPUT_PATH" -vf scale=1280:-2:force_original_aspect_ratio=decrease,hue=s=0 \
  -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an \
  "$PROCESSED_DIR/${BASENAME_NO_EXT}-1280.mp4"

# Poster (seek 1s)
ffmpeg -y -ss 00:00:01 -i "$INPUT_PATH" -frames:v 1 \
  -vf scale=1280:-2:force_original_aspect_ratio=decrease,hue=s=0 -q:v 3 -update 1 \
  "$PROCESSED_DIR/${BASENAME_NO_EXT}-poster.jpg"

echo "Processed ->"
echo "  $PROCESSED_DIR/${BASENAME_NO_EXT}-1280.webm"
    echo "  $PROCESSED_DIR/${BASENAME_NO_EXT}-1280.mp4"
    echo "  $PROCESSED_DIR/${BASENAME_NO_EXT}-poster.jpg"
