// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic',
});

// ═══════════════ CUSTOM CURSOR ═══════════════
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.style.transform = 'scale(0.7)');
document.addEventListener('mouseup', () => cursor.style.transform = 'scale(1)');

// Cursor grows on interactive elements
document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.opacity = '0.5';
    });
});

// ═══════════════ THEME TOGGLE ═══════════════
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ═══════════════ TYPING EFFECT ═══════════════
const typedElement = document.getElementById('typed-role');
const roles = [
    'Mobile Developer',
    'Flutter Expert',
    'Kotlin Enthusiast',
    'Clean Architecture Advocate',
    'Cross-Platform Builder'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 80;
const deleteSpeed = 40;
const pauseBetween = 2000;

function typeRole() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        typedElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, pauseBetween);
            return;
        }
    } else {
        typedElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeRole, isDeleting ? deleteSpeed : typeSpeed);
}

typeRole();

// ═══════════════ COUNTER ANIMATION ═══════════════
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;

    statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            num.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });

    countersAnimated = true;
}

// Intersection Observer for counters
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );
    observer.observe(statsSection);
}

// ═══════════════ HEADER SCROLL EFFECT ═══════════════
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ═══════════════ ACTIVE NAV HIGHLIGHTING ═══════════════
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);
highlightNav();

// ═══════════════ MOBILE MENU ═══════════════
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-links');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ═══════════════ PROJECT IMAGE ICONS ═══════════════
// Add icon labels to project images
const projectIcons = {
    'project-img-karbon': { icon: '🌿', label: 'KarbonMap' },
    'project-img-nio': { icon: '💎', label: 'Nio Wallet' },
    'project-img-yield': { icon: '📈', label: 'Yield Aggregator' },
    'project-img-smartpos': { icon: '🛒', label: 'Smart-POS' },
};

Object.entries(projectIcons).forEach(([id, { icon, label }]) => {
    const el = document.getElementById(id);
    if (el) {
        el.innerHTML = `
            <div style="position:relative;z-index:1;text-align:center;">
                <div style="font-size:3rem;margin-bottom:0.5rem;">${icon}</div>
                <div style="font-size:0.85rem;color:rgba(255,255,255,0.7);font-weight:500;letter-spacing:1px;text-transform:uppercase;">${label}</div>
            </div>
        `;
    }
});

// ═══════════════ SMOOTH REVEAL ON LOAD ═══════════════
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
