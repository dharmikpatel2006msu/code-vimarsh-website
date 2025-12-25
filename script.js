/* ===================================
   SINGLE PAGE NAVIGATION SYSTEM
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all navigation elements
    const navButtons = document.querySelectorAll('.nav-btn');
    const heroButtons = document.querySelectorAll('.hero-btn[data-section]');
    const contentSections = document.querySelectorAll('.content-section');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mainContent = document.getElementById('mainContent');
    
    /* ===================================
       SECTION SWITCHING FUNCTIONALITY
       =================================== */
    
    // Function to show a specific section
    function showSection(sectionId) {
        // Hide all sections first
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav buttons
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show the target section with smooth transition
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            // Small delay to ensure smooth transition
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 50);
        }
        
        // Add active class to corresponding nav button
        const activeNavBtn = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeNavBtn && activeNavBtn.classList.contains('nav-btn')) {
            activeNavBtn.classList.add('active');
        }
        
        // Close mobile sidebar if open
        if (window.innerWidth <= 768) {
            closeMobileSidebar();
        }
        
        // Scroll to top of main content
        mainContent.scrollTop = 0;
    }
    
    /* ===================================
       EVENT LISTENERS FOR NAVIGATION
       =================================== */
    
    // Sidebar navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Hero section buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    /* ===================================
       MOBILE SIDEBAR FUNCTIONALITY
       =================================== */
    
    // Function to open mobile sidebar
    function openMobileSidebar() {
        sidebar.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate hamburger to X
        sidebarToggle.classList.add('active');
    }
    
    // Function to close mobile sidebar
    function closeMobileSidebar() {
        sidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Animate X back to hamburger
        sidebarToggle.classList.remove('active');
    }
    
    // Sidebar toggle button
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            if (sidebar.classList.contains('active')) {
                closeMobileSidebar();
            } else {
                openMobileSidebar();
            }
        });
    }
    
    // Mobile overlay click to close sidebar
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileSidebar);
    }
    
    // Close sidebar on window resize if mobile breakpoint is exceeded
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileSidebar();
        }
    });
    
    /* ===================================
       KEYBOARD NAVIGATION SUPPORT
       =================================== */
    
    // Add keyboard support for navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile sidebar
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMobileSidebar();
        }
        
        // Number keys 1-5 for quick navigation
        const keyMap = {
            '1': 'home',
            '2': 'about',
            '3': 'events',
            '4': 'team',
            '5': 'resources'
        };
        
        if (keyMap[e.key]) {
            showSection(keyMap[e.key]);
        }
    });
    
    /* ===================================
       SMOOTH ANIMATIONS & TRANSITIONS
       =================================== */
    
    // Add loading animation to sections
    function addSectionLoadingAnimation() {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe content cards for animation
        const contentCards = document.querySelectorAll('.content-card, .feature-item, .event-item, .team-member, .resource-card');
        contentCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Initialize animations
    addSectionLoadingAnimation();
    
    /* ===================================
       ENHANCED USER INTERACTIONS
       =================================== */
    
    // Add hover effects to resource cards
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#2563eb';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(226, 232, 240, 0.8)';
        });
    });
    
    // Add click feedback to buttons
    const allButtons = document.querySelectorAll('button, .hero-btn, .resource-link');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    /* ===================================
       ACCESSIBILITY IMPROVEMENTS
       =================================== */
    
    // Add ARIA labels and roles for better accessibility
    navButtons.forEach((button, index) => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    });
    
    contentSections.forEach((section, index) => {
        section.setAttribute('role', 'tabpanel');
        section.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    });
    
    // Update ARIA attributes when switching sections
    function updateAriaAttributes(activeSection) {
        navButtons.forEach(button => {
            const isActive = button.getAttribute('data-section') === activeSection;
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        
        contentSections.forEach(section => {
            const isActive = section.id === activeSection;
            section.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        });
    }
    
    // Override showSection to include accessibility updates
    const originalShowSection = showSection;
    showSection = function(sectionId) {
        originalShowSection(sectionId);
        updateAriaAttributes(sectionId);
    };
    
    /* ===================================
       INITIALIZATION
       =================================== */
    
    // Ensure home section is active on page load
    showSection('home');
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize page with fade-in effect
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
    
    /* ===================================
       PERFORMANCE OPTIMIZATIONS
       =================================== */
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Handle any resize-specific logic here
            if (window.innerWidth > 768) {
                closeMobileSidebar();
            }
        }, 250);
    });
    
    // Preload images for better performance
    function preloadImages() {
        const images = ['logo.webp', 'member1.jpg'];
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
    
    console.log('Code Vimarsh website initialized successfully! 🚀');
});