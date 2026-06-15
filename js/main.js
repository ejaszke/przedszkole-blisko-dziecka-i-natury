// ============================================================
// REVIEWS CONFIG
// Aby podpiąć CMS lub API: zastąp obiekt REVIEWS_CONFIG
// danymi z zewnętrznego źródła przed wywołaniem initReviews().
// ============================================================
const REVIEWS_CONFIG = {
  googleUrl: "https://www.google.com/maps?cid=2042920449747912846",
  totalCount: 16,
  averageRating: 4.5,
  reviews: [
    {
      authorName: "Sonia Mitros",
      rating: 5,
      date: "8 miesięcy temu",
      text: "Jestem spokojna o dziecko w każdym aspekcie.",
    },
    {
      authorName: "Klaudia Marzec",
      rating: 5,
      date: "9 miesięcy temu",
      text: "Cudowne miejsce pełne ciepła, empatii i natury 💚",
    },
    {
      authorName: "Anna Cichocka",
      rating: 5,
      date: "rok temu",
      text: "Przedszkole Blisko Dziecka i Natury to miejsce, które naprawdę wyróżnia się troską o najmłodszych. Już od pierwszych chwil widać, jak bliskość dziecka i jego potrzeb jest dla pracowników przedszkola ważna 🙂. Dzieci są tu traktowane z ogromną uwagą i szacunkiem, a minimediacje dziecięce uczą je rozwiązywania konfliktów w sposób łagodny i pełen empatii 🧘‍♀️👫🤝. Ciepła atmosfera panująca w przedszkolu sprawia, że dzieci czują się bezpieczne i chętnie uczestniczą w zajęciach. Bliskość lasu i możliwość obcowania z naturą to kolejny atut tego przedszkola 🌳🌲🍁🦔🐿. To wyjątkowe miejsce, gdzie każde dziecko jest ważne, a jego indywidualność i potrzeby są zawsze zauważane. Serdecznie polecam 😄!",
    },
    {
      authorName: "Michał W",
      rating: 5,
      date: "rok temu",
      text: "Cudowne miejsce 🙂 jestem nim zachwycony. Synek zadowolony – a to najwyższa i najważniejsza ocena. Panie cudowne. Podejście do dzieci genialne, zajęcia oraz materiały dydaktyczne utrzymane w duchu Montessori. Przedszkole znajduje się w…",
      truncated: true,
    },
    {
      authorName: "Julia Rędzia",
      rating: 5,
      date: "2 lata temu",
      text: "Z całego serca i z czystym sumieniem polecam Przedszkole Blisko Dziecka i Natury! Jestem mamą dwóch chłopców i nasza przygoda z przedszkolem trwa już dobrych kilka lat. Jest to wspaniałe miejsce, które tworzą CUDOWNI LUDZIE! Dzieci są…",
      truncated: true,
    },
    {
      authorName: "Patrycja Gross",
      rating: 5,
      date: "2 lata temu",
      text: "Naszą przygodę z przedszkolem zaczęliśmy 5 lat temu. Dziś nie wyobrażam sobie pożegnania z tym miejscem. Niestety w tym roku to nastąpi... Jest to cudowne miejsce z cudownym i wykwalifikowanym personelem. Dzieci czują się tu jak w domu. Z…",
      truncated: true,
    },
    {
      authorName: "Daria Foltyn-Wolska",
      rating: 5,
      date: "2 lata temu",
      text: "Wspaniałe przedszkole, każdego dnia syn chodzi tam z ochotą, a personel robi wszystko, żeby dzieci mogły się dobrze rozwijać.",
    },
  ],
};

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('.navbar-nav');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));

  navMenu.querySelectorAll('.nav-item.dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        link.closest('.nav-item').classList.toggle('open');
      }
    });
  });

  document.addEventListener('click', e => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

// ============================================================
// Reviews – render + carousel
// ============================================================
function initReviews(config) {
  const track   = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const allLink = document.getElementById('reviewsAllLink');
  if (!track) return;

  // Wire up "all reviews" link
  if (allLink && config.googleUrl) {
    allLink.href = config.googleUrl;
  }

  // Render cards from data
  config.reviews.forEach(review => {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    const card = document.createElement('div');
    card.className = 'review-card';

    const textEl = document.createElement('p');
    textEl.className = 'review-text';
    textEl.textContent = '„' + review.text + '”';

    let readMore;
    if (review.truncated) {
      readMore = document.createElement('a');
      readMore.href = config.googleUrl;
      readMore.target = '_blank';
      readMore.rel = 'noopener noreferrer';
      readMore.className = 'review-read-more';
      readMore.textContent = 'czytaj więcej w Google…';
    } else {
      readMore = document.createElement('button');
      readMore.className = 'review-read-more';
      readMore.textContent = 'czytaj więcej…';
      readMore.hidden = true;
      readMore.addEventListener('click', () => {
        const expanded = textEl.classList.toggle('expanded');
        readMore.textContent = expanded ? 'zwiń' : 'czytaj więcej…';
      });
    }

    const starsEl = document.createElement('div');
    starsEl.className = 'review-stars';
    starsEl.textContent = stars;

    const footer = document.createElement('div');
    footer.className = 'review-footer';
    footer.innerHTML =
      '<span class=”review-author”>' + review.authorName + '</span>' +
      '<span class=”review-date”>' + review.date + '</span>' +
      '<span class=”review-source”><span class=”review-source-g”>G</span> Opinia z Google</span>';

    card.appendChild(starsEl);
    card.appendChild(textEl);
    card.appendChild(readMore);
    card.appendChild(footer);
    track.appendChild(card);
  });

  // Show "czytaj więcej" only when text is actually clamped (truncated cards always show it)
  requestAnimationFrame(() => {
    track.querySelectorAll('.review-card').forEach(card => {
      const txt = card.querySelector('.review-text');
      const btn = card.querySelector('.review-read-more');
      if (!txt || !btn) return;
      if (btn.tagName === 'A' || txt.scrollHeight > txt.clientHeight + 2) {
        btn.hidden = false;
      }
    });
  });

  // Carousel logic
  const cards = [...track.querySelectorAll('.review-card')];
  let idx = 0;

  function visibleCount() { return window.innerWidth <= 640 ? 1 : 3; }
  function maxIdx()       { return Math.max(0, cards.length - visibleCount()); }

  function update() {
    const v   = visibleCount();
    const gap = 20;
    const w   = (track.offsetWidth - gap * (v - 1)) / v;
    cards.forEach(c => { c.style.flex = '0 0 ' + w + 'px'; });
    track.scrollLeft = idx * (w + gap);
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx >= maxIdx();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { if (idx > 0)        { idx--; update(); } });
  if (nextBtn) nextBtn.addEventListener('click', () => { if (idx < maxIdx()) { idx++; update(); } });
  window.addEventListener('resize', () => {
    idx = Math.min(idx, maxIdx());
    update();
  });
  requestAnimationFrame(update);
}

initReviews(REVIEWS_CONFIG);

// ============================================================
// Group tabs
// ============================================================
(function () {
  const tabs     = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  if (!tabs.length) return;

  function activate(target) {
    tabs.forEach(t     => t.classList.toggle('active', t.dataset.target === target));
    contents.forEach(c => c.classList.toggle('active', c.id === target));
  }

  tabs.forEach(btn => btn.addEventListener('click', () => activate(btn.dataset.target)));
  activate(tabs[0].dataset.target);
})();
