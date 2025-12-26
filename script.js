/* ===================================
   CODE VIMARSH WEBSITE JAVASCRIPT
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /* ===================================
       GLOBAL VARIABLES
       =================================== */
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    /* ===================================
       NAVIGATION FUNCTIONALITY
       =================================== */
    
    // Function to switch between sections with enhanced slide animation
    function showSection(sectionId) {
        // Hide all sections with slide out animation
        contentSections.forEach(section => {
            if (section.classList.contains('active')) {
                section.style.transform = 'translateX(-100px)';
                section.style.opacity = '0';
                setTimeout(() => {
                    section.classList.remove('active');
                }, 200);
            }
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show target section with slide in animation
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            setTimeout(() => {
                targetSection.classList.add('active');
                targetSection.style.transform = 'translateX(0)';
                targetSection.style.opacity = '1';
                
                // Trigger AOS animations for the new section
                triggerAOSAnimations(targetSection);
            }, 300);
        }
        
        // Add active class to corresponding nav link with slide effect
        const activeNavLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
            // Add slide effect to nav link
            activeNavLink.style.transform = 'translateX(8px)';
            setTimeout(() => {
                activeNavLink.style.transform = 'translateX(0)';
            }, 200);
        }
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Update URL hash
        window.location.hash = sectionId;
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Navigation link click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Global function for button navigation
    window.navigateToSection = function(sectionId) {
        showSection(sectionId);
    };
    
    /* ===================================
       MOBILE MENU FUNCTIONALITY
       =================================== */
    
    // Toggle mobile menu with enhanced slide animation
    function toggleMobileMenu() {
        const isActive = sidebar.classList.contains('active');
        
        if (!isActive) {
            // Opening animation
            sidebar.classList.add('active');
            hamburger.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
            
            // Animate menu items
            const menuItems = sidebar.querySelectorAll('.nav-item');
            menuItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-30px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100 + (index * 50));
            });
        } else {
            // Closing animation
            const menuItems = sidebar.querySelectorAll('.nav-item');
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-30px)';
                }, index * 30);
            });
            
            setTimeout(() => {
                sidebar.classList.remove('active');
                hamburger.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
            }, 200);
        }
    }
    
    // Close mobile menu with slide animation
    function closeMobileMenu() {
        if (sidebar.classList.contains('active')) {
            const menuItems = sidebar.querySelectorAll('.nav-item');
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-30px)';
                }, index * 30);
            });
            
            setTimeout(() => {
                sidebar.classList.remove('active');
                hamburger.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
            }, 200);
        }
    }
    
    // Hamburger click handler
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Mobile overlay click handler
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    /* ===================================
       RESPONSIVE HANDLING
       =================================== */
    
    // Handle window resize with improved mobile detection
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const isMobile = window.innerWidth <= 768;
            
            if (!isMobile) {
                // Desktop view - close mobile menu and reset
                closeMobileMenu();
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                
                // Reset any mobile-specific styles
                const menuItems = sidebar.querySelectorAll('.nav-item');
                menuItems.forEach(item => {
                    item.style.opacity = '';
                    item.style.transform = '';
                    item.style.transition = '';
                });
            }
        }, 250);
    });
    
    /* ===================================
       SCROLL ANIMATIONS (AOS)
       =================================== */
    
    // Enhanced AOS (Animate On Scroll) implementation with slide effects
    function initAOS() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, delay);
                }
            });
        }, observerOptions);
        
        // Observe all elements with data-aos attribute
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(element => {
            // Set initial state
            element.style.opacity = '0';
            element.style.transform = 'translateY(60px) scale(0.9)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(element);
        });
    }
    
    // Trigger AOS animations for a specific section
    function triggerAOSAnimations(section) {
        const aosElements = section.querySelectorAll('[data-aos]');
        aosElements.forEach((element, index) => {
            const delay = element.getAttribute('data-aos-delay') || (index * 100);
            setTimeout(() => {
                element.classList.add('aos-animate');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            }, delay);
        });
    }
    
    /* ===================================
       FORM HANDLING
       =================================== */
    
    // Contact form submission
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            }, 2000);
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /* ===================================
       NOTIFICATION SYSTEM
       =================================== */
    
    function showNotification(message, type = 'info', duration = 4000) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Set notification content
        notification.innerHTML = `
            <div class="notification-content">
                <i class="notification-icon fas ${getNotificationIcon(type)}"></i>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease, opacity 0.3s ease;
            max-width: 400px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;
        
        // Set background color based on type
        const colors = {
            success: 'linear-gradient(135deg, #10b981, #059669)',
            error: 'linear-gradient(135deg, #ef4444, #dc2626)',
            warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
            info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
        };
        
        notification.style.background = colors[type] || colors.info;
        
        // Add notification styles
        const notificationStyles = `
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .notification-icon {
                font-size: 18px;
                flex-shrink: 0;
            }
            .notification-message {
                flex: 1;
                line-height: 1.4;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background 0.2s ease;
                flex-shrink: 0;
            }
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
        `;
        
        // Add styles to head if not already added
        if (!document.querySelector('#notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = notificationStyles;
            document.head.appendChild(styleSheet);
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after duration
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }
    
    // Get notification icon based on type
    function getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
    
    /* ===================================
       INTERACTIVE ELEMENTS
       =================================== */
    
    // Add click handlers for interactive elements
    function initInteractiveElements() {
        // Team card interactions with image loading
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach(card => {
            // Handle image loading
            const image = card.querySelector('.team-image');
            const container = card.querySelector('.team-image-container');
            
            if (image && container) {
                image.addEventListener('load', function() {
                    container.classList.add('loaded');
                    this.style.opacity = '1';
                    // Ensure no stretching after load
                    this.style.objectFit = 'cover';
                    this.style.objectPosition = 'center center';
                });
                
                // Handle image error
                image.addEventListener('error', function() {
                    container.classList.add('loaded');
                    this.style.opacity = '0.5';
                    console.warn('Failed to load team image:', this.src);
                });
                
                // If image is already loaded (cached)
                if (image.complete) {
                    container.classList.add('loaded');
                    image.style.opacity = '1';
                    image.style.objectFit = 'cover';
                    image.style.objectPosition = 'center center';
                }
            }
            
            // Hover effects that don't affect image container
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Event card interactions - Updated for new modal system
        const eventCards = document.querySelectorAll('.event-card.enhanced');
        eventCards.forEach(card => {
            // Remove the old click handler since we now use onclick in HTML
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Resource card interactions
        const resourceCards = document.querySelectorAll('.resource-card');
        resourceCards.forEach(card => {
            const exploreBtn = card.querySelector('.btn');
            const resourceTitle = card.querySelector('.resource-title').textContent;
            
            exploreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                handleResourceExplore(resourceTitle);
            });
            
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Forum join button
        const forumBtn = document.querySelector('.forum-cta .btn-primary');
        if (forumBtn) {
            forumBtn.addEventListener('click', function() {
                showNotification('Forum feature coming soon! Stay tuned for updates.', 'info');
            });
        }
        
        // Social links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            // Remove the preventDefault for actual links
            link.addEventListener('click', function(e) {
                // Don't prevent default - let the links work normally
                // Just add some visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
            
            // Add touch feedback for mobile
            link.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            link.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
    
    /* ===================================
       KEYBOARD NAVIGATION
       =================================== */
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
        
        // Number keys for quick navigation
        const keyMap = {
            '1': 'home',
            '2': 'team',
            '3': 'events',
            '4': 'gallery',
            '5': 'forum',
            '6': 'contact'
        };
        
        if (keyMap[e.key] && !e.ctrlKey && !e.altKey) {
            showSection(keyMap[e.key]);
        }
    });
    
    /* ===================================
       URL HASH HANDLING
       =================================== */
    
    // Handle initial hash on page load
    function handleInitialHash() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        } else {
            showSection('home');
        }
    }
    
    // Handle hash changes
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        }
    });
    
    /* ===================================
       PERFORMANCE OPTIMIZATIONS
       =================================== */
    
    // Lazy loading for images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            images.forEach(img => {
                img.classList.add('loading');
                imageObserver.observe(img);
            });
        }
    }
    
    // Debounce utility function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /* ===================================
       THEME AND VISUAL EFFECTS
       =================================== */
    
    // Add dynamic background effects
    function initBackgroundEffects() {
        // Create floating particles
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 107, 53, 0.3);
                border-radius: 50%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
    }
    
    /* ===================================
       INITIALIZATION
       =================================== */
    
    // Initialize all features with enhanced slide animations
    function initWebsite() {
        console.log('🚀 Code Vimarsh website initializing...');
        
        // Add page load slide animation
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        document.body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Initialize features
        initAOS();
        initInteractiveElements();
        initLazyLoading();
        initBackgroundEffects();
        handleInitialHash();
        
        // Initialize Discord form validation as backup
        setTimeout(() => {
            if (document.getElementById('discordRegistrationForm')) {
                console.log('Backup Discord form initialization...');
                initDiscordFormValidation();
            }
        }, 1000);
        
        // Fix team images after a short delay
        setTimeout(() => {
            fixTeamImages();
        }, 500);
        
        // Slide in page content
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 100);
        
        // Animate sidebar on load
        setTimeout(() => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.style.transform = 'translateX(0)';
                sidebar.style.opacity = '1';
            }
        }, 300);
        
        // Animate navigation items
        setTimeout(() => {
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 100);
            });
        }, 500);
        
        // Show welcome message with slide effect
        setTimeout(() => {
            showNotification('Welcome to Code Vimarsh! 🚀', 'success', 3000);
        }, 1500);
        
        console.log('✅ Code Vimarsh website initialized successfully!');
    }
    
    // Start the website
    initWebsite();
    
    /* ===================================
       UTILITY FUNCTIONS (GLOBAL ACCESS)
       =================================== */
    
    // Utility function to fix image aspect ratios
    function fixTeamImages() {
        const teamImages = document.querySelectorAll('.team-image');
        teamImages.forEach(img => {
            // Ensure proper aspect ratio and positioning - no stretching
            img.style.objectFit = 'cover';
            img.style.objectPosition = 'center center';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            
            // Add loading class if not loaded
            if (!img.complete) {
                img.parentElement.classList.remove('loaded');
            } else {
                img.parentElement.classList.add('loaded');
                img.style.opacity = '1';
            }
            
            // Ensure container has proper aspect ratio
            const container = img.parentElement;
            if (container && container.classList.contains('team-image-container')) {
                container.style.paddingBottom = '100%'; // 1:1 aspect ratio
                container.style.height = '0';
                container.style.overflow = 'hidden';
                container.style.position = 'relative';
            }
        });
    }
    
    // Make utility functions globally accessible
    window.CodeVimarsh = {
        showSection: showSection,
        showNotification: showNotification,
        closeMobileMenu: closeMobileMenu,
        navigateToSection: navigateToSection,
        fixTeamImages: fixTeamImages
    };
    
});

/* ===================================
   ADDITIONAL ANIMATIONS
   =================================== */

// Add CSS animations via JavaScript
const additionalStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .slide-in-left {
        animation: slideInLeft 0.6s ease forwards;
    }
    
    .pulse-animation {
        animation: pulse 2s ease-in-out infinite;
    }
`;

