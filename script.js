/* ===================================
   MODERN CODE VIMARSH WEBSITE SCRIPT
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /* ===================================
       NAVIGATION FUNCTIONALITY
       =================================== */
    
    // Get navigation elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 60; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        handleNavbarScroll();
    });
    
    /* ===================================
       TEAM SECTION ANIMATIONS
       =================================== */
    
    // Initialize AOS (Animate On Scroll) for team cards
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
        
        // Observe all team cards and event cards
        const animatedElements = document.querySelectorAll('[data-aos="fade-up"]');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    /* ===================================
       INTERACTIVE ELEMENTS
       =================================== */
    
    // Add hover effects to cards
    function addCardHoverEffects() {
        const cards = document.querySelectorAll('.team-card, .event-card, .topic-card, .partner-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Button click animations
    function addButtonAnimations() {
        const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    /* ===================================
       FORM INTERACTIONS
       =================================== */
    
    // Enhanced form handling (if forms exist)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Floating label effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation feedback
            input.addEventListener('input', function() {
                this.classList.remove('error');
                
                // Basic validation
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                    this.classList.add('error');
                }
            });
        });
    });
    
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
            font-family: var(--font-primary);
        `;
        
        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#2563eb'
        };
        
        notification.style.background = colors[type] || colors.info;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after duration
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }
    
    /* ===================================
       PERFORMANCE OPTIMIZATIONS
       =================================== */
    
    // Lazy loading for images
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
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
    
    // Optimized resize handler
    const handleResize = debounce(() => {
        // Close mobile menu on desktop
        if (window.innerWidth >= 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Update any layout-dependent calculations
        updateLayoutCalculations();
    }, 250);
    
    function updateLayoutCalculations() {
        // Placeholder for future layout calculations
        // This could include updating element positions, recalculating dimensions, etc.
    }
    
    window.addEventListener('resize', handleResize);
    
    /* ===================================
       ACCESSIBILITY IMPROVEMENTS
       =================================== */
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Enter key support for interactive elements
        if (e.key === 'Enter') {
            const target = e.target;
            if (target.classList.contains('team-card') || 
                target.classList.contains('event-card') ||
                target.classList.contains('topic-card')) {
                target.click();
            }
        }
    });
    
    // Add ARIA labels and roles for better accessibility
    function enhanceAccessibility() {
        // Add role and aria-label to hamburger menu
        if (hamburger) {
            hamburger.setAttribute('role', 'button');
            hamburger.setAttribute('aria-label', 'Toggle navigation menu');
            hamburger.setAttribute('aria-expanded', 'false');
        }
        
        // Update aria-expanded when menu toggles
        const originalToggle = hamburger.onclick;
        hamburger.onclick = function() {
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', !isExpanded);
            if (originalToggle) originalToggle.call(this);
        };
        
        // Add focus indicators for keyboard navigation
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--primary-color)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
    
    /* ===================================
       THEME AND VISUAL ENHANCEMENTS
       =================================== */
    
    // Add loading animation to page
    function addPageLoadAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
    
    // Parallax effect for hero section
    function addParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
    }
    
    // Add smooth reveal animations for sections
    function addSectionRevealAnimations() {
        const sections = document.querySelectorAll('section');
        const revealObserver = new IntersectionObserver((entries) => {
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
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(section);
        });
    }
    
    /* ===================================
       INTERACTIVE FEATURES
       =================================== */
    
    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's an anchor link, handle smooth scrolling
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 60;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Show notification for demo purposes
            if (this.textContent.includes('Start Learning')) {
                showNotification('DSA Learning section coming soon! Stay tuned for updates.', 'info');
            } else if (this.textContent.includes('Explore Events')) {
                showNotification('Check out our upcoming events below!', 'success');
            }
        });
    });
    
    // Add interactive hover effects for team members
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle animation to other cards
            teamCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset all cards
            teamCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
                otherCard.style.transform = 'scale(1)';
            });
        });
    });
    
    /* ===================================
       INITIALIZATION
       =================================== */
    
    // Initialize all features
    function initializeWebsite() {
        addPageLoadAnimation();
        initializeTeamAnimations();
        addCardHoverEffects();
        addButtonAnimations();
        initializeLazyLoading();
        enhanceAccessibility();
        addSectionRevealAnimations();
        
        // Add parallax effect only on desktop for performance
        if (window.innerWidth >= 1024) {
            addParallaxEffect();
        }
        
        // Set initial active nav link
        updateActiveNavLink();
        
        console.log('🚀 Code Vimarsh website initialized successfully!');
        
        // Show welcome notification
        setTimeout(() => {
            showNotification('Welcome to Code Vimarsh! Explore our community and resources.', 'success', 3000);
        }, 1000);
    }
    
    // Start the website
    initializeWebsite();
    
    /* ===================================
       UTILITY FUNCTIONS
       =================================== */
    
    // Smooth scroll to element utility
    window.scrollToElement = function(elementId, offset = 60) {
        const element = document.getElementById(elementId);
        if (element) {
            const offsetTop = element.offsetTop - offset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };
    
    // Show notification utility (global access)
    window.showNotification = showNotification;
    
    // Check if element is in viewport utility
    window.isInViewport = function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
});
    
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
       FORUM SECTION FUNCTIONALITY
       =================================== */
    
    // Forum topic data for detailed views
    const forumTopicData = {
        'leetcode-decode-ways': {
            title: 'LeetCode 72 – Decode Ways',
            tags: ['TypeScript', 'Java', 'C++'],
            comments: [
                {
                    id: 1,
                    author: 'Arjun Kumar',
                    role: 'Member',
                    avatar: 'https://via.placeholder.com/40x40/8b5cf6/ffffff?text=AK',
                    time: '2 hours ago',
                    text: 'I\'m struggling with the dynamic programming approach for this problem. Can someone explain the optimal substructure? I understand the base cases but getting confused with the recurrence relation.'
                },
                {
                    id: 2,
                    author: 'Priya Patel',
                    role: 'Moderator',
                    avatar: 'https://via.placeholder.com/40x40/10b981/ffffff?text=PP',
                    time: '1 hour ago',
                    text: 'Great question! The key insight is that for each position, you can decode either 1 digit or 2 digits (if valid). So dp[i] = dp[i-1] + dp[i-2] when both single and double digit decodings are valid. Let me share a TypeScript solution...'
                },
                {
                    id: 3,
                    author: 'Rahul Gupta',
                    role: 'Member',
                    avatar: 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=RG',
                    time: '45 minutes ago',
                    text: 'Here\'s my Java implementation with memoization. The time complexity is O(n) and space complexity is O(n). You can optimize space to O(1) by only keeping track of the last two values.'
                }
            ]
        },
        'react-hooks-guide': {
            title: 'React Hooks Best Practices Guide',
            tags: ['React', 'JavaScript', 'Frontend'],
            comments: [
                {
                    id: 1,
                    author: 'Priya Patel',
                    role: 'Moderator',
                    avatar: 'https://via.placeholder.com/40x40/10b981/ffffff?text=PP',
                    time: '5 hours ago',
                    text: 'I\'ve compiled a comprehensive guide on React Hooks best practices. This covers useState, useEffect, custom hooks, and common pitfalls to avoid. Perfect for beginners and intermediate developers.'
                },
                {
                    id: 2,
                    author: 'Sneha Joshi',
                    role: 'Admin',
                    avatar: 'https://via.placeholder.com/40x40/ec4899/ffffff?text=SJ',
                    time: '4 hours ago',
                    text: 'Excellent resource! I\'d like to add that useCallback and useMemo are often overused. Only use them when you have actual performance issues, not as a default optimization.'
                }
            ]
        },
        'python-data-structures': {
            title: 'Python Data Structures Cheat Sheet',
            tags: ['Python', 'Algorithms', 'Beginner'],
            comments: [
                {
                    id: 1,
                    author: 'Rahul Gupta',
                    role: 'Member',
                    avatar: 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=RG',
                    time: '1 day ago',
                    text: 'Created a comprehensive cheat sheet covering lists, dictionaries, sets, tuples, and their time complexities. Includes practical examples and when to use each data structure.'
                }
            ]
        },
        'web-security-basics': {
            title: 'Web Security Fundamentals',
            tags: ['Security', 'Web Dev', 'Advanced'],
            comments: [
                {
                    id: 1,
                    author: 'Sneha Joshi',
                    role: 'Admin',
                    avatar: 'https://via.placeholder.com/40x40/ec4899/ffffff?text=SJ',
                    time: '3 days ago',
                    text: 'Let\'s discuss essential web security concepts: XSS, CSRF, SQL injection, and how to prevent them. I\'ll share practical examples and security headers you should implement.'
                }
            ]
        },
        'git-workflow-tips': {
            title: 'Git Workflow Tips for Team Projects',
            tags: ['Git', 'Collaboration', 'Workflow'],
            comments: [
                {
                    id: 1,
                    author: 'Vikash Singh',
                    role: 'Member',
                    avatar: 'https://via.placeholder.com/40x40/06b6d4/ffffff?text=VS',
                    time: '1 week ago',
                    text: 'Sharing some Git workflow strategies that have worked well for our team projects. Covers branching strategies, commit conventions, and merge vs rebase decisions.'
                }
            ]
        }
    };
    
    // Get forum elements
    const topicCards = document.querySelectorAll('.topic-card');
    const forumListing = document.getElementById('forumListing');
    const topicDetail = document.getElementById('topicDetail');
    const backToForumButton = document.getElementById('backToForum');
    const newTopicBtn = document.getElementById('newTopicBtn');
    const commentForm = document.getElementById('commentForm');
    const forumNavBtns = document.querySelectorAll('.forum-nav-btn');
    
    // Topic card click handlers
    topicCards.forEach(card => {
        card.addEventListener('click', function() {
            const topicId = this.getAttribute('data-topic');
            showTopicDetail(topicId);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#8b5cf6';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(226, 232, 240, 0.8)';
        });
    });
    
    // Function to show topic detail
    function showTopicDetail(topicId) {
        const topic = forumTopicData[topicId];
        if (!topic) return;
        
        // Update topic detail content
        document.getElementById('topicDetailTitle').textContent = topic.title;
        
        // Update tags
        const tagsContainer = document.getElementById('topicDetailTags');
        tagsContainer.innerHTML = '';
        topic.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = `tag ${tag.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
        
        // Update comments
        const commentsList = document.getElementById('commentsList');
        commentsList.innerHTML = '';
        topic.comments.forEach(comment => {
            const commentElement = createCommentElement(comment);
            commentsList.appendChild(commentElement);
        });
        
        // Switch views
        forumListing.classList.remove('active');
        topicDetail.classList.add('active');
        
        // Scroll to top
        mainContent.scrollTop = 0;
    }
    
    // Function to create comment element
    function createCommentElement(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-card';
        commentDiv.innerHTML = `
            <div class="comment-header">
                <img src="${comment.avatar}" alt="${comment.author}" class="comment-avatar">
                <div class="comment-author">
                    <div class="comment-author-name">${comment.author}</div>
                    <div class="comment-author-role">${comment.role}</div>
                </div>
                <div class="comment-time">${comment.time}</div>
            </div>
            <div class="comment-text">${comment.text}</div>
        `;
        return commentDiv;
    }
    
    // Back button handler
    if (backToForumButton) {
        backToForumButton.addEventListener('click', function() {
            topicDetail.classList.remove('active');
            forumListing.classList.add('active');
            mainContent.scrollTop = 0;
        });
    }
    
    // New topic button handler
    if (newTopicBtn) {
        newTopicBtn.addEventListener('click', function() {
            showNotification('New Topic feature coming soon! Stay tuned for updates.', 'info');
        });
    }
    
    // Forum navigation buttons
    forumNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            forumNavBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            
            // Handle different forum views
            switch(view) {
                case 'topics':
                    showNotification('Showing all topics', 'info');
                    break;
                case 'members':
                    showNotification('Members directory coming soon!', 'info');
                    break;
                case 'tags':
                    showNotification('Browse by tags feature coming soon!', 'info');
                    break;
                case 'activity':
                    showNotification('Activity feed coming soon!', 'info');
                    break;
            }
        });
    });
    
    // Comment form submission
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const commentText = document.getElementById('commentText').value.trim();
            
            if (!commentText) {
                showNotification('Please enter a comment before submitting.', 'error');
                return;
            }
            
            if (commentText.length < 10) {
                showNotification('Comment must be at least 10 characters long.', 'error');
                return;
            }
            
            // Create new comment
            const newComment = {
                id: Date.now(),
                author: 'You',
                role: 'Member',
                avatar: 'https://via.placeholder.com/40x40/2563eb/ffffff?text=You',
                time: 'Just now',
                text: commentText
            };
            
            // Add comment to the list
            const commentsList = document.getElementById('commentsList');
            const commentElement = createCommentElement(newComment);
            commentsList.appendChild(commentElement);
            
            // Clear form
            this.reset();
            
            // Show success message
            showNotification('Comment added successfully!', 'success');
            
            // Scroll to new comment
            commentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    
    // Add animation to forum cards on scroll
    const forumObserver = new IntersectionObserver((entries) => {
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
    
    // Observe topic cards for animation
    topicCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        forumObserver.observe(card);
    });
    
    // Get elements
    const joinCommunityBtn = document.getElementById('joinCommunityBtn');
    const registrationSection = document.getElementById('registrationSection');
    const registrationForm = document.getElementById('registrationForm');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    const loginLink = document.getElementById('loginLink');
    
    // Join Community button functionality
    if (joinCommunityBtn) {
        joinCommunityBtn.addEventListener('click', function() {
            // Smooth scroll to registration section
            registrationSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add focus to first input after scroll
            setTimeout(() => {
                const firstInput = document.getElementById('prn');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 800);
        });
    }
    
    // Password toggle functionality
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Update icon
            const icon = this.querySelector('.password-icon');
            if (icon) {
                icon.textContent = type === 'password' ? '👁️' : '🙈';
            }
            
            // Update aria-label
            this.setAttribute('aria-label', 
                type === 'password' ? 'Show password' : 'Hide password'
            );
        });
    }
    
    // Registration form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const prn = formData.get('prn').trim();
            const username = formData.get('username').trim();
            const password = formData.get('password');
            
            // Basic validation
            if (!prn || !username || !password) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (prn.length < 3) {
                showNotification('PRN must be at least 3 characters long.', 'error');
                return;
            }
            
            if (username.length < 3) {
                showNotification('Username must be at least 3 characters long.', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters long.', 'error');
                return;
            }
            
            // Simulate registration process
            const submitBtn = this.querySelector('.register-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Show loading state
            submitBtn.querySelector('span').textContent = 'Registering...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                
                // Show success message
                showNotification('Registration successful! Welcome to Code Vimarsh!', 'success');
                
                // Reset form
                this.reset();
                
                // In a real application, you would redirect or update the UI
                // For now, we'll just show a success message
            }, 2000);
        });
    }
    
    // Login link functionality
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, this would navigate to the login page
            // For now, we'll show a notification
            showNotification('Login functionality would redirect to /login page', 'info');
            
            // You can replace this with actual navigation:
            // window.location.href = '/login';
        });
    }
    
    // Form input enhancements
    const formInputs = document.querySelectorAll('.registration-form input');
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add input validation feedback
        input.addEventListener('input', function() {
            this.classList.remove('error');
            
            // Real-time validation
            if (this.id === 'prn' && this.value.length > 0 && this.value.length < 3) {
                this.classList.add('error');
            } else if (this.id === 'username' && this.value.length > 0 && this.value.length < 3) {
                this.classList.add('error');
            } else if (this.id === 'password' && this.value.length > 0 && this.value.length < 6) {
                this.classList.add('error');
            }
        });
    });
    
    // Add smooth scroll behavior for better UX
    function smoothScrollToElement(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Intersection Observer for registration section animation
    const registrationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    if (registrationSection) {
        registrationObserver.observe(registrationSection);
    }
    
    // Project data for detailed views
    const projectData = {
        'ezylink': {
            title: 'Ezylink',
            owner: {
                name: 'Arjun Sharma',
                role: 'Full Stack Developer',
                image: 'https://via.placeholder.com/60x60/8b5cf6/ffffff?text=AS',
                linkedin: 'https://linkedin.com/in/arjunsharma',
                github: 'https://github.com/arjunsharma'
            },
            description: 'Ezylink is a modern URL shortener platform that allows users to create custom short links, track analytics, and manage their link campaigns. Built with a focus on performance and user experience, it features real-time analytics, custom domains, and team collaboration tools.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Chart.js'],
            features: [
                'Custom short URL generation with personalized aliases',
                'Real-time click analytics and geographic tracking',
                'Team collaboration and link sharing capabilities',
                'Custom domain integration for branded links',
                'QR code generation for easy mobile sharing',
                'Bulk URL shortening for enterprise users'
            ],
            liveLink: 'https://ezylink-demo.vercel.app',
            githubLink: 'https://github.com/codevimarsh/ezylink',
            screenshot: 'https://via.placeholder.com/600x400/2563eb/ffffff?text=Ezylink+Dashboard',
            stats: { stars: 45, forks: 12, commits: 187, contributors: 3 }
        },
        'integrator': {
            title: 'Integrator',
            owner: {
                name: 'Priya Patel',
                role: 'Backend Developer',
                image: 'https://via.placeholder.com/60x60/10b981/ffffff?text=PP',
                linkedin: 'https://linkedin.com/in/priyapatel',
                github: 'https://github.com/priyapatel'
            },
            description: 'Integrator is a powerful API integration tool that simplifies connecting different services and automating workflows. It provides a visual interface for creating complex integrations without writing code, making it perfect for businesses looking to streamline their operations.',
            technologies: ['Python', 'Flask', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
            features: [
                'Visual workflow builder with drag-and-drop interface',
                'Pre-built connectors for popular APIs and services',
                'Real-time data synchronization and transformation',
                'Automated error handling and retry mechanisms',
                'Comprehensive logging and monitoring dashboard',
                'Scalable architecture supporting high-volume integrations'
            ],
            liveLink: 'https://integrator-demo.herokuapp.com',
            githubLink: 'https://github.com/codevimarsh/integrator',
            screenshot: 'https://via.placeholder.com/600x400/10b981/ffffff?text=Integrator+Workflow',
            stats: { stars: 32, forks: 8, commits: 143, contributors: 2 }
        },
        'taskflow': {
            title: 'TaskFlow',
            owner: {
                name: 'Rahul Gupta',
                role: 'Frontend Developer',
                image: 'https://via.placeholder.com/60x60/8b5cf6/ffffff?text=RG',
                linkedin: 'https://linkedin.com/in/rahulgupta',
                github: 'https://github.com/rahulgupta'
            },
            description: 'TaskFlow is a comprehensive project management application designed for modern teams. It combines intuitive task management with powerful collaboration features, helping teams stay organized and productive while working on complex projects.',
            technologies: ['Vue.js', 'Express', 'MySQL', 'Socket.io', 'Vuex', 'Bootstrap'],
            features: [
                'Kanban-style task boards with customizable workflows',
                'Real-time collaboration and instant notifications',
                'Time tracking and productivity analytics',
                'File sharing and document management',
                'Team chat and communication tools',
                'Advanced reporting and project insights'
            ],
            liveLink: 'https://taskflow-app.netlify.app',
            githubLink: 'https://github.com/codevimarsh/taskflow',
            screenshot: 'https://via.placeholder.com/600x400/8b5cf6/ffffff?text=TaskFlow+Dashboard',
            stats: { stars: 67, forks: 15, commits: 234, contributors: 4 }
        },
        'codeshare': {
            title: 'CodeShare',
            owner: {
                name: 'Sneha Joshi',
                role: 'Full Stack Developer',
                image: 'https://via.placeholder.com/60x60/f59e0b/ffffff?text=SJ',
                linkedin: 'https://linkedin.com/in/snehajoshi',
                github: 'https://github.com/snehajoshi'
            },
            description: 'CodeShare is a real-time code collaboration platform that enables developers to write, share, and debug code together. With features like live editing, video chat, and integrated development tools, it\'s perfect for pair programming and code reviews.',
            technologies: ['JavaScript', 'Socket.io', 'Redis', 'Monaco Editor', 'WebRTC', 'AWS'],
            features: [
                'Real-time collaborative code editing with syntax highlighting',
                'Integrated video and voice chat for seamless communication',
                'Multiple programming language support with IntelliSense',
                'Version control integration with Git repositories',
                'Screen sharing and remote cursor tracking',
                'Code execution environment with multiple runtime support'
            ],
            liveLink: 'https://codeshare-live.vercel.app',
            githubLink: 'https://github.com/codevimarsh/codeshare',
            screenshot: 'https://via.placeholder.com/600x400/f59e0b/ffffff?text=CodeShare+Editor',
            stats: { stars: 89, forks: 23, commits: 312, contributors: 5 }
        },
        'dataviz': {
            title: 'DataViz',
            owner: {
                name: 'Amit Kumar',
                role: 'Data Scientist',
                image: 'https://via.placeholder.com/60x60/ec4899/ffffff?text=AK',
                linkedin: 'https://linkedin.com/in/amitkumar',
                github: 'https://github.com/amitkumar'
            },
            description: 'DataViz is an advanced data visualization tool that transforms complex datasets into beautiful, interactive charts and dashboards. It supports multiple data sources and provides powerful analytics capabilities for data-driven decision making.',
            technologies: ['D3.js', 'Python', 'FastAPI', 'Pandas', 'NumPy', 'Plotly'],
            features: [
                'Interactive charts with zoom, pan, and filter capabilities',
                'Support for multiple data formats (CSV, JSON, SQL databases)',
                'Real-time data streaming and automatic updates',
                'Customizable dashboard creation with drag-and-drop',
                'Advanced statistical analysis and trend detection',
                'Export capabilities for presentations and reports'
            ],
            liveLink: 'https://dataviz-platform.herokuapp.com',
            githubLink: 'https://github.com/codevimarsh/dataviz',
            screenshot: 'https://via.placeholder.com/600x400/ec4899/ffffff?text=DataViz+Charts',
            stats: { stars: 54, forks: 18, commits: 198, contributors: 3 }
        },
        'smartbot': {
            title: 'SmartBot',
            owner: {
                name: 'Vikash Singh',
                role: 'AI/ML Engineer',
                image: 'https://via.placeholder.com/60x60/06b6d4/ffffff?text=VS',
                linkedin: 'https://linkedin.com/in/vikashsingh',
                github: 'https://github.com/vikashsingh'
            },
            description: 'SmartBot is an intelligent chatbot assistant powered by advanced natural language processing. It can understand context, provide helpful responses, and integrate with various business systems to automate customer support and internal processes.',
            technologies: ['TensorFlow', 'Python', 'NLP', 'BERT', 'Flask', 'MongoDB'],
            features: [
                'Advanced natural language understanding with context awareness',
                'Multi-language support with real-time translation',
                'Integration with popular messaging platforms and APIs',
                'Machine learning-powered response improvement over time',
                'Sentiment analysis and emotion detection capabilities',
                'Custom training on domain-specific knowledge bases'
            ],
            liveLink: 'https://smartbot-ai.herokuapp.com',
            githubLink: 'https://github.com/codevimarsh/smartbot',
            screenshot: 'https://via.placeholder.com/600x400/06b6d4/ffffff?text=SmartBot+Interface',
            stats: { stars: 76, forks: 21, commits: 267, contributors: 4 }
        }
    };
    
    // Get gallery elements
    const projectCards = document.querySelectorAll('.project-card');
    const galleryListing = document.getElementById('galleryListing');
    const projectDetail = document.getElementById('projectDetail');
    const backToGalleryButton = document.getElementById('backToGallery');
    
    // Project card click handlers
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            showProjectDetail(projectId);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#8b5cf6';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(226, 232, 240, 0.8)';
        });
    });
    
    // Function to show project detail
    function showProjectDetail(projectId) {
        const project = projectData[projectId];
        if (!project) return;
        
        // Update project detail content
        document.getElementById('projectDetailTitle').textContent = project.title;
        document.getElementById('projectOwnerName').textContent = project.owner.name;
        document.getElementById('projectOwnerRole').textContent = project.owner.role;
        document.getElementById('projectOwnerImage').src = project.owner.image;
        document.getElementById('projectDescription').textContent = project.description;
        document.getElementById('projectLiveLink').href = project.liveLink;
        document.getElementById('projectGithubLink').href = project.githubLink;
        document.getElementById('developerLinkedIn').href = project.owner.linkedin;
        document.getElementById('developerGithub').href = project.owner.github;
        document.getElementById('projectScreenshot').src = project.screenshot;
        
        // Update technology tags
        const techContainer = document.getElementById('projectTechTags');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            techContainer.appendChild(techTag);
        });
        
        // Update features list
        const featuresList = document.getElementById('projectFeatures');
        featuresList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Update stats
        document.getElementById('projectStars').textContent = project.stats.stars;
        document.getElementById('projectForks').textContent = project.stats.forks;
        document.getElementById('projectCommits').textContent = project.stats.commits;
        document.getElementById('projectContributors').textContent = project.stats.contributors;
        
        // Switch views
        galleryListing.classList.remove('active');
        projectDetail.classList.add('active');
        
        // Scroll to top
        mainContent.scrollTop = 0;
    }
    
    // Back button handler
    if (backToGalleryButton) {
        backToGalleryButton.addEventListener('click', function() {
            projectDetail.classList.remove('active');
            galleryListing.classList.add('active');
            mainContent.scrollTop = 0;
        });
    }
    
    // Demo button handler
    const playDemoBtn = document.getElementById('playDemoBtn');
    if (playDemoBtn) {
        playDemoBtn.addEventListener('click', function() {
            const liveLink = document.getElementById('projectLiveLink').href;
            window.open(liveLink, '_blank');
        });
    }
    
    // Sidebar logo click handler
    const sidebarLogo = document.querySelector('.sidebar-logo');
    if (sidebarLogo) {
        sidebarLogo.addEventListener('click', function() {
            showSection('home');
        });
        
        // Add keyboard support for logo
        sidebarLogo.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSection('home');
            }
        });
    }
    
    // Hero brand logo click handler
    const heroBrandLogo = document.querySelector('.hero-brand-logo');
    if (heroBrandLogo) {
        heroBrandLogo.addEventListener('click', function() {
            // Scroll to top of home section
            mainContent.scrollTop = 0;
        });
        
        heroBrandLogo.style.cursor = 'pointer';
    }
    
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
    
    // Lazy loading for images
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }
    
    // Debounce resize events for better performance
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
    
    // Optimized resize handler
    const handleResize = debounce(() => {
        // Close sidebar on desktop breakpoint
        if (window.innerWidth >= 1024) {
            closeMobileSidebar();
        }
        
        // Update any layout-dependent calculations here
        updateLayoutCalculations();
    }, 250);
    
    function updateLayoutCalculations() {
        // Add any layout calculations that need to run on resize
        // This is a placeholder for future optimizations
    }
    
    window.addEventListener('resize', handleResize);
    
    // Initialize lazy loading
    initializeLazyLoading();
    
    console.log('Code Vimarsh website initialized successfully! 🚀');
});