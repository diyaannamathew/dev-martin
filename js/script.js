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

// Netlify-friendly AJAX form submit fallback
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-netlify], form[netlify]');
  forms.forEach((form) => {
    // Only attach handler if AJAX is enabled (default to true when attribute present)
    const ajaxAttr = form.getAttribute('data-netlify-ajax');
    const useAjax = ajaxAttr === null || ajaxAttr === 'true';
    if (!useAjax) return;

    form.addEventListener('submit', (e) => {
      // Let non-AJAX submissions proceed
      e.preventDefault();

      const formData = new FormData(form);

      // When submitting via fetch for Netlify, POST to the site's root
      const submitUrl = form.action || '/';

      fetch(submitUrl === '' ? '/' : submitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          // If the form has an action (custom success page), redirect there
          const action = form.getAttribute('action');
          if (action) {
            window.location.href = action;
            return;
          }
          // Otherwise show an inline success message and reset
          const msg = document.createElement('div');
          msg.className = 'form-success';
          msg.innerText = 'Thank you — your message has been sent.';
          form.parentNode.insertBefore(msg, form.nextSibling);
          form.reset();
        })
        .catch((err) => {
          console.error('Form submission error', err);
          const errMsg = document.createElement('div');
          errMsg.className = 'form-error';
          errMsg.innerText = 'Submission failed. Please try again or email us directly.';
          form.parentNode.insertBefore(errMsg, form.nextSibling);
        });
    });
  });
});
