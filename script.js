// ─── DARK MODE ───────────────────────────────────────────────────────────────

(function initThemeToggle() {
  const root = document.documentElement;
  const btnTheme = document.querySelector(".btn-theme-toggle");
  const STORAGE_KEY = "ad-theme";

  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = stored ? stored === "dark" : prefersDark;

  root.classList.toggle("dark-mode", isDark);

  if (btnTheme) {
    btnTheme.addEventListener("click", () => {
      const nowDark = root.classList.toggle("dark-mode");
      localStorage.setItem(STORAGE_KEY, nowDark ? "dark" : "light");
    });
  }
})();

// ─── DATA ────────────────────────────────────────────────────────────────────

const categoriesData = [
  { img: "Category-1.jpg", name: "Foot Protection" },
  { img: "Category-2.jpg", name: "Head Protection" },
  { img: "Category-3.jpg", name: "Face Protection" },
  { img: "Category-4.jpg", name: "Eye Protection" },
  { img: "Category-5.jpg", name: "Ear Protection" },
];

const testimonialsData = [
  {
    img: "user-1.jpg",
    name: "Nick Smith",
    date: "Feb 23rd, 2017",
    rating: 7.8,
  },
  { img: "user-2.jpg", name: "Jane Doe", date: "Mar 10th, 2018", rating: 8.5 },
  { img: "user-3.jpg", name: "Tom Ray", date: "Jan 05th, 2020", rating: 9.0 },
  { img: "user-4.jpg", name: "Sara Khan", date: "Nov 18th, 2021", rating: 8.2 },
];

const galleryImgs = [
  { src: "img/product_category/Category-1.jpg", alt: "Safety footwear" },
  { src: "img/product_category/Category-2.jpg", alt: "Head protection gear" },
  { src: "img/product_category/Category-3.jpg", alt: "Face protection" },
  { src: "img/product_category/Category-4.jpg", alt: "Eye protection" },
  { src: "img/product_category/Category-5.jpg", alt: "Ear protection" },
  { src: "img/services/services-1.jpg", alt: "Industrial safety" },
  { src: "img/services/services-2.jpg", alt: "Safety solutions" },
  { src: "img/services/services-3.jpg", alt: "Workplace safety" },
];

// ─── RENDER: PRODUCT CATEGORIES ──────────────────────────────────────────────

