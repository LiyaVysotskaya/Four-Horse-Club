// carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");
  const list = carousel.querySelector(".carousel__list");
  const items = carousel.querySelectorAll(".carousel__item");
  const btnPrev = carousel.querySelector(".carousel__button--prev");
  const btnNext = carousel.querySelector(".carousel__button--next");
  const controls = carousel.querySelector(".carousel__controls");
  const currentSlide = carousel.querySelector(".carousel__current-slide");
  const totalSlides = carousel.querySelector(".carousel__total-slides");
  const totalItems = items.length;

  let index = 0;
  let isAnimating = false;
  const itemsToShow = 3;
  const itemWidth = items[0].offsetWidth + 20;
  const interval = 4000;
  const animationDuration = 1000;

  function updateControls() {
    btnPrev.disabled = index === 0;
    btnNext.disabled = index === totalItems - itemsToShow;
    currentSlide.textContent = Math.min(index + itemsToShow, totalItems);
  }

  function moveCarousel(newIndex) {
    if (isAnimating) return;
    isAnimating = true;
    list.style.transition = `transform ${animationDuration}ms ease`;
    list.style.transform = `translateX(-${newIndex * itemWidth}px)`;

    index = newIndex;
    updateControls();

    setTimeout(() => {
      isAnimating = false;
    }, animationDuration);
  }

  function autoSlide() {
    if (index >= totalItems - itemsToShow) {
      index = -itemsToShow;
      list.style.transition = "none";
      list.style.transform = `translateX(-${index * itemWidth}px)`;
    }
    setTimeout(() => {
      moveCarousel(index + itemsToShow);
    }, 10);
  }

  let autoSlideInterval = setInterval(autoSlide, interval);

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      clearInterval(autoSlideInterval);
    });
    item.addEventListener("mouseleave", () => {
      autoSlideInterval = setInterval(autoSlide, interval);
    });
  });

  controls.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });
  controls.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(autoSlide, interval);
  });

  btnPrev.addEventListener("click", () => {
    moveCarousel(index - itemsToShow);
  });

  btnNext.addEventListener("click", () => {
    moveCarousel(index + itemsToShow);
  });

  updateControls();
});