// Add additional styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
/* ===================================
   EVENT MODAL FUNCTIONALITY
   =================================== */

// Event data
const eventData = {
    event1: {
        id: 'event1',
        title: 'A To Z Guidance for DSA Foundation',
        subtitle: 'Complete roadmap for Data Structures and Algorithms mastery',
        date: '5 October',
        time: '11:00 to 13:00',
        image: '5October.webp',
        description: 'Join us for a comprehensive session covering everything you need to know about Data Structures and Algorithms. This foundational workshop will set you up for success in competitive programming and technical interviews.',
        agenda: [
            'Introduction to Data Structures fundamentals',
            'Algorithm complexity analysis (Big O notation)',
            'Essential data structures: Arrays, Linked Lists, Stacks, Queues',
            'Tree and Graph basics',
            'Sorting and searching algorithms',
            'Problem-solving strategies and patterns',
            'Practice problems and live coding session',
            'Q&A and career guidance'
        ],
        speaker: {
            name: 'Code Vimarsh Team',
            title: 'Technical Mentors',
            bio: 'Our experienced team of developers and competitive programmers will guide you through the essential concepts of DSA with practical examples and hands-on exercises.'
        },
        benefits: [
            'Comprehensive DSA roadmap',
            'Live coding demonstrations',
            'Practice problem sets',
            'Career guidance session'
        ]
    },
    event2: {
        id: 'event2',
        title: 'Fireside Chat With Manu Misra',
        subtitle: 'Industry insights and career guidance from a tech leader',
        date: '2 August',
        time: '09:30 to 10:30',
        image: '2Auguest.webp',
        description: 'An exclusive fireside chat with industry expert Manu Misra, sharing valuable insights about career growth, technology trends, and professional development in the tech industry.',
        agenda: [
            'Welcome and introduction',
            'Manu Misra\'s journey in tech industry',
            'Current technology trends and opportunities',
            'Career advice for aspiring developers',
            'Skills that matter in today\'s market',
            'Work-life balance in tech careers',
            'Interactive Q&A session',
            'Networking and closing remarks'
        ],
        speaker: {
            name: 'Manu Misra',
            title: 'Senior Technology Leader',
            bio: 'Manu Misra is a seasoned technology professional with over 15 years of experience in software development, team leadership, and product management. He has worked with leading tech companies and mentored hundreds of developers.'
        },
        benefits: [
            'Industry expert insights',
            'Career guidance',
            'Networking opportunities',
            'Q&A with tech leader'
        ]
    },
    event3: {
        id: 'event3',
        title: 'Fireside Chat With Nishant Virmani Sir',
        subtitle: 'Leadership lessons and technology insights from an industry veteran',
        date: '26 September',
        time: '09:30 to 11:00',
        image: '26september.webp',
        description: 'Join us for an inspiring conversation with Nishant Virmani Sir, where he shares his extensive experience in technology leadership, innovation, and building successful tech teams.',
        agenda: [
            'Opening and speaker introduction',
            'Nishant Virmani\'s leadership journey',
            'Building and scaling tech teams',
            'Innovation in technology solutions',
            'Leadership principles for tech professionals',
            'Challenges and opportunities in modern tech',
            'Advice for emerging tech leaders',
            'Extended Q&A and discussion'
        ],
        speaker: {
            name: 'Nishant Virmani',
            title: 'Technology Leader & Innovation Expert',
            bio: 'Nishant Virmani is a distinguished technology leader with extensive experience in driving innovation and leading high-performing teams. His expertise spans across multiple domains including software architecture, product development, and organizational leadership.'
        },
        benefits: [
            'Leadership insights',
            'Team building strategies',
            'Innovation methodologies',
            'Extended networking session'
        ]
    }
};

