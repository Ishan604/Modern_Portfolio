document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinkItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Image modal functionality
    const screenshotImages = document.querySelectorAll('.screenshot-image');
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    document.body.appendChild(modal);
    
    screenshotImages.forEach(image => {
        image.addEventListener('click', function() {
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            const modalImage = document.createElement('img');
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            
            const caption = document.createElement('p');
            caption.textContent = this.nextElementSibling.textContent;
            
            modalContent.appendChild(modalImage);
            modalContent.appendChild(caption);
            modal.innerHTML = '';
            modal.appendChild(modalContent);
            modal.classList.add('active');
            
            // Close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                }
            });
        });
    });
    
    // Add modal styles dynamically
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        
        .image-modal.active {
            opacity: 1;
            pointer-events: all;
        }
        
        .modal-content {
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 5px;
        }
        
        .modal-content p {
            color: white;
            margin-top: 15px;
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Set active nav link based on current page
    navLinkItems.forEach(item => {
        if (item.getAttribute('href') === 'index.html#projects') {
            item.classList.add('active');
        }
    });
});