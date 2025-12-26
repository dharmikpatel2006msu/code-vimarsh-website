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
       EVENT HANDLERS AND MODAL FUNCTIONS
       =================================== */
    
    // Event details modal functions
    function openEventDetails(eventId) {
        showNotification('Event details feature coming soon!', 'info');
    }
    
    function closeEventDetails() {
        // Implementation for closing event details
    }
    
    // Project details modal functions
    function openProjectDetails(projectId) {
        showNotification('Project details feature coming soon!', 'info');
    }
    
    function closeProjectDetails() {
        // Implementation for closing project details
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
    
    console.log('✅ All global functions declared');
    
});

/* ===================================
   ADDITIONAL STYLES FOR NOTIFICATIONS AND SUCCESS MESSAGES
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
`;

// Add the styles to the document
const discordStyleSheet = document.createElement('style');
discordStyleSheet.textContent = discordSuccessStyles;
document.head.appendChild(discordStyleSheet);

console.log('✅ Code Vimarsh JavaScript loaded successfully!');