// Open event details modal
function openEventDetails(eventId) {
    const event = eventData[eventId];
    if (!event) return;
    
    const modal = document.getElementById('eventModal');
    const content = document.getElementById('eventDetailsContent');
    
    // Generate event detail HTML
    content.innerHTML = generateEventDetailHTML(event);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add event listeners for registration buttons
    const registerBtns = content.querySelectorAll('.btn-register-large, .event-register-btn');
    registerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleEventRegistration(event);
        });
    });
}

// Close event details modal
function closeEventDetails() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Generate event detail HTML
function generateEventDetailHTML(event) {
    return `
        <div class="event-detail-page">
            <div class="event-detail-hero">
                <div class="event-detail-hero-content">
                    <h1 class="event-detail-title">${event.title}</h1>
                    <p class="event-detail-subtitle">${event.subtitle}</p>
                    <div class="event-detail-meta">
                        <div class="event-detail-meta-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${event.date}</span>
                        </div>
                        <div class="event-detail-meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${event.time}</span>
                        </div>
                        <div class="event-detail-meta-item">
                            <i class="fas fa-video"></i>
                            <span>Online Event</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="event-detail-body">
                <div class="event-detail-section">
                    <h3>About This Event</h3>
                    <p style="color: var(--text-gray); line-height: 1.6; font-size: 1.1rem;">${event.description}</p>
                </div>
                
                <div class="event-detail-section">
                    <h3>Event Agenda</h3>
                    <ul class="event-detail-list">
                        ${event.agenda.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="event-detail-section">
                    <h3>Speaker Information</h3>
                    <div class="speaker-info">
                        <div class="speaker-name">${event.speaker.name}</div>
                        <div class="speaker-title">${event.speaker.title}</div>
                        <div class="speaker-bio">${event.speaker.bio}</div>
                    </div>
                </div>
                
                <div class="registration-section">
                    <h3>Register for This Event</h3>
                    <p style="margin-bottom: var(--spacing-lg); opacity: 0.9;">Don't miss this opportunity to learn and grow with us!</p>
                    
                    <div class="registration-benefits">
                        ${event.benefits.map(benefit => `
                            <div class="registration-benefit">
                                <i class="fas fa-check-circle" style="color: white; margin-bottom: var(--spacing-xs);"></i>
                                <div>${benefit}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="registration-cta">
                        <button class="btn-register-large">
                            <i class="fas fa-user-plus"></i>
                            Register Now - Free Event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Handle event registration
function handleEventRegistration(event) {
    // Close modal first
    closeEventDetails();
    
    // Show registration success message
    setTimeout(() => {
        showNotification(
            `Registration successful for "${event.title}"! Check your email for event details.`,
            'success',
            5000
        );
    }, 300);
    
    // Here you would typically integrate with your registration system
    console.log('Registering for event:', event.title);
}

// Make functions globally available
window.openEventDetails = openEventDetails;
window.closeEventDetails = closeEventDetails;
window.openDiscordRegistration = openDiscordRegistration;
window.closeDiscordRegistration = closeDiscordRegistration;
window.showLoginForm = showLoginForm;
window.showRegistrationForm = showRegistrationForm;

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEventDetails();
    }
});

// Prevent modal content clicks from closing modal
document.addEventListener('click', function(e) {
    const modalContent = document.querySelector('.event-modal-content');
    if (modalContent && modalContent.contains(e.target)) {
        e.stopPropagation();
    }
});
/* ===================================
   RESOURCE SECTION FUNCTIONALITY
   =================================== */

