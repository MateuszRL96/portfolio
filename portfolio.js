{/* <script> */}
    // Project data
    const projects = {
        techmart: {
            icon: '🛒',
            title: 'Sklep TechMart',
            description: 'Kompleksowy sklep internetowy z elektroniką, stworzony od podstaw z naciskiem na użyteczność i wydajność. Projekt obejmuje pełną integrację z systemami płatności, zarządzanie zapasami w czasie rzeczywistym, oraz zaawansowany panel administracyjny.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express.js'],
            features: [
                'Responsywny design na wszystkich urządzeniach',
                'Integracja z PayU, Stripe i PayPal',
                'System zarządzania zapasami w czasie rzeczywistym',
                'Zaawansowany panel administracyjny',
                'Filtry produktów i wyszukiwarka',
                'System opinii i ocen klientów',
                'Optymalizacja SEO i Core Web Vitals',
                'Analytics i szczegółowe raporty sprzedaży'
            ]
        },
        medica: {
            icon: '🏥',
            title: 'Klinika Medica',
            description: 'Nowoczesna strona internetowa dla kliniki medycznej z zaawansowanym systemem rezerwacji wizyt online. Projekt zawiera panel pacjenta, zarządzanie harmonogramem lekarzy oraz integrację z systemami medycznymi.',
            tech: ['WordPress', 'PHP', 'MySQL', 'jQuery', 'Bootstrap'],
            features: [
                'System rezerwacji wizyt online',
                'Panel pacjenta z historią wizyt',
                'Zarządzanie harmonogramem lekarzy',
                'Integracja z kalendarzem Google',
                'System przypomnień SMS/Email',
                'Panel administracyjny dla recepcji',
                'Responsywny design medical-first',
                'Zgodność z RODO i przepisami medycznymi'
            ]
        },
        taskflow: {
            icon: '📊',
            title: 'TaskFlow Pro',
            description: 'Zaawansowana aplikacja SPA do zarządzania projektami zespołowymi z funkcjami real-time collaboration. System wspiera metodyki Agile/Scrum z zaawansowaną analityką produktywności.',
            tech: ['Vue.js', 'Python', 'PostgreSQL', 'Socket.io', 'Redis'],
            features: [
                'Real-time collaboration i chat',
                'Kanban boards z drag & drop',
                'Gantt charts i timeline projektów',
                'System notyfikacji push',
                'Zaawansowana analityka i raporty',
                'Integracja z GitHub/GitLab',
                'Time tracking i rozliczenia',
                'API dla integracji zewnętrznych'
            ]
        },
        bella: {
            icon: '🍕',
            title: 'Pizzeria Bella',
            description: 'Elegancka strona restauracji z systemem zamówień online i rezerwacją stolików. Projekt zawiera interaktywne menu, system płatności oraz panel zarządzania dla restauracji.',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
            features: [
                'Interaktywne menu z konfiguratorem pizzy',
                'System zamówień online z płatnością',
                'Rezerwacja stolików z kalendarzem',
                'Panel zarządzania dla restauracji',
                'Integracja z systemami dostawy',
                'Program lojalnościowy dla klientów',
                'Responsywny design mobile-first',
                'Optymalizacja lokalna SEO'
            ]
        },
        fashion: {
            icon: '👗',
            title: 'Fashion Store',
            description: 'Butik online z modą damską zbudowany na platformie Shopify. Projekt charakteryzuje się eleganckim designem, zaawansowanym filtrowaniem produktów oraz programem lojalnościowym.',
            tech: ['Shopify', 'Liquid', 'JavaScript', 'SCSS', 'Shopify API'],
            features: [
                'Elegancki design fashion-focused',
                'Zaawansowane filtry produktów',
                'Program lojalnościowy z punktami',
                'Wishlist i porównywarka produktów',
                'Integracja z Instagram Shopping',
                'System size guide i tabele rozmiarów',
                'Multi-currency i międzynarodowa dostawa',
                'A/B testing dla optymalizacji konwersji'
            ]
        },
        finance: {
            icon: '💰',
            title: 'FinanceTracker',
            description: 'Osobista aplikacja do zarządzania finansami z zaawansowanym budżetowaniem i analizą wydatków. System oferuje szczegółowe raporty, cele finansowe oraz integrację z bankami.',
            tech: ['React', 'Express.js', 'MongoDB', 'Chart.js', 'Plaid API'],
            features: [
                'Automatyczna kategoryzacja transakcji',
                'Budżetowanie z alertami wydatków',
                'Cele finansowe i tracking postępów',
                'Integracja z kontami bankowymi',
                'Zaawansowane raporty i wykresy',
                'Eksport danych do Excel/PDF',
                'Bezpieczne szyfrowanie danych',
                'Powiadomienia i insights AI'
            ]
        }
    };

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

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    gsap.fromTo(item, {opacity: 0, scale: 0.8}, {opacity: 1, scale: 1, duration: 0.5});
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        gsap.fromTo(item, {opacity: 0, scale: 0.8}, {opacity: 1, scale: 1, duration: 0.5});
                    } else {
                        gsap.to(item, {opacity: 0, scale: 0.8, duration: 0.3, onComplete: () => {
                            item.style.display = 'none';
                        }});
                    }
                }
            });
        });
    });

    // Portfolio item hover effects
    portfolioItems.forEach(item => {
        const image = item.querySelector('.portfolio-image');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(image, {scale: 1.1, duration: 0.4, ease: 'power2.out'});
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(image, {scale: 1, duration: 0.4, ease: 'power2.out'});
        });
    });

    // Stats animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (target === 98 ? '%' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (target === 98 ? '%' : '');
                }
            }, 20);
        });
    }

    // Trigger stats animation when section is visible
    const statsSection = document.querySelector('.stats-section');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5});

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Modal functions
    function openModal(projectKey) {
        const project = projects[projectKey];
        const modal = document.getElementById('projectModal');
        
        // Update modal content
        document.getElementById('modalIcon').innerHTML = `<div class="modal-close" onclick="closeModal()">&times;</div>${project.icon}`;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        
        // Update tech tags
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        
        // Update features
        const featuresContainer = document.getElementById('modalFeatures');
        featuresContainer.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close modal on background click
    document.getElementById('projectModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Testimonials animation on scroll
    document.querySelectorAll('.testimonial').forEach((testimonial, index) => {
        testimonial.style.animationDelay = `${index * 0.2}s`;
    });
{/* </script> */}