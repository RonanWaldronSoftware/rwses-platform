const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 16);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  const menuLabel = menuToggle.querySelector('.sr-only');
  if (menuLabel) menuLabel.textContent = isOpen ? 'Open navigation' : 'Close navigation';
  nav?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    const menuLabel = menuToggle?.querySelector('.sr-only');
    if (menuLabel) menuLabel.textContent = 'Open navigation';
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || menuToggle?.getAttribute('aria-expanded') !== 'true') return;
  menuToggle.setAttribute('aria-expanded', 'false');
  const menuLabel = menuToggle.querySelector('.sr-only');
  if (menuLabel) menuLabel.textContent = 'Open navigation';
  nav?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  menuToggle.focus();
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const demoData = [
  { online: 124, alerts: 4, utilization: '87.6%', load: '76.8', health: 96 },
  { online: 125, alerts: 3, utilization: '88.1%', load: '78.2', health: 97 },
  { online: 123, alerts: 5, utilization: '86.9%', load: '75.4', health: 95 },
  { online: 124, alerts: 4, utilization: '87.8%', load: '77.1', health: 96 },
];
let demoIndex = 0;

function updateDemo() {
  demoIndex = (demoIndex + 1) % demoData.length;
  const next = demoData[demoIndex];
  const values = {
    '[data-online]': next.online,
    '[data-alerts]': next.alerts,
    '[data-utilization]': next.utilization,
    '[data-load]': next.load,
    '[data-health]': next.health,
  };

  Object.entries(values).forEach(([selector, value]) => {
    const element = document.querySelector(selector);
    if (!element) return;
    element.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 320 });
    element.textContent = value;
  });

  const ring = document.querySelector('[data-health-ring]');
  ring?.style.setProperty('--health', `${next.health * 3.6}deg`);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(updateDemo, 4200);
}

document.querySelectorAll('.faq details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    document.querySelectorAll('.faq details[open]').forEach((openDetail) => {
      if (openDetail !== detail) openDetail.removeAttribute('open');
    });
  });
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
