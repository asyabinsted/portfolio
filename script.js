// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Theme cycle: light -> dark -> color -> light
const themes = ['light', 'dark', 'color'];
let currentThemeIndex = 0;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
currentThemeIndex = themes.indexOf(savedTheme);
if (currentThemeIndex === -1) currentThemeIndex = 0;

body.setAttribute('data-theme', themes[currentThemeIndex]);
if (themeIcon) {
    updateThemeIcon(themes[currentThemeIndex]);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        if (themeIcon) {
            updateThemeIcon(newTheme);
        }
    });
}

function updateThemeIcon(theme) {
    const iconMap = {
        'light': 'icons/SunMedium.svg',
        'dark': 'icons/Moon-white.svg',
        'color': 'icons/Cloud-blue.svg'
    };
    themeIcon.src = iconMap[theme];
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Navigation function for back button from project pages
function navigateToWork(event) {
    event.preventDefault();
    // Navigate to index page and scroll to work section
    window.location.href = 'index.html#work';
    // Force navigation after a short delay to ensure page loads
    setTimeout(() => {
        if (window.location.hash === '#work') {
            const workSection = document.getElementById('work');
            if (workSection) {
                workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, 100);
}

// Single-page navigation
function showPage(pageId) {
    console.log('showPage called with:', pageId);
    
    // Hide all pages
    document.querySelectorAll('section[id]').forEach(section => {
        console.log('Hiding section:', section.id);
        section.style.display = 'none';
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    console.log('Target page found:', targetPage);
    if (targetPage) {
        targetPage.style.display = 'block';
        console.log('Showing page:', pageId);
    } else {
        console.error('Page not found:', pageId);
    }
    
    // Update active navigation for all pages
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    console.log('Active link found:', activeLink);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update URL hash (except for index page)
    if (pageId !== 'index') {
        window.location.hash = pageId;
    } else {
        // For index page, remove any existing hash
        if (window.location.hash) {
            window.history.replaceState(null, null, window.location.pathname);
        }
    }
}

// Navigation click handlers
        document.querySelectorAll('[data-page]').forEach(link => {
            console.log('Adding click handler to:', link);
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                const href = this.getAttribute('href');
                console.log('Navigation clicked, pageId:', pageId, 'href:', href);
        
        if (pageId === 'index' || href === 'index.html') {
            // For Index, show index page first, then scroll to top
            showPage('index');
            // Use setTimeout to ensure the page is shown before scrolling
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        } else if (pageId === 'work') {
            // For Work, show index page first, then scroll to work section
            showPage('index');
            // Use setTimeout to ensure the page is shown before scrolling
            setTimeout(() => {
                const workSection = document.getElementById('work');
                if (workSection) {
                    workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else if (pageId === 'about') {
            // For About, show about page and scroll to top
            showPage('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // For other pages, use normal page switching
            showPage(pageId);
        }
    });
});

// Handle hash changes (when URL is manually changed)
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash && ['index', 'about', 'work'].includes(hash)) {
        showPage(hash);
    } else {
        showPage('index');
    }
});

// Handle scroll-based navigation highlighting
function updateActiveNavigation() {
    // Only apply scroll-based navigation when we're on the index page
    const currentPage = document.querySelector('section[id]:not([style*="display: none"])');
    if (!currentPage || currentPage.id !== 'index') {
        return;
    }
    
    const workSection = document.getElementById('work');
    const indexSection = document.getElementById('index');
    
    if (!workSection || !indexSection) return;
    
    const scrollPosition = window.scrollY + 100; // Offset for better detection
    
    // Get section positions
    const workTop = workSection.offsetTop;
    const indexTop = indexSection.offsetTop;
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Determine which section is in view
    if (scrollPosition >= workTop) {
        // Work section is in view
        const workLink = document.querySelector('[data-page="work"]');
        if (workLink) workLink.classList.add('active');
    } else {
        // Index section is in view
        const indexLink = document.querySelector('[data-page="index"]');
        if (indexLink) indexLink.classList.add('active');
    }
}

// Add scroll listener
window.addEventListener('scroll', updateActiveNavigation);

// Custom Cursor Functionality
document.addEventListener('DOMContentLoaded', function() {
    const customCursor = document.getElementById('custom-cursor');
    const portfolioCases = document.querySelectorAll('.portfolio-case');
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .learn-more, .contact-link, .contact-link-no-hover');
    
    if (!customCursor) return;
    
    // Global mouse move handler
    document.addEventListener('mousemove', function(e) {
        customCursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    });
    
    // Portfolio cases - show "View project" button
    portfolioCases.forEach(caseElement => {
        caseElement.addEventListener('mouseenter', function() {
            customCursor.classList.add('show');
        });
        
        caseElement.addEventListener('mouseleave', function() {
            customCursor.classList.remove('show');
        });
        
        caseElement.addEventListener('click', function(e) {
            // Check if this is Logic Solutions project
            const projectUrl = this.getAttribute('data-project-url');
            if (projectUrl === 'project-logic-solutions.html') {
                // Show password modal for Logic Solutions
                if (window.showPasswordModal) {
                    window.showPasswordModal();
                }
            } else if (projectUrl) {
                // Navigate directly to other project pages in same tab
                window.location.href = projectUrl;
            }
        });
    });
    
    // Interactive elements - make cursor bigger (but not portfolio cases)
    interactiveElements.forEach(element => {
        // Skip portfolio cases as they have their own handler
        if (element.closest('.portfolio-case')) return;
        
        element.addEventListener('mouseenter', function() {
            customCursor.classList.add('big');
        });
        
        element.addEventListener('mouseleave', function() {
            customCursor.classList.remove('big');
        });
    });
    
    // Hide cursor when mouse leaves the viewport
    document.addEventListener('mouseleave', function() {
        customCursor.classList.remove('show', 'big');
    });
});

// Password Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const passwordModal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    const passwordError = document.getElementById('password-error');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordToggle = document.getElementById('password-toggle');
    const passwordModalClose = document.getElementById('password-modal-close');
    const correctPassword = 'hiremeORregretIT';
    
    if (!passwordModal || !passwordInput || !passwordError || !passwordSubmit) return;
    
    // Show password modal
    function showPasswordModal() {
        passwordModal.style.display = 'flex';
        passwordInput.focus();
        passwordInput.value = '';
        passwordInput.setAttribute('type', 'password');
        passwordError.classList.remove('show');
        passwordInput.classList.remove('error');
        
        // Reset eye icons to closed state
        const closedEye = passwordToggle.querySelector('.eye-closed');
        const openEye = passwordToggle.querySelector('.eye-open');
        closedEye.style.display = 'block';
        openEye.style.display = 'none';
    }
    
    // Hide password modal
    function hidePasswordModal() {
        passwordModal.style.display = 'none';
        passwordInput.value = '';
        passwordError.classList.remove('show');
        passwordInput.classList.remove('error');
    }
    
    // Toggle password visibility
    passwordToggle.addEventListener('click', function() {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        const type = isPassword ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icons
        const closedEye = passwordToggle.querySelector('.eye-closed');
        const openEye = passwordToggle.querySelector('.eye-open');
        
        if (isPassword) {
            // Show password - show open eye, hide closed eye
            closedEye.style.display = 'none';
            openEye.style.display = 'block';
        } else {
            // Hide password - show closed eye, hide open eye
            closedEye.style.display = 'block';
            openEye.style.display = 'none';
        }
    });
    
    // Submit password
    passwordSubmit.addEventListener('click', function() {
        const enteredPassword = passwordInput.value;
        
        if (enteredPassword === correctPassword) {
            hidePasswordModal();
            // Navigate to Logic Solutions project page
            window.location.href = 'project-logic-solutions.html';
        } else {
            passwordError.textContent = 'Wrong key, right designer.';
            passwordError.classList.add('show');
            passwordInput.classList.add('error');
        }
    });
    
    // Handle Enter key
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            passwordSubmit.click();
        }
    });
    
    // Don't remove error state on focus - keep it until password is correct
    // passwordInput.addEventListener('focus', function() {
    //     passwordInput.classList.remove('error');
    //     passwordError.classList.remove('show');
    // });
    
    // Close modal
    passwordModalClose.addEventListener('click', hidePasswordModal);
    passwordModal.addEventListener('click', function(e) {
        // Close when clicking on the overlay (not the modal content)
        if (e.target === passwordModal || e.target.classList.contains('password-modal-overlay')) {
            hidePasswordModal();
        }
    });
    
    // Handle Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && passwordModal.style.display === 'flex') {
            hidePasswordModal();
        }
    });
    
    // Make showPasswordModal globally available
    window.showPasswordModal = showPasswordModal;
});

// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('back-to-top');
    const backToTopContainer = document.getElementById('back-to-top-container');
    
    if (!backToTopBtn || !backToTopContainer) return;
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Function to show/hide back to top button based on current page
    function toggleBackToTopButton() {
        const aboutPage = document.getElementById('about');
        const isAboutPageVisible = aboutPage && aboutPage.style.display !== 'none';
        
        if (isAboutPageVisible) {
            backToTopContainer.classList.add('hide');
        } else {
            backToTopContainer.classList.remove('hide');
        }
    }
    
    // Initial check
    toggleBackToTopButton();
    
    // Listen for page changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                toggleBackToTopButton();
            }
        });
    });
    
    // Observe the about page for style changes
    const aboutPage = document.getElementById('about');
    if (aboutPage) {
        observer.observe(aboutPage, { attributes: true, attributeFilter: ['style'] });
    }
});

// Smooth scrolling for other anchor links
document.querySelectorAll('a[href^="#"]:not([data-page])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Live Time Updates
function updateTime() {
    console.log('updateTime called');
    const now = new Date();
    
    // Tel Aviv (IST - UTC+2, but UTC+3 during DST)
    const tlvTimeString = now.toLocaleTimeString('en-GB', { 
        timeZone: 'Asia/Jerusalem',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const tlvElement = document.getElementById('time-tlv');
    console.log('TLV element found:', tlvElement);
    if (tlvElement) {
        tlvElement.textContent = `IST ${tlvTimeString}`;
        console.log('TLV time updated to:', `IST ${tlvTimeString}`);
    }
    
    // Berlin (CET - UTC+1, but UTC+2 during DST)
    const berTimeString = now.toLocaleTimeString('en-GB', { 
        timeZone: 'Europe/Berlin',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const berElement = document.getElementById('time-ber');
    if (berElement) {
        berElement.textContent = `CET ${berTimeString}`;
    }
    
    // Chiang Mai (ICT - UTC+7)
    const cnxTimeString = now.toLocaleTimeString('en-GB', { 
        timeZone: 'Asia/Bangkok',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const cnxElement = document.getElementById('time-cnx');
    if (cnxElement) {
        cnxElement.textContent = `ICT ${cnxTimeString}`;
    }
}

// Update time when page loads and then every second
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, updating time...');
    updateTime();
    setInterval(updateTime, 1000);
    console.log('Time update interval set');
    
    // Initialize page navigation - check URL hash or default to index
    const hash = window.location.hash.substring(1); // Remove the # symbol
    if (hash && ['index', 'about', 'work'].includes(hash)) {
        showPage(hash);
    } else {
        // No hash or invalid hash - show index page and clean URL
        showPage('index');
        // Clean up URL if there's an unwanted hash
        if (window.location.hash) {
            window.history.replaceState(null, null, window.location.pathname);
        }
    }
});

// Also try immediate execution as fallback
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        updateTime();
        setInterval(updateTime, 1000);
    });
} else {
    // DOM is already loaded
    updateTime();
    setInterval(updateTime, 1000);
}


// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
