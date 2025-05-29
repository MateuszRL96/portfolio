// <script>
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

    document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

    // FAQ Toggle
    function toggleFAQ(index) {
    const allAnswers = document.querySelectorAll('.faq-answer');
    const allQuestions = document.querySelectorAll('.faq-question span:last-child');
    const currentAnswer = allAnswers[index];
    const currentIcon = allQuestions[index];

    // Close all other FAQs
    allAnswers.forEach((answer, i) => {
    if (i !== index) {
    answer.classList.remove('active');
    allQuestions[i].textContent = '+';
}
});

    // Toggle current FAQ
    if (currentAnswer.classList.contains('active')) {
    currentAnswer.classList.remove('active');
    currentIcon.textContent = '+';
} else {
    currentAnswer.classList.add('active');
    currentIcon.textContent = '−';
}
}

    // Service card hover effects
    document.querySelectorAll('.service-visual').forEach(visual => {
    visual.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    visual.addEventListener('mouseleave', function() {
    gsap.to(this, {
    scale: 1,
    duration: 0.3,
    ease: 'power2.out'
});
});
});

    // Process steps animation
    document.querySelectorAll('.process-step').forEach((step, index) => {
    step.addEventListener('mouseenter', function() {
        gsap.to(this.querySelector('.step-number'), {
            scale: 1.2,
            rotation: 360,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });
    });

    step.addEventListener('mouseleave', function() {
    gsap.to(this.querySelector('.step-number'), {
    scale: 1,
    rotation: 0,
    duration: 0.3,
    ease: 'power2.out'
});
});
});
{/*</script>*/}