/**
 * Main Application Logic & Interactivity
 * Muhammad Firly - Personal Portfolio
 */

function initApp() {
  initSplashScreen();
  initSoundEngine();
  initTypingEffect();
  initProjectFilters();
  initLightbox();
  initNavbarScrollSpy();
  initMobileMenu();
  initContactForm();
  initToast();
  initCopyActions();
  initCvDownload();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* ==========================================================================
   0. Web Audio API - Futuristic Cyber Sound Synthesizer
   ========================================================================== */
const SoundEngine = {
  ctx: null,
  enabled: false,
  initialized: false,

  init() {
    if (this.initialized) return;
    const savedState = localStorage.getItem('firly_portfolio_sfx');
    this.enabled = savedState === 'enabled';
    this.updateUI();
    this.initialized = true;
  },

  getContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  },

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('firly_portfolio_sfx', this.enabled ? 'enabled' : 'disabled');
    this.updateUI();

    if (this.enabled) {
      this.getContext();
      this.playSuccess();
      showToast('Efek Suara Interaktif Diaktifkan (SFX ON)', 'info');
    } else {
      showToast('Efek Suara Dimatikan (SFX OFF)', 'info');
    }
  },

  updateUI() {
    const btn = document.getElementById('sfx-toggle-btn');
    const label = document.getElementById('sfx-label');
    const icon = document.getElementById('sfx-icon');
    if (!btn) return;

    if (this.enabled) {
      btn.classList.add('sfx-active', 'border-emerald-500/50');
      btn.classList.remove('border-glass-border');
      if (label) label.textContent = 'SFX: ON';
      if (icon) {
        icon.textContent = 'volume_up';
        icon.classList.add('text-emerald-400');
        icon.classList.remove('text-slate-400');
      }
    } else {
      btn.classList.remove('sfx-active', 'border-emerald-500/50');
      btn.classList.add('border-glass-border');
      if (label) label.textContent = 'SFX: OFF';
      if (icon) {
        icon.textContent = 'volume_off';
        icon.classList.remove('text-emerald-400');
        icon.classList.add('text-slate-400');
      }
    }
  },

  // High-tech snappy click chirp
  playClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch (e) {
      // Audio context policy fallback
    }
  },

  // Subtle low-volume micro tick for hover
  playHover() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, ctx.currentTime);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch (e) {}
  },

  // Futuristic 2-tone melodic chime for toast / copy / download
  playSuccess() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [587.33, 880]; // D5 -> A5

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.06, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.2);
      });
    } catch (e) {}
  },

  // Sci-fi power-up sweep for Lightbox open
  playModalOpen() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch (e) {}
  },

  // Sci-fi power-down sweep for Lightbox close
  playModalClose() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  }
};

function initSoundEngine() {
  SoundEngine.init();

  const toggleBtn = document.getElementById('sfx-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      SoundEngine.toggle();
    });
  }

  // Attach hover sounds with throttle
  let lastHoverTime = 0;
  const attachSoundListeners = () => {
    const interactiveEls = document.querySelectorAll('button, a, .glass-card-interactive, .filter-btn, [data-lightbox]');
    interactiveEls.forEach(el => {
      if (el.dataset.sfxBound) return;
      el.dataset.sfxBound = 'true';

      el.addEventListener('mouseenter', () => {
        const now = Date.now();
        if (now - lastHoverTime > 75) {
          SoundEngine.playHover();
          lastHoverTime = now;
        }
      }, { passive: true });

      el.addEventListener('click', () => {
        if (el.id !== 'sfx-toggle-btn') {
          SoundEngine.playClick();
        }
      });
    });
  };

  attachSoundListeners();
}

/* ==========================================================================
   1. Dynamic Typing Effect for Hero Title
   ========================================================================== */
function initTypingEffect() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  const roles = [
    'Backend & API Developer',
    'Cybersecurity & Network Tooling',
    'IoT & Hardware Systems Engineer',
    'Secretlee (MITM Proxy) Creator',
    'Data Science & AI Enthusiast',
    'Python & Go Specialist'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseEnd = 2000;
  const pauseStart = 400;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentRole.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = pauseStart;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 500);
}

/* ==========================================================================
   2. Project Category Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active', 'bg-neon-accent', 'text-deep-void'));
      filterBtns.forEach(b => b.classList.add('glass-card', 'text-on-surface-variant'));
      
      btn.classList.add('active', 'bg-neon-accent', 'text-deep-void');
      btn.classList.remove('glass-card', 'text-on-surface-variant');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   3. Universal Lightbox Modal for Certificates & Project Images
   ========================================================================== */
