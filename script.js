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
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (sidebar.classList.contains('active')) {
                closeMobileSidebar();
            } else {
                openMobileSidebar();
            }
        });
    }
    
    // Mobile overlay click to close sidebar
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileSidebar();
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 1024 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target)) {
            closeMobileSidebar();
        }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Close sidebar on desktop breakpoint
            if (window.innerWidth >= 1024) {
                closeMobileSidebar();
            }
        }, 250);
    });
    
    // Prevent body scroll when sidebar is open on mobile
    function preventBodyScroll(e) {
        if (sidebar.classList.contains('active') && window.innerWidth < 1024) {
            if (!sidebar.contains(e.target)) {
                e.preventDefault();
            }
        }
    }
    
    document.addEventListener('touchmove', preventBodyScroll, { passive: false });
    document.addEventListener('wheel', preventBodyScroll, { passive: false });
    
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
       HERO & REGISTRATION FUNCTIONALITY
       =================================== */
    
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