'use strict';
/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}
/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);

/**
 * HEADER ANIMATION
 * When scrolled donw to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * SLIDER
 */

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

let currentSlidePos = 0;

const moveSliderItem = function () {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}

/**
 * NEXT SLIDE
 */

const slideNext = function () {
  const slideEnd = currentSlidePos >= totalSlidableItems;

  if (slideEnd) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);

/**
 * PREVIOUS SLIDE
 */

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = totalSlidableItems;
  } else {
    currentSlidePos--;
  }

  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);

/**
 * RESPONSIVE
 */
window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});


let callAdjustLayout;
let currentLayout = "desktop",
    nextLayout = "desktop";

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

// Adjust layout based on the browser width
function adjustLayout() {
    let block1, block2, block3, block4, block5, block6, block7, block8, block9;

    if (window.innerWidth <= 1199) {
        // Mobile layout
        nextLayout = "mobile";
        block1 = $("div[data-mobile-seq-no='1']");
        block2 = $("div[data-mobile-seq-no='2']");
        block3 = $("div[data-mobile-seq-no='3']");
        block4 = $("div[data-mobile-seq-no='4']");
        block5 = $("div[data-mobile-seq-no='5']");
        block6 = $("div[data-mobile-seq-no='6']");
        block7 = $("div[data-mobile-seq-no='7']");
        block8 = $("div[data-mobile-seq-no='8']");
        block9 = $("div[data-mobile-seq-no='9']");
    } else {
        // Desktop layout
        nextLayout = "desktop";
        block1 = $("div[data-desktop-seq-no='1']");
        block2 = $("div[data-desktop-seq-no='2']");
        block3 = $("div[data-desktop-seq-no='3']");
        block4 = $("div[data-desktop-seq-no='4']");
        block5 = $("div[data-desktop-seq-no='5']");
        block6 = $("div[data-desktop-seq-no='6']");
        block7 = $("div[data-desktop-seq-no='7']");
        block8 = $("div[data-desktop-seq-no='8']");
        block9 = $("div[data-desktop-seq-no='9']");
    }

    if (nextLayout !== currentLayout) {
        // Reorder blocks based on their seq no
        block1.after(block2.detach());
        block2.after(block3.detach());
        block3.after(block4.detach());
        block4.after(block5.detach());
        block5.after(block6.detach());
        block6.after(block7.detach());
        block7.after(block8.detach());
        block8.after(block9.detach());
        currentLayout = nextLayout;
    }
}

// Adjust layout upon window resize
window.onresize = function () {
    clearTimeout(callAdjustLayout);
    callAdjustLayout = setTimeout(adjustLayout, 100);
}

// DOM is ready
$(function () {
    if (detectIE()) {
        alert('Please use the latest version of Chrome or Firefox for best browsing experience.');
    }

    adjustLayout();
})
