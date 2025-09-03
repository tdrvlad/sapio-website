# Video processing guide (Hero background)

This project standardizes hero background clips to 1280×720, grayscale, with both WebM (VP9) and MP4 (H.264) outputs, plus a JPEG poster frame. Outputs are written to `public/videos/processed/` with a consistent naming convention.

## Prerequisites
- ffmpeg (v6+ recommended)
  - Ubuntu/Debian: `sudo apt-get install ffmpeg`

## Naming convention (outputs)
For an input file `my_clip.mp4`, the following files are created:
- `processed/my_clip-1280.mp4`
- `processed/my_clip-1280.webm`
- `processed/my_clip-poster.jpg`

All outputs are 1280×720 (16:9), grayscale, no audio (required for autoplay), and fast-start MP4.

## Single-file commands
Replace `INPUT.mp4` and `BASENAME` accordingly.

```bash
# MP4 (H.264), 1280×720, grayscale, no audio
ffmpeg -y -i INPUT.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,hue=s=0" \
  -c:v libx264 -preset medium -crf 22 -pix_fmt yuv420p -movflags +faststart -an \
  public/videos/processed/BASENAME-1280.mp4

# WebM (VP9), 1280×720, grayscale, no audio
ffmpeg -y -i INPUT.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,hue=s=0" \
  -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 -pix_fmt yuv420p -an \
  public/videos/processed/BASENAME-1280.webm

# Poster (JPEG)
ffmpeg -y -ss 1 -i INPUT.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,hue=s=0" \
  -vframes 1 -q:v 3 \
  public/videos/processed/BASENAME-poster.jpg
```

Notes:
- `hue=s=0` applies grayscale.
- `force_original_aspect_ratio=increase` + `crop` ensures a seamless 16:9 cover fit without letterboxing.
- Adjust `-crf` if you need smaller/bigger files (higher CRF → smaller file, lower quality).

## Batch process all `.mp4` sources in this folder
Run from the repository root or this directory.

```bash
OUT_DIR="public/videos/processed"; SRC_DIR="public/videos"; mkdir -p "$OUT_DIR"; \
for f in "$SRC_DIR"/*.mp4; do \
  bn=$(basename "$f"); name="${bn%.mp4}"; echo "Processing $bn"; \
  ffmpeg -y -i "$f" -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,hue=s=0" \
    -c:v libx264 -preset medium -crf 22 -pix_fmt yuv420p -movflags +faststart -an \
    "$OUT_DIR/${name}-1280.mp4"; \
  ffmpeg -y -i "$f" -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,hue=s=0" \
    -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 -pix_fmt yuv420p -an \
    "$OUT_DIR/${name}-1280.webm"; \
  ffmpeg -y -ss 1 -i "$f" -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,hue=s=0" \
    -vframes 1 -q:v 3 "$OUT_DIR/${name}-poster.jpg"; \
done
```

## Integrating new clips in the hero
- Place new source `.mp4` files in `public/videos/`.
- Run the batch script above to generate standardized outputs in `public/videos/processed/`.
- Update `src/components/HeroVideo.tsx` to reference the new processed files (both `.webm` and `.mp4`) if you want them in the rotation.

## Tips
- Keep clip length ~3–10s; aim ≤ 5–7 MB per file (WebM will usually be much smaller).
- If you need a different crop focus, add `crop` with offsets; otherwise the center crop works well for backgrounds.
- Autoplay on mobile requires muted + playsInline (already handled in the component).
