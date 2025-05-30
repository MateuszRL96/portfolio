{/* <script> */}
// GSAP Animations
gsap.registerPlugin();

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Page load animations
gsap.timeline()
    .from('.page-header h1', {duration: 1, y: 50, opacity: 0, ease: 'power3.out'})
    .from('.page-header p', {duration: 1, y: 30, opacity: 0, ease: 'power3.out'}, '-=0.5')
    .from('nav', {duration: 1, y: -100, opacity: 0, ease: 'power3.out'}, '-=0.8');

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.querySelector('.form-success');
    const formError = document.querySelector('.form-error');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Hide any previous messages
        formSuccess.style.display = 'none';
        formError.style.display = 'none';

        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            timeline: document.getElementById('timeline').value,
            message: document.getElementById('message').value
        };

        try {
            const API_URL = window.location.hostname === 'localhost' 
                ? 'http://localhost:3000' 
                : 'https://twoj-backend.onrender.com'; // To URL zostanie utworzone po deploymencie na Render

            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Show success message
                formSuccess.style.display = 'block';
                contactForm.reset();
            } else {
                // Show error message
                formError.style.display = 'block';
            }
        } catch (error) {
            console.error('Błąd:', error);
            formError.style.display = 'block';
        }
    });

    // FAQ Toggle functionality
    window.toggleFAQ = (index) => {
        const faqItems = document.querySelectorAll('.faq-item');
        const faqItem = faqItems[index];
        const answer = faqItem.querySelector('.faq-answer');
        const icon = faqItem.querySelector('.faq-icon');
        
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            icon.textContent = '+';
        } else {
            answer.style.display = 'block';
            icon.textContent = '-';
        }
    };
});

// Contact item hover animations
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        gsap.to(this.querySelector('.contact-icon'), {
            duration: 0.3,
            scale: 1.1,
            rotation: 5,
            ease: 'power2.out'
        });
    });
    
    item.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector('.contact-icon'), {
            duration: 0.3,
            scale: 1,
            rotation: 0,
            ease: 'power2.out'
        });
    });
});

// Alternative methods hover animation
document.querySelectorAll('.alt-method').forEach(method => {
    method.addEventListener('mouseenter', function() {
        gsap.to(this.querySelector('.alt-method-icon'), {
            duration: 0.4,
            scale: 1.1,
            rotation: 10,
            ease: 'elastic.out(1, 0.5)'
        });
    });
    
    method.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector('.alt-method-icon'), {
            duration: 0.4,
            scale: 1,
            rotation: 0,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// Form field focus animations
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.addEventListener('focus', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1.02,
            ease: 'power2.out'
        });
    });
    
    field.addEventListener('blur', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1,
            ease: 'power2.out'
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Phone number click animation
document.querySelectorAll('a[href^="tel:"]').forEach(tel => {
    tel.addEventListener('click', function() {
        gsap.to(this, {
            duration: 0.1,
            scale: 0.95,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
    });
});
// </script>