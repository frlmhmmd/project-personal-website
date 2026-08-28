/**
 * Main Application Logic & Interactivity Hub
 * Muhammad Firly - Personal Portfolio
 * Royal Navy & Pure White Aesthetic + Multi-Language & Interactive Terminal Playground
 */

function initApp() {
  initSplashScreen();
  initScrollProgress();
  initLanguageSwitcher();
  initMusicPlayer();
  initSecretleePlayground();
  initBackToTop();
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
   0. Scroll Progress Bar at the Top Edge
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   1. Multi-Language (ID / EN) Dynamic Translation Switcher
   ========================================================================== */
const I18N = {
  currentLang: localStorage.getItem('mf_portfolio_lang') || 'id',

  dict: {
    id: {
      navHome: 'Home',
      navAbout: 'About',
      navSkills: 'Skills',
      navProjects: 'Projects',
      navMedia: 'Media',
      navCerts: 'Certifications',
      navContact: 'Contact',
      openToWork: 'Open to Work',
      heroSubtitle: 'Backend • IoT Engineering • Data Science',
      heroLead: 'Menghubungkan dunia sistem hardware, embedded devices, dan backend modern berkecepatan tinggi dengan analitik data berbasis Python, SQL, dan kecerdasan buatan.',
      btnExplore: 'Explore Projects',
      btnDownloadCv: 'Download CV (ATS)',
      btnCerts: 'Certifications',
      btnContact: 'Get in Touch',
      aboutBadge: 'About Me',
      aboutHeading: 'Passionate In Building <span class="underline decoration-white/40">End-to-End Solutions</span>',
      aboutDesc1: 'Halo! Saya <strong>Muhammad Firly</strong>, seorang pengembang yang memiliki ketertarikan mendalam dalam integrasi teknologi <strong>Backend Development</strong>, <strong>Internet of Things (IoT) Hardware</strong>, dan <strong>Data Science & AI</strong>.',
      aboutDesc2: 'Saya terbiasa merancang arsitektur sistem dari dasar: mulai dari pemilihan komponen sensor dan modul mikrokontroler, perakitan sirkuit prototipe, pengiriman telemetri data real-time, hingga pengolahan basis data SQL dan visualisasi analitik untuk memecahkan masalah nyata.',
      projectsHeading: 'Featured <span class="underline decoration-white/40">Projects & Hardware</span>',
      projectsSubtitle: 'Dokumentasi perangkat lunak keamanan siber, prototipe perangkat keras IoT, dan dashboard telemetri monitoring.',
      mediaHeading: 'Featured In <span class="underline decoration-white/40">Radar Bekasi</span>',
      mediaSubtitle: 'Dokumentasi liputan media cetak dan portal berita digital resmi atas inovasi penelitian tugas akhir perangkat sistem IoT di lapangan.',
      certsHeading: 'Official <span class="underline decoration-white/40">Certifications & Knowledge</span>',
      contactHeading: "Let's Build Something <span class=\"underline decoration-white/40\">Extraordinary</span>",
      contactSubtitle: 'Terbuka untuk kolaborasi proyek, diskusi teknis sistem backend & IoT, maupun peluang karir.',
      toastLangSwitched: 'Bahasa diubah ke Bahasa Indonesia'
    },
    en: {
      navHome: 'Home',
      navAbout: 'About',
      navSkills: 'Skills',
      navProjects: 'Projects',
      navMedia: 'Media',
      navCerts: 'Certifications',
      navContact: 'Contact',
      openToWork: 'Available for Hire',
      heroSubtitle: 'Backend • IoT Systems • Data Science & AI',
      heroLead: 'Bridging high-performance backend architectures, microcontroller hardware telemetry, and intelligent data pipelines using Python, Go, SQL, and Machine Learning.',
      btnExplore: 'Explore Works',
      btnDownloadCv: 'Download Resume (ATS)',
      btnCerts: 'Credentials',
      btnContact: 'Contact Me',
      aboutBadge: 'About Profile',
      aboutHeading: 'Passionate In Engineering <span class="underline decoration-white/40">End-to-End Systems</span>',
      aboutDesc1: "Hello! I'm <strong>Muhammad Firly</strong>, an engineer focused on <strong>High-Performance Backend</strong>, <strong>IoT Hardware Prototyping</strong>, and <strong>Data Science & AI Analytics</strong>.",
      aboutDesc2: 'Experienced in end-to-end system design: from microcontroller circuit assembly and telemetry protocol design to database schema modeling and automated security tooling.',
      projectsHeading: 'Featured <span class="underline decoration-white/40">Projects & Hardware</span>',
      projectsSubtitle: 'Interactive security tooling, IoT microcontroller prototypes, and real-time field telemetry validation.',
      mediaHeading: 'Press Recognition in <span class="underline decoration-white/40">Radar Bekasi</span>',
      mediaSubtitle: 'Official press feature covering field testing of smart traffic telemetry systems for municipal road research.',
      certsHeading: 'Verified <span class="underline decoration-white/40">Accreditations & Certificates</span>',
      contactHeading: "Let's Build Something <span class=\"underline decoration-white/40\">Remarkable</span>",
      contactSubtitle: 'Open for high-impact backend engineering, IoT development opportunities, and technical collaboration.',
      toastLangSwitched: 'Language switched to English'
    }
  },

  apply(lang) {
    this.currentLang = lang;
    localStorage.setItem('mf_portfolio_lang', lang);
    const d = this.dict[lang];

    // Update Language Button Text
    const langBtns = document.querySelectorAll('.lang-btn-text');
    langBtns.forEach(btn => {
      btn.textContent = lang === 'id' ? 'ID' : 'EN';
    });

    // Update text elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (d[key]) {
        el.innerHTML = d[key];
      }
    });

    // Update typing effect language roles
    initTypingEffect(lang);
  },

  toggle() {
    const nextLang = this.currentLang === 'id' ? 'en' : 'id';
    this.apply(nextLang);
    showToast(this.dict[nextLang].toastLangSwitched, 'success');
  }
};

function initLanguageSwitcher() {
  const switchBtns = document.querySelectorAll('.btn-lang-toggle');
  switchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      I18N.toggle();
    });
  });

  I18N.apply(I18N.currentLang);
}

/* ==========================================================================
   2. Ambient Background Music Player & Interactive Control Popover
   ========================================================================== */
const MusicPlayer = {
  playlist: [
    {
      title: 'Egosentris',
      artist: 'alkateri',
      src: 'audio/alkateri - Egosentris.mp3'
    },
    {
      title: 'For All the Dreams That Wings Could Fly',
      artist: 'the milo',
      src: 'audio/the milo - For All the Dreams That Wings Could Fly.mp3'
    },
    {
      title: 'Esok',
      artist: 'alkateri',
      src: 'audio/alkateri - Esok.mp3'
    }
  ],
  currentIndex: 0,
  audio: null,
  isPlaying: false,
  targetVolume: 0.40,
  fadeInterval: null,

  init() {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.loadTrack(0);

    this.audio.addEventListener('ended', () => {
      this.next();
    });

    this.bindControls();
    this.setupAutoplayTriggers();
  },

  loadTrack(index) {
    this.currentIndex = (index + this.playlist.length) % this.playlist.length;
    const track = this.playlist[this.currentIndex];
    this.audio.src = encodeURI(track.src);
    this.audio.volume = 0;
    this.updateTrackInfo();
  },

  updateTrackInfo() {
    const track = this.playlist[this.currentIndex];
    const titleEl = document.getElementById('player-track-title');
    const artistEl = document.getElementById('player-track-artist');
    const counterEl = document.getElementById('music-track-counter');

    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist;
    if (counterEl) counterEl.textContent = `${this.currentIndex + 1} of ${this.playlist.length}`;
  },

  play() {
    if (!this.audio) return;
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        this.fadeIn();
        this.updateUI(true);
      }).catch(() => {
        this.isPlaying = false;
        this.updateUI(false);
      });
    }
  },

  pause() {
    if (!this.audio) return;
    this.fadeOut(() => {
      this.audio.pause();
      this.isPlaying = false;
      this.updateUI(false);
    });
  },

  toggle() {
    if (this.isPlaying) {
      this.pause();
      showToast('Musik Latar Dijeda', 'info');
    } else {
      this.play();
      showToast('Memutar Musik Latar', 'info');
    }
  },

  next() {
    this.fadeOut(() => {
      this.loadTrack(this.currentIndex + 1);
      this.play();
      const track = this.playlist[this.currentIndex];
      showToast(`Memutar: ${track.artist} - ${track.title}`, 'info');
    }, 400);
  },

  prev() {
    this.fadeOut(() => {
      this.loadTrack(this.currentIndex - 1);
      this.play();
      const track = this.playlist[this.currentIndex];
      showToast(`Memutar: ${track.artist} - ${track.title}`, 'info');
    }, 400);
  },

  fadeIn(duration = 1400) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    this.audio.volume = 0;
    const step = 0.02;
    const intervalTime = Math.max(20, duration / (this.targetVolume / step));

    this.fadeInterval = setInterval(() => {
      if (this.audio.volume + step < this.targetVolume) {
        this.audio.volume += step;
      } else {
        this.audio.volume = this.targetVolume;
        clearInterval(this.fadeInterval);
      }
    }, intervalTime);
  },

  fadeOut(callback, duration = 500) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    const step = 0.04;
    const intervalTime = Math.max(20, duration / (this.audio.volume / step || 10));

    this.fadeInterval = setInterval(() => {
      if (this.audio.volume - step > 0) {
        this.audio.volume -= step;
      } else {
        this.audio.volume = 0;
        clearInterval(this.fadeInterval);
        if (callback) callback();
      }
    }, intervalTime);
  },

  updateUI(playing) {
    const eqEls = document.querySelectorAll('.music-equalizer');
    const statusTexts = document.querySelectorAll('#music-status-text, #mobile-music-text');
    const playIcon = document.getElementById('player-play-icon');

    eqEls.forEach(eq => {
      if (playing) {
        eq.classList.add('playing');
      } else {
        eq.classList.remove('playing');
      }
    });

    statusTexts.forEach(txt => {
      if (txt.id === 'music-status-text') {
        txt.textContent = playing ? 'BGM: ON' : 'BGM: OFF';
      } else {
        txt.textContent = playing ? 'Musik Latar: ON' : 'Musik Latar: OFF';
      }
    });

    if (playIcon) {
      playIcon.textContent = playing ? 'pause' : 'play_arrow';
    }
  },

  setupAutoplayTriggers() {
    this.play();

    const handleFirstInteraction = () => {
      if (!this.isPlaying) {
        this.play();
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
    document.addEventListener('scroll', handleFirstInteraction, { once: true, passive: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });
  },

  bindControls() {
    const musicBtn = document.getElementById('music-toggle-btn');
    const musicPopover = document.getElementById('music-popover');
    const playBtn = document.getElementById('player-btn-play');
    const nextBtn = document.getElementById('player-btn-next');
    const prevBtn = document.getElementById('player-btn-prev');
    const mobileQuickBtn = document.getElementById('mobile-quick-music-btn');
    const mobileDrawerBtn = document.getElementById('mobile-music-toggle-btn');

    if (musicBtn && musicPopover) {
      musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        musicPopover.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!musicPopover.contains(e.target) && !musicBtn.contains(e.target)) {
          musicPopover.classList.add('hidden');
        }
      });
    }

    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev();
      });
    }

    if (mobileQuickBtn) {
      mobileQuickBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    if (mobileDrawerBtn) {
      mobileDrawerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }
  }
};

