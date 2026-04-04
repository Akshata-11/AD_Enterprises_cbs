// Mobile navigation
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".navigation");
if (btnNavEl && headerEl) {
  btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
    document.body.classList.toggle("nav-open");
  });

  headerEl.querySelectorAll(".main_nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      headerEl.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      headerEl.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
    }
  });
}

// Landing page: highlight nav for in-page sections (index only)
(function initLandingSectionNav() {
  const heroEl = document.getElementById("hero");
  if (!heroEl || !headerEl) return;

  const sectionOrder = [
    "hero",
    "about",
    "products",
    "services",
    "testimonials",
    "contact",
  ];

  let ticking = false;
  function updateActiveSectionLink() {
    ticking = false;
    const headerH = headerEl.offsetHeight;
    const y = window.scrollY + headerH + 40;
    let activeId = "hero";
    for (let i = 0; i < sectionOrder.length; i++) {
      const id = sectionOrder[i];
      const el = document.getElementById(id);
      if (el && el.offsetTop <= y) activeId = id;
    }
    headerEl.querySelectorAll(".main_nav-link[href^='#']").forEach(function (link) {
      const href = link.getAttribute("href");
      link.classList.toggle("nav-link--active", href === "#" + activeId);
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateActiveSectionLink);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateActiveSectionLink);
  updateActiveSectionLink();
})();

// Slider (home page)
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

if (slides.length && btnLeft && btnRight && dotContainer) {
  let curSlide = 0;
  const maxSlide = slides.length;
  let sliderInterval;
  const AUTO_MS = 5500;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button type="button" class="dots__dot" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`
      );
    });
  };
  createDots();

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    const active = document.querySelector(
      `.dots__dot[data-slide="${slide}"]`
    );
    if (active) active.classList.add("dots__dot--active");
  };

  activateDot(0);

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  goToSlide(0);

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

  const startAutoPlay = function () {
    sliderInterval = setInterval(nextSlide, AUTO_MS);
  };

  const resetAutoPlay = function () {
    clearInterval(sliderInterval);
    startAutoPlay();
  };

  startAutoPlay();

  btnRight.addEventListener("click", function () {
    nextSlide();
    resetAutoPlay();
  });

  btnLeft.addEventListener("click", function () {
    prevSlide();
    resetAutoPlay();
  });

  document.addEventListener("keydown", function (e) {
    const t = e.target;
    if (
      t &&
      (t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA" ||
        t.tagName === "SELECT" ||
        t.isContentEditable)
    ) {
      return;
    }
    if (e.key === "ArrowLeft") {
      prevSlide();
      resetAutoPlay();
    }
    if (e.key === "ArrowRight") {
      nextSlide();
      resetAutoPlay();
    }
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
      resetAutoPlay();
    }
  });

  const sliderContainer = document.querySelector(".slider");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", function () {
      clearInterval(sliderInterval);
    });

    sliderContainer.addEventListener("mouseleave", function () {
      startAutoPlay();
    });
  }
}

const aboutImg = document.querySelector(".section-about-img-fig");
const aboutContent = document.querySelector(".section-about-content");

if (aboutImg && aboutContent) {
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
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  observer.observe(aboutImg);
  observer.observe(aboutContent);
}

const footerScrollTop = document.querySelector(".footer-scroll-top");
if (footerScrollTop) {
  footerScrollTop.addEventListener("click", function () {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
}
