# Your filmmaker portfolio

A cinematic portfolio site in orange and blue. It's plain HTML, CSS and JavaScript, so you don't need to install anything.

```
portfolio/
├── index.html          ← Home: Scene 01 (hero) + Scene 02 (about you)
├── films.html          ← Reel 01: featured film + film grid (with filters)
├── photography.html    ← Reel 02: photo grid (with filters + full-screen viewer)
├── vlogs.html          ← Reel 03: latest vlog + episode grid
├── achievements.html   ← Reel 04: stats, festival laurels, timeline
├── styles.css          ← colours and fonts (the theme is at the very top)
├── script.js           ← interactions, shared by every page (no need to touch)
└── images/             ← create this folder and put your own photos in it
```

To view the site, double-click `index.html`. The header links take you to the other pages.

## Making it yours

Every place you should change has a **✏️** comment above it. Search for ✏️ in each file.

- **Your name and email** appear in the header and footer of *every* page. Use your editor's "Replace in files" (in VS Code: Cmd+Shift+H) to change `Your Name` and `hello@yourname.com` in all of them at once.
- **Photos:** put your images in `images/` and swap the `https://picsum.photos/...` links for things like `images/hero.jpg`. Those picsum links are only random placeholder photos.
- **Videos:** every play button has `data-video=""`. Paste an embed link between the quotes:
  - YouTube: `https://www.youtube.com/embed/VIDEO_ID`
  - Vimeo: `https://player.vimeo.com/video/VIDEO_ID`
- **Films:** copy an `<article class="film">` block for each film. Set `data-type` to `short`, `music` or `doc`.
- **Photos:** copy a `<figure class="shot">` line for each photo. `data-type` sets the category (`set`, `street` or `portrait`), and `data-caption` is the text shown full-screen.
- **Vlogs:** copy an `<article class="vlog">` block for each episode. Update the episode number, length, date and title.
- **Achievements:** edit the four numbers, copy a `<div class="laurel">` for each festival, and add a `<li>` to the timeline for each milestone.

### Changing the colours
The top of `styles.css` has the theme: `--accent` is the orange, `--blue` is the blue, and `--bg` is the background.

## Putting it online (free)
Go to https://app.netlify.com/drop and drag the whole `portfolio` folder onto the page. You get a live link straight away. GitHub Pages and Cloudflare Pages also work with these files as they are.

Tip: resize photos to about 2000px wide before you upload them so the site loads fast. https://squoosh.app is good for this.
