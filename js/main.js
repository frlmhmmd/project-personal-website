/**
 * Main Application Logic & Interactivity
 * Muhammad Firly - Personal Portfolio
 */

function initApp() {
  initSplashScreen();
  initTypingEffect();
  initProjectFilters();
  initLightbox();
  initNavbarScrollSpy();
  initMobileMenu();
  initContactForm();
  initToast();
  initCopyActions();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* ==========================================================================
   1. Dynamic Typing Effect for Hero Title
   ========================================================================== */
function initTypingEffect() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  const roles = [
    'Backend & API Developer',
    'IoT & Hardware Systems Engineer',
    'Data Science & AI Enthusiast',
    'Python & Embedded Specialist',
    'Database & Telemetry Architect'
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
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || (filterValue === 'iot' && category.includes('iot'))) {
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
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
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
  }

  function showPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    updateLightboxContent();
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

  // Scroll effect on header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('shadow-[0_4px_30px_rgba(0,0,0,0.5)]', 'bg-opacity-90');
    } else {
      header?.classList.remove('shadow-[0_4px_30px_rgba(0,0,0,0.5)]', 'bg-opacity-90');
    }

    // Active link highlighting based on scroll position
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
    } else {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
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

    // Build Mailto link with populated params
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
   8. Elegant Splash Screen Handler
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

  // Snappy display duration (400ms)
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



