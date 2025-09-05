#!/usr/bin/env bash

set -euo pipefail

# Re-encode all processed videos/posters to grayscale (in-place)

ROOT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
PROCESSED_DIR="$ROOT_DIR/public/videos/processed"
LOG_FILE="$PROCESSED_DIR/.grayscale_reencode.log"

if [[ ! -d "$PROCESSED_DIR" ]]; then
  echo "Processed directory not found: $PROCESSED_DIR" >&2
  exit 1
fi

echo "[$(date '+%F %T')] Starting grayscale re-encode in $PROCESSED_DIR" | tee -a "$LOG_FILE"

shopt -s nullglob

# Re-encode MP4 files
for f in "$PROCESSED_DIR"/*.mp4; do
  echo "[$(date '+%F %T')] MP4 -> grayscale: $(basename -- "$f")" | tee -a "$LOG_FILE"
  tmp_file="${f}.tmp.mp4"
  ffmpeg -y -i "$f" -vf hue=s=0 \
    -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an \
    "$tmp_file" >>"$LOG_FILE" 2>&1
  mv -f "$tmp_file" "$f"
done

# Re-encode WebM files
for f in "$PROCESSED_DIR"/*.webm; do
  echo "[$(date '+%F %T')] WebM -> grayscale: $(basename -- "$f")" | tee -a "$LOG_FILE"
  tmp_file="${f}.tmp.webm"
  ffmpeg -y -i "$f" -vf hue=s=0 \
    -c:v libvpx-vp9 -b:v 0 -crf 32 -row-mt 1 -pix_fmt yuv420p -an \
    "$tmp_file" >>"$LOG_FILE" 2>&1
  mv -f "$tmp_file" "$f"
done

# Re-encode poster JPGs
for f in "$PROCESSED_DIR"/*.jpg; do
  echo "[$(date '+%F %T')] Poster -> grayscale: $(basename -- "$f")" | tee -a "$LOG_FILE"
  tmp_file="${f}.tmp.jpg"
  ffmpeg -y -i "$f" -vf hue=s=0 -q:v 3 "$tmp_file" >>"$LOG_FILE" 2>&1
  mv -f "$tmp_file" "$f"
done

echo "[$(date '+%F %T')] Completed grayscale re-encode" | tee -a "$LOG_FILE"


