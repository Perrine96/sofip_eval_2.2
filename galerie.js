// CARROUSEL
document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.nav-button.next');
    const prevButton = document.querySelector('.nav-button.prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!carouselTrack || !slides.length || !nextButton || !prevButton || !dotsContainer) {
        console.warn('Carrousel : Éléments manquants dans le DOM');
        return;
    }

    let currentIndex = 0;
    let slideWidth = slides[0].offsetWidth;
    let isTransitioning = false; 
    let resizeTimeout;

    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Aller à l'image ${index + 1}`);
        dot.setAttribute('role', 'button');
        dot.setAttribute('tabindex', '0');
        
        if (index === 0) {
            dot.classList.add('active');
            dot.setAttribute('aria-pressed', 'true');
        } else {
            dot.setAttribute('aria-pressed', 'false');
        }
        
        dot.addEventListener('click', () => moveToSlide(index));
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                moveToSlide(index);
            }
        });
        
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.dot'));

    function updateCarouselPosition() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        const offset = -currentIndex * slideWidth;
        carouselTrack.style.transform = `translateX(${offset}px)`;

        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
            slide.setAttribute('aria-hidden', index !== currentIndex);
        });

        dots.forEach((dot, index) => {
            const isActive = index === currentIndex;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-pressed', isActive);
        });

        setTimeout(() => {
            isTransitioning = false;
        }, 300); 
    }

    function moveToSlide(index) {
        if (isTransitioning || index === currentIndex) return;
        
        currentIndex = Math.max(0, Math.min(index, slides.length - 1));
        updateCarouselPosition();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarouselPosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarouselPosition();
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    nextButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        }
    });

    prevButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            prevSlide();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.carousel-container')) {
            switch(e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    nextSlide();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    prevSlide();
                    break;
            }
        }
    });

    function handleResize() {
        const newSlideWidth = slides[0].offsetWidth;
        if (newSlideWidth !== slideWidth) {
            slideWidth = newSlideWidth;
            updateCarouselPosition();
        }
    }

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 150);
    });

    let startX = 0;
    let endX = 0;
    const threshold = 50; 

    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const deltaX = startX - endX;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                nextSlide(); 
            } else {
                prevSlide(); 
            }
        }
    }, { passive: true });

    updateCarouselPosition();

    // Ajout d'attributs d'accessibilité
    carouselTrack.setAttribute('role', 'region');
    carouselTrack.setAttribute('aria-label', 'Galerie d\'images');
    nextButton.setAttribute('aria-label', 'Image suivante');
    prevButton.setAttribute('aria-label', 'Image précédente');
});


