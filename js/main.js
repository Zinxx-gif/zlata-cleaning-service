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

// Scroll-reveal with IntersectionObserver
const reveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Section headings slide up
document.querySelectorAll('.section-title, .section-label').forEach(el => {
  el.classList.add('reveal-up');
  reveal.observe(el);
});

// Service cards fade + slide up
document.querySelectorAll('.service-card, .service-card-full').forEach(el => {
  el.classList.add('reveal-up');
  reveal.observe(el);
});

// Testimonial cards staggered fade in
document.querySelectorAll('.testimonial-card').forEach((el, i) => {
  el.classList.add('reveal-fade');
  el.style.transitionDelay = `${i * 80}ms`;
  reveal.observe(el);
});

// Related cards and location cards slide up
document.querySelectorAll('.related-card, .location-info-card, .sidebar-cta-card, .sidebar-card').forEach(el => {
  el.classList.add('reveal-up');
  reveal.observe(el);
});

// Stat cards (about page)
document.querySelectorAll('.stat-card, .value-item').forEach((el, i) => {
  el.classList.add('reveal-fade');
  el.style.transitionDelay = `${i * 60}ms`;
  reveal.observe(el);
});

// Contact detail rows
document.querySelectorAll('.detail-row, .contact-detail').forEach(el => {
  el.classList.add('reveal-up');
  reveal.observe(el);
});

// Cookie consent banner
(function () {
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  if (!localStorage.getItem('cookieConsent')) {
    requestAnimationFrame(function () {
      setTimeout(function () { banner.classList.add('visible'); }, 120);
    });
  }
  document.getElementById('cookie-accept').addEventListener('click', function () {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.classList.remove('visible');
  });
  document.getElementById('cookie-decline').addEventListener('click', function () {
    localStorage.setItem('cookieConsent', 'declined');
    banner.classList.remove('visible');
  });
})();

// Trust bar items slide in from left on load
const trustItems = document.querySelectorAll('.trust-bar-inner > *');
if (trustItems.length) {
  trustItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-16px)';
    el.style.transition = `opacity 0.4s ease ${i * 90}ms, transform 0.4s ease ${i * 90}ms`;
  });
  requestAnimationFrame(() => {
    setTimeout(() => {
      trustItems.forEach(el => {
        el.style.opacity = '';
        el.style.transform = '';
      });
    }, 200);
  });
}
