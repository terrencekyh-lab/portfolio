// Shared by every page. You shouldn't need to edit this file —
// all your content lives in the .html files.

// ---------- nav: background on scroll + mobile menu ----------
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');

const onScroll = () => nav.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

function setMenu(open) {
  links.classList.toggle('open', open);
  nav.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? 'Close' : 'Menu';
}
toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// ---------- reveal on scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- photo deck (home): click to fan the photos out like cards ----------
// Closed: click to fan out. Open: click a card behind to bring it to the front,
// or click the front card to stack them back up.
document.querySelectorAll('.deck').forEach(deck => {
  const hint = deck.parentElement.querySelector('.deck__hint');
  const cards = [...deck.querySelectorAll('.deck__card')];
  ['front', 'right', 'left'].forEach((pos, i) => cards[i] && (cards[i].dataset.pos = pos));

  const setOpen = open => {
    deck.setAttribute('aria-expanded', open);
    deck.setAttribute('aria-label', open ? 'Stack the photos back up' : 'Fan out more photos of me');
    if (hint) hint.textContent = open ? 'Pick a card · tap the front one to stack them' : 'Tap the photo to deal the cards';
  };

  deck.addEventListener('click', e => {
    const open = deck.getAttribute('aria-expanded') === 'true';
    const picked = e.target.closest('.deck__card');
    if (!open) return setOpen(true);
    if (!picked) return; // clicked the gap between cards
    if (picked.dataset.pos !== 'front') {
      const front = cards.find(c => c.dataset.pos === 'front');
      front.dataset.pos = picked.dataset.pos;
      picked.dataset.pos = 'front';
      return;
    }
    setOpen(false);
  });
});

// ---------- filters (films + photography) ----------
// Each .filter button hides items in the same section whose data-type doesn't match.
document.querySelectorAll('.filters').forEach(group => {
  const section = group.closest('section');
  const buttons = group.querySelectorAll('.filter');
  const items = section.querySelectorAll('[data-type]');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.toggle('is-active', b === btn));
    const type = btn.dataset.filter;
    items.forEach(el => {
      el.classList.toggle('is-hidden', type !== 'all' && el.dataset.type !== type);
      el.classList.add('in'); // make sure newly shown items are visible
    });
  }));
});

// ---------- modal helpers ----------
let lastFocus = null;
function openModal(m) {
  lastFocus = document.activeElement;
  m.hidden = false;
  document.body.style.overflow = 'hidden';
  m.querySelector('.modal__close').focus();
}
function closeModal(m) {
  m.hidden = true;
  document.body.style.overflow = '';
  if (m.id === 'video-modal') document.getElementById('video-frame').innerHTML = '';
  lastFocus && lastFocus.focus();
}
document.querySelectorAll('.modal').forEach(m => {
  m.querySelector('.modal__close').addEventListener('click', () => closeModal(m));
  m.addEventListener('click', e => { if (e.target === m) closeModal(m); });
});

// ---------- video player ----------
const videoModal = document.getElementById('video-modal');
if (videoModal) {
  const frame = document.getElementById('video-frame');
  document.querySelectorAll('[data-video]').forEach(el => el.addEventListener('click', () => {
    const url = el.dataset.video.trim();
    if (url) {
      // a normal YouTube link works; anything else is treated as an embed link
      const id = youtubeId(url);
      const base = id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : url;
      const src = base + (base.includes('?') ? '&' : '?') + 'autoplay=1';
      frame.innerHTML = `<iframe src="${src}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video player"></iframe>`;
    } else {
      frame.innerHTML = `<div class="modal__empty"><strong>Coming soon to a screen near you.</strong>
        <p>Paste the YouTube link into this video's <code>data-video</code> in the HTML file.</p></div>`;
    }
    openModal(videoModal);
  }));
}

// ---------- YouTube helpers (films page) ----------
// Accepts any normal YouTube link: watch?v=, youtu.be/, /embed/, /shorts/
function youtubeId(url) {
  const m = (url || '').match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([\w-]{11})/);
  return m ? m[1] : '';
}
// Empty <img src=""> next to a YouTube link gets that video's thumbnail
document.querySelectorAll('.film-row__thumb, .player').forEach(el => {
  const img = el.querySelector('img');
  const id = youtubeId(el.getAttribute('href') || el.dataset.youtube);
  if (img && id && !img.getAttribute('src')) img.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
});

// Showreel + latest project: play the video in place
document.querySelectorAll('.player').forEach(player => {
  player.querySelector('.player__play').addEventListener('click', () => {
    const id = youtubeId(player.dataset.youtube);
    if (id) {
      player.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="Video player" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    } else if (!player.querySelector('.player__empty')) {
      player.insertAdjacentHTML('beforeend', `<div class="player__empty"><strong>Coming soon to a screen near you.</strong>
        <p>Paste your YouTube link into <code>data-youtube</code> in films.html.</p></div>`);
    }
  });
});

// ---------- photo lightbox ----------
const lightbox = document.getElementById('lightbox');
let showShot = () => {};
if (lightbox) {
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-cap');
  const shots = [...document.querySelectorAll('.shot')];
  let current = 0;
  const visible = () => shots.filter(s => !s.classList.contains('is-hidden'));
  showShot = step => {
    const list = visible();
    current = (list.indexOf(shots[current]) + step + list.length) % list.length;
    current = shots.indexOf(list[current]);
    const s = shots[current], i = s.querySelector('img');
    img.src = i.src;
    img.alt = i.alt || s.dataset.caption || '';
    cap.textContent = s.dataset.caption || '';
  };
  shots.forEach((s, i) => {
    s.tabIndex = 0;
    const open = () => { current = i; showShot(0); openModal(lightbox); };
    s.addEventListener('click', open);
    s.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });
  });
  lightbox.querySelector('.lightbox__nav--prev').addEventListener('click', () => showShot(-1));
  lightbox.querySelector('.lightbox__nav--next').addEventListener('click', () => showShot(1));
}

// ---------- keyboard ----------
addEventListener('keydown', e => {
  const open = document.querySelector('.modal:not([hidden])');
  if (!open) return;
  if (e.key === 'Escape') closeModal(open);
  if (open === lightbox && e.key === 'ArrowLeft') showShot(-1);
  if (open === lightbox && e.key === 'ArrowRight') showShot(1);
});

// ---------- footer year ----------
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
