// ============================================
// 1. PROGRESS BAR
// ============================================
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// ============================================
// 2. DARK MODE LOGIC (mendukung tombol desktop & mobile sekaligus)
// ============================================
const themeToggles = document.querySelectorAll('#themeToggle, #themeToggleMobile');
const themeIcons = document.querySelectorAll('#themeIcon, #themeIconMobile');

function setThemeIcons(isDark) {
    themeIcons.forEach(icon => {
        icon.classList.toggle('fa-moon', !isDark);
        icon.classList.toggle('fa-sun', isDark);
    });
}

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark');
    setThemeIcons(true);
} else if (currentTheme === 'light') {
    document.documentElement.classList.remove('dark');
    setThemeIcons(false);
}

themeToggles.forEach(btn => {
    btn.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        setThemeIcons(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});

// ============================================
// 3. NAVBAR SCROLL
// ============================================
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
}

// ============================================
// 4. BACK TO TOP
// ============================================
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) backToTopButton.classList.add('visible');
        else backToTopButton.classList.remove('visible');
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// 5. MOBILE MENU
// ============================================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = menuToggle.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
            mobileMenu.style.animation = 'fadeInDown 0.3s ease';
        }
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });
}

// ============================================
// 6. REVEAL ON SCROLL
// ============================================
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => { entry.target.classList.add('in-view'); }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================
// 7. ACTIVE LINK HIGHLIGHT
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
if (sections.length > 0 && navLinks.length > 0) {
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
}

// ============================================
// 8. SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// 9. FORM SPREE HANDLER
// ============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '⏳ Mengirim...';
        button.style.opacity = '0.7';
        button.disabled = true;
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.opacity = '1';
            button.disabled = false;
        }, 3000);
    });
}

// ============================================
// 10. PROJECTS.HTML SPECIFIC LOGIC (Filter, Search & MODAL)
// ============================================
const projectItems = document.querySelectorAll('.project-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');

if (projectItems.length > 0) { 
    // --- Filter Logic ---
    window.filterProjects = function(category, event) {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');
        projectItems.forEach(item => {
            const cats = item.dataset.category.split(' ');
            if (category === 'all' || cats.includes(category)) {
                item.classList.remove('hidden-card');
                item.style.position = 'relative';
            } else {
                item.classList.add('hidden-card');
                item.style.position = 'absolute';
            }
        });
        if (searchInput) searchInput.value = '';
    };

    // --- Modal Logic (Diperbaiki sesuai HTML Anda) ---
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex'; // <-- INI KUNCI PERBAIKANNYA
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function(event) {
        // Hanya menutup jika klik terjadi di area luar (overlay)
        if (event.target.classList.contains('modal-overlay')) {
            const modal = event.currentTarget;
            if (modal) {
                modal.style.display = 'none'; // <-- INI KUNCI PERBAIKANNYA
                document.body.style.overflow = 'auto';
            }
        }
    };

    // Fungsi Khusus Untuk Tombol Silang (X) di Modal
    window.closeModalDirectly = function(event) {
        event.stopPropagation();
        const modalOverlay = event.target.closest('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // --- Close Modal via Keyboard (ESC) ---
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay[style*="display: flex"]');
            if (activeModal) {
                activeModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });

    // --- Search Logic ---
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            projectItems.forEach(item => {
                const title = item.querySelector('h3').innerText.toLowerCase();
                const desc = item.querySelector('p').innerText.toLowerCase();
                
                if (title.includes(val) || desc.includes(val)) {
                    item.classList.remove('hidden-card');
                    item.style.position = 'relative';
                } else {
                    item.classList.add('hidden-card');
                    item.style.position = 'absolute';
                }
            });
            filterBtns.forEach(btn => btn.classList.remove('active'));
        });
    }
}