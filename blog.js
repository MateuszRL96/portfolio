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

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Blog post hover effects
document.querySelectorAll('.blog-post').forEach(post => {
    post.addEventListener('mouseenter', function() {
        gsap.to(this.querySelector('.post-image'), {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    post.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector('.post-image'), {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Category filtering
const categoryItems = document.querySelectorAll('.category-item');
const blogPosts = document.querySelectorAll('.blog-post');

categoryItems.forEach(item => {
    item.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update active category
        categoryItems.forEach(cat => cat.classList.remove('active'));
        this.classList.add('active');
        
        // Filter posts
        blogPosts.forEach(post => {
            if (category === 'all' || post.dataset.category === category) {
                post.style.display = 'block';
                gsap.fromTo(post, 
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, delay: 0.1 }
                );
            } else {
                post.style.display = 'none';
            }
        });
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    blogPosts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            post.style.display = 'block';
            gsap.fromTo(post, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5 }
            );
        } else {
            post.style.display = 'none';
        }
    });
    
    // Reset category filter when searching
    if (searchTerm) {
        categoryItems.forEach(cat => cat.classList.remove('active'));
    }
});

// Newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter-input').value;
    
    if (email) {
        // Simulate success
        const button = this.querySelector('.btn-newsletter');
        const originalText = button.textContent;
        
        button.textContent = '✓ Zapisano!';
        button.style.background = 'rgba(16, 185, 129, 0.8)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            this.reset();
        }, 2000);
    }
});

// Recent posts click effect
document.querySelectorAll('.recent-post-item').forEach(item => {
    item.addEventListener('click', function() {
        gsap.to(this, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
    });
});

// Pagination hover effects
document.querySelectorAll('.pagination button').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            gsap.to(this, {
                scale: 1.1,
                duration: 0.2,
                ease: 'power2.out'
            });
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            gsap.to(this, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        }
    });
});

// Featured post animation
const featuredPost = document.querySelector('.featured-post');
if (featuredPost) {
    featuredPost.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    featuredPost.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}

// Smooth scroll for internal links
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

// Lazy loading simulation for post images
const postImages = document.querySelectorAll('.post-image');
postImages.forEach((img, index) => {
    gsap.fromTo(img,
        { opacity: 0, scale: 0.8 },
        { 
            opacity: 1, 
            scale: 1, 
            duration: 0.6, 
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        }
    );
});
{/* </script> */}