// Handle resource exploration
function handleResourceExplore(resourceTitle) {
    const resourceData = {
        'DSA Practice': {
            title: 'Data Structures & Algorithms Practice',
            description: 'Access our curated collection of DSA problems and YouTube playlists.',
            links: [
                { name: 'Striver DSA Sheet', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0rPG3Ictpu74YWBQ1CaBkm2', type: 'youtube' },
                { name: 'Abdul Bari Algorithms', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O', type: 'youtube' },
                { name: 'CodeWithHarry DSA', url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi', type: 'youtube' },
                { name: 'Apna College DSA', url: 'https://www.youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ', type: 'youtube' },
                { name: 'LeetCode Problems', url: 'https://leetcode.com/problemset/all/', type: 'website' },
                { name: 'GeeksforGeeks Practice', url: 'https://practice.geeksforgeeks.org/', type: 'website' }
            ]
        },
        'Web Development': {
            title: 'Web Development Resources',
            description: 'Learn modern web development with comprehensive YouTube tutorials.',
            links: [
                { name: 'CodeWithHarry Web Dev', url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg', type: 'youtube' },
                { name: 'Traversy Media Full Stack', url: 'https://www.youtube.com/playlist?list=PLillGF-RfqbYeckUaD1z6nviTp31GLTH8', type: 'youtube' },
                { name: 'FreeCodeCamp Web Dev', url: 'https://www.youtube.com/playlist?list=PLWKjhJtqVAblfum5WiQblKPwIbqYXkDoC', type: 'youtube' },
                { name: 'The Net Ninja React', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d', type: 'youtube' },
                { name: 'Academind JavaScript', url: 'https://www.youtube.com/playlist?list=PL55RiY5tL51oyA8euSROLjMFZbXaV7skS', type: 'youtube' },
                { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/', type: 'website' }
            ]
        },
        'Interview Prep': {
            title: 'Technical Interview Preparation',
            description: 'Get ready for your dream job with interview prep YouTube channels.',
            links: [
                { name: 'Gaurav Sen System Design', url: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX', type: 'youtube' },
                { name: 'TechDummies Interview Prep', url: 'https://www.youtube.com/playlist?list=PLk6CEY9XxSIA-xo3HRYC3M0Aitzdut7AA', type: 'youtube' },
                { name: 'Back To Back SWE', url: 'https://www.youtube.com/playlist?list=PLiQ766zSC5jM2OKVr8sooOuGgZkvnOCTI', type: 'youtube' },
                { name: 'Coding Interview Questions', url: 'https://www.youtube.com/playlist?list=PLI1t_8YX-Apv-UiRlnZwqqrRT8D1RhriX', type: 'youtube' },
                { name: 'Mock Interview Sessions', url: 'https://www.youtube.com/playlist?list=PLamzFoFxwoNjPfxzaWqs7cZGsPYy0x_gI', type: 'youtube' },
                { name: 'InterviewBit Practice', url: 'https://www.interviewbit.com/', type: 'website' }
            ]
        },
        'YouTube Channels': {
            title: 'Best Programming YouTube Channels',
            description: 'Curated list of top YouTube channels for programming and tech learning.',
            links: [
                { name: 'CodeWithHarry', url: 'https://www.youtube.com/@CodeWithHarry', type: 'youtube' },
                { name: 'Apna College', url: 'https://www.youtube.com/@ApnaCollegeOfficial', type: 'youtube' },
                { name: 'Striver', url: 'https://www.youtube.com/@takeUforward', type: 'youtube' },
                { name: 'Traversy Media', url: 'https://www.youtube.com/@TraversyMedia', type: 'youtube' },
                { name: 'FreeCodeCamp', url: 'https://www.youtube.com/@freecodecamp', type: 'youtube' },
                { name: 'The Net Ninja', url: 'https://www.youtube.com/@NetNinja', type: 'youtube' },
                { name: 'Academind', url: 'https://www.youtube.com/@academind', type: 'youtube' },
                { name: 'Programming with Mosh', url: 'https://www.youtube.com/@programmingwithmosh', type: 'youtube' },
                { name: 'Tech With Tim', url: 'https://www.youtube.com/@TechWithTim', type: 'youtube' },
                { name: 'Fireship', url: 'https://www.youtube.com/@Fireship', type: 'youtube' }
            ]
        }
    };

    const resource = resourceData[resourceTitle];
    if (resource) {
        showResourceModal(resource);
    } else {
        showNotification(`${resourceTitle} resources coming soon! Stay tuned for updates.`, 'info');
    }
}

// Show resource modal
function showResourceModal(resource) {
    const modalHTML = `
        <div class="resource-modal">
            <div class="resource-modal-overlay" onclick="closeResourceModal()"></div>
            <div class="resource-modal-content">
                <button class="resource-modal-close" onclick="closeResourceModal()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="resource-modal-header">
                    <h2>${resource.title}</h2>
                    <p>${resource.description}</p>
                </div>
                <div class="resource-modal-body">
                    <h3>Available Resources:</h3>
                    <div class="resource-links">
                        ${resource.links.map(link => `
                            <a href="${link.url}" class="resource-link ${link.type}" target="_blank" rel="noopener noreferrer" onclick="handleResourceClick('${link.name}', '${link.url}')">
                                <i class="fab ${link.type === 'youtube' ? 'fa-youtube' : 'fas fa-external-link-alt'}"></i>
                                <span>${link.name}</span>
                                <div class="resource-type-badge">${link.type === 'youtube' ? 'YouTube' : 'Website'}</div>
                            </a>
                        `).join('')}
                    </div>
                    <div class="resource-modal-footer">
                        <p><strong>Note:</strong> Click on any resource to open it in a new tab. YouTube playlists will open directly in YouTube!</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.querySelector('.resource-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.querySelector('.resource-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close resource modal
function closeResourceModal() {
    const modal = document.querySelector('.resource-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Handle resource link clicks
function handleResourceClick(resourceName, url) {
    if (url && url !== '#') {
        // Don't prevent default - let the link open naturally
        showNotification(`Opening ${resourceName}...`, 'success', 2000);
        return true; // Allow the link to proceed
    } else {
        closeResourceModal();
        showNotification(`${resourceName} will be available soon!`, 'info');
        return false; // Prevent the link
    }
}

// Make functions globally available
window.handleResourceExplore = handleResourceExplore;
window.closeResourceModal = closeResourceModal;
window.handleResourceClick = handleResourceClick;

/* ===================================
   DISCORD REGISTRATION FUNCTIONALITY
   =================================== */

// Open Discord registration modal
function openDiscordRegistration() {
    const modal = document.getElementById('discordRegistrationModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Initialize form validation with a small delay to ensure DOM is ready
    setTimeout(() => {
        initDiscordFormValidation();
    }, 100);
}

// Close Discord registration modal
function closeDiscordRegistration() {
    const modal = document.getElementById('discordRegistrationModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset forms
    document.getElementById('discordRegistrationForm').reset();
    document.getElementById('discordLoginForm').reset();
    clearValidationErrors();
}

// Show login form
function showLoginForm() {
    document.getElementById('discordRegistrationForm').style.display = 'none';
    document.getElementById('discordLoginForm').style.display = 'block';
    clearValidationErrors();
}

// Show registration form
function showRegistrationForm() {
    document.getElementById('discordLoginForm').style.display = 'none';
    document.getElementById('discordRegistrationForm').style.display = 'block';
    clearValidationErrors();
}

// Initialize Discord form validation
function initDiscordFormValidation() {
    const registrationForm = document.getElementById('discordRegistrationForm');
    const loginForm = document.getElementById('discordLoginForm');
    const prnInput = document.getElementById('discordPrn');
    const passwordInput = document.getElementById('discordPassword');
    
    // Debug: Check if form exists
    if (!registrationForm) {
        console.error('Discord registration form not found!');
        return;
    }
    
    console.log('Initializing Discord form validation...');
    
    // Enhanced PRN validation with free typing
    prnInput.addEventListener('input', function(e) {
        handlePRNInput(e);
    });
    
    // Handle paste events for PRN - allow pasting but filter content
    prnInput.addEventListener('paste', function(e) {
        // Don't prevent default, let the paste happen
        setTimeout(() => {
            // Clean up the pasted content after it's inserted
            handlePRNInput({ target: this });
        }, 0);
    });
    
    // Password validation
    passwordInput.addEventListener('input', function() {
        validatePassword(this.value);
    });
    
    // Confirm password validation
    document.getElementById('discordConfirmPassword').addEventListener('input', function() {
        validateConfirmPassword(passwordInput.value, this.value);
    });
    
    // Username validation
    document.getElementById('discordUsername').addEventListener('input', function() {
        validateUsername(this.value);
    });
    
    // Email validation
    document.getElementById('discordEmail').addEventListener('input', function() {
        validateEmail(this.value);
    });
    
    // Registration form submission with debugging
    registrationForm.addEventListener('submit', function(e) {
        console.log('Registration form submitted');
        e.preventDefault();
        
        // Add small delay to ensure UI updates
        setTimeout(() => {
            handleDiscordRegistration();
        }, 100);
    });
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            console.log('Login form submitted');
            e.preventDefault();
            handleDiscordLogin();
        });
    }
    
    console.log('Discord form validation initialized successfully');
}

// Enhanced PRN input handler - allows free typing with cleanup
function handlePRNInput(e) {
    const input = e.target;
    let value = input.value;
    
    // Remove any non-numeric characters
    value = value.replace(/\D/g, '');
    
    // Limit to 10 digits maximum
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    // Update input value only if it changed
    if (input.value !== value) {
        input.value = value;
    }
    
    // Update progress and feedback (but don't validate format while typing)
    updatePRNProgress(value);
}

// Update PRN progress and feedback without strict validation
function updatePRNProgress(prn) {
    const prnInput = document.getElementById('discordPrn');
    const hint = prnInput.parentElement.parentElement.querySelector('.discord-input-hint');
    const progressFill = document.querySelector('.prn-progress-fill');
    const prnError = document.getElementById('prnError');
    
    // Clear any previous error styling while typing
    prnInput.classList.remove('error', 'valid');
    prnError.textContent = '';
    
    // Update progress bar
    const progressPercentage = (prn.length / 10) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    
    // Update hint text with friendly feedback
    if (prn.length === 0) {
        hint.textContent = 'PRN must start with 80240 and be exactly 10 digits';
        hint.style.color = 'var(--text-gray)';
        progressFill.classList.remove('complete');
    } else if (prn.length < 10) {
        hint.textContent = `${prn.length}/10 digits entered - PRN must start with 80240`;
        hint.style.color = 'var(--text-gray)';
        progressFill.classList.remove('complete');
    } else if (prn.length === 10) {
        // Show completion but don't validate format yet
        hint.textContent = `10/10 digits entered - Will validate format on submit`;
        hint.style.color = 'var(--primary-orange)';
        progressFill.classList.add('complete');
    }
}

// PRN validation - only called on form submission
function validatePRNOnSubmit(prn) {
    const prnError = document.getElementById('prnError');
    const prnInput = document.getElementById('discordPrn');
    
    // Clear any previous styling
    prnError.style.color = '#ed4245'; // Reset to error color
    
    if (prn.length === 0) {
        prnError.textContent = 'PRN is required';
        prnInput.classList.add('error');
        prnInput.classList.remove('valid');
        return false;
    }
    
    if (prn.length < 10) {
        prnError.textContent = `PRN must be exactly 10 digits (currently ${prn.length} digits)`;
        prnInput.classList.add('error');
        prnInput.classList.remove('valid');
        return false;
    }
    
    if (prn.length === 10) {
        if (!prn.startsWith('80240')) {
            prnError.textContent = 'PRN must start with 80240';
            prnInput.classList.add('error');
            prnInput.classList.remove('valid');
            return false;
        }
        
        // PRN is valid
        prnError.textContent = '✓ Valid PRN format';
        prnError.style.color = '#57f287'; // Green success color
        prnInput.classList.remove('error');
        prnInput.classList.add('valid');
        return true;
    }
    
    return false;
}

// Validate password
function validatePassword(password) {
    const passwordError = document.getElementById('passwordError');
    const passwordInput = document.getElementById('discordPassword');
    
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasLength = password.length >= 8;
    
    // Update requirement indicators
    document.getElementById('hasNumber').classList.toggle('valid', hasNumber);
    document.getElementById('hasLetter').classList.toggle('valid', hasLetter);
    document.getElementById('hasSpecial').classList.toggle('valid', hasSpecial);
    document.getElementById('hasLength').classList.toggle('valid', hasLength);
    
    const isValid = hasNumber && hasLetter && hasSpecial && hasLength;
    
    if (password.length === 0) {
        passwordError.textContent = 'Password is required';
        passwordInput.classList.add('error');
        passwordInput.classList.remove('valid');
        return false;
    }
    
    if (!isValid) {
        passwordError.textContent = 'Password does not meet requirements';
        passwordInput.classList.add('error');
        passwordInput.classList.remove('valid');
        return false;
    }
    
    passwordError.textContent = '';
    passwordInput.classList.remove('error');
    passwordInput.classList.add('valid');
    return true;
}

// Validate confirm password
function validateConfirmPassword(password, confirmPassword) {
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const confirmPasswordInput = document.getElementById('discordConfirmPassword');
    
    if (confirmPassword.length === 0) {
        confirmPasswordError.textContent = 'Please confirm your password';
        confirmPasswordInput.classList.add('error');
        confirmPasswordInput.classList.remove('valid');
        return false;
    }
    
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match';
        confirmPasswordInput.classList.add('error');
        confirmPasswordInput.classList.remove('valid');
        return false;
    }
    
    confirmPasswordError.textContent = '';
    confirmPasswordInput.classList.remove('error');
    confirmPasswordInput.classList.add('valid');
    return true;
}

// Validate username
function validateUsername(username) {
    const usernameError = document.getElementById('usernameError');
    const usernameInput = document.getElementById('discordUsername');
    
    if (username.length === 0) {
        usernameError.textContent = 'Username is required';
        usernameInput.classList.add('error');
        usernameInput.classList.remove('valid');
        return false;
    }
    
    if (username.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters long';
        usernameInput.classList.add('error');
        usernameInput.classList.remove('valid');
        return false;
    }
    
    usernameError.textContent = '';
    usernameInput.classList.remove('error');
    usernameInput.classList.add('valid');
    return true;
}

// Validate email
function validateEmail(email) {
    const emailError = document.getElementById('emailError');
    const emailInput = document.getElementById('discordEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.length === 0) {
        emailError.textContent = 'Email is required';
        emailInput.classList.add('error');
        emailInput.classList.remove('valid');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.classList.add('error');
        emailInput.classList.remove('valid');
        return false;
    }
    
    emailError.textContent = '';
    emailInput.classList.remove('error');
    emailInput.classList.add('valid');
    return true;
}

// Clear validation errors
function clearValidationErrors() {
    const errorElements = document.querySelectorAll('.discord-error');
    const inputElements = document.querySelectorAll('.discord-input');
    
    errorElements.forEach(error => {
        error.textContent = '';
        error.style.color = '#ed4245'; // Reset to default error color
    });
    
    inputElements.forEach(input => {
        input.classList.remove('error', 'valid');
    });
    
    // Reset password requirements
    const requirements = document.querySelectorAll('.discord-password-requirements li');
    requirements.forEach(req => req.classList.remove('valid'));
    
    // Reset PRN progress using the new function
    updatePRNProgress('');
}

// Handle Discord registration with backend integration
async function handleDiscordRegistration() {
    console.log('handleDiscordRegistration called');
    
    const form = document.getElementById('discordRegistrationForm');
    if (!form) {
        console.error('Registration form not found!');
        showNotification('Form not found. Please refresh the page and try again.', 'error');
        return;
    }
    
    const formData = new FormData(form);
    
    const prn = formData.get('prn');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    console.log('Form data:', { prn, username, email, password: '***', confirmPassword: '***' });
    
    // Get submit button
    const submitBtn = form.querySelector('.discord-register-btn');
    if (!submitBtn) {
        console.error('Submit button not found!');
        showNotification('Submit button not found. Please refresh the page and try again.', 'error');
        return;
    }
    
    const originalText = submitBtn.innerHTML;
    
    try {
        console.log('Starting validation...');
        
        // Frontend validation (same as before for immediate feedback)
        const isPrnValid = validatePRNOnSubmit(prn);
        const isUsernameValid = validateUsername(username);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);
        
        console.log('Validation results:', {
            isPrnValid,
            isUsernameValid,
            isEmailValid,
            isPasswordValid,
            isConfirmPasswordValid
        });
        
        if (!isPrnValid || !isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
            showNotification('Please fix the validation errors before submitting.', 'error');
            return;
        }
        
        console.log('All validations passed, sending to backend...');
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Prepare data for backend
        const registrationData = {
            prn: prn,
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };
        
        // Send registration request to backend
        console.log('Sending registration request to backend...');
        showNotification('Creating your account...', 'info', 2000);
        
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData)
        });
        
        console.log('Backend response status:', response.status);
        
        const result = await response.json();
        console.log('Backend response:', result);
        
        if (response.ok && result.success) {
            // Registration successful
            console.log('Registration successful!');
            
            // Update button to show email sending status
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending confirmation email...';
            showNotification('Sending confirmation email...', 'info', 2000);
            
            // Show success message
            if (result.emailSent) {
                showRegistrationSuccess(username, email);
                showNotification('Registration successful! Confirmation email sent.', 'success', 5000);
            } else {
                showRegistrationSuccessWithEmailWarning(username, email);
                showNotification('Registration successful, but confirmation email failed. Please contact support.', 'warning', 8000);
            }
            
            // Reset form
            form.reset();
            clearValidationErrors();
            
            console.log('Registration process completed successfully');
            
        } else {
            // Registration failed
            console.error('Registration failed:', result.message);
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            // Show error message from backend
            showNotification(result.message || 'Registration failed. Please try again.', 'error');
        }
        
    } catch (error) {
        console.error('Registration error:', error);
        
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        
        // Show network error message
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showNotification('Cannot connect to server. Please make sure the backend is running on http://localhost:3000', 'error');
        } else {
            showNotification('Network error. Please check your connection and try again.', 'error');
        }
    }
}

// Handle Discord login
async function handleDiscordLogin() {
    const form = document.getElementById('discordLoginForm');
    const formData = new FormData(form);
    
    const loginUsername = formData.get('loginUsername');
    const loginPassword = formData.get('loginPassword');
    
    if (!loginUsername || !loginPassword) {
        showNotification('Please enter both username/email and password.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.discord-register-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;
    
    try {
        // Simulate login API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate successful login
        showNotification('Login successful! Redirecting to Discord server...', 'success');
        
        // Close modal and redirect (simulated)
        setTimeout(() => {
            closeDiscordRegistration();
            // In real implementation, redirect to Discord server
            showNotification('Discord server access granted! 🎉', 'success', 3000);
        }, 1000);
        
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed. Please check your credentials.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Simulate server registration with proper error handling
async function simulateServerRegistration(data) {
    try {
        console.log('Starting server registration for:', data.username);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate different scenarios for testing
        const random = Math.random();
        
        if (random < 0.05) {
            // 5% chance of server error
            throw new Error('Server registration failed - database error');
        } else if (random < 0.1) {
            // 5% chance of network error
            throw new Error('Network error during registration');
        } else {
            // 90% success rate
            console.log('Server registration successful for:', data.username);
            
            // Store in localStorage for demo purposes
            const users = JSON.parse(localStorage.getItem('codeVimarshUsers') || '[]');
            
            // Check if user already exists
            const existingUser = users.find(user => user.prn === data.prn || user.username === data.username);
            if (existingUser) {
                throw new Error('User with this PRN or username already exists');
            }
            
            // Add new user
            users.push({
                ...data,
                id: Date.now(),
                verified: false,
                registeredAt: new Date().toISOString()
            });
            
            localStorage.setItem('codeVimarshUsers', JSON.stringify(users));
            
            console.log('User data saved successfully');
            return true;
        }
        
    } catch (error) {
        console.error('Server registration error:', error);
        throw error; // Re-throw to be handled by calling function
    }
}

// Send confirmation email with proper error handling
async function sendConfirmationEmail(email, username, prn) {
    try {
        console.log('Starting email sending process for:', email);
        
        // In a real implementation, this would call your backend API
        const emailData = {
            to: email,
            subject: 'Welcome to Code Vimarsh Discord Community!',
            template: 'discord-registration-confirmation',
            data: {
                username: username,
                prn: prn,
                registrationDate: new Date().toLocaleDateString(),
                discordInviteLink: 'https://discord.gg/codevimarsh', // Replace with actual invite
                supportEmail: 'codingclub-cse@msubaroda.ac.in'
            }
        };
        
        // Try to call real API first, fallback to simulation
        let response;
        try {
            response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
                timeout: 10000 // 10 second timeout
            });
        } catch (fetchError) {
            console.log('Real API not available, using simulation');
            response = await simulateEmailSending(emailData);
        }
        
        if (response && (response.ok || response.success)) {
            console.log('Confirmation email sent successfully to:', email);
            return true;
        } else {
            throw new Error('Email service returned error response');
        }
        
    } catch (error) {
        console.error('Email sending failed:', error);
        
        // Log email for manual processing
        await logEmailForManualProcessing(email, username, prn);
        
        // Return false instead of throwing to allow registration to complete
        return false;
    }
}

// Simulate email sending for demo purposes with better error handling
async function simulateEmailSending(emailData) {
    try {
        console.log('Simulating email sending...');
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate 85% success rate (more realistic)
        const success = Math.random() > 0.15;
        
        if (success) {
            // Log the email content for demo purposes
            console.log('📧 Email sent successfully!');
            console.log('To:', emailData.to);
            console.log('Subject:', emailData.subject);
            console.log('Content preview:', generateEmailContent(emailData.data).substring(0, 200) + '...');
            
            // Store email in localStorage for demo
            const sentEmails = JSON.parse(localStorage.getItem('codeVimarshEmails') || '[]');
            sentEmails.push({
                ...emailData,
                sentAt: new Date().toISOString(),
                status: 'sent'
            });
            localStorage.setItem('codeVimarshEmails', JSON.stringify(sentEmails));
            
            return { ok: true, success: true };
        } else {
            console.log('Simulated email failure');
            throw new Error('Simulated email service failure');
        }
        
    } catch (error) {
        console.error('Email simulation error:', error);
        return { ok: false, success: false, error: error.message };
    }
}

// Generate email content for confirmation
function generateEmailContent(data) {
    return `
🎉 Welcome to Code Vimarsh Discord Community!

Hi ${data.username},

Congratulations! Your registration for the Code Vimarsh Discord server has been completed successfully.

Registration Details:
• Username: ${data.username}
• PRN: ${data.prn}
• Registration Date: ${data.registrationDate}

Next Steps:
1. Join our Discord server: ${data.discordInviteLink}
2. Introduce yourself in the #introductions channel
3. Check out our coding challenges and events
4. Connect with fellow developers and mentors

Need Help?
If you have any questions or need assistance, feel free to reach out to us at ${data.supportEmail}

Welcome to the community!

Best regards,
Code Vimarsh Team
MSU Baroda
    `;
}

// Log email for manual processing if automatic sending fails
async function logEmailForManualProcessing(email, username, prn) {
    try {
        const failedEmails = JSON.parse(localStorage.getItem('codeVimarshFailedEmails') || '[]');
        failedEmails.push({
            email: email,
            username: username,
            prn: prn,
            timestamp: new Date().toISOString(),
            reason: 'Email service unavailable'
        });
        localStorage.setItem('codeVimarshFailedEmails', JSON.stringify(failedEmails));
        
        console.log('Email logged for manual processing:', email);
    } catch (error) {
        console.error('Failed to log email for manual processing:', error);
    }
}

// Add timeout wrapper for async operations
function withTimeout(promise, timeoutMs = 30000) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
        )
    ]);
}

// Debug function to check registration status
function debugRegistrationStatus() {
    const users = JSON.parse(localStorage.getItem('codeVimarshUsers') || '[]');
    const emails = JSON.parse(localStorage.getItem('codeVimarshEmails') || '[]');
    const failedEmails = JSON.parse(localStorage.getItem('codeVimarshFailedEmails') || '[]');
    
    console.log('=== Registration Debug Info ===');
    console.log('Registered users:', users.length);
    console.log('Sent emails:', emails.length);
    console.log('Failed emails:', failedEmails.length);
    console.log('Latest user:', users[users.length - 1]);
    console.log('Latest email:', emails[emails.length - 1]);
    
    return {
        users: users.length,
        emails: emails.length,
        failedEmails: failedEmails.length
    };
}

// Make debug function globally available
window.debugRegistrationStatus = debugRegistrationStatus;

// Show registration success message with proper redirection
function showRegistrationSuccess(username, email) {
    const formContainer = document.querySelector('.discord-form-container');
    
    const successHTML = `
        <div class="discord-success-message">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>🎉 Registration Successful!</h3>
            <p><strong>Welcome to Code Vimarsh, ${username}!</strong></p>
            <p>A confirmation email has been sent to:</p>
            <p class="email-highlight">${email}</p>
            
            <div class="success-details">
                <div class="success-step">
                    <i class="fas fa-envelope"></i>
                    <span>Check your email for Discord server invite</span>
                </div>
                <div class="success-step">
                    <i class="fab fa-discord"></i>
                    <span>Join our Discord community</span>
                </div>
                <div class="success-step">
                    <i class="fas fa-users"></i>
                    <span>Connect with fellow developers</span>
                </div>
            </div>
            
            <div class="success-actions">
                <button class="discord-register-btn primary" onclick="redirectToHomepage()">
                    <i class="fas fa-home"></i>
                    Continue to Homepage
                </button>
                <button class="discord-register-btn secondary" onclick="openEmailClient('${email}')">
                    <i class="fas fa-envelope-open"></i>
                    Open Email
                </button>
            </div>
            
            <div class="success-footer">
                <p><small>Didn't receive the email? Check your spam folder or <a href="#" onclick="resendConfirmationEmail('${email}', '${username}')">resend confirmation</a></small></p>
            </div>
        </div>
    `;
    
    formContainer.innerHTML = successHTML;
}

// Show registration success with email warning
function showRegistrationSuccessWithEmailWarning(username, email) {
    const formContainer = document.querySelector('.discord-form-container');
    
    const successHTML = `
        <div class="discord-success-message warning">
            <div class="success-icon warning">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>⚠️ Registration Completed</h3>
            <p><strong>Welcome to Code Vimarsh, ${username}!</strong></p>
            <p>Your account has been created successfully, but we couldn't send the confirmation email to:</p>
            <p class="email-highlight">${email}</p>
            
            <div class="warning-message">
                <p><strong>What to do next:</strong></p>
                <ul>
                    <li>Contact our support team at <a href="mailto:codingclub-cse@msubaroda.ac.in">codingclub-cse@msubaroda.ac.in</a></li>
                    <li>Mention your username: <strong>${username}</strong></li>
                    <li>We'll manually send you the Discord invite</li>
                </ul>
            </div>
            
            <div class="success-actions">
                <button class="discord-register-btn primary" onclick="redirectToHomepage()">
                    <i class="fas fa-home"></i>
                    Continue to Homepage
                </button>
                <button class="discord-register-btn secondary" onclick="contactSupport()">
                    <i class="fas fa-envelope"></i>
                    Contact Support
                </button>
            </div>
        </div>
    `;
    
    formContainer.innerHTML = successHTML;
}

// Redirect to homepage
function redirectToHomepage() {
    // Close the modal first
    closeDiscordRegistration();
    
    // Show a final success message
    setTimeout(() => {
        showNotification('Welcome to Code Vimarsh! Check your email for Discord access.', 'success', 5000);
        
        // Navigate to home section
        if (window.CodeVimarsh && window.CodeVimarsh.showSection) {
            window.CodeVimarsh.showSection('home');
        }
    }, 500);
}

// Open email client
function openEmailClient(email) {
    // Try to open the default email client
    const emailDomain = email.split('@')[1];
    let emailUrl = `mailto:${email}`;
    
    // Provide web email shortcuts for common providers
    if (emailDomain.includes('gmail')) {
        emailUrl = 'https://mail.google.com/';
    } else if (emailDomain.includes('outlook') || emailDomain.includes('hotmail')) {
        emailUrl = 'https://outlook.live.com/';
    } else if (emailDomain.includes('yahoo')) {
        emailUrl = 'https://mail.yahoo.com/';
    }
    
    window.open(emailUrl, '_blank');
    showNotification('Opening your email client...', 'info', 3000);
}

// Contact support
function contactSupport() {
    const supportEmail = 'codingclub-cse@msubaroda.ac.in';
    const subject = 'Discord Registration - Email Issue';
    const body = 'Hi Code Vimarsh Team,\n\nI successfully registered for the Discord server but did not receive the confirmation email. Please help me get access to the Discord community.\n\nThank you!';
    
    const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    
    showNotification('Opening email to contact support...', 'info', 3000);
}

// Resend confirmation email
async function resendConfirmationEmail(email, username) {
    showNotification('Resending confirmation email...', 'info', 2000);
    
    try {
        const success = await sendConfirmationEmail(email, username, 'N/A');
        
        if (success) {
            showNotification('Confirmation email resent successfully!', 'success', 4000);
        } else {
            showNotification('Failed to resend email. Please contact support.', 'error', 5000);
        }
    } catch (error) {
        console.error('Resend email error:', error);
        showNotification('Failed to resend email. Please contact support.', 'error', 5000);
    }
}

// Make functions globally available
window.redirectToHomepage = redirectToHomepage;
window.openEmailClient = openEmailClient;
window.contactSupport = contactSupport;
window.resendConfirmationEmail = resendConfirmationEmail;

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDiscordRegistration();
    }
});

// Prevent modal content clicks from closing modal
document.addEventListener('click', function(e) {
    const modalContent = document.querySelector('.discord-modal-content');
    if (modalContent && modalContent.contains(e.target)) {
        e.stopPropagation();
    }
});
/* ===================================
   PROJECT GALLERY FUNCTIONALITY
   =================================== */

// Project data
const projectData = {
    ezylink: {
        id: 'ezylink',
        title: 'Ezylink',
        subtitle: 'Advanced URL Shortening Platform',
        description: 'A comprehensive URL shortening service built with modern web technologies, featuring analytics, custom domains, and team collaboration.',
        image: 'ezylink-banner.webp',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Chart.js'],
        features: [
            {
                icon: 'fas fa-link',
                title: 'Smart URL Shortening',
                description: 'Create short, memorable links with custom aliases and branded domains.'
            },
            {
                icon: 'fas fa-chart-bar',
                title: 'Advanced Analytics',
                description: 'Track clicks, geographic data, referrers, and user engagement metrics.'
            },
            {
                icon: 'fas fa-users',
                title: 'Team Collaboration',
                description: 'Share links across teams with role-based access and permissions.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Security Features',
                description: 'Password protection, expiration dates, and spam detection.'
            }
        ],
        links: [
            {
                title: 'Live Demo',
                url: '#',
                type: 'primary',
                icon: 'fas fa-external-link-alt'
            },
            {
                title: 'GitHub Repository',
                url: '#',
                type: 'secondary',
                icon: 'fab fa-github'
            }
        ],
        details: [
            'Built with React for a responsive and interactive user interface',
            'Node.js backend with Express framework for robust API development',
            'MongoDB database for scalable data storage and retrieval',
            'JWT authentication for secure user sessions',
            'Real-time analytics dashboard with Chart.js visualizations',
            'Custom domain support for branded short links',
            'QR code generation for easy mobile sharing',
            'Bulk URL processing for enterprise users'
        ]
    },
    integrator: {
        id: 'integrator',
        title: 'Integrator',
        subtitle: 'Powerful API Integration Tool',
        description: 'A sophisticated API integration platform that simplifies connecting different services, with visual workflow builder and real-time monitoring.',
        image: 'integrator.webp',
        technologies: ['Vue.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
        features: [
            {
                icon: 'fas fa-plug',
                title: 'Visual API Builder',
                description: 'Drag-and-drop interface for creating complex API integrations without code.'
            },
            {
                icon: 'fas fa-sync',
                title: 'Real-time Sync',
                description: 'Automatic data synchronization between multiple platforms and services.'
            },
            {
                icon: 'fas fa-eye',
                title: 'Live Monitoring',
                description: 'Real-time monitoring of API calls, errors, and performance metrics.'
            },
            {
                icon: 'fas fa-cogs',
                title: 'Custom Workflows',
                description: 'Create custom automation workflows with conditional logic and triggers.'
            }
        ],
        links: [
            {
                title: 'Live Demo',
                url: '#',
                type: 'primary',
                icon: 'fas fa-external-link-alt'
            },
            {
                title: 'Documentation',
                url: '#',
                type: 'secondary',
                icon: 'fas fa-book'
            }
        ],
        details: [
            'Vue.js frontend with modern component architecture',
            'Python backend using FastAPI for high-performance API development',
            'PostgreSQL database with optimized queries for large datasets',
            'Redis caching for improved response times',
            'Docker containerization for easy deployment and scaling',
            'Visual workflow designer with drag-and-drop functionality',
            'Support for REST, GraphQL, and WebSocket APIs',
            'Comprehensive error handling and retry mechanisms',
            'Built-in testing tools for API endpoint validation'
        ]
    }
};

// Open project details modal
function openProjectDetails(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('projectDetailsContent');
    
    // Generate project detail HTML
    content.innerHTML = generateProjectDetailHTML(project);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close project details modal
function closeProjectDetails() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Generate project detail HTML
function generateProjectDetailHTML(project) {
    return `
        <div class="project-detail-page">
            <div class="project-detail-hero">
                <div class="project-detail-hero-content">
                    <h1 class="project-detail-title">${project.title}</h1>
                    <p class="project-detail-subtitle">${project.subtitle}</p>
                    <div class="project-detail-meta">
                        <div class="project-detail-meta-item">
                            <i class="fas fa-code"></i>
                            <span>Full Stack</span>
                        </div>
                        <div class="project-detail-meta-item">
                            <i class="fas fa-users"></i>
                            <span>Team Project</span>
                        </div>
                        <div class="project-detail-meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>2024</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="project-detail-body">
                <div class="project-detail-section">
                    <h3>Project Overview</h3>
                    <p style="color: var(--text-gray); line-height: 1.6; font-size: 1.1rem; margin-bottom: var(--spacing-lg);">${project.description}</p>
                    
                    <img src="${project.image}" alt="${project.title} Screenshot" class="project-screenshot">
                </div>
                
                <div class="project-detail-section">
                    <h3>Key Features</h3>
                    <div class="project-features">
                        ${project.features.map(feature => `
                            <div class="project-feature">
                                <div class="project-feature-icon">
                                    <i class="${feature.icon}"></i>
                                </div>
                                <h4>${feature.title}</h4>
                                <p>${feature.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="project-detail-section">
                    <h3>Technology Stack</h3>
                    <div class="project-tech-stack">
                        ${project.technologies.map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="project-detail-section">
                    <h3>Technical Implementation</h3>
                    <ul style="color: var(--text-gray); line-height: 1.8; padding-left: var(--spacing-lg);">
                        ${project.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-detail-section">
                    <h3>Project Links</h3>
                    <div class="project-links">
                        ${project.links.map(link => `
                            <a href="${link.url}" class="project-link-btn ${link.type}" target="_blank" rel="noopener noreferrer">
                                <i class="${link.icon}"></i>
                                ${link.title}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Make functions globally available
window.openProjectDetails = openProjectDetails;
window.closeProjectDetails = closeProjectDetails;

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectDetails();
    }
});

// Prevent modal content clicks from closing modal
document.addEventListener('click', function(e) {
    const modalContent = document.querySelector('.project-modal-content');
    if (modalContent && modalContent.contains(e.target)) {
        e.stopPropagation();
    }
});