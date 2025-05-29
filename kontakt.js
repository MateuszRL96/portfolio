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
const contactForm = document.getElementById('contactForm');
const successMessage = document.querySelector('.form-success');
const errorMessage = document.querySelector('.form-error');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.btn-primary');
    const formData = new FormData(this);
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form
        this.reset();
        
        // Send confirmation email animation
        gsap.from(successMessage, {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
        
    } catch (error) {
        // Show error message
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        gsap.from(errorMessage, {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
    } finally {
        // Hide loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// FAQ Toggle
let openFAQ = null;

function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const currentItem = faqItems[index];
    const answer = currentItem.querySelector('.faq-answer');
    const icon = currentItem.querySelector('.faq-icon');
    
    // Close previously opened FAQ
    if (openFAQ !== null && openFAQ !== index) {
        const prevItem = faqItems[openFAQ];
        const prevAnswer = prevItem.querySelector('.faq-answer');
        const prevIcon = prevItem.querySelector('.faq-icon');
        
        prevAnswer.classList.remove('active');
        prevIcon.style.transform = 'rotate(0deg)';
        prevIcon.textContent = '+';
    }
    
    // Toggle current FAQ
    if (answer.classList.contains('active')) {
        answer.classList.remove('active');
        icon.style.transform = 'rotate(0deg)';
        icon.textContent = '+';
        openFAQ = null;
    } else {
        answer.classList.add('active');
        icon.style.transform = 'rotate(45deg)';
        icon.textContent = '−';
        openFAQ = index;
    }
}

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