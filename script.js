/**
 * Leadminthub - Material Design JavaScript
 * Material Design interactions, ripple effects, and animations
 */

(function() {
    'use strict';

    // ============================================
    // Material Design Ripple Effect
    // ============================================
    
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-active');
        
        // Determine which ripple class to use
        if (element.classList.contains('mdc-button')) {
            ripple.classList.add('mdc-button__ripple');
        } else if (element.classList.contains('mdc-fab')) {
            ripple.classList.add('mdc-fab__ripple');
        } else {
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
        }
        
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 300);
    }
    
    // Initialize ripple effects
    function initRipples() {
        const rippleElements = document.querySelectorAll('[data-ripple]');
        rippleElements.forEach(element => {
            element.addEventListener('click', function(e) {
                createRipple(e, this);
            });
        });
    }
    
    // ============================================
    // Material Design Text Field Labels
    // ============================================
    
    function initTextFields() {
        // Handle Material Design text fields
        const mdcTextFields = document.querySelectorAll('.mdc-text-field__input');
        mdcTextFields.forEach(field => {
            if (field.value) {
                field.classList.add('has-value');
            }
            
            field.addEventListener('focus', function() {
                this.parentElement.classList.add('mdc-text-field--focused');
            });
            
            field.addEventListener('blur', function() {
                this.parentElement.classList.remove('mdc-text-field--focused');
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
            
            field.addEventListener('input', function() {
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });
        
        // Handle clean form fields (underline style)
        const cleanFormFields = document.querySelectorAll('.form-input');
        cleanFormFields.forEach(field => {
            if (field.value) {
                field.classList.add('has-value');
            }
            
            field.addEventListener('input', function() {
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });
    }
    
    // ============================================
    // Material Design Snackbar
    // ============================================
    
    function showSnackbar(message, duration = 4000) {
        const snackbar = document.getElementById('snackbar');
        const label = snackbar.querySelector('.mdc-snackbar__label');
        
        if (!snackbar || !label) return;
        
        label.textContent = message;
        snackbar.classList.add('show');
        
        setTimeout(() => {
            snackbar.classList.remove('show');
        }, duration);
    }
    
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    
    function toggleDrawer() {
        if (nav && menuToggle && drawerBackdrop) {
            const isActive = nav.classList.contains('active');
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            drawerBackdrop.classList.toggle('active');
        }
    }
    
    function closeDrawer() {
        if (nav && menuToggle && drawerBackdrop) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            drawerBackdrop.classList.remove('active');
        }
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            toggleDrawer();
            const isActive = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isActive);
        });
    }
    
    // Close mobile menu when backdrop is clicked
    if (drawerBackdrop) {
        drawerBackdrop.addEventListener('click', closeDrawer);
    }
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && menuToggle) {
            const isClickInsideNav = nav.contains(e.target);
            const isClickOnToggle = menuToggle.contains(e.target);
            const isClickOnBackdrop = drawerBackdrop && drawerBackdrop.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnToggle && !isClickOnBackdrop && nav.classList.contains('active')) {
                closeDrawer();
            }
        }
    });
    
    // Handle window resize - close mobile menu on desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 599) {
            closeDrawer();
        }
    });
    
    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Active Navigation Highlighting
    // ============================================
    
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollPos = window.pageYOffset + headerHeight + 100;
        
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
    
    // ============================================
    // Header Elevation on Scroll
    // ============================================
    
    const header = document.getElementById('header');
    
    function updateHeaderElevation() {
        if (window.pageYOffset > 0) {
            header.classList.add('elevated');
        } else {
            header.classList.remove('elevated');
        }
    }
    
    // ============================================
    // Scroll-Triggered Animations (Intersection Observer)
    // ============================================
    
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            observer.observe(card);
            // Stagger animation delay
            card.style.transitionDelay = `${index * 100}ms`;
        });
        
        // Observe testimonial cards
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            observer.observe(card);
            card.style.transitionDelay = `${index * 100}ms`;
        });
        
        // Observe FAQ items
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach((item, index) => {
            observer.observe(item);
            item.style.transitionDelay = `${index * 50}ms`;
        });
    }
    
    // ============================================
    // Form Submission Handler
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // Show loading state
                const submitButton = contactForm.querySelector('.mdc-button');
                const originalLabel = submitButton.querySelector('.mdc-button__label').textContent;
                submitButton.querySelector('.mdc-button__label').textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    showSnackbar('Thank you for your message! We will get back to you within 24 hours.');
                    contactForm.reset();
                    
                    // Reset text field labels
                    const textFields = contactForm.querySelectorAll('.mdc-text-field__input, .form-input');
                    textFields.forEach(field => {
                        field.classList.remove('has-value');
                        if (field.parentElement.classList.contains('mdc-text-field')) {
                            field.parentElement.classList.remove('mdc-text-field--focused');
                        }
                    });
                    
                    // Reset button
                    submitButton.querySelector('.mdc-button__label').textContent = originalLabel;
                    submitButton.disabled = false;
                }, 1500);
            } else {
                showSnackbar('Please fill in all fields.');
            }
        });
    }
    
    // ============================================
    // Scroll Event Handlers
    // ============================================
    
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateHeaderElevation();
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // ============================================
    // Initialize on DOM Load
    // ============================================
    
    document.addEventListener('DOMContentLoaded', function() {
        initRipples();
        initTextFields();
        initScrollAnimations();
        updateHeaderElevation();
        updateActiveNav();
    });
    
})();


