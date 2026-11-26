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

// ---------- running timecode (home page) ----------
const tc = document.getElementById('timecode');
if (tc) {
  const start = performance.now();
  const pad = n => String(n).padStart(2, '0');
  (function tick() {
    const frames = Math.floor((performance.now() - start) / (1000 / 24));
    const f = frames % 24, s = Math.floor(frames / 24);
    tc.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f)}`;
    requestAnimationFrame(tick);
  })();
}

// ---------- reveal on scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

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
      const src = url + (url.includes('?') ? '&' : '?') + 'autoplay=1';
      frame.innerHTML = `<iframe src="${src}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video player"></iframe>`;
    } else {
      frame.innerHTML = `<div class="modal__empty"><strong>Coming soon to a screen near you.</strong>
        <p>Add a YouTube or Vimeo embed link to this button's <code>data-video</code> in the HTML file.</p></div>`;
    }
    openModal(videoModal);
  }));
}

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
