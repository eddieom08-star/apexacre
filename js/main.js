// Navbar scroll behavior
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

function handleNavbarScroll() {
  const scrollY = window.scrollY;
  if (scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = scrollY;
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// Mobile menu toggle
const toggle = document.querySelector('.navbar__toggle');
const mobileMenu = document.querySelector('.navbar__mobile');
const mobileLinks = mobileMenu.querySelectorAll('a');

toggle.addEventListener('click', function () {
  const isOpen = mobileMenu.classList.toggle('active');
  toggle.classList.toggle('active');
  toggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    mobileMenu.classList.remove('active');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Scroll-triggered animations (Intersection Observer)
const animatedElements = document.querySelectorAll('.animate-on-scroll');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });
} else {
  // Fallback: show everything immediately
  animatedElements.forEach(function (el) {
    el.classList.add('is-visible');
  });
}
