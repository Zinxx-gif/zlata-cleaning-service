// Mobile nav toggle
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.nav-mobile');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
}

document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Active nav link
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Hero spotlight — instant, no lerp
(function () {
  var hero = document.querySelector('.hero');
  if (!hero) return;
  hero.addEventListener('mousemove', function (e) {
    var r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    hero.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
})();

// Scroll progress bar
(function () {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', function () {
    var s = document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (h > 0 ? (s / h * 100) : 0) + '%';
  }, { passive: true });
})();

// Custom cursor
(function () {
  var dot = document.getElementById('cursor-dot');
  if (!dot || !window.matchMedia('(pointer: fine)').matches) return;
  var mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
  (function tick() {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    dot.style.left = cx + 'px';
    dot.style.top  = cy + 'px';
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a, button, [role="button"]').forEach(function (el) {
    el.addEventListener('mouseenter', function () { dot.classList.add('hovering'); });
    el.addEventListener('mouseleave', function () { dot.classList.remove('hovering'); });
  });
})();

// Cookie consent
function acceptCookie() {
  localStorage.setItem('cookieConsent', 'accepted');
  document.getElementById('cookieBanner').style.display = 'none';
}
function dismissCookie() {
  localStorage.setItem('cookieConsent', 'declined');
  document.getElementById('cookieBanner').style.display = 'none';
}
if (localStorage.getItem('cookieConsent')) {
  document.getElementById('cookieBanner').style.display = 'none';
}

// GSAP scroll animations
(function () {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Trust bar always runs (subtle, short)
  var trustItems = document.querySelectorAll('.trust-bar-inner > *');
  if (trustItems.length && !reduced) {
    gsap.from(trustItems, { x: -20, opacity: 0, duration: 0.4, stagger: 0.09, delay: 0.2, ease: 'power2.out' });
  }

  if (reduced) return;

  // Section headings
  document.querySelectorAll('.section-title, .section-label').forEach(function (el) {
    gsap.from(el, {
      y: 28, opacity: 0, duration: 0.65, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Service cards grouped per grid
  document.querySelectorAll('.services-grid').forEach(function (grid) {
    gsap.from(grid.querySelectorAll('.service-card'), {
      y: 36, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Service full cards (services page)
  document.querySelectorAll('.service-card-full').forEach(function (el, i) {
    gsap.from(el, {
      y: 28, opacity: 0, duration: 0.6, delay: i * 0.07, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Testimonial cards
  document.querySelectorAll('.testimonials-grid').forEach(function (grid) {
    gsap.from(grid.querySelectorAll('.testimonial-card'), {
      y: 28, opacity: 0, duration: 0.5, stagger: 0.09, ease: 'power2.out',
      scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Related cards (areas grid)
  document.querySelectorAll('.related-grid').forEach(function (grid) {
    gsap.from(grid.querySelectorAll('.related-card'), {
      y: 22, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
      scrollTrigger: { trigger: grid, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // About strip columns
  var aboutGrid = document.querySelector('.about-strip-grid');
  if (aboutGrid) {
    gsap.from(Array.from(aboutGrid.children), {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: aboutGrid, start: 'top 82%', toggleActions: 'play none none none' }
    });
  }

  // Stat / value cards (about page)
  document.querySelectorAll('.stat-card, .value-item').forEach(function (el, i) {
    gsap.from(el, {
      opacity: 0, y: 20, duration: 0.5, delay: i * 0.06, ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // Contact rows
  document.querySelectorAll('.detail-row, .contact-detail').forEach(function (el) {
    gsap.from(el, {
      x: -18, opacity: 0, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // Location / sidebar cards
  document.querySelectorAll('.location-info-card, .sidebar-cta-card, .sidebar-card').forEach(function (el, i) {
    gsap.from(el, {
      y: 24, opacity: 0, duration: 0.55, delay: i * 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });
})();
