export default class Slider {
    constructor(container, options = {}) {
        this.container = container;
        this.options = options;
        this.initialized = false;
        this.autoPlayTimer = null;
    }

    init() {
        if (this.initialized) return; // Предотвращаем повторную инициализацию

        this.track = this.container.querySelector('.slider-track');
        this.slides = Array.from(this.container.querySelectorAll('.slide'));
        this.prevButton = this.container.querySelector('.slider-button.prev');
        this.nextButton = this.container.querySelector('.slider-button.next');
        this.counter = this.container.querySelector('.slider-counter');
        this.indicatorsContainer = this.container.querySelector('.slider-indicators');

        this.currentIndex = 0;
        this.slideCount = this.options.slideCount || 3;
        this.autoPlay = this.options.autoPlay || false;
        this.loop = this.options.loop || false;
        this.autoPlayInterval = this.options.autoPlayInterval || 3000;
        this.showIndicators = this.options.showIndicators !== undefined ? this.options.showIndicators : true;

        this.setupSlides();
        if (this.showIndicators) {
            this.createIndicators();
        }
        this.updateSlider();
        this.addEventListeners();

        if (this.autoPlay) {
            this.startAutoPlay();
        }

        this.initialized = true; // Устанавливаем флаг инициализации
    }

    setupSlides() {
        this.slides.forEach(el => {
            el.style.flex = `0 0 ${100 / this.slideCount}%`;
        });
    }

    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('slider-indicator');
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateSlider();
            });
            this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.slider-indicator'));
    }

    updateSlider() {
        const trackWidth = this.track.clientWidth;
        const translateX = -this.currentIndex * (trackWidth / this.slideCount);
        this.track.style.transform = `translateX(${translateX}px)`;

        if (this.showIndicators) {
            this.indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }

        this.counter.textContent = `${this.currentIndex + 1} / ${this.slides.length}`;
    }

    goToNextSlide() {
        if (this.loop) {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        } else {
            this.currentIndex = Math.min(this.currentIndex + 1, this.slides.length - 1);
        }
        this.updateSlider();
    }

    goToPrevSlide() {
        if (this.loop) {
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        } else {
            this.currentIndex = Math.max(this.currentIndex - 1, 0);
        }
        this.updateSlider();
    }

    addEventListeners() {
        this.prevButton.addEventListener('click', this.prevHandler = () => this.goToPrevSlide());
        this.nextButton.addEventListener('click', this.nextHandler = () => this.goToNextSlide());
        window.addEventListener('resize', this.resizeHandler = () => this.updateSlider());
    }

    startAutoPlay() {
        this.autoPlayTimer = setInterval(() => this.goToNextSlide(), this.autoPlayInterval);
    }

    destroy() {
        if (!this.initialized) return; // Предотвращаем удаление без инициализации

        // Удаляем все слушатели событий
        this.prevButton.removeEventListener('click', this.prevHandler);
        this.nextButton.removeEventListener('click', this.nextHandler);
        window.removeEventListener('resize', this.resizeHandler);

        // Очищаем индикаторы
        if (this.showIndicators) {
            this.indicatorsContainer.innerHTML = '';
        }

        // Останавливаем автопрокрутку
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }

        // Сбрасываем позицию слайдера
        this.track.style.transform = '';

        this.initialized = false; // Сбрасываем флаг инициализации
    }
}
