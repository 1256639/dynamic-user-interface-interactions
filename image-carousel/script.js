const slides = document.querySelectorAll('.carousel-slides img');
const slidesContainer = document.querySelector('.carousel-slides');
const prevBtn = document.querySelector('.carousel-arrow.left');
const nextBtn = document.querySelector('.carousel-arrow.right');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;
let timer = null;

slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
});

function updateCarousel() {
    slidesContainer.style.transform = `translateX(-${600 * currentIndex}px)`;
    document.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
}

function goToSlide(idx) {
    currentIndex = idx;
    updateCarousel();
    resetAutoAdvance();
}

function resetAutoAdvance() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 5000);
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoAdvance();
});
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoAdvance();
});

timer = setInterval(nextSlide, 5000);

window.addEventListener('DOMContentLoaded', updateCarousel);