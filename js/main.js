/**
 * Main Application Logic & Interactivity
 * Muhammad Firly - Personal Portfolio
 */

function initApp() {
  initSplashScreen();
  initTypingEffect();
  initProjectFilters();
  initLightbox();
  initCertDetailModal();
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

  // Snappy display duration (400ms) so user is never blocked
  setTimeout(hideSplash, 400);

/* ==========================================================================
   9. Certification Knowledge & Detail Modal System
   ========================================================================== */
const certKnowledgeData = {
  ai: {
    id: 'ai',
    title: 'Belajar Dasar AI (Artificial Intelligence)',
    issuer: 'Dicoding Academy',
    badge: 'AI & Machine Learning Specialist',
    verifiedId: 'DICODING-AI-FOUNDATION',
    imgSrc: 'gambar-sertifikasi/Sertifikat_Belajar_Dasar_Ai.png',
    whatIs: 'Artificial Intelligence (Kecerdasan Buatan) adalah cabang ilmu komputer yang berfokus pada perancangan sistem dan algoritma cerdas yang mampu meniru atau melampaui kapabilitas kognitif manusia—seperti kemampuan belajar dari data, bernalar, mengenali pola visual/suara, memahami bahasa, hingga mengambil keputusan otonom.',
    keyTopics: [
      'Konsep Dasar AI: Perbedaan Artificial Intelligence, Machine Learning, dan Deep Learning.',
      'Machine Learning Workflow: Supervised Learning, Unsupervised Learning, & Reinforcement Learning.',
      'Deep Learning & Neural Networks: Fondasi arsitektur jaringan saraf tiruan (ANN) dan pemrosesan bobot (weights/biases).',
      'Computer Vision: Pengolahan citra digital, deteksi tepi, ekstraksi fitur, dan klasifikasi objek.',
      'Natural Language Processing (NLP): Pemrosesan bahasa manusia, tokenisasi, analisis sentimen, dan pemodelan sekuens.',
      'Generative AI & LLM: Cara kerja transformer, prompt engineering, dan pemanfaatan generative model modern.',
      'Etika & Tata Kelola AI: Prinsip keadilan (fairness), transparansi algoritma, privasi data, dan bias pencegahan.'
    ],
    projectApplication: 'Pengetahuan AI diintegrasikan dalam analisis data sensor IoT untuk mendeteksi pola pergerakan lalu lintas, anomali aliran kendaraan, serta permodelan prediktif klasifikasi kepadatan jalan secara otomatis.',
    skillsGained: ['Machine Learning Basics', 'Neural Network Concepts', 'Computer Vision Basics', 'NLP Fundamentals', 'Prompt Engineering', 'AI Ethics & Governance']
  },
  datascience: {
    id: 'datascience',
    title: 'Belajar Dasar Data Science',
    issuer: 'Dicoding Academy',
    badge: 'Data Science & Analytics',
    verifiedId: 'DICODING-DATA-SCIENCE-CERT',
    imgSrc: 'gambar-sertifikasi/Belajar_Dasar_Data_Science.png',
    whatIs: 'Data Science adalah disiplin ilmu interdisipliner yang menggabungkan metode ilmiah, algoritma komputasi, analisis statistika, dan pemahaman domain bisnis untuk mengekstraksi wawasan (actionable insights), mengenali tren tersembunyi, dan memvalidasi hipotesis dari data berukuran besar.',
    keyTopics: [
      'Metodologi Data Science: Siklus hidup analisis data berbasis standar industri (CRISP-DM).',
      'Data Wrangling: Teknik pengumpulan, pembersihan missing values, penanganan duplikasi, dan standardisasi format data.',
      'Exploratory Data Analysis (EDA): Eksplorasi statistik deskriptif, korelasi antar variabel, analisis kuartil, dan deteksi outlier.',
      'Statistika Terapan: Mean, median, standar deviasi, distribusi probabilitas, dan uji signifikansi data.',
      'Feature Preprocessing: Normalisasi data numerik, encoding variabel kategorikal, dan rekayasa fitur (feature engineering).',
      'Penerjemahan Insight: Mengubah hasil komputasi numerik menjadi rekomendasi strategis pemecahan masalah nyata.'
    ],
    projectApplication: 'Diterapkan secara langsung dalam mengolah puluhan ribu log data telemetri kecepatan dan volume kendaraan hasil pengujian di Jalan Mayor Madmuin Hasibuan, menghasilkan pemetaan titik penempatan media iklan yang presisi.',
    skillsGained: ['CRISP-DM Methodology', 'Data Wrangling & Cleaning', 'Exploratory Data Analysis (EDA)', 'Statistical Thinking', 'Feature Preparation', 'Business Insight Extraction']
  },
  python: {
    id: 'python',
    title: 'Belajar Dasar Pemrograman Python',
    issuer: 'Dicoding Academy',
    badge: 'Programming & Logic Architecture',
    verifiedId: 'DICODING-PYTHON-CERT',
    imgSrc: 'gambar-sertifikasi/Belajar_Dasar_Python.png',
    whatIs: 'Python adalah bahasa pemrograman tingkat tinggi yang populer di dunia, terkenal dengan sintaksisnya yang elegan, intuitif, dan sangat mudah dibaca. Python merupakan bahasa standar de-facto untuk pengembangan Backend API, automasi sistem IoT, data engineering, serta riset kecerdasan buatan.',
    keyTopics: [
      'Sintaks Dasar & Manajemen Memori: Tipe data primitif (int, float, str, bool) dan dynamic typing Python.',
      'Struktur Data Kompleks: Manipulasi List, Tuple, Set, dan Dictionary dengan time-complexity yang optimal.',
      'Control Flow & Iteration: Percabangan bersarang, perulangan for/while efisien, dan list comprehension.',
      'Modularitas Kode & Fungsi: Function definition, *args & **kwargs, scope variabel, dan lambda expressions.',
      'Object-Oriented Programming (OOP): Perancangan Class, Object, Inheritance, Encapsulation, dan Polymorphism.',
      'Penanganan Kesalahan (Error & Exception Handling): Implementasi blok try-except-finally dan custom exceptions.',
      'Ecosystem & Virtual Environments: Manajemen package menggunakan pip, venv, dan modular library import.'
    ],
    projectApplication: 'Digunakan sebagai tulang punggung (backend listener) untuk menerima sinyal telemetri dari mikrokontroler, parsing data serial, agregasi komputasi real-time, dan komunikasi API server.',
    skillsGained: ['Python 3 Syntax', 'OOP Paradigm', 'Data Structures (Dict/List)', 'Exception Handling', 'Backend Scripting', 'Virtual Environment Management']
  },
  sql: {
    id: 'sql',
    title: 'Belajar Dasar Structured Query Language (SQL)',
    issuer: 'Dicoding Academy',
    badge: 'Database & Relational Systems',
    verifiedId: 'DICODING-SQL-CERT',
    imgSrc: 'gambar-sertifikasi/Belajar_Dasar_Sql.png',
    whatIs: 'SQL (Structured Query Language) adalah bahasa baku industri yang dirancang untuk berinteraksi, memodelkan, mengontrol, dan memanipulasi basis data relasional (RDBMS) dengan menjamin konsistensi data tingkat tinggi (prinsip ACID: Atomicity, Consistency, Isolation, Durability).',
    keyTopics: [
      'Arsitektur Relasional: Pemodelan tabel relasional, Primary Key, Foreign Key, dan integritas referensial.',
      'Data Definition Language (DDL): Pembuatan skema (CREATE TABLE), modifikasi (ALTER), dan penghapusan (DROP).',
      'Data Manipulation Language (DML): Operasi transaksi INSERT, UPDATE, dan DELETE data secara efisien.',
      'Data Query Language (DQL): Filtering lanjutan (WHERE, LIKE, IN, BETWEEN), pengurutan (ORDER BY), dan paging (LIMIT/OFFSET).',
      'Relational Joins: Menggabungkan multi-tabel relasi kompleks menggunakan INNER JOIN, LEFT JOIN, RIGHT JOIN, dan FULL JOIN.',
      'Agregasi & Pengelompokan: Penggunaan fungsi SUM, AVG, COUNT, MIN, MAX bersama klauza GROUP BY dan HAVING.',
      'Subqueries & Normalisasi: Query bersarang (nested query), prinsip normalisasi skema 1NF, 2NF, 3NF, serta optimasi index query.'
    ],
    projectApplication: 'Menjadi fondasi manajemen penyimpanan seluruh log data sensor IoT dan data lalu lintas, memungkinkan pengambilan data historis per jam/hari secara instan untuk dashboard analitik.',
    skillsGained: ['Relational Schema Design', 'Complex SQL Joins', 'Data Aggregation & Grouping', 'Subqueries', 'Database Normalization', 'Query Optimization Basics']
  },
  dataviz: {
    id: 'dataviz',
    title: 'Belajar Dasar Visualisasi Data',
    issuer: 'Dicoding Academy',
    badge: 'Data Storytelling & Visualization',
    verifiedId: 'DICODING-DATAVIZ-CERT',
    imgSrc: 'gambar-sertifikasi/Belajar_Dasar_Visualisasi_Data.png',
    whatIs: 'Visualisasi Data adalah seni dan sains mengubah sekumpulan data numerik dan kategorikal yang abstrak menjadi representasi grafis visual interaktif agar informasi mudah dipahami, tren cepat terdeteksi, dan pola anomali terlihat seketika oleh mata manusia.',
    keyTopics: [
      'Prinsip Persepsi Visual: Hukum Gestalt, pre-attentive visual attributes (posisi, panjang, warna, bentuk).',
      'Katalog & Pemilihan Grafik Tepat: Kapan memilih Bar Chart, Line Chart, Scatter Plot, Heatmap, Box Plot, atau Histogram.',
      'Visual Storytelling: Menyusun alur narasi presentasi data agar menghasilkan keputusan yang tepat bagi stakeholder.',
      'Teori Warna & Aksesibilitas: Penggunaan palet warna bermakna (sequential, diverging, categorical) dan kontras visual yang ergonomis.',
      'Komposisi & Layout Dashboard: Menghindari chart junk, memaksimalkan data-ink ratio, dan merancang tata letak dashboard yang bersih.',
      'Visualisasi Data Waktu Nyata (Time-Series): Representasi data fluktuatif berbasis timestamp secara runut.'
    ],
    projectApplication: 'Diterapkan pada antarmuka visualisasi monitoring telemetri live, menyajikan pergerakan grafik kecepatan kendaraan secara dinamis serta distribusi kepadatan jalan dalam dashboard yang mudah dibaca.',
    skillsGained: ['Visual Perception Principles', 'Chart Taxonomy Selection', 'Visual Storytelling', 'Color Palette & Hierarchy', 'Data-Ink Ratio Optimization', 'Telemetry Dashboard Design']
  },
  cisco: {
    id: 'cisco',
    title: 'IT Essentials: PC Hardware and Software',
    issuer: 'Cisco Networking Academy',
    badge: 'Global Hardware & Systems Credential',
    verifiedId: 'CISCO-ITE-GLOBAL-CRED',
    imgSrc: 'gambar-sertifikasi/ItEssentials.png',
    whatIs: 'Cisco IT Essentials adalah program sertifikasi internasional komprehensif dari Cisco yang memvalidasi kompetensi fundamental perangkat keras komputer, perakitan sirkuit PC, konfigurasi sistem operasi (Windows & Linux), troubleshooting jaringan komputer, serta prosedur keamanan IT profesional.',
    keyTopics: [
      'Arsitektur Hardware Komputer: Motherboard, CPU (Clock & Sockets), RAM, Power Supply Units (PSU), GPU, dan Storage Buses.',
      'Keselamatan Kerja & Perakitan PC: Prosedur anti-statis (ESD Protection), pemasangan komponen aman, dan manajemen termal.',
      'Sistem Operasi (OS): Instalasi, konfigurasi registry, permission sistem berkas, command line interface (CLI), dan disk management.',
      'Troubleshooting Diagnostik: Metode isolasi error perangkat keras, pembacaan kode POST/BIOS/UEFI, dan pengujian kestabilan tegangan catu daya.',
      'Jaringan Komputer Dasar: Model OSI & TCP/IP, pengkabelan ethernet (RJ45), subnetting IP, konfigurasi router, dan gateway.',
      'Keamanan Siber & Pemeliharaan: Manajemen akun hak akses, konfigurasi firewall, backup data berkala, dan malware prevention.'
    ],
    projectApplication: 'Menjadi pondasi utama saat merakit prototipe perangkat keras IoT di laboratorium, memilih catu daya teregulasi, interfacing mikrokontroler dengan aman, serta memastikan kestabilan koneksi jaringan transmisi data.',
    skillsGained: ['PC Hardware Architecture', 'Hardware Troubleshooting & ESD', 'OS Configuration (CLI)', 'TCP/IP Networking Basics', 'Power Supply & Circuit Diagnostics', 'IT Security Fundamentals']
  }
};

function initCertDetailModal() {
  const modal = document.getElementById('cert-detail-modal');
  if (!modal) return;

  const modalTitle = document.getElementById('cert-modal-title');
  const modalIssuer = document.getElementById('cert-modal-issuer');
  const modalBadge = document.getElementById('cert-modal-badge');
  const modalWhatIs = document.getElementById('cert-modal-whatis');
  const modalTopics = document.getElementById('cert-modal-topics');
  const modalApp = document.getElementById('cert-modal-app');
  const modalSkills = document.getElementById('cert-modal-skills');
  const modalClose = document.getElementById('cert-modal-close');
  const modalCloseBtn = document.getElementById('cert-modal-close-btn');
  const modalViewDocBtn = document.getElementById('cert-modal-view-doc');

  let activeCertData = null;

  function openCertModal(certId) {
    const data = certKnowledgeData[certId];
    if (!data) return;

    activeCertData = data;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalIssuer) modalIssuer.textContent = data.issuer;
    if (modalBadge) modalBadge.textContent = data.badge;
    if (modalWhatIs) modalWhatIs.textContent = data.whatIs;
    if (modalApp) modalApp.textContent = data.projectApplication;

    // Render topics
    if (modalTopics) {
      modalTopics.innerHTML = '';
      data.keyTopics.forEach(topic => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2 text-xs sm:text-sm text-slate-300';
        li.innerHTML = `
          <span class="material-symbols-outlined text-[16px] text-neon-accent shrink-0 mt-0.5">check_circle</span>
          <span>${topic}</span>
        `;
        modalTopics.appendChild(li);
      });
    }

    // Render skills
    if (modalSkills) {
      modalSkills.innerHTML = '';
      data.skillsGained.forEach(skill => {
        const pill = document.createElement('span');
        pill.className = 'px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-glass-border text-neon-accent';
        pill.textContent = skill;
        modalSkills.appendChild(pill);
      });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Bind trigger buttons
  document.querySelectorAll('[data-open-cert]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certId = btn.getAttribute('data-open-cert');
      openCertModal(certId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeCertModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCertModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('cert-modal-backdrop')) {
      closeCertModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeCertModal();
    }
  });

  // Switch to certificate document preview in Lightbox
  if (modalViewDocBtn) {
    modalViewDocBtn.addEventListener('click', () => {
      if (!activeCertData) return;
      const targetImgSrc = activeCertData.imgSrc;
      closeCertModal();
      
      // Find corresponding lightbox trigger and click it
      setTimeout(() => {
        const targetTrigger = document.querySelector(`[data-lightbox][data-img-src*="${targetImgSrc.split('/').pop()}"]`);
        if (targetTrigger) {
          targetTrigger.click();
        } else {
          // Fallback: open lightbox directly
          const lightboxModal = document.getElementById('lightbox-modal');
          const lightboxImg = document.getElementById('lightbox-img');
          const lightboxTitle = document.getElementById('lightbox-title');
          const lightboxCategory = document.getElementById('lightbox-category');
          const lightboxDesc = document.getElementById('lightbox-desc');
          
          if (lightboxModal && lightboxImg) {
            lightboxImg.src = activeCertData.imgSrc;
            lightboxTitle.textContent = activeCertData.title;
            lightboxCategory.textContent = activeCertData.issuer;
            lightboxDesc.textContent = activeCertData.whatIs;
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        }
      }, 150);
    });
  }
}


