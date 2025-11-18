//Slider

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length;
let sliderInterval;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

activateDot(0);

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

//Next Slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else curSlide++;

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Auto-play functionality
const startAutoPlay = function () {
  sliderInterval = setInterval(nextSlide, 4000); // Change slide every 3 seconds
};

const resetAutoPlay = function () {
  clearInterval(sliderInterval);
  startAutoPlay();
};

// Start auto-play on load
startAutoPlay();

// Button event listeners with auto-play reset
btnRight.addEventListener("click", function () {
  nextSlide();
  resetAutoPlay(); // Reset timer when user manually changes slide
});

btnLeft.addEventListener("click", function () {
  prevSlide();
  resetAutoPlay(); // Reset timer when user manually changes slide
});

// Keyboard navigation with auto-play reset
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
    resetAutoPlay();
  }
  if (e.key === "ArrowRight") {
    nextSlide();
    resetAutoPlay();
  }
});

// Dot navigation with auto-play reset
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    curSlide = Number(e.target.dataset.slide);
    goToSlide(curSlide);
    activateDot(curSlide);
    resetAutoPlay(); // Reset timer when user clicks a dot
  }
});

// Optional: Pause on hover
const sliderContainer = document.querySelector(".slider");
if (sliderContainer) {
  sliderContainer.addEventListener("mouseenter", function () {
    clearInterval(sliderInterval);
  });

  sliderContainer.addEventListener("mouseleave", function () {
    startAutoPlay();
  });
}
// Add this after creating slides

//Bionic reading

function bionicReading(text) {
  return text
    .split(" ")
    .map((word) => {
      const boldLength = Math.ceil(word.length / 2);
      const boldPart = word.slice(0, boldLength);
      const normalPart = word.slice(boldLength);
      return `<strong>${boldPart}</strong>${normalPart}`;
    })
    .join(" ");
}

// Usage
// const paragraph = document.querySelector(".bionic-text");
// paragraph.innerHTML = bionicReading(paragraph.textContent);
const aboutImg = document.querySelector(".section-about-img-fig");
const aboutContent = document.querySelector(".section-about-content");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === aboutImg) {
          entry.target.classList.remove("hidden");
          entry.target.classList.add("moveInLeft");
        }

        if (entry.target === aboutContent) {
          entry.target.classList.remove("hidden");
          entry.target.classList.add("moveInRight");
        }
      }
    });
  },
  {
    threshold: 0.3, // element should be 30% visible
  }
);

observer.observe(aboutImg);
observer.observe(aboutContent);
