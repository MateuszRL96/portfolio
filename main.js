//<script>
// Smooth scrolling for navigation links
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

// Intersection Observer for fade-in animations
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

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Animate code preview on load
gsap.timeline()
    .to('.code-line', {
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power2.out'
    });

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(248, 250, 252, 0.98)';
    } else {
        nav.style.background = 'rgba(248, 250, 252, 0.95)';
    }
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Show success message
    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Wysłano! ✓';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    // Reset after 3 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'linear-gradient(135deg, var(--accent), var(--success))';
        this.reset();
    }, 3000);

    // Here you would normally send the data to your server
    console.log('Form submitted:', data);
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Tech items animation on hover
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        gsap.to(this.querySelector('.icon'), {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    });

    item.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector('.icon'), {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    });
});

// Dynamic typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const subtitle = document.querySelector('.hero-content .subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;
            typeWriter(subtitle, originalText, 50);
        }
    }, 1000);
});

// Contact methods click tracking
document.querySelectorAll('.contact-method').forEach(method => {
    method.addEventListener('click', function() {
        const type = this.querySelector('strong').textContent;
        console.log(`Contact method clicked: ${type}`);

        // Add visual feedback
        gsap.to(this, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out'
        });
    });
});

// Portfolio item hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    const image = item.querySelector('.portfolio-image');

    item.addEventListener('mouseenter', function() {
        gsap.to(image, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', function() {
        gsap.to(image, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    gsap.to(document.body, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    });
});

// Mobile menu toggle (for future mobile optimization)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            z-index: 9999;
            transition: width 0.3s ease;
        `;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add floating contact button
const floatingContact = document.createElement('a');
floatingContact.href = '#contact';
floatingContact.innerHTML = '💬';
floatingContact.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: white;
            text-decoration: none;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
            z-index: 1000;
            transition: all 0.3s ease;
        `;

floatingContact.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) translateY(-2px)';
    this.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)';
});

floatingContact.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) translateY(0px)';
    this.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
});

document.body.appendChild(floatingContact);

// Show/hide floating button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        floatingContact.style.opacity = '1';
        floatingContact.style.pointerEvents = 'auto';
    } else {
        floatingContact.style.opacity = '0';
        floatingContact.style.pointerEvents = 'none';
    }
});

// Initialize floating button as hidden
floatingContact.style.opacity = '0';
floatingContact.style.pointerEvents = 'none';
// </script>