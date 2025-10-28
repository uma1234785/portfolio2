// ========== Enhanced Smooth Section Transitions ==========
function initSectionTransitions() {
  const sections = document.querySelectorAll('section[id]');
  
  // Set up Intersection Observer for sections
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        
        // Stagger animation for child elements
        const animatedChildren = entry.target.querySelectorAll(
          '.feature-card, .edu-card, .cert-card, .project-card, .skill-panel, .mini-card, .stat-card, .skill-card'
        );
        
        animatedChildren.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('show');
          }, index * 100); // 100ms delay between each child
        });
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '-50px 0px -50px 0px'
  });

  // Observe all sections
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

// ========== Enhanced Navigation with Active States ==========
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Update active nav link
  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Smooth scroll with offset
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Update URL without page reload
          history.pushState(null, null, href);
        }
      }
    });
  });

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Initial call
}

// ========== Enhanced Sticky Header ==========
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

// ========== Initialize Everything ==========
document.addEventListener('DOMContentLoaded', function() {
  // Update copyright year
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Initialize all functionality
  initSectionTransitions();
  initNavigation();
  initStickyHeader();
  
  // Your existing functionality
  initContactForm();
  initStatsCounter();
  initSkillsAnimation();
});

// Keep your existing functions but rename to avoid conflicts
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          alert('✅ Message sent successfully! I will get back to you soon.');
          contactForm.reset();
        } else {
          alert('⚠️ Oops! Something went wrong. Please try again.');
        }
      } catch (error) {
        alert('❌ Network error. Please try again later.');
      }
    });
  }
}

function initStatsCounter() {
  // Your existing stats counter code
  const counters = document.querySelectorAll('.stat-number');
  let hasRun = false;

  function runCounters() {
    if (hasRun) return;
    counters.forEach(el => {
      const target = +el.getAttribute('data-target') || 0;
      const duration = 1100;
      const stepTime = Math.max(Math.floor(duration / Math.max(target,1)), 12);
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        el.textContent = current + (target > 1 ? '+' : '');
        if (current >= target) {
          el.textContent = target + (target > 1 ? '+' : '');
          clearInterval(timer);
        }
      }, stepTime);
    });
    hasRun = true;
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) runCounters();
      });
    }, { threshold: 0.35 });
    const target = document.querySelector('#stats');
    if (target) io.observe(target);
    else runCounters();
  } else {
    runCounters();
  }
}

function initSkillsAnimation() {
  // Your existing skills animation code
  const section = document.querySelector('#skills');
  if (!section) return;

  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // ... rest of your skills animation code
}


// ========== Fade-in Animation on Scroll ==========
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.feature-card, .edu-card, .cert-card, .project-card, .contact-section, .about-section')
  .forEach(el => observer.observe(el));

  // Stats counter - simple, runs when section is visible
(function () {
  const counters = document.querySelectorAll('.stat-number');
  let hasRun = false;

  function runCounters() {
    if (hasRun) return;
    counters.forEach(el => {
      const target = +el.getAttribute('data-target') || 0;
      const duration = 1100;
      const stepTime = Math.max(Math.floor(duration / Math.max(target,1)), 12);
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        el.textContent = current + (target > 1 ? '+' : '');
        if (current >= target) {
          el.textContent = target + (target > 1 ? '+' : '');
          clearInterval(timer);
        }
      }, stepTime);
    });
    hasRun = true;
  }

  // IntersectionObserver to trigger when visible
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) runCounters();
      });
    }, { threshold: 0.35 });
    const target = document.querySelector('#stats');
    if (target) io.observe(target);
    else runCounters();
  } else {
    // fallback
    runCounters();
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('#skills');
  if (!section) return;

  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Setup: store target widths and zero them for animation
  const fills = [...section.querySelectorAll('.skill-fill')].map(fill => {
    // read current inline width (e.g., "75%")
    const target = (fill.getAttribute('style') || '').match(/width:\s*([\d.]+)%/i);
    const pct = target ? parseFloat(target[1]) : 0;
    // stash in dataset
    fill.dataset.progress = pct;
    // zero it for the initial state
    if (!prefersReduce) fill.style.width = '0%';
    return fill;
  });

  // Percentage labels (e.g., "75%")
  const counters = [...section.querySelectorAll('.skill-row .skill-value')].map(el => {
    const targetVal = parseInt(el.textContent.replace(/[^\d]/g, ''), 10) || 0;
    el.dataset.target = targetVal;
    if (!prefersReduce) el.textContent = '0%';
    return el;
  });

  // Items to reveal
  const revealTargets = section.querySelectorAll('.skill-panel, .mini-card');

  // Simple counter animation
  function animateCount(el, to, duration = 900) {
    if (prefersReduce) { el.textContent = to + '%'; return; }
    const start = performance.now();
    const from = 0;
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; // easeInOutQuad
      const val = Math.round(from + (to - from) * eased);
      el.textContent = val + '%';
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Animate bars to their target widths
  function animateBars() {
    fills.forEach(fill => {
      const to = parseFloat(fill.dataset.progress) || 0;
      // ensure transition is enabled
      fill.style.transition = prefersReduce ? 'none' : 'width 800ms ease';
      fill.style.width = to + '%';
    });
    counters.forEach(el => animateCount(el, parseInt(el.dataset.target || '0', 10)));
  }

  // Intersection observers
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); // pair with your .show CSS if you want
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealTargets.forEach(el => revealObserver.observe(el));

  const onceBars = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateBars();
        onceBars.disconnect(); // run once per page view
      }
    });
  }, { threshold: 0.35 });

  onceBars.observe(section);

  // Fallback: if IntersectionObserver unsupported
  if (!('IntersectionObserver' in window)) {
    animateBars();
    revealTargets.forEach(el => el.classList.add('show'));
  }
});
// ========== Enhanced Left-to-Right Section Transitions ==========
function initSectionTransitions() {
  const sections = document.querySelectorAll('section[id]');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        
        // Animate all card elements within this section
        const animatedChildren = entry.target.querySelectorAll(
          '.feature-card, .edu-card, .cert-card, .project-card, .skill-panel, .mini-card, .stat-card, .skill-card'
        );
        
        // Use CSS delays instead of JavaScript timeouts for better performance
        animatedChildren.forEach((child, index) => {
          child.style.transitionDelay = `${(index * 0.1) + 0.1}s`;
        });
      } else {
        // Reset animations when section leaves viewport (optional)
        // entry.target.classList.remove('show');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '-50px 0px -50px 0px'
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

// ========== Initialize Everything ==========
document.addEventListener('DOMContentLoaded', function() {
  // Update copyright year
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Initialize all functionality
  initSectionTransitions();
  initNavigation();
  initStickyHeader();
  
  // Your existing functionality
  initContactForm();
  initStatsCounter();
  initSkillsAnimation();
});

// Keep your existing navigation, sticky header, and other functions...
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          history.pushState(null, null, href);
        }
      }
    });
  });

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
}

function initStickyHeader() {
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

// Your existing contactForm, statsCounter, and skillsAnimation functions remain the same...