function initMusicPlayer() {
  MusicPlayer.init();
}

/* ==========================================================================
   3. Interactive Secretlee Terminal Playground Engine
   ========================================================================== */
function initSecretleePlayground() {
  const termOutput = document.getElementById('term-interactive-output');
  const termInput = document.getElementById('term-input');
  const chipBtns = document.querySelectorAll('.terminal-chip-btn');

  if (!termOutput) return;

  function appendLog(lineHtml) {
    const p = document.createElement('div');
    p.innerHTML = lineHtml;
    termOutput.appendChild(p);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function handleCommand(cmd) {
    const raw = cmd.trim();
    if (!raw) return;

    appendLog(`<span class="text-white font-bold">$ ${raw}</span>`);
    const c = raw.toLowerCase();

    if (c === 'help') {
      appendLog(`<span class="text-slate-300">Available commands:</span>
  <span class="text-white">scan</span>     - Run automated passive & active security audit
  <span class="text-white">proxy</span>    - Start dynamic TLS MITM intercepting proxy on :8080
  <span class="text-white">repeater</span> - Replay HTTP payload with modified headers
  <span class="text-white">jwt</span>      - Decode and inspect sample JWT token structure
  <span class="text-white">stats</span>    - View runtime metrics (Go routines, memory, throughput)
  <span class="text-white">clear</span>    - Clear terminal buffer
  <span class="text-white">about</span>    - View Secretlee author and license info`);
    } else if (c === 'scan' || c.startsWith('scan')) {
      appendLog(`<span class="text-slate-400">> Initializing Secretlee Passive Security Scanner...</span>`);
      setTimeout(() => {
        appendLog(`<span class="text-white">✓ [AUDIT-PASS] CORS Misconfiguration Check: SECURE</span>`);
      }, 200);
      setTimeout(() => {
        appendLog(`<span class="text-white">✓ [AUDIT-PASS] Missing Security Headers (HSTS, CSP): VERIFIED</span>`);
      }, 400);
      setTimeout(() => {
        appendLog(`<span class="text-white font-bold">★ Scan Finished: 0 Critical, 0 High Vulnerabilities Found.</span>`);
      }, 600);
    } else if (c === 'proxy' || c.startsWith('proxy') || c === 'start') {
      appendLog(`<span class="text-white">> Secretlee Dynamic TLS Intercepting Proxy listening on 127.0.0.1:8080</span>`);
      appendLog(`<span class="text-slate-300">> Certificate Authority (CA) generated: ~/.secretlee/ca.crt</span>`);
      appendLog(`<span class="text-slate-400">> Reactive Bubble Tea TUI Console Ready. Intercept mode: ON</span>`);
    } else if (c === 'repeater') {
      appendLog(`<span class="text-slate-400">> Sending crafted request to target: GET /api/v1/telemetry/nodes</span>`);
      setTimeout(() => {
        appendLog(`<span class="text-white">< HTTP/2 200 OK (84ms) [Content-Type: application/json]</span>`);
        appendLog(`<span class="text-slate-300">< {"status":"online","esp32_nodes":4,"queue":"active"}</span>`);
      }, 300);
    } else if (c === 'jwt') {
      appendLog(`<span class="text-slate-400">> Header:  {"alg":"HS256","typ":"JWT"}</span>`);
      appendLog(`<span class="text-white">> Payload: {"sub":"firly_admin","role":"engineer","iat":1787934208}</span>`);
      appendLog(`<span class="text-slate-300">> Signature: VALID [HMAC-SHA256 verified]</span>`);
    } else if (c === 'stats') {
      appendLog(`<span class="text-slate-300">> Secretlee Engine Runtime: Go 1.22+ (x86_64)</span>`);
      appendLog(`<span class="text-white">> Goroutines: 12 | Mem Alloc: 6.4 MB | SQLite: In-Memory (Zero-CGO)</span>`);
      appendLog(`<span class="text-slate-400">> Traffic Handled: 1,420 requests (4.8 MB transmitted)</span>`);
    } else if (c === 'clear' || c === 'cls') {
      termOutput.innerHTML = '';
      appendLog(`<span class="text-slate-400">Terminal buffer cleared. Type <span class="text-white font-bold">help</span> to view commands.</span>`);
    } else if (c === 'about') {
      appendLog(`<span class="text-white font-bold">Secretlee v1.0.0</span> - Terminal-Based HTTP(S) Intercepting Proxy`);
      appendLog(`<span class="text-slate-300">Author: Muhammad Firly | GitHub: github.com/frlmhmmd/secretlee</span>`);
      appendLog(`<span class="text-slate-400">Built with pure Go and Bubble Tea framework.</span>`);
    } else {
      appendLog(`<span class="text-slate-400">Command not found: '${raw}'. Type <span class="text-white font-bold">help</span> for a list of commands.</span>`);
    }
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = termInput.value;
        termInput.value = '';
        handleCommand(val);
      }
    });
  }

  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        handleCommand(cmd);
      }
    });
  });
}

