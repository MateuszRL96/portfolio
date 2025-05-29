{/* <script> */}
// Intersection Observer for animations
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

// Observe all animation elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Skill dots animation
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        const dots = this.querySelectorAll('.skill-dot.active');
        dots.forEach((dot, index) => {
            gsap.to(dot, {
                scale: 1.3,
                duration: 0.2,
                delay: index * 0.1,
                ease: 'back.out(1.7)'
            });
        });
    });
    
    category.addEventListener('mouseleave', function() {
        const dots = this.querySelectorAll('.skill-dot.active');
        gsap.to(dots, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

// Timeline items hover effect
document.querySelectorAll('.timeline-content').forEach(content => {
    content.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    content.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const values = [50, 5, 30]; // Target values
    
    stats.forEach((stat, index) => {
        gsap.fromTo(stat, 
            { textContent: 0 },
            {
                textContent: values[index],
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                onUpdate: function() {
                    stat.textContent = Math.ceil(stat.textContent) + (index === 0 ? '+' : index === 1 ? '+' : '+');
                }
            }
        );
    });
}

// Trigger stats animation when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}
{/* </script> */}