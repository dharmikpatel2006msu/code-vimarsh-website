/* ===================================
   CODE VIMARSH WEBSITE JAVASCRIPT - COMPLETE WORKING VERSION
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Code Vimarsh website loading...');
    
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
            targetSection.classList.add('active');
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
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = sidebar.classList.contains('active');
        
        if (!isActive) {
            sidebar.classList.add('active');
            hamburger.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            closeMobileMenu();
        }
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
       DISCORD REGISTRATION FUNCTIONALITY - COMPLETE WORKING VERSION
       =================================== */
    
    // Open Discord registration modal
    function openDiscordRegistration() {
        console.log('🎮 Opening Discord registration modal');
        const modal = document.getElementById('discordRegistrationModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Initialize form validation
            setTimeout(() => {
                initDiscordFormValidation();
            }, 100);
        } else {
            console.error('❌ Discord modal not found');
            showNotification('Registration form not available. Please refresh the page.', 'error');
        }
    }
    
    // Close Discord registration modal
    function closeDiscordRegistration() {
        console.log('🎮 Closing Discord registration modal');
        const modal = document.getElementById('discordRegistrationModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset forms
            const regForm = document.getElementById('discordRegistrationForm');
            const loginForm = document.getElementById('discordLoginForm');
            if (regForm) regForm.reset();
            if (loginForm) loginForm.reset();
            clearValidationErrors();
        }
    }
    
    // Show login form
    function showLoginForm() {
        const regForm = document.getElementById('discordRegistrationForm');
        const loginForm = document.getElementById('discordLoginForm');
        if (regForm && loginForm) {
            regForm.style.display = 'none';
            loginForm.style.display = 'block';
            clearValidationErrors();
        }
    }
    
    // Show registration form
    function showRegistrationForm() {
        const regForm = document.getElementById('discordRegistrationForm');
        const loginForm = document.getElementById('discordLoginForm');
        if (regForm && loginForm) {
            loginForm.style.display = 'none';
            regForm.style.display = 'block';
            clearValidationErrors();
        }
    }
    
    // Initialize Discord form validation
    function initDiscordFormValidation() {
        console.log('🔧 Initializing Discord form validation');
        
        const registrationForm = document.getElementById('discordRegistrationForm');
        const prnInput = document.getElementById('discordPrn');
        const passwordInput = document.getElementById('discordPassword');
        
        if (!registrationForm) {
            console.error('❌ Discord registration form not found!');
            return;
        }
        
        // PRN input validation
        if (prnInput) {
            prnInput.addEventListener('input', function(e) {
                handlePRNInput(e);
            });
        }
        
        // Password validation
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                validatePassword(this.value);
            });
        }
        
        // Confirm password validation
        const confirmPasswordInput = document.getElementById('discordConfirmPassword');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', function() {
                validateConfirmPassword(passwordInput.value, this.value);
            });
        }
        
        // Username validation
        const usernameInput = document.getElementById('discordUsername');
        if (usernameInput) {
            usernameInput.addEventListener('input', function() {
                validateUsername(this.value);
            });
        }
        
        // Email validation
        const emailInput = document.getElementById('discordEmail');
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                validateEmailInput(this.value);
            });
        }
        
        // Registration form submission
        registrationForm.addEventListener('submit', function(e) {
            console.log('📝 Registration form submitted');
            e.preventDefault();
            e.stopPropagation();
            
            // Prevent multiple submissions
            const submitBtn = this.querySelector('.discord-register-btn');
            if (submitBtn && submitBtn.disabled) {
                console.log('⚠️ Form already being submitted');
                return;
            }
            
            // Handle registration
            handleDiscordRegistration();
        });
        
        console.log('✅ Discord form validation initialized');
    }
    
    // Handle PRN input
    function handlePRNInput(e) {
        const input = e.target;
        let value = input.value;
        
        // Remove any non-numeric characters
        value = value.replace(/\D/g, '');
        
        // Limit to 10 digits maximum
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        // Update input value
        input.value = value;
        
        // Update progress
        updatePRNProgress(value);
    }
    
    // Update PRN progress
    function updatePRNProgress(prn) {
        const progressFill = document.querySelector('.prn-progress-fill');
        const hint = document.querySelector('.discord-input-hint');
        const prnError = document.getElementById('prnError');
        
        if (progressFill) {
            const progressPercentage = (prn.length / 10) * 100;
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        if (hint) {
            if (prn.length === 0) {
                hint.textContent = 'PRN must start with 80240 and be exactly 10 digits';
            } else if (prn.length < 10) {
                hint.textContent = `${prn.length}/10 digits entered - PRN must start with 80240`;
            } else {
                hint.textContent = '10/10 digits entered - Will validate format on submit';
            }
        }
        
        if (prnError) {
            prnError.textContent = '';
        }
    }
    
    // Validate PRN on submit
    function validatePRNOnSubmit(prn) {
        const prnError = document.getElementById('prnError');
        const prnInput = document.getElementById('discordPrn');
        
        if (!prn || prn.length === 0) {
            if (prnError) prnError.textContent = 'PRN is required';
            if (prnInput) prnInput.classList.add('error');
            return false;
        }
        
        if (prn.length < 10) {
            if (prnError) prnError.textContent = `PRN must be exactly 10 digits (currently ${prn.length} digits)`;
            if (prnInput) prnInput.classList.add('error');
            return false;
        }
        
        if (!prn.startsWith('80240')) {
            if (prnError) prnError.textContent = 'PRN must start with 80240';
            if (prnInput) prnInput.classList.add('error');
            return false;
        }
        
        // PRN is valid
        if (prnError) {
            prnError.textContent = '✓ Valid PRN format';
            prnError.style.color = '#57f287';
        }
        if (prnInput) {
            prnInput.classList.remove('error');
            prnInput.classList.add('valid');
        }
        return true;
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
        const indicators = ['hasNumber', 'hasLetter', 'hasSpecial', 'hasLength'];
        const values = [hasNumber, hasLetter, hasSpecial, hasLength];
        
        indicators.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.toggle('valid', values[index]);
            }
        });
        
        const isValid = hasNumber && hasLetter && hasSpecial && hasLength;
        
        if (password.length === 0) {
            if (passwordError) passwordError.textContent = 'Password is required';
            if (passwordInput) passwordInput.classList.add('error');
            return false;
        }
        
        if (!isValid) {
            if (passwordError) passwordError.textContent = 'Password does not meet requirements';
            if (passwordInput) passwordInput.classList.add('error');
            return false;
        }
        
        if (passwordError) passwordError.textContent = '';
        if (passwordInput) {
            passwordInput.classList.remove('error');
            passwordInput.classList.add('valid');
        }
        return true;
    }
    
    // Validate confirm password
    function validateConfirmPassword(password, confirmPassword) {
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const confirmPasswordInput = document.getElementById('discordConfirmPassword');
        
        if (confirmPassword.length === 0) {
            if (confirmPasswordError) confirmPasswordError.textContent = 'Please confirm your password';
            if (confirmPasswordInput) confirmPasswordInput.classList.add('error');
            return false;
        }
        
        if (password !== confirmPassword) {
            if (confirmPasswordError) confirmPasswordError.textContent = 'Passwords do not match';
            if (confirmPasswordInput) confirmPasswordInput.classList.add('error');
            return false;
        }
        
        if (confirmPasswordError) confirmPasswordError.textContent = '';
        if (confirmPasswordInput) {
            confirmPasswordInput.classList.remove('error');
            confirmPasswordInput.classList.add('valid');
        }
        return true;
    }
    
    // Validate username
    function validateUsername(username) {
        const usernameError = document.getElementById('usernameError');
        const usernameInput = document.getElementById('discordUsername');
        
        if (username.length === 0) {
            if (usernameError) usernameError.textContent = 'Username is required';
            if (usernameInput) usernameInput.classList.add('error');
            return false;
        }
        
        if (username.length < 3) {
            if (usernameError) usernameError.textContent = 'Username must be at least 3 characters long';
            if (usernameInput) usernameInput.classList.add('error');
            return false;
        }
        
        if (usernameError) usernameError.textContent = '';
        if (usernameInput) {
            usernameInput.classList.remove('error');
            usernameInput.classList.add('valid');
        }
        return true;
    }
    
    // Validate email
    function validateEmailInput(email) {
        const emailError = document.getElementById('emailError');
        const emailInput = document.getElementById('discordEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.length === 0) {
            if (emailError) emailError.textContent = 'Email is required';
            if (emailInput) emailInput.classList.add('error');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            if (emailError) emailError.textContent = 'Please enter a valid email address';
            if (emailInput) emailInput.classList.add('error');
            return false;
        }
        
        if (emailError) emailError.textContent = '';
        if (emailInput) {
            emailInput.classList.remove('error');
            emailInput.classList.add('valid');
        }
        return true;
    }
    
    // Clear validation errors
    function clearValidationErrors() {
        const errorElements = document.querySelectorAll('.discord-error');
        const inputElements = document.querySelectorAll('.discord-input');
        
        errorElements.forEach(error => {
            error.textContent = '';
            error.style.color = '#ed4245';
        });
        
        inputElements.forEach(input => {
            input.classList.remove('error', 'valid');
        });
        
        // Reset password requirements
        const requirements = document.querySelectorAll('.discord-password-requirements li');
        requirements.forEach(req => req.classList.remove('valid'));
        
        // Reset PRN progress
        updatePRNProgress('');
    }
    
    // Handle Discord registration - COMPLETE WORKING VERSION
    async function handleDiscordRegistration() {
        console.log('🚀 Starting Discord registration process');
        
        const form = document.getElementById('discordRegistrationForm');
        if (!form) {
            console.error('❌ Registration form not found');
            showNotification('Registration form not found. Please refresh the page.', 'error');
            return;
        }
        
        // Get form data
        const prnInput = document.getElementById('discordPrn');
        const usernameInput = document.getElementById('discordUsername');
        const emailInput = document.getElementById('discordEmail');
        const passwordInput = document.getElementById('discordPassword');
        const confirmPasswordInput = document.getElementById('discordConfirmPassword');
        
        if (!prnInput || !usernameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
            console.error('❌ Form inputs not found');
            showNotification('Form inputs not found. Please refresh the page.', 'error');
            return;
        }
        
        const prn = prnInput.value.trim();
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        console.log('📝 Form data collected:', { prn, username, email, password: '***', confirmPassword: '***' });
        
        // Get submit button
        const submitBtn = form.querySelector('.discord-register-btn');
        if (!submitBtn) {
            console.error('❌ Submit button not found');
            showNotification('Submit button not found. Please refresh the page.', 'error');
            return;
        }
        
        const originalText = submitBtn.innerHTML;
        
        try {
            console.log('🔍 Starting validation...');
            
            // Frontend validation
            const isPrnValid = validatePRNOnSubmit(prn);
            const isUsernameValid = validateUsername(username);
            const isEmailValid = validateEmailInput(email);
            const isPasswordValid = validatePassword(password);
            const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);
            
            console.log('✅ Validation results:', {
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
            
            console.log('✅ All validations passed, sending to backend...');
            
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
            console.log('📡 Sending registration request to backend...');
            showNotification('Creating your account...', 'info', 2000);
            
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(registrationData)
            });
            
            console.log('📡 Backend response status:', response.status);
            
            let result;
            try {
                result = await response.json();
            } catch (parseError) {
                console.error('❌ Failed to parse response as JSON:', parseError);
                throw new Error('Invalid response from server');
            }
            
            console.log('📡 Backend response:', result);
            
            if (response.ok && result.success) {
                // Registration successful
                console.log('🎉 Registration successful!');
                
                // Update button to show email sending status
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending confirmation email...';
                showNotification('Sending confirmation email...', 'info', 2000);
                
                // Show success message
                if (result.emailSent) {
                    showRegistrationSuccess(username, email);
                    showNotification('🎉 Registration successful! Confirmation email sent.', 'success', 5000);
                } else {
                    showRegistrationSuccessWithEmailWarning(username, email);
                    showNotification('⚠️ Registration successful, but confirmation email failed. Please contact support.', 'warning', 8000);
                }
                
                // Reset form
                form.reset();
                clearValidationErrors();
                
                console.log('✅ Registration process completed successfully');
                
            } else {
                // Registration failed
                console.error('❌ Registration failed:', result.message);
                
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                
                // Show error message from backend
                showNotification(result.message || 'Registration failed. Please try again.', 'error');
            }
            
        } catch (error) {
            console.error('❌ Registration error:', error);
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            // Show network error message
            if (error.message.includes('fetch') || error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
                showNotification('❌ Cannot connect to server. Please run: cd server && npm install && npm start', 'error', 8000);
            } else {
                showNotification('❌ Network error. Please check your connection and try again.', 'error');
            }
        }
    }
    
    // Show registration success
    function showRegistrationSuccess(username, email) {
        const formContainer = document.querySelector('.discord-form-container');
        if (!formContainer) return;
        
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
                    <p><small>Didn't receive the email? Check your spam folder or contact support</small></p>
                </div>
            </div>
        `;
        
        formContainer.innerHTML = successHTML;
    }
    
    // Show registration success with email warning
    function showRegistrationSuccessWithEmailWarning(username, email) {
        const formContainer = document.querySelector('.discord-form-container');
        if (!formContainer) return;
        
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
        closeDiscordRegistration();
        setTimeout(() => {
            showNotification('Welcome to Code Vimarsh! Check your email for Discord access.', 'success', 5000);
            showSection('home');
        }, 500);
    }
    
    // Open email client
    function openEmailClient(email) {
        const emailDomain = email.split('@')[1];
        let emailUrl = `mailto:${email}`;
        
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
    
    /* ===================================
       CONTACT FORM HANDLING
       =================================== */
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
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
            
            // Simulate form submission
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
       EVENT HANDLERS AND MODAL FUNCTIONS - FULLY WORKING VERSION
       =================================== */
    
    // Event details data
    const eventDetails = {
        event1: {
            title: "A To Z Guidance for DSA Foundation",
            date: "5 October 2024",
            time: "11:00 to 13:00",
            image: "5October.webp",
            description: "Complete roadmap and guidance for building strong foundations in Data Structures and Algorithms. This comprehensive session will cover everything you need to know to start your DSA journey.",
            highlights: [
                "Complete DSA roadmap from beginner to advanced",
                "Best resources and practice platforms",
                "Time complexity analysis techniques",
                "Problem-solving strategies and patterns",
                "Interview preparation tips",
                "Live coding demonstrations"
            ],
            instructor: "Code Vimarsh Team",
            venue: "Online via Discord",
            prerequisites: "Basic programming knowledge",
            registrationLink: "https://forms.gle/dsa-foundation-registration"
        },
        event2: {
            title: "Fireside Chat With Manu Misra",
            date: "2 August 2024",
            time: "09:30 to 10:30",
            image: "2Auguest.webp",
            description: "An inspiring conversation with industry expert Manu Misra about career growth, tech insights, and the future of software development.",
            highlights: [
                "Career guidance from industry expert",
                "Insights into current tech trends",
                "Q&A session with participants",
                "Networking opportunities",
                "Real-world project experiences",
                "Tips for professional growth"
            ],
            instructor: "Manu Misra - Senior Software Engineer",
            venue: "Online via Discord",
            prerequisites: "None - Open to all",
            registrationLink: "https://forms.gle/fireside-chat-manu"
        },
        event3: {
            title: "Fireside Chat With Nishant Virmani Sir",
            date: "26 September 2024",
            time: "09:30 to 11:00",
            image: "26september.webp",
            description: "Exclusive session with Nishant Virmani Sir sharing valuable insights on technology, leadership, and building successful tech careers.",
            highlights: [
                "Leadership insights from tech veteran",
                "Building successful tech teams",
                "Innovation in technology",
                "Startup vs corporate career paths",
                "Interactive discussion session",
                "Mentorship opportunities"
            ],
            instructor: "Nishant Virmani - Tech Leader & Mentor",
            venue: "Online via Discord",
            prerequisites: "None - Open to all",
            registrationLink: "https://forms.gle/fireside-chat-nishant"
        }
    };
    
    // Project details data
    const projectDetails = {
        ezylink: {
            title: "Ezylink - URL Shortening Platform",
            image: "ezylink-banner.webp",
            description: "A modern, fast, and reliable URL shortening service built with cutting-edge web technologies.",
            features: [
                "Custom short URL generation",
                "Click analytics and tracking",
                "QR code generation",
                "Bulk URL shortening",
                "API for developers",
                "Real-time statistics dashboard"
            ],
            technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Chart.js"],
            githubLink: "https://github.com/codevimarsh/ezylink",
            liveDemo: "https://ezylink.codevimarsh.in",
            contributors: ["Jay Prajapati", "Krupal Patel", "Mihir Bhavsar"]
        },
        integrator: {
            title: "Integrator - API Integration Tool",
            image: "integrator.webp",
            description: "A powerful tool for seamless API integration and management, designed to simplify complex API workflows.",
            features: [
                "Visual API workflow builder",
                "Real-time API testing",
                "Automated documentation generation",
                "Error handling and logging",
                "Multi-environment support",
                "Team collaboration features"
            ],
            technologies: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "Docker"],
            githubLink: "https://github.com/codevimarsh/integrator",
            liveDemo: "https://integrator.codevimarsh.in",
            contributors: ["Shivam Parmar", "Yash Solanki", "Mihir Bhavsar"]
        }
    };
    
    // Event details modal functions
    function openEventDetails(eventId) {
        console.log('🎯 Opening event details for:', eventId);
        
        const event = eventDetails[eventId];
        if (!event) {
            showNotification('Event details not found!', 'error');
            return;
        }
        
        const modal = document.getElementById('eventModal');
        const content = document.getElementById('eventDetailsContent');
        
        if (!modal || !content) {
            showNotification('Event modal not found!', 'error');
            return;
        }
        
        // Create event details HTML
        const eventHTML = `
            <div class="event-details">
                <div class="event-details-header">
                    <img src="${event.image}" alt="${event.title}" class="event-details-image">
                    <div class="event-details-info">
                        <h2 class="event-details-title">${event.title}</h2>
                        <div class="event-details-meta">
                            <div class="event-meta-item">
                                <i class="fas fa-calendar-alt"></i>
                                <span>${event.date}</span>
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-clock"></i>
                                <span>${event.time}</span>
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${event.venue}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="event-details-content">
                    <div class="event-description">
                        <h3>About This Event</h3>
                        <p>${event.description}</p>
                    </div>
                    
                    <div class="event-highlights">
                        <h3>What You'll Learn</h3>
                        <ul>
                            ${event.highlights.map(highlight => `<li><i class="fas fa-check"></i> ${highlight}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="event-instructor">
                        <h3>Instructor</h3>
                        <p><i class="fas fa-user"></i> ${event.instructor}</p>
                    </div>
                    
                    <div class="event-prerequisites">
                        <h3>Prerequisites</h3>
                        <p><i class="fas fa-info-circle"></i> ${event.prerequisites}</p>
                    </div>
                    
                    <div class="event-actions">
                        <button class="btn btn-primary" onclick="registerForEvent('${eventId}')">
                            <i class="fas fa-user-plus"></i>
                            Register Now
                        </button>
                        <button class="btn btn-secondary" onclick="shareEvent('${eventId}')">
                            <i class="fas fa-share"></i>
                            Share Event
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        content.innerHTML = eventHTML;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        showNotification(`Opened details for: ${event.title}`, 'success', 3000);
    }
    
    function closeEventDetails() {
        console.log('🎯 Closing event details modal');
        const modal = document.getElementById('eventModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Project details modal functions
    function openProjectDetails(projectId) {
        console.log('🚀 Opening project details for:', projectId);
        
        const project = projectDetails[projectId];
        if (!project) {
            showNotification('Project details not found!', 'error');
            return;
        }
        
        const modal = document.getElementById('projectModal');
        const content = document.getElementById('projectDetailsContent');
        
        if (!modal || !content) {
            showNotification('Project modal not found!', 'error');
            return;
        }
        
        // Create project details HTML
        const projectHTML = `
            <div class="project-details">
                <div class="project-details-header">
                    <img src="${project.image}" alt="${project.title}" class="project-details-image">
                    <div class="project-details-info">
                        <h2 class="project-details-title">${project.title}</h2>
                        <p class="project-details-description">${project.description}</p>
                    </div>
                </div>
                
                <div class="project-details-content">
                    <div class="project-features">
                        <h3>Key Features</h3>
                        <ul>
                            ${project.features.map(feature => `<li><i class="fas fa-star"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="project-technologies">
                        <h3>Technologies Used</h3>
                        <div class="tech-stack">
                            ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="project-contributors">
                        <h3>Contributors</h3>
                        <div class="contributors-list">
                            ${project.contributors.map(contributor => `<span class="contributor-badge"><i class="fas fa-user"></i> ${contributor}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="project-actions">
                        <button class="btn btn-primary" onclick="openProjectLink('${project.liveDemo}')">
                            <i class="fas fa-external-link-alt"></i>
                            Live Demo
                        </button>
                        <button class="btn btn-secondary" onclick="openProjectLink('${project.githubLink}')">
                            <i class="fab fa-github"></i>
                            View Code
                        </button>
                        <button class="btn btn-outline" onclick="shareProject('${projectId}')">
                            <i class="fas fa-share"></i>
                            Share Project
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        content.innerHTML = projectHTML;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        showNotification(`Opened project: ${project.title}`, 'success', 3000);
    }
    
    function closeProjectDetails() {
        console.log('🚀 Closing project details modal');
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Event registration function
    function registerForEvent(eventId) {
        const event = eventDetails[eventId];
        if (!event) {
            showNotification('Event not found!', 'error');
            return;
        }
        
        // Open registration link
        window.open(event.registrationLink, '_blank');
        showNotification(`Opening registration for: ${event.title}`, 'success', 3000);
    }
    
    // Share event function
    function shareEvent(eventId) {
        const event = eventDetails[eventId];
        if (!event) {
            showNotification('Event not found!', 'error');
            return;
        }
        
        const shareText = `Check out this amazing event: ${event.title} on ${event.date} at ${event.time}. Join Code Vimarsh community!`;
        const shareUrl = `${window.location.origin}${window.location.pathname}#events`;
        
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: shareText,
                url: shareUrl
            });
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
                showNotification('Event details copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Unable to share event. Please copy the URL manually.', 'error');
            });
        }
    }
    
    // Open project link function
    function openProjectLink(url) {
        if (!url) {
            showNotification('Link not available!', 'error');
            return;
        }
        
        window.open(url, '_blank');
        showNotification('Opening project link...', 'info', 2000);
    }
    
    // Share project function
    function shareProject(projectId) {
        const project = projectDetails[projectId];
        if (!project) {
            showNotification('Project not found!', 'error');
            return;
        }
        
        const shareText = `Check out this amazing project: ${project.title} by Code Vimarsh team!`;
        const shareUrl = `${window.location.origin}${window.location.pathname}#gallery`;
        
        if (navigator.share) {
            navigator.share({
                title: project.title,
                text: shareText,
                url: shareUrl
            });
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
                showNotification('Project details copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Unable to share project. Please copy the URL manually.', 'error');
            });
        }
    }
    
    /* ===================================
       RESOURCES SECTION FUNCTIONALITY - FULLY WORKING VERSION
       =================================== */
    
    // Resource data
    const resourceData = {
        'DSA Practice': {
            title: 'Data Structures & Algorithms Practice',
            description: 'Comprehensive resources for mastering DSA concepts and problem-solving',
            resources: [
                {
                    name: 'LeetCode',
                    url: 'https://leetcode.com/',
                    description: 'Premium coding interview preparation platform',
                    type: 'Practice Platform'
                },
                {
                    name: 'GeeksforGeeks',
                    url: 'https://www.geeksforgeeks.org/',
                    description: 'Complete DSA tutorials and practice problems',
                    type: 'Learning Platform'
                },
                {
                    name: 'HackerRank',
                    url: 'https://www.hackerrank.com/',
                    description: 'Coding challenges and skill assessment',
                    type: 'Practice Platform'
                },
                {
                    name: 'Striver DSA Sheet',
                    url: 'https://takeuforward.org/strivers-a2z-dsa-course/',
                    description: 'Comprehensive DSA roadmap by Striver',
                    type: 'Roadmap'
                },
                {
                    name: 'Abdul Bari Algorithms',
                    url: 'https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O',
                    description: 'Complete algorithms course on YouTube',
                    type: 'YouTube Channel'
                }
            ]
        },
        'Web Development': {
            title: 'Modern Web Development Resources',
            description: 'Full-stack web development tutorials and best practices',
            resources: [
                {
                    name: 'MDN Web Docs',
                    url: 'https://developer.mozilla.org/',
                    description: 'Official web development documentation',
                    type: 'Documentation'
                },
                {
                    name: 'freeCodeCamp',
                    url: 'https://www.freecodecamp.org/',
                    description: 'Free full-stack web development curriculum',
                    type: 'Learning Platform'
                },
                {
                    name: 'The Odin Project',
                    url: 'https://www.theodinproject.com/',
                    description: 'Open-source full-stack curriculum',
                    type: 'Learning Platform'
                },
                {
                    name: 'Traversy Media',
                    url: 'https://www.youtube.com/c/TraversyMedia',
                    description: 'Web development tutorials and crash courses',
                    type: 'YouTube Channel'
                },
                {
                    name: 'Net Ninja',
                    url: 'https://www.youtube.com/c/TheNetNinja',
                    description: 'Modern web development tutorials',
                    type: 'YouTube Channel'
                }
            ]
        },
        'Interview Prep': {
            title: 'Technical Interview Preparation',
            description: 'Resources to ace your technical interviews and land your dream job',
            resources: [
                {
                    name: 'Pramp',
                    url: 'https://www.pramp.com/',
                    description: 'Free mock technical interviews',
                    type: 'Practice Platform'
                },
                {
                    name: 'InterviewBit',
                    url: 'https://www.interviewbit.com/',
                    description: 'Technical interview preparation platform',
                    type: 'Practice Platform'
                },
                {
                    name: 'Cracking the Coding Interview',
                    url: 'https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850',
                    description: 'Essential book for coding interviews',
                    type: 'Book'
                },
                {
                    name: 'TechLead',
                    url: 'https://www.youtube.com/c/TechLead',
                    description: 'Career advice and interview tips',
                    type: 'YouTube Channel'
                },
                {
                    name: 'System Design Primer',
                    url: 'https://github.com/donnemartin/system-design-primer',
                    description: 'Learn system design concepts',
                    type: 'GitHub Repository'
                }
            ]
        },
        'YouTube Channels': {
            title: 'Best Programming YouTube Channels',
            description: 'Curated list of top programming and tech YouTube channels',
            resources: [
                {
                    name: 'CodeWithHarry',
                    url: 'https://www.youtube.com/c/CodeWithHarry',
                    description: 'Programming tutorials in Hindi and English',
                    type: 'YouTube Channel'
                },
                {
                    name: 'Apna College',
                    url: 'https://www.youtube.com/c/ApnaCollegeOfficial',
                    description: 'Complete programming courses',
                    type: 'YouTube Channel'
                },
                {
                    name: 'Love Babbar',
                    url: 'https://www.youtube.com/c/LoveBabbar',
                    description: 'DSA and placement preparation',
                    type: 'YouTube Channel'
                },
                {
                    name: 'Fireship',
                    url: 'https://www.youtube.com/c/Fireship',
                    description: 'Modern web development and tech trends',
                    type: 'YouTube Channel'
                },
                {
                    name: 'CS Dojo',
                    url: 'https://www.youtube.com/c/CSDojo',
                    description: 'Programming fundamentals and career advice',
                    type: 'YouTube Channel'
                }
            ]
        }
    };
    
    // Explore resource function
    function exploreResource(resourceTitle) {
        console.log('📚 Exploring resource:', resourceTitle);
        
        const resource = resourceData[resourceTitle];
        if (!resource) {
            showNotification('Resource not found!', 'error');
            return;
        }
        
        // Create resource modal HTML
        const resourceHTML = `
            <div class="resource-modal">
                <div class="resource-modal-overlay" onclick="closeResourceModal()"></div>
                <div class="resource-modal-content">
                    <button class="resource-modal-close" onclick="closeResourceModal()">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <div class="resource-header">
                        <h2 class="resource-title">${resource.title}</h2>
                        <p class="resource-description">${resource.description}</p>
                    </div>
                    
                    <div class="resource-list">
                        ${resource.resources.map(item => `
                            <div class="resource-item">
                                <div class="resource-item-header">
                                    <h3 class="resource-item-title">${item.name}</h3>
                                    <span class="resource-type-badge">${item.type}</span>
                                </div>
                                <p class="resource-item-description">${item.description}</p>
                                <button class="btn btn-primary resource-visit-btn" onclick="visitResource('${item.url}', '${item.name}')">
                                    <i class="fas fa-external-link-alt"></i>
                                    Visit Resource
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="resource-footer">
                        <button class="btn btn-secondary" onclick="closeResourceModal()">
                            <i class="fas fa-arrow-left"></i>
                            Back to Resources
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing resource modal if any
        const existingModal = document.querySelector('.resource-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add resource modal to body
        document.body.insertAdjacentHTML('beforeend', resourceHTML);
        
        // Show modal
        const modal = document.querySelector('.resource-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        showNotification(`Opened ${resource.title} resources`, 'success', 3000);
    }
    
    // Visit resource function
    function visitResource(url, name) {
        if (!url) {
            showNotification('Resource URL not available!', 'error');
            return;
        }
        
        window.open(url, '_blank');
        showNotification(`Opening ${name}...`, 'info', 2000);
    }
    
    // Close resource modal function
    function closeResourceModal() {
        const modal = document.querySelector('.resource-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    /* ===================================
       INITIALIZATION
       =================================== */
    
    // Initialize website
    function initWebsite() {
        console.log('🚀 Code Vimarsh website initializing...');
        
        // Handle initial hash on page load
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        } else {
            showSection('home');
        }
        
        // Show welcome message
        setTimeout(() => {
            showNotification('Welcome to Code Vimarsh! 🚀', 'success', 3000);
        }, 1500);
        
        console.log('✅ Code Vimarsh website initialized successfully!');
    }
    
    // Start the website
    initWebsite();
    
    /* ===================================
       GLOBAL FUNCTION DECLARATIONS
       =================================== */
    
    // Make functions globally accessible
    window.openDiscordRegistration = openDiscordRegistration;
    window.closeDiscordRegistration = closeDiscordRegistration;
    window.showLoginForm = showLoginForm;
    window.showRegistrationForm = showRegistrationForm;
    window.openEventDetails = openEventDetails;
    window.closeEventDetails = closeEventDetails;
    window.openProjectDetails = openProjectDetails;
    window.closeProjectDetails = closeProjectDetails;
    window.redirectToHomepage = redirectToHomepage;
    window.openEmailClient = openEmailClient;
    window.contactSupport = contactSupport;
    window.showNotification = showNotification;
    window.registerForEvent = registerForEvent;
    window.shareEvent = shareEvent;
    window.openProjectLink = openProjectLink;
    window.shareProject = shareProject;
    window.exploreResource = exploreResource;
    window.visitResource = visitResource;
    window.closeResourceModal = closeResourceModal;
    
    console.log('✅ All global functions declared');
    
});

/* ===================================
   ADDITIONAL STYLES FOR NOTIFICATIONS, SUCCESS MESSAGES, AND MODALS
   =================================== */

// Add CSS for Discord success messages
const discordSuccessStyles = `
    .discord-success-message {
        text-align: center;
        padding: 2rem;
        background: linear-gradient(135deg, #10b981, #059669);
        border-radius: 1rem;
        color: white;
    }
    
    .discord-success-message.warning {
        background: linear-gradient(135deg, #f59e0b, #d97706);
    }
    
    .success-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        color: white;
    }
    
    .success-icon.warning {
        color: #fbbf24;
    }
    
    .email-highlight {
        background: rgba(255, 255, 255, 0.2);
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-weight: bold;
        margin: 1rem 0;
    }
    
    .success-details {
        margin: 2rem 0;
    }
    
    .success-step {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 1rem 0;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 0.5rem;
    }
    
    .success-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin: 2rem 0;
        flex-wrap: wrap;
    }
    
    .discord-register-btn.primary {
        background: linear-gradient(135deg, #ff6b35, #6c5ce7);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: bold;
        transition: transform 0.2s ease;
    }
    
    .discord-register-btn.secondary {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: bold;
        transition: transform 0.2s ease;
    }
    
    .discord-register-btn:hover {
        transform: translateY(-2px);
    }
    
    .warning-message {
        background: rgba(0, 0, 0, 0.2);
        padding: 1.5rem;
        border-radius: 0.5rem;
        margin: 1.5rem 0;
        text-align: left;
    }
    
    .warning-message ul {
        margin: 1rem 0;
        padding-left: 1.5rem;
    }
    
    .warning-message li {
        margin: 0.5rem 0;
    }
    
    .warning-message a {
        color: #fbbf24;
        text-decoration: none;
        font-weight: bold;
    }
    
    .warning-message a:hover {
        text-decoration: underline;
    }
    
    .success-footer {
        margin-top: 2rem;
        opacity: 0.8;
    }
    
    /* Event Modal Styles */
    .event-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .event-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .event-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
    }
    
    .event-modal-content {
        position: relative;
        background: white;
        border-radius: 1rem;
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        margin: 2rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .event-modal.active .event-modal-content {
        transform: scale(1);
    }
    
    .event-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(0, 0, 0, 0.1);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: background 0.2s ease;
    }
    
    .event-modal-close:hover {
        background: rgba(0, 0, 0, 0.2);
    }
    
    .event-details-header {
        position: relative;
        overflow: hidden;
        border-radius: 1rem 1rem 0 0;
    }
    
    .event-details-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    
    .event-details-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
        color: white;
        padding: 2rem;
    }
    
    .event-details-title {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    
    .event-details-meta {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
    }
    
    .event-meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .event-details-content {
        padding: 2rem;
    }
    
    .event-details-content h3 {
        color: #333;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .event-highlights ul {
        list-style: none;
        padding: 0;
    }
    
    .event-highlights li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0.5rem 0;
        color: #666;
    }
    
    .event-highlights li i {
        color: #10b981;
    }
    
    .event-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
    }
    
    /* Project Modal Styles */
    .project-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .project-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .project-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
    }
    
    .project-modal-content {
        position: relative;
        background: white;
        border-radius: 1rem;
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        margin: 2rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .project-modal.active .project-modal-content {
        transform: scale(1);
    }
    
    .project-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(0, 0, 0, 0.1);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: background 0.2s ease;
    }
    
    .project-modal-close:hover {
        background: rgba(0, 0, 0, 0.2);
    }
    
    .project-details-header {
        position: relative;
        overflow: hidden;
        border-radius: 1rem 1rem 0 0;
    }
    
    .project-details-image {
        width: 100%;
        height: 250px;
        object-fit: cover;
    }
    
    .project-details-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
        color: white;
        padding: 2rem;
    }
    
    .project-details-title {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    .project-details-description {
        opacity: 0.9;
    }
    
    .project-details-content {
        padding: 2rem;
    }
    
    .project-details-content h3 {
        color: #333;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .project-features ul {
        list-style: none;
        padding: 0;
    }
    
    .project-features li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0.5rem 0;
        color: #666;
    }
    
    .project-features li i {
        color: #f59e0b;
    }
    
    .tech-stack {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;
    }
    
    .tech-badge {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .contributors-list {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;
    }
    
    .contributor-badge {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        font-size: 0.9rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .project-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
    }
    
    /* Resource Modal Styles */
    .resource-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .resource-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .resource-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
    }
    
    .resource-modal-content {
        position: relative;
        background: white;
        border-radius: 1rem;
        max-width: 900px;
        max-height: 90vh;
        overflow-y: auto;
        margin: 2rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .resource-modal.active .resource-modal-content {
        transform: scale(1);
    }
    
    .resource-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(0, 0, 0, 0.1);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: background 0.2s ease;
    }
    
    .resource-modal-close:hover {
        background: rgba(0, 0, 0, 0.2);
    }
    
    .resource-header {
        background: linear-gradient(135deg, #6c5ce7, #a29bfe);
        color: white;
        padding: 2rem;
        border-radius: 1rem 1rem 0 0;
    }
    
    .resource-title {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    .resource-description {
        opacity: 0.9;
        font-size: 1.1rem;
    }
    
    .resource-list {
        padding: 2rem;
    }
    
    .resource-item {
        background: #f8f9fa;
        border-radius: 0.5rem;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        border-left: 4px solid #6c5ce7;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .resource-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    .resource-item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .resource-item-title {
        font-size: 1.3rem;
        font-weight: bold;
        color: #333;
        margin: 0;
    }
    
    .resource-type-badge {
        background: linear-gradient(135deg, #ff6b35, #f9ca24);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .resource-item-description {
        color: #666;
        margin-bottom: 1rem;
        line-height: 1.5;
    }
    
    .resource-visit-btn {
        background: linear-gradient(135deg, #6c5ce7, #a29bfe);
        border: none;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 500;
        transition: transform 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .resource-visit-btn:hover {
        transform: translateY(-2px);
    }
    
    .resource-footer {
        padding: 1rem 2rem 2rem;
        text-align: center;
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
        .event-modal-content,
        .project-modal-content,
        .resource-modal-content {
            margin: 1rem;
            max-height: 95vh;
        }
        
        .event-details-meta {
            flex-direction: column;
            gap: 1rem;
        }
        
        .event-actions,
        .project-actions {
            flex-direction: column;
        }
        
        .tech-stack,
        .contributors-list {
            justify-content: center;
        }
        
        .resource-item-header {
            flex-direction: column;
            align-items: flex-start;
        }
    }
`;

// Add the styles to the document
const discordStyleSheet = document.createElement('style');
discordStyleSheet.textContent = discordSuccessStyles;
document.head.appendChild(discordStyleSheet);

console.log('✅ Code Vimarsh JavaScript loaded successfully!');