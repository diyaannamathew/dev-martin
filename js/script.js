const socialLinks = {
  instagram_url: 'https://www.instagram.com/dev_martin2026?igsh=MTB0YnJjNm5qMG1qNg==',
  facebook_url: '#',
  pinterest_url: '#',
  youtube_url: '#',
  whatsapp_url: 'https://wa.me/+918086893363'};

const socials = {
  instagramLink: socialLinks.instagram_url,
  facebookLink: socialLinks.facebook_url,
  pinterestLink: socialLinks.pinterest_url,
  youtubeLink: socialLinks.youtube_url,
  whatsappLink: socialLinks.whatsapp_url
};

Object.entries(socials).forEach(([id, href]) => {
  const element = document.getElementById(id);
  if (element) {
    element.href = href;
  }
});

const toggleButton = document.querySelector('.mobile-toggle');
const body = document.body;

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    body.classList.toggle('nav-open');
  });
}

const navLinks = document.querySelectorAll('.nav-link');
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPath) {
    link.classList.add('active');
  }
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const heroButtons = document.querySelectorAll('.button-primary, .button-secondary');
heroButtons.forEach((button) => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-2px)';
  });
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
  });
});

const header = document.querySelector('.site-header');
const heroImage = document.querySelector('.hero-image');

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-visible');
});

window.addEventListener('scroll', () => {
  const offset = window.scrollY;

  if (header) {
    header.classList.toggle('scrolled', offset > 24);
  }

  if (heroImage) {
    heroImage.style.backgroundPosition = `center calc(50% + ${offset * 0.18}px)`;
  }
});