let lightboxItems = [];
let currentLightboxIndex = 0;

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const modalCategory = document.getElementById('lightbox-category');
  const modalDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!modal) return;

  // Gather all clickable preview elements
  const triggers = document.querySelectorAll('[data-lightbox]');
  lightboxItems = Array.from(triggers).map(el => ({
    src: el.getAttribute('data-img-src') || el.querySelector('img')?.src || el.src,
    title: el.getAttribute('data-title') || 'Image Preview',
    category: el.getAttribute('data-category-label') || 'Credential & Project',
    desc: el.getAttribute('data-desc') || ''
  }));

  triggers.forEach((trigger, idx) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(idx);
    });
  });

  function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    SoundEngine.playModalOpen();
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    SoundEngine.playModalClose();
  }

  function updateLightboxContent() {
    if (!lightboxItems[currentLightboxIndex]) return;
    const item = lightboxItems[currentLightboxIndex];
    modalImg.src = item.src;
    modalImg.alt = item.title;
    modalTitle.textContent = item.title;
    modalCategory.textContent = item.category;
    modalDesc.textContent = item.desc;
  }

  function showNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxItems.length;
    updateLightboxContent();
    SoundEngine.playClick();
  }

  function showPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    updateLightboxContent();
    SoundEngine.playClick();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-backdrop')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   4. Navbar Scroll Spy & Header Blur Effect
   ========================================================================== */
function initNavbarScrollSpy() {
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('shadow-[0_4px_30px_rgba(0,0,0,0.5)]', 'bg-opacity-90');
    } else {
      header?.classList.remove('shadow-[0_4px_30px_rgba(0,0,0,0.5)]', 'bg-opacity-90');
    }

    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   5. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileClose = document.getElementById('mobile-drawer-close');

  if (!mobileToggle || !mobileMenu) return;

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('translate-x-0');
    if (isOpen) {
      mobileMenu.classList.remove('translate-x-0');
      mobileMenu.classList.add('translate-x-full');
      document.body.style.overflow = '';
      SoundEngine.playModalClose();
    } else {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
      SoundEngine.playModalOpen();
    }
  }

  mobileToggle.addEventListener('click', toggleMenu);
  if (mobileClose) mobileClose.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-0');
      mobileMenu.classList.add('translate-x-full');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   6. Contact Form & WhatsApp / Mailto Handlers
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Harap lengkapi semua bidang yang wajib diisi!', 'error');
      return;
    }

    const mailtoLink = `mailto:muhammadfirly68@gmail.com?subject=${encodeURIComponent(
      subject || `Pesan dari ${name} (Portfolio Website)`
    )}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`;

    window.open(mailtoLink, '_blank');
    showToast('Membuka aplikasi email... Terima kasih!', 'success');
    contactForm.reset();
  });
}

/* ==========================================================================
   7. Copy-to-Clipboard Actions & Toast System
   ========================================================================== */
function initToast() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast glass-card px-5 py-3 rounded-lg border flex items-center gap-3 text-sm font-medium shadow-xl ${
    type === 'success'
      ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/80'
      : type === 'error'
      ? 'border-red-500/40 text-red-300 bg-red-950/80'
      : 'border-neon-accent/40 text-sky-200 bg-slate-900/90'
  }`;

  const iconName = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';

  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px]">${iconName}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  if (type === 'success' || type === 'info') {
    SoundEngine.playSuccess();
  }

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function initCopyActions() {
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'muhammadfirly68@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email (${email}) berhasil disalin ke clipboard!`, 'success');
      }).catch(() => {
        showToast('Gagal menyalin email', 'error');
      });
    });
  });
}

/* ==========================================================================
   8. Direct ATS CV Download Handler
   ========================================================================== */
function initCvDownload() {
  const cvButtons = document.querySelectorAll('.btn-cv-download');
  cvButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Mengunduh CV Muhammad Firly (Format ATS)...', 'success');
      SoundEngine.playSuccess();
    });
  });
}

/* ==========================================================================
   9. Elegant Splash Screen Handler
   ========================================================================== */
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  let isHidden = false;
  const hideSplash = () => {
    if (isHidden) return;
    isHidden = true;
    splash.classList.add('splash-hidden');
    setTimeout(() => {
      if (splash.parentNode) {
        splash.style.display = 'none';
      }
    }, 450);
  };

  setTimeout(hideSplash, 400);

  if (document.readyState === 'complete') {
    setTimeout(hideSplash, 250);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hideSplash, 250);
    });
  }
}

// Immediate execution so splash starts dismissing right away
initSplashScreen();
