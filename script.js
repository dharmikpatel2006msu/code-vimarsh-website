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
    
    // Function to switch between sections
    function showSection(sectionId) {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 50);
        }
        
        // Add active class to corresponding nav link
        const activeNavLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Update URL hash
        window.location.hash = sectionId;
        
        // Scroll to top
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
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        sidebar.classList.toggle('active');
        hamburger.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        sidebar.classList.remove('active');
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
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
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Close mobile menu on desktop
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250);
    });
    
    /* ===================================
       SCROLL ANIMATIONS (AOS)
       =================================== */
    
    // Simple AOS (Animate On Scroll) implementation
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
                    }, delay);
                }
            });
        }, observerOptions);
        
        // Observe all elements with data-aos attribute
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(element => {
            observer.observe(element);
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
        // Team card interactions
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach(card => {
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
        
        // Gallery item interactions
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const projectTitle = this.querySelector('.gallery-title').textContent;
                showNotification(`Opening "${projectTitle}" project details...`, 'info');
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
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showNotification('Social media links will be updated soon!', 'info');
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
    
    // Initialize all features
    function initWebsite() {
        console.log('🚀 Code Vimarsh website initializing...');
        
        // Initialize features
        initAOS();
        initInteractiveElements();
        initLazyLoading();
        initBackgroundEffects();
        handleInitialHash();
        
        // Add page load animation
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Show welcome message
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
    
    // Make utility functions globally accessible
    window.CodeVimarsh = {
        showSection: showSection,
        showNotification: showNotification,
        closeMobileMenu: closeMobileMenu,
        navigateToSection: navigateToSection
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