/* ==========================================================================
   4. Dynamic Back-to-Top Button
   ========================================================================= */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   5. Dynamic Typing Effect for Hero Title
   ========================================================================= */
let typingTimer = null;
function initTypingEffect(lang = 'id') {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  if (typingTimer) clearTimeout(typingTimer);

  const roles = lang === 'en' ? [
    'Backend & API Architect',
    'Cybersecurity & Network Tooling',
    'IoT & Embedded Systems Engineer',
    'Secretlee (MITM Proxy) Creator',
    'Data Science & AI Specialist',
    'Go & Python Specialist'
  ] : [
    'Backend & API Developer',
    'Cybersecurity & Network Tooling',
    'IoT & Hardware Systems Engineer',
    'Secretlee (MITM Proxy) Creator',
    'Data Science & AI Specialist',
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

    typingTimer = setTimeout(type, delay);
  }

  typingTimer = setTimeout(type, 300);
}

/* ==========================================================================
   6. Project Category Filtering
   ========================================================================= */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-white', 'text-[#080e21]'));
      filterBtns.forEach(b => b.classList.add('glass-card', 'text-on-surface-variant'));
      
      btn.classList.add('active', 'bg-white', 'text-[#080e21]');
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
   7. Universal Lightbox Modal for Certificates & Project Images
   ========================================================================= */
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
   8. Navbar Scroll Spy & Active State
   ========================================================================= */
function initNavbarScrollSpy() {
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('shadow-[0_4px_30px_rgba(0,0,0,0.7)]', 'bg-deep-void/95');
    } else {
      header?.classList.remove('shadow-[0_4px_30px_rgba(0,0,0,0.7)]', 'bg-deep-void/95');
    }

    let currentId = '';
    const scrollPos = window.scrollY + 140;

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
   9. Mobile Navigation Drawer
   ========================================================================= */
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
   10. Contact Form & Handlers
   ========================================================================= */
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
   11. Toast System & Copy Actions
   ========================================================================= */
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
  toast.className = `toast glass-card px-5 py-3 rounded-xl border flex items-center gap-3 text-sm font-medium shadow-2xl ${
    type === 'success'
      ? 'border-white/40 text-white bg-[#080e21]/95'
      : type === 'error'
      ? 'border-red-400/40 text-red-200 bg-[#080e21]/95'
      : 'border-white/30 text-white bg-[#080e21]/95'
  }`;

  const iconName = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
  const iconColor = type === 'success' ? 'text-white' : type === 'error' ? 'text-red-300' : 'text-white';

  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] ${iconColor}">${iconName}</span>
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

function initCvDownload() {
  const cvButtons = document.querySelectorAll('.btn-cv-download');
  cvButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Mengunduh CV Muhammad Firly (Format ATS)...', 'success');
    });
  });
}

/* ==========================================================================
   12. Elegant Splash Screen Handler
   ========================================================================= */
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

initSplashScreen();
