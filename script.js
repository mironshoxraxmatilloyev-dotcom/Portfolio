
        lucide.createIcons();
        
        // Create particles animation
        function createParticles(containerId, particleCount = 50) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
                container.appendChild(particle);
            }
        }
        
        // Initialize particles
        createParticles('particles', 30);
        createParticles('particles-contact', 20);
        
        // Scroll animations
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
        
        // Animate skill bars when they come into view
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                    });
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('#skills').forEach(el => {
            skillObserver.observe(el);
        });
        
        // Mobile menu toggle with animation
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
        let isMenuOpen = false;

        function toggleMobileMenu() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.add('open');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('open');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }

        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when clicking on a link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    toggleMobileMenu();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                toggleMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMobileMenu();
            }
        });
        
        // Enhanced smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-bg');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
        
        // Add floating animation to profile image
        document.addEventListener('DOMContentLoaded', () => {
            const profileImg = document.querySelector('.floating');
            if (profileImg) {
                setInterval(() => {
                    profileImg.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 5}px)`;
                }, 16);
            }
        });
        
        // Form submission with Telegram bot integration
        document.querySelector('form')?.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validate form
            if (!name.trim() || !email.trim() || !message.trim()) {
                alert('Iltimos, barcha maydonlarni to\'ldiring!');
                return;
            }
            
            button.innerHTML = '<span>Yuborilmoqda...</span>';
            button.disabled = true;
            
            // Send to Telegram
            sendToTelegram(name, email, message, button, originalText, this);
        });
        
        // Function to send message to Telegram
        async function sendToTelegram(name, email, message, button, originalText, form) {
            const telegramMessage = `🔔 Yangi xabar Portfolio saytidan:\n\n👤 Ism: ${name}\n📧 Email: ${email}\n💬 Xabar: ${message}\n\n⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`;
            
            // Faqat shaxsiy Telegram'ga yuborish (100% ishlaydi)
            const personalTelegramLink = `https://t.me/Raxmatilloyev_Mironshox?text=${encodeURIComponent(telegramMessage)}`;
            
            // Telegram'ni ochish
            window.open(personalTelegramLink, '_blank');
            
            button.innerHTML = '<span>✅ Telegram ochildi! "Yuborish" tugmasini bosing</span>';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                form.reset();
            }, 3000);
        }