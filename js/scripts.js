// Theme initialization and persistence
(function() {
    const root = document.documentElement;
    const stored = localStorage.getItem('theme');
    if (stored === 'light') root.classList.add('theme-light');
    if (stored === 'dark') root.classList.add('theme-dark');
    document.documentElement.classList.remove('no-js');
})();

function toggleTheme() {
    const root = document.documentElement;
    const nowLight = root.classList.toggle('theme-light');
    if (nowLight) {
        root.classList.remove('theme-dark');
        localStorage.setItem('theme', 'light');
    } else {
        root.classList.add('theme-dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Sidebar functionality
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function toggleSidebar() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    sidebar.setAttribute('aria-hidden', isExpanded);
    
    // Toggle body scroll
    document.body.style.overflow = isExpanded ? '' : 'hidden';
}

function closeSidebar() {
    menuToggle.setAttribute('aria-expanded', 'false');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Back to Top functionality
const backToTopButton = document.getElementById('backToTop');

function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event listeners
menuToggle.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeSidebar);
backToTopButton.addEventListener('click', scrollToTop);

// Close sidebar when clicking on links
sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// Close sidebar with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

// Update active link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', () => {
    updateActiveLink();
    toggleBackToTopButton();
});

// Initialize on page load
window.addEventListener('load', () => {
    updateActiveLink();
    toggleBackToTopButton();
});