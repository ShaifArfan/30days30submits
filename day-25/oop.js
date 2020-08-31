class SliderClass {
  constructor(){
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.slider = document.querySelectorAll('.slider');
    this.buttons = document.querySelectorAll('.buttons div');
    this.dots = document.querySelector('.dots');
    this.timeoutId;
    this.autoLoop();
    this.getPosition();
    this.eventHandler();
    this.createDots();
    this.getActiveDot();
  }
  eventHandler(){
    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (button.classList.contains('next')) this.getNextSlide()
        else if (button.classList.contains('prev')) this.getPrevSlide();
      })
    })
  }
  getNextPrev() {
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = this.slides.indexOf(activeSlide);
    let next, prev;
    if (activeIndex === this.slides.length - 1) {
      next = this.slides[0];
    } else {
      next = this.slides[activeIndex + 1];
    }
    if (activeIndex === 0) {
      prev = this.slides[this.slides.length - 1]
    } else {
      prev = this.slides[activeIndex - 1];
    }
    return [next, prev];
  }
  getPosition() {
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = this.slides.indexOf(activeSlide);
    const [next, prev] = this.getNextPrev();
    this.slides.forEach((slide, index) => {
      if (index === activeIndex) {
        slide.style.transform = 'translateX(0)';
      } else if (slide === prev) {
        slide.style.transform = 'translateX(-100%)';
      } else if (slide === next) {
        slide.style.transform = 'translateX(100%)';
      }
      next.addEventListener('transitionend', () => {
        slide.classList.remove('top');
      })
    });
  }
  getNextSlide() {
    clearInterval(this.timeoutId);
    const current = document.querySelector('.slide.active');
    const [next, prev] = this.getNextPrev();
    if (current.classList.contains('top')) {
      return;
    };
    current.classList.add('top');
    next.classList.add('top');
    current.style.transform = 'translate(-100%)';
    current.classList.remove('active');
    next.style.transform = 'translateX(0)';
    next.classList.add('active');
    this.getPosition();
    this.getActiveDot();
    this.autoLoop();
  }
  getPrevSlide() {
    clearInterval(this.timeoutId);
    const current = document.querySelector('.active');
    const [next, prev] = this.getNextPrev();
    current.classList.add('top');
    prev.classList.add('top');
    current.style.transform = 'translate(100%)';
    current.classList.remove('active');
    prev.style.transform = 'translateX(0)';
    prev.classList.add('active');
    this.getPosition();
    this.getActiveDot();
    this.autoLoop();
  }
  createDots(){
    this.slides.forEach(slide => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      this.dots.appendChild(dot)
      this.functionalDots();
    });
  }
  functionalDots(){
    // Dots Click Event
    const allDots = document.querySelectorAll('.dots .dot');
    allDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.getDotSlide(index);
      })
    })
  }
  getActiveDot() {
    const allDots = document.querySelectorAll('.dots .dot');
    allDots.forEach(dot => {
      dot.classList.remove('active');
    })
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = this.slides.indexOf(activeSlide);
    allDots[activeIndex].classList.add('active');
  }
  getDotSlide(index) {
    clearTimeout(this.timeoutId);
    this.slides.forEach(slide => {
      slide.classList.remove('active');
    })
    const current = this.slides[index];
    current.classList.add('active')
    this.getPosition();
    this.getActiveDot();
    this.autoLoop();
  }
  autoLoop() {
    this.timeoutId = setTimeout(() => {
      this.getNextSlide();
    }, 5000)
  }
}
const slider = new SliderClass()