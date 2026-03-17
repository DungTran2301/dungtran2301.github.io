// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Staggered scroll reveal animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Staggered children animation if applicable
            const children = entry.target.querySelectorAll('.stagger');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('visible');
                }, index * 200);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section, .project-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Dynamically adding reveal styles for cleaner HTML
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Example of dynamic content or interaction
const namePlaceholder = document.getElementById('name-placeholder');
if (namePlaceholder) {
    namePlaceholder.addEventListener('click', () => {
        const colors = ['#38bdf8', '#818cf8', '#2dd4bf'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        namePlaceholder.style.transition = 'color 0.5s ease';
        namePlaceholder.style.color = randomColor;
    });
}