const catContainer = document.querySelector(".product-category-container");
if (catContainer) {
  categoriesData.forEach(({ img, name }) => {
    catContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="product-category">
        <img src="img/product_category/${img}" alt="${name}" class="product-category__img" width="320" height="320" decoding="async" loading="lazy" />
        <figcaption class="product-category__caption">
          ${name}
          <p class="product-category__caption__para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo voluptate ratione placeat.</p>
        </figcaption>
      </div>
    `,
    );
  });
}

// ─── RENDER: TESTIMONIALS ────────────────────────────────────────────────────

const testimonialsWrap = document.querySelector(
  ".testimonials-container-anumation",
);
if (testimonialsWrap) {
  [...testimonialsData, ...testimonialsData].forEach(
    ({ img, name, date, rating }, i) => {
      testimonialsWrap.insertAdjacentHTML(
        "beforeend",
        `
      <div class="testimonials" ${i >= testimonialsData.length ? 'aria-hidden="true"' : ""}>
        <figure class="review">
          <blockquote class="review__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga doloremque architecto dicta animi, totam, itaque officia ex.</blockquote>
          <figcaption class="review__user">
            <img src="img/user/${img}" alt="" class="review__photo" width="48" height="48" decoding="async" loading="lazy" />
            <div class="review__user-box">
              <p class="review__user-name">${name}</p>
              <p class="review__user-date">${date}</p>
            </div>
            <div class="review__rating">${rating}</div>
          </figcaption>
        </figure>
      </div>
    `,
      );
    },
  );
}

// ─── RENDER: FOOTER GALLERY ──────────────────────────────────────────────────

const footerGallery = document.getElementById("footer-gallery");
if (footerGallery) {
  galleryImgs.forEach(({ src, alt }) => {
    footerGallery.insertAdjacentHTML(
      "beforeend",
      `
      <div class="image-container">
        <img src="${src}" alt="${alt}" class="footer-main-img" width="200" height="200" loading="lazy" decoding="async" />
        <div class="overlay" aria-hidden="true">
          <svg class="nav-icon-social-overlay"><use xlink:href="img/svg/sprite.svg#icon-instagram1"></use></svg>
        </div>
      </div>
    `,
    );
  });
}

// ─── MOBILE NAV ──────────────────────────────────────────────────────────────

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".navigation");

if (btnNavEl && headerEl) {
  btnNavEl.addEventListener("click", () => {
    headerEl.classList.toggle("nav-open");
    document.body.classList.toggle("nav-open");
  });

  headerEl.querySelectorAll(".main_nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      headerEl.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      headerEl.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
    }
  });
}

// ─── TRANSPARENT HEADER ON HERO, SOLID ON SCROLL ────────────────────────────

if (headerEl) {
  if (document.getElementById("hero")) {
    const SCROLL_THRESHOLD = 60;
    let navTicking = false;

    const updateNavSolidState = () => {
      navTicking = false;
      headerEl.classList.toggle(
        "nav-solid",
        window.scrollY > SCROLL_THRESHOLD,
      );
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!navTicking) {
          navTicking = true;
          requestAnimationFrame(updateNavSolidState);
        }
      },
      { passive: true },
    );

    updateNavSolidState();
  } else {
    headerEl.classList.add("nav-solid");
  }
}

// ─── ACTIVE NAV HIGHLIGHT (landing page) ────────────────────────────────────

(function initLandingSectionNav() {
  if (!document.getElementById("hero") || !headerEl) return;

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
    const y = window.scrollY + headerEl.offsetHeight + 40;
    let activeId = "hero";
    sectionOrder.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= y) activeId = id;
    });
    headerEl.querySelectorAll(".main_nav-link[href^='#']").forEach((link) => {
      link.classList.toggle(
        "nav-link--active",
        link.getAttribute("href") === "#" + activeId,
      );
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSectionLink);
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", updateActiveSectionLink);
  updateActiveSectionLink();
})();

// ─── SLIDER ──────────────────────────────────────────────────────────────────

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

if (slides.length && btnLeft && btnRight && dotContainer) {
  let curSlide = 0;
  const maxSlide = slides.length;
  let sliderInterval;
  const AUTO_MS = 6000;
  let isTransitioning = false;

  // Dots
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button type="button" class="dots__dot" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`,
    );
  });

  const activateDot = (slide) => {
    document
      .querySelectorAll(".dots__dot")
      .forEach((d) => d.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      ?.classList.add("dots__dot--active");
  };

  const goToSlide = (slide) => {
    isTransitioning = true;
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });

    setTimeout(() => {
      isTransitioning = false;
    }, 900);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    curSlide = (curSlide + 1) % maxSlide;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    curSlide = (curSlide - 1 + maxSlide) % maxSlide;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const startAutoPlay = () => {
    sliderInterval = setInterval(nextSlide, AUTO_MS);
  };

  const resetAutoPlay = () => {
    clearInterval(sliderInterval);
    startAutoPlay();
  };

  // Initialize
  goToSlide(0);
  activateDot(0);
  startAutoPlay();

  // Button controls
  btnRight.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay();
  });

  btnLeft.addEventListener("click", () => {
    prevSlide();
    resetAutoPlay();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    const t = e.target;
    if (
      t?.tagName === "INPUT" ||
      t?.tagName === "TEXTAREA" ||
      t?.tagName === "SELECT" ||
      t?.isContentEditable
    )
      return;

    if (e.key === "ArrowLeft") {
      prevSlide();
      resetAutoPlay();
    }
    if (e.key === "ArrowRight") {
      nextSlide();
      resetAutoPlay();
    }
  });

  // Dot navigation
  dotContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot") && !isTransitioning) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
      resetAutoPlay();
    }
  });

  // Pause on hover
  const sliderContainer = document.querySelector(".slider");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => {
      clearInterval(sliderInterval);
    });
    sliderContainer.addEventListener("mouseleave", startAutoPlay);
  }

  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  sliderContainer?.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  sliderContainer?.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold && !isTransitioning) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoPlay();
    }
  }
}

// ─── ABOUT SCROLL ANIMATION ──────────────────────────────────────────────────

const aboutImg = document.querySelector(".section-about-img-fig");
const aboutContent = document.querySelector(".section-about-content");

if (aboutImg && aboutContent) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.remove("hidden");
        target.classList.add(
          target === aboutImg ? "moveInLeft" : "moveInRight",
        );
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  observer.observe(aboutImg);
  observer.observe(aboutContent);
}

// ─── SCROLL TO TOP ───────────────────────────────────────────────────────────

document.querySelector(".footer-scroll-top")?.addEventListener("click", () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

const goToSlide = (slide) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
    s.classList.toggle("active", i === slide); // 👈 add this
  });
};

document.querySelectorAll(".slide > img").forEach((img) => {
  if (img.complete) {
    img.classList.add("loaded");
  } else {
    img.addEventListener("load", () => img.classList.add("loaded"));
  }
});
