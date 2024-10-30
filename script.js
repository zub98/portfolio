// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Enhanced Typing Effect - Add more dynamic strings and options
const typingEffect = new Typed('.typed-text', {
    strings: [
        'Web Developer 💻',
        'Frontend Developer ⚡',
        'UI/UX Designer 🎨',
        'Problem Solver 🔧',
        'Creative Thinker 💡'
    ],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|',
    autoInsertCss: true,
    fadeOut: true,
    fadeOutClass: 'typed-fade-out'
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
    
    // Update active nav link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    // Animate nav links
    document.querySelectorAll('.nav-links li').forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links li').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        
        document.querySelectorAll('.nav-links li').forEach(link => {
            link.style.animation = '';
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        window.scrollTo({
            top: target.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});

// Add Parallax Effect to Hero Section
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Skills Animation
const skillsSection = document.querySelector('#skills');
const progressBars = document.querySelectorAll('.progress');
let animated = false;

// Enhanced Skills Animation with Counter
function animateSkills() {
    if (!animated) {
        progressBars.forEach(progress => {
            const value = progress.getAttribute('data-value');
            progress.style.width = '0%';
            
            // Add counter animation with easing
            const counter = progress.parentElement.parentElement.querySelector('h4');
            if (counter) {
                let count = 0;
                const target = parseInt(value);
                const duration = 1500;
                const start = performance.now();
                
                const updateCount = (currentTime) => {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeOut = t => 1 - Math.pow(1 - t, 3);
                    count = Math.floor(easeOut(progress) * target);
                    
                    counter.textContent = `${count}%`;
                    progress.style.width = `${count}%`;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    }
                };
                
                requestAnimationFrame(updateCount);
            }
        });
        animated = true;
    }
}

// Trigger skills animation when scrolled into view
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

window.addEventListener('scroll', () => {
    if (isInViewport(skillsSection)) {
        animateSkills();
    }
});

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons?.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.classList.contains(filterValue)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 200);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    });
});

// Add Tilt Effect to Project Cards
const VanillaTilt = require('vanilla-tilt');
VanillaTilt.init(document.querySelectorAll('.project-card'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.2,
    scale: 1.05
});

// Contact Form
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Add loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission (replace with your actual form handling logic)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    } catch (error) {
        // Show error message
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Enhanced Notification System with Progress Bar
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
        <div class="notification-progress"></div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        notification.querySelector('.notification-progress').style.width = '0%';
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add Mouse Trail Effect
class MouseTrail {
    constructor() {
        this.points = [];
        this.target = { x: 0, y: 0 };
        this.createTrail();
    }
    
    createTrail() {
        for (let i = 0; i < 20; i++) {
            const point = document.createElement('div');
            point.className = 'trail-point';
            document.body.appendChild(point);
            this.points.push({
                element: point,
                x: 0,
                y: 0
            });
        }
        
        document.addEventListener('mousemove', (e) => {
            this.target.x = e.clientX;
            this.target.y = e.clientY;
        });
        
        this.animate();
    }
    
    animate() {
        let x = this.target.x;
        let y = this.target.y;
        
        this.points.forEach((point, index) => {
            const nextPoint = this.points[index + 1] || this.points[0];
            point.x = x;
            point.y = y;
            point.element.style.transform = `translate(${x}px, ${y}px) scale(${1 - index * 0.05})`;
            x += (nextPoint.x - x) * 0.3;
            y += (nextPoint.y - y) * 0.3;
        });
        
        requestAnimationFrame(this.animate.bind(this));
    }
}

new MouseTrail();

// Function to animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const value = progressBar.getAttribute('data-value');
                progressBar.style.width = `${value}%`;
                progressBar.style.transition = 'width 1s ease-in-out';
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        // Set initial width to 0
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', animateProgressBars);

// Function to animate skill progress bars
function animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                const value = progressBar.getAttribute('data-value');
                progressBar.style.width = `${value}%`;
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => observer.observe(card));
}

// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', animateSkillBars);
