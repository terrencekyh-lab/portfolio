# How to edit your portfolio

Your site is plain files: no app, no login. You change it by editing the `.html` files in a text editor, then publishing.

## 1. Set up (once)

1. Install **Visual Studio Code** (free): https://code.visualstudio.com. Don't use TextEdit: it can quietly break the files.
2. In VS Code choose **File → Open Folder…** and pick `Documents/portfolio`. Every file shows in the sidebar.
3. Make two new folders inside `portfolio`: **`images`** and **`videos`**. Your own files go in there.

```
portfolio/
├── index.html            Home
├── films.html            Films (showreel, latest project, 10 films)
├── photography.html      Photography (gear + the 5 sets)
├── photos-event.html     ┐
├── photos-band.html      │
├── photos-dance.html     │ one page per photo set
├── photos-sports.html    │
├── photos-street.html    ┘
├── vlogs.html            Vlogs
├── achievements.html     Achievements
├── styles.css            colours, fonts, layout (no need to touch)
├── script.js             clicks and animations (no need to touch)
├── images/               ← your photos
└── videos/               ← the vlog header clip
```

**To find what to change:** press **Cmd+F** and search for **✏️**. Every editable spot has a ✏️ note just above it.

**To see your changes:** save (**Cmd+S**), then double-click the `.html` file in Finder to open it in your browser. If it's already open, refresh (**Cmd+R**).
YouTube videos may not play when the page is opened this way. They will on the live site.

---

## 2. The one rule

HTML is text wrapped in **tags** like `<p> … </p>`. **Change what's between the tags and inside the quotes; leave the tags themselves alone.**

```html
<h3>Static</h3>                          ← change "Static"
<a href="https://youtu.be/abc123">       ← change what's inside the quotes
```

If you delete a `<` or `>` or a closing tag by mistake, things go odd. Press **Cmd+Z** to undo.

Lines between `<!--` and `-->` are notes for you. They never show on the site.

---

## 3. Text

Just retype it. A few things to know:

- **Your name and email are on every page.** Change them all at once in VS Code: **Cmd+Shift+H** (Replace in Files):
  - Find `Your Name` → replace with your name → **Replace All**
  - Find `hello@yourname.com` → replace with your email → **Replace All**
- To get a **slanted blue word with the gold brush underline** in a heading, wrap it in `<em> … </em>`: `My <em>vlogs</em>`.
- Write `&` as `&amp;` (e.g. `Rock &amp; Roll`). Everything else, including emoji and ’ “ ” quotes, is fine.

---

## 4. Images

1. Put the photo in `images/`. Use **lowercase names with no spaces**: `band-01.jpg`, not `Band 01.JPG`.
   The live site is case-sensitive: `Band.jpg` and `band.jpg` count as different files.
2. Shrink it first so the site stays fast: about **2000px wide** for big header photos and **1200px** for everything else, ideally under 500 KB. https://squoosh.app does this for free.
3. Replace the placeholder link (anything starting `https://picsum.photos/…`) with your file's path.

Photos appear in two forms:

```html
<!-- Form A: a normal picture -->
<img src="images/portrait.jpg" alt="Me holding a camera" />

<!-- Form B: a background (page headers, the "See my works" cards) -->
<div class="page-hero__bg" style="background-image:url('images/band-cover.jpg')"></div>
```

In Form B, keep the `url('…')` and the single quotes. Swap only the path.

`alt="…"` is a short description of the photo for screen readers. Fill it in if you can.

### Where the photos are

| Page | What to swap |
|---|---|
| Home | header photo, your **3 deck photos** (the first is on top), the 4 "See my works" card backgrounds |
| Photography | header photo, the 5 set **cover** photos |
| Each set page | header photo, and one `<figure>` line per photo |
| Vlogs / Achievements | header photo |

### Adding photos to a set (e.g. `photos-band.html`)

Each photo is one line:

