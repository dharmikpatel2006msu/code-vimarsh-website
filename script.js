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
       EVENTS SECTION FUNCTIONALITY
       =================================== */
    
    // Event data for detailed views
    const eventData = {
        'web-dev-workshop': {
            title: 'Web Development Workshop',
            date: 'January 15, 2025',
            time: '2:00 PM - 5:00 PM',
            mode: 'Online (Google Meet)',
            platform: 'Google Meet',
            description: 'Join us for an intensive 3-hour workshop covering the fundamentals of modern web development. Learn HTML5, CSS3, and JavaScript through hands-on projects and real-world examples.',
            gains: [
                'Build responsive websites from scratch',
                'Master modern CSS techniques and flexbox/grid',
                'Learn JavaScript DOM manipulation and events',
                'Understand web development best practices',
                'Get access to exclusive learning resources'
            ],
            speaker: 'Led by senior developers from top tech companies with 5+ years of industry experience',
            registrationOpen: true
        },
        'ai-ml-session': {
            title: 'AI & ML Intro Session',
            date: 'January 22, 2025',
            time: '3:00 PM - 6:00 PM',
            mode: 'Offline (College Campus)',
            platform: 'Computer Lab, Block A',
            description: 'Dive into the fascinating world of Artificial Intelligence and Machine Learning. This session covers fundamental concepts, practical applications, and hands-on experience with popular ML libraries.',
            gains: [
                'Understand AI/ML concepts and terminology',
                'Hands-on experience with Python and scikit-learn',
                'Build your first machine learning model',
                'Learn about real-world AI applications',
                'Network with AI enthusiasts and experts'
            ],
            speaker: 'Industry expert with PhD in Machine Learning and 8+ years in AI research',
            registrationOpen: true
        },
        'hackathon-2025': {
            title: 'Code Vimarsh Hackathon 2025',
            date: 'February 5, 2025',
            time: '9:00 AM - 9:00 PM',
            mode: 'Hybrid (Online + Offline)',
            platform: 'Main Auditorium + Discord Server',
            description: 'Our flagship 12-hour hackathon bringing together the brightest minds to solve real-world problems. Compete for exciting prizes while learning, building, and networking with fellow developers.',
            gains: [
                'Work on challenging real-world problems',
                'Win exciting prizes worth ₹50,000+',
                'Get mentorship from industry professionals',
                'Build your portfolio with innovative projects',
                'Network with potential co-founders and employers'
            ],
            speaker: 'Judged by CTOs and senior engineers from leading startups and tech companies',
            registrationOpen: true
        },
        'open-source-meetup': {
            title: 'Open Source Meetup',
            date: 'February 12, 2025',
            time: '4:00 PM - 7:00 PM',
            mode: 'Online (Discord)',
            platform: 'Discord Community Server',
            description: 'Learn the art of open source contribution and collaborative development. Master Git, GitHub, and discover how to contribute to popular open source projects.',
            gains: [
                'Master Git and GitHub workflows',
                'Learn open source contribution best practices',
                'Discover beginner-friendly projects to contribute to',
                'Build your developer profile and reputation',
                'Connect with the global open source community'
            ],
            speaker: 'Open source maintainers and contributors from popular GitHub projects',
            registrationOpen: true
        }
    };
    
    // Get event elements
    const eventCards = document.querySelectorAll('.event-card');
    const eventsListing = document.getElementById('eventsListing');
    const eventDetail = document.getElementById('eventDetail');
    const backButton = document.getElementById('backToEvents');
    const registerButton = document.getElementById('registerButton');
    
    // Event card click handlers
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event');
            showEventDetail(eventId);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#2563eb';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(226, 232, 240, 0.8)';
        });
    });
    
    // Function to show event detail
    function showEventDetail(eventId) {
        const event = eventData[eventId];
        if (!event) return;
        
        // Update event detail content
        document.getElementById('eventDetailTitle').textContent = event.title;
        document.getElementById('eventDetailDate').textContent = event.date;
        document.getElementById('eventDetailTime').textContent = event.time;
        document.getElementById('eventDetailMode').textContent = event.mode;
        document.getElementById('eventDetailPlatform').textContent = event.platform;
        document.getElementById('eventDetailDescription').textContent = event.description;
        
        // Update gains list
        const gainsList = document.getElementById('eventDetailGains');
        gainsList.innerHTML = '';
        event.gains.forEach(gain => {
            const li = document.createElement('li');
            li.textContent = gain;
            gainsList.appendChild(li);
        });
        
        // Update speaker info
        document.getElementById('eventDetailSpeaker').innerHTML = `<p>${event.speaker}</p>`;
        
        // Update register button
        if (event.registrationOpen) {
            registerButton.disabled = false;
            registerButton.innerHTML = '<i class="icon">🎫</i> Register Now';
        } else {
            registerButton.disabled = true;
            registerButton.innerHTML = '<i class="icon">🔒</i> Registration Closed';
        }
        
        // Switch views
        eventsListing.classList.remove('active');
        eventDetail.classList.add('active');
        
        // Scroll to top
        mainContent.scrollTop = 0;
    }
    
    // Back button handler
    if (backButton) {
        backButton.addEventListener('click', function() {
            eventDetail.classList.remove('active');
            eventsListing.classList.add('active');
            mainContent.scrollTop = 0;
        });
    }
    
    // Register button handler
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            if (!this.disabled) {
                // Here you can add registration logic
                // For now, we'll show a success message
                showNotification('Registration successful! Check your email for confirmation.', 'success');
                
                // You can replace this with actual registration logic:
                // window.open('https://forms.google.com/your-registration-form', '_blank');
            }
        });
    }
    
    /* ===================================
       TEAM SECTION FUNCTIONALITY
       =================================== */
    
    // Initialize AOS (Animate On Scroll) for team members
    function initializeTeamAnimations() {
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
        
        // Observe all team member cards
        const teamCards = document.querySelectorAll('[data-aos="fade-up"]');
        teamCards.forEach(card => {
            observer.observe(card);
        });
    }
    
    // Join button functionality
    const joinButton = document.querySelector('.join-button');
    if (joinButton) {
        joinButton.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
            }
        });
    }
    
    // Team member card hover effects
    const teamMemberCards = document.querySelectorAll('.team-member-card:not(.join-us-card)');
    teamMemberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle pulse effect to other cards
            teamMemberCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset opacity for all cards
            teamMemberCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });
    
    // Initialize team animations
    initializeTeamAnimations();
    
    // Notification system for user feedback
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        // Set background color based on type
        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'error') {
            notification.style.background = '#ef4444';
        } else {
            notification.style.background = '#2563eb';
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }
    
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