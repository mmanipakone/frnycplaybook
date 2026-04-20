// Nav scroll shadow
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

// Tools tab switcher
function showTool(id, btn) {
  document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const panel = document.getElementById('tool-' + id);
  if (panel) panel.classList.add('active');
}

// Appendix tab switcher
function showAppendix(id, btn) {
  document.querySelectorAll('.appendix-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.appendix-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const panel = document.getElementById('appendix-' + id);
  if (panel) panel.classList.add('active');
}

// Challenge accordion
function toggleChallenge(header) {
  const item = header.closest('.challenge-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.challenge-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.challenge-header').setAttribute('aria-expanded', false);
  });

  // Open clicked if it was closed
  if (!isOpen) {
    item.classList.add('open');
    header.setAttribute('aria-expanded', true);
  }
}

// IntersectionObserver fade-up animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));