```html
<figure class="shot reveal" data-caption="The Neons at Studio 9, March 2026"><img src="images/band/01.jpg" alt="" loading="lazy" /></figure>
```

- `src` = the photo. `data-caption` = the text shown when someone opens it full-size.
- **Add a photo:** copy a whole line and paste it below. **Remove one:** delete the whole line.
- Any shape works (tall, wide, square); the grid fits them together.
- Tip: make a folder per set (`images/band/`, `images/dance/` …) to stay organised.

---

## 5. Videos

**Upload your videos to YouTube first**, then paste the link. Any normal YouTube link works, including:
`https://www.youtube.com/watch?v=dQw4w9WgXcQ` or `https://youtu.be/dQw4w9WgXcQ` (from the Share button).

| Where | Paste the link into |
|---|---|
| Films: showreel (top) | `data-youtube=""` on the first player |
| Films: latest project | `data-youtube=""` on the second player |
| Films: each of the 10 films | **both** `href="#"` spots in that film (the picture and "Watch on YouTube") |
| Vlogs: each vlog | `data-video=""` |

Example:

```html
<div class="player player--full" data-youtube="https://youtu.be/dQw4w9WgXcQ">
```

**Free thumbnails:** on the Films page, if you change a picture to `src=""` (empty quotes) and its YouTube link is filled in, the site uses that video's YouTube thumbnail automatically.

### The Vlogs header clip (an actual video file)

This one isn't YouTube. It's a short silent loop of quick clips:

- Export it as an **MP4**, **10–20 seconds**, no sound needed, **under about 10 MB**.
- Name it **`vlog-reel.mp4`** and put it in the **`videos`** folder. That's it.
- Until the file exists, the header shows a still photo instead.

---

## 6. Links

Links are `href="…"`. Always use the full address, starting with `https://`.

- **Social buttons** (bottom of every page): replace `href="#"` with your profile link:
  ```html
  <li><a href="https://www.instagram.com/yourhandle" target="_blank" rel="noopener">Instagram</a></li>
  ```
  These are on every page, so use **Cmd+Shift+H** to replace them on all pages at once, or edit each page.
  To add another site, copy a whole `<li> … </li>` line.
- **Email:** `href="mailto:you@example.com"`. Keep the `mailto:` in front.
- `target="_blank"` makes a link open in a new tab. Keep it on links to other websites.

---

## 7. Adding or removing whole items

Everything that repeats is a block. Copy the **whole** block, from its opening tag to its matching closing tag, and paste it next to the others:

| To add a… | Copy this whole block |
|---|---|
| Skill (Home) | `<li class="skill reveal"> … </li>` |
| Film (Films) | `<article class="film-row reveal"> … </article>` (new films go at the top as No. 11, 12…) |
| Vlog | `<article class="vlog reveal"> … </article>` |
| Photo in a set | the `<figure … </figure>` line |
| Gear | a `<li><strong>…</strong><span>…</span></li>` line inside a gear card |
| Timeline entry (Achievements) | an `<li> … </li>` in the timeline |

VS Code highlights the matching closing tag when you click an opening one, which helps you grab the whole block.

---

## 8. Publishing your changes

Your live site is **https://terrencekyh-lab.github.io/portfolio/**. After editing, in the Terminal:

```bash
cd ~/Documents/portfolio
git add -A
git commit -m "Update my content"
git push
```

The live site updates **1–2 minutes** later. Refresh with **Cmd+Shift+R** if you still see the old version.
(Or just ask Claude to publish it for you.)

GitHub won't accept single files over **100 MB**, which is another reason to keep videos on YouTube.

---

## If something breaks

- **Cmd+Z** in VS Code undoes, step by step, even after saving.
- **A photo doesn't show:** check the file name matches *exactly* (capitals, `.jpg` vs `.jpeg`) and that it's inside `images/`.
- **The layout looks wrong after an edit:** you probably deleted part of a tag. Undo until it looks right.
- **A video says "Coming soon":** its link is still empty.
