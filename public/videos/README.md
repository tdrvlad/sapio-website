🎥 Video Formats for Web Hero Sections

This project standardizes hero background clips to 1280px width with two formats and a poster image:

- WebM (VP9)
- MP4 (H.264)
- Poster JPEG

All processed outputs are converted to grayscale (black & white) for visual consistency.

All processed outputs live in `public/videos/processed/` and follow the naming pattern:

- `<basename>-1280.webm`
- `<basename>-1280.mp4`
- `<basename>-poster.jpg`

Where `<basename>` is the original filename without extension (e.g. `eniac_1`).

Recommended you keep clips 6–12 seconds and size ≤ 5–7 MB per file (≤10 MB max for MP4 fallback).

Autoplay notes: videos must be muted and use `playsinline`. Reduced-motion users get a static poster.

---

✅ Quick Commands (FFmpeg)

1) Convert to 1280-wide WebM (VP9):

```
ffmpeg -y -i public/videos/<input> -vf scale=1280:-2:force_original_aspect_ratio=decrease,hue=s=0 \
  -c:v libvpx-vp9 -b:v 0 -crf 32 -row-mt 1 -pix_fmt yuv420p -an \
  public/videos/processed/<basename>-1280.webm
```

2) Convert to 1280-wide MP4 (H.264):

```
ffmpeg -y -i public/videos/<input> -vf scale=1280:-2:force_original_aspect_ratio=decrease,hue=s=0 \
  -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an \
  public/videos/processed/<basename>-1280.mp4
```

3) Extract poster JPEG (approx. 1s into the clip):

```
ffmpeg -y -ss 00:00:01 -i public/videos/<input> -frames:v 1 \
  -vf scale=1280:-2:force_original_aspect_ratio=decrease,hue=s=0 -q:v 3 -update 1 \
  public/videos/processed/<basename>-poster.jpg
```

Replace `<input>` with the source file (e.g. `eniac_1.mp4`) and `<basename>` with the desired name (e.g. `eniac_1`).

---

💡 Why both formats?

- WebM offers better compression and quality at smaller sizes for modern browsers.
- MP4 (H.264) is the universal fallback (Safari/iOS/older browsers).

---

📐 Targets & Tips

- Resolution: 1280×720 (HD). Our hero is scaled to cover, so consistency matters more than exact height.
- Bitrate guidance: ~1.5–3 Mbps for 1080p. With 1280-wide and VP9, CRF 32 is usually fine.
- Keep files small. If a file exceeds 10 MB, consider trimming length, increasing CRF, or lowering preset.

---

🧩 Integration

- Add processed entries to `src/components/HeroVideo.tsx` playlist (mp4/webm/poster paths) and their metadata to `src/constants/heroVideoMeta.ts` (title + source URL).

---

🔧 One-shot script

Use the helper script to process a single video end-to-end:

```
cd public/videos
./process_video.sh <input>
# Example:
./process_video.sh eniac_1.mp4
```

Outputs will be saved to `public/videos/processed/` with the naming scheme shown above.


