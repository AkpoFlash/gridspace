'use strict';

function scriptsLoad() {
  var header = document.querySelector('.header');
  var menu = document.querySelector(".menu");
  var menuLinks = document.querySelectorAll(".menu__link");
  var hamburger = document.querySelector(".hamburger");
  var hamburgerLines = document.querySelectorAll(".hamburger__line");
  var allAnchorLinks = document.querySelectorAll("a[href*='#']");
  var blind = document.querySelector(".blind");
  var notificationPopup = document.querySelector(".notification-popup");
  var modal = document.querySelectorAll(".popup");
  var windowButton = document.querySelectorAll(".window__button");
  var arrowLeft = document.querySelectorAll('.slider__arrow--left');
  var arrowWrapperLeft = document.querySelectorAll('.arrow__wrapper--left');
  var arrowRight = document.querySelectorAll('.slider__arrow--right');
  var arrowWrapperRight = document.querySelectorAll('.arrow__wrapper--right');
  var slidersDisplay = 4;

  setInterval(function () {
    currentDate = new Date();
  }, UpdateDelay);

  if (isHas(header)) {
    height(header, 1);
  }

  //Events
  wrapperEventListener(window, "scroll", changeNav);
  wrapperEventListener(window, "resize", changeNav);
  wrapperEventListener(blind, "mouseleave", closeNotificationPopUp);
  wrapperEventListener(blind, "click", openCloseAppMenu);
  wrapperEventListener(notificationPopup, "click", openCloseAppMenu);
  wrapperEventListener(notificationPopup, "mouseleave", closeNotificationPopUp);
  var delayPopup = setTimeout(function () {
    addClass(notificationPopup, "notification-popup--open");
  }, UpdateDelay * 3);

  if (isHas(hamburger)) {
    hamburger.addEventListener("click", function () {
      toggleClass(menu, "menu--open");

      for (var i = 0; i < hamburgerLines.length; i++) {
        toggleClass(hamburgerLines[i], "hamburger__line--open");
      }
    });
  }

  if (isHas(arrowWrapperLeft)) {
    for (var i = 0; i < arrowLeft.length; i++) {
      arrowLeft[i].addEventListener('click', function (e) {
        event.stopPropagation();
        clickArrowLeft(getClosest(this, ".carusel--line"), slidersDisplay);
      });
      arrowWrapperLeft[i].addEventListener('click', function (e) {
        clickArrowLeft(getClosest(this, ".carusel--line"), slidersDisplay);
      });
    }
  }

  if (isHas(arrowWrapperRight)) {
    for (var i = 0; i < arrowRight.length; i++) {
      arrowRight[i].addEventListener('click', function (e) {
        event.stopPropagation();
        clickArrowRight(getClosest(this, ".carusel--line"), slidersDisplay);
      });
      arrowWrapperRight[i].addEventListener('click', function (e) {
        clickArrowRight(getClosest(this, ".carusel--line"), slidersDisplay);
      });
    }
  }

  sliderLineInitial(slidersDisplay);

  hover(menuLinks, "menu__link--hover");

  smoothScroll(allAnchorLinks);
}