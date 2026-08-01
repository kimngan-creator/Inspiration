/* =========================================
   EXPOELITE — LANDING PAGE SCRIPTS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {



  // ---- NAVBAR: Scroll effect ----
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ---- NAVBAR: Mobile burger ----
  const burger = document.getElementById('navBurger');
  const mobileNav = document.getElementById('navMobile');
  burger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
  // Close mobile nav on link click
  document.querySelectorAll('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- SCROLL REVEAL ANIMATIONS ----
  const addRevealClasses = () => {
    const elements = [
      { selector: '.pain-card',         cls: 'reveal',       delays: [0, 0.1, 0.2, 0.3] },
      { selector: '.service-card',      cls: 'reveal',       delays: [0, 0.1, 0.2, 0.3] },
      { selector: '.pricing-card',      cls: 'reveal',       delays: [0, 0.1, 0.2] },
      { selector: '.testimonial-card',  cls: 'reveal',       delays: [0, 0.1, 0.2] },
      { selector: '.schedule-info',     cls: 'reveal-right', delays: [0, 0.1, 0.2] },
      { selector: '.section-heading',   cls: 'reveal',       delays: [0] },
      { selector: '.section-eyebrow',   cls: 'reveal',       delays: [0] },
    ];

    elements.forEach(({ selector, cls, delays }) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add(cls);
        const delay = delays[i] || delays[delays.length - 1] || 0;
        el.style.transitionDelay = `${delay}s`;
      });
    });
  };
  addRevealClasses();

  // IntersectionObserver for all reveal classes
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });

  // ---- CONTACT FORM ----
  window.handleSubmit = function(e) {
    e.preventDefault();
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    const btn = document.getElementById('submit-btn');

    // === THAY THẾ LINK WEB APP CỦA BẠN VÀO DƯỚI ĐÂY ===
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx6YrDYX_rgR3rhPDjNkvgH_WISSDsLHVzCoYhJcmF4_UVmmKGfdOioW8HOg-aOuzaf/exec';

    btn.disabled = true;
    btn.querySelector('.btn-text').textContent = 'Đang gửi...';

    if (scriptURL === 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL') {
      alert("Bạn chưa thay thế link Google App Script trong file script.js!");
      btn.disabled = false;
      btn.querySelector('.btn-text').textContent = 'Gửi yêu cầu tư vấn';
      return;
    }

    fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
      .then(response => {
        form.style.display = 'none';
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(error => {
        alert('Có lỗi xảy ra, vui lòng thử lại sau!');
        console.error('Error!', error.message);
        btn.disabled = false;
        btn.querySelector('.btn-text').textContent = 'Gửi yêu cầu tư vấn';
      });
  };

  // ---- COUNTER ANIMATION ----
  const counters = document.querySelectorAll('.stat__num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suffix = el.querySelector('.stat__plus')?.textContent || '';
        let start = 0;
        const duration = 800;
        const steps = 60;
        const inc = num / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += inc;
          if (current >= num) {
            current = num;
            clearInterval(timer);
          }
          const display = Number.isInteger(num) ? Math.floor(current) : current.toFixed(1);
          el.innerHTML = `${display}<span class="stat__plus">${suffix}</span>`;
        }, duration / steps);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ---- PAIN CARD HOVER: Number highlight ----
  document.querySelectorAll('.pain-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const num = card.querySelector('.pain-card__number');
      if (num) num.style.color = 'var(--gold-light)';
    });
    card.addEventListener('mouseleave', () => {
      const num = card.querySelector('.pain-card__number');
      if (num) num.style.color = 'rgba(22, 31, 72, 0.08)';
    });
  });

  // ---- NAVBAR: Active section highlight ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');
  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= 100) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--gold-light)';
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

});
