'use strict';

function wrapperEventListener(element, catchEvent, func) {
  if (isHas(element)) {
    element.addEventListener(catchEvent, func);
  }
}

function openCloseAppMenu() {
  if (hasClass(document.querySelector(".app-menu"), "app-menu--open")) {
    removeClass(document.querySelector(".app-menu"), "app-menu--open");
    removeClass(document.querySelector(".blind"), "blind--open");
    removeClass(document.querySelector(".blind__line1"), "blind__line1--open");
    removeClass(document.querySelector(".blind__line2"), "blind__line2--open");
  } else {
    addClass(document.querySelector(".app-menu"), "app-menu--open");
    addClass(document.querySelector(".blind"), "blind--open");
    addClass(document.querySelector(".blind__line1"), "blind__line1--open");
    addClass(document.querySelector(".blind__line2"), "blind__line2--open");
  }
}

function scrollFade(className, inColor, outColor) {
  var elements = document.querySelectorAll(className);
  var i = 0;

  if (winScroll > winHeight - 50) {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = inColor;
    }
  } else {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = outColor;
    }
  }
}

function changeSection(idArray) {
  var winScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : winScroll;

  var flag = true;

  // Clear hover class on nav section, but didn't action class.
  for (var i = 0; i < idArray.length; i++) {
    var navLink = document.querySelector("a[href='" + idArray[i] + "']");

    removeClass(navLink, "menu__link--hover");
  }

  for (var i = 0; i < idArray.length && flag; i++) {
    var pageSection = document.querySelector(idArray[i]);

    if (winScroll >= pageSection.offsetTop - 101) {
      var navLink = document.querySelector("a[href='" + idArray[i] + "']");

      addClass(navLink, "menu__link--hover");
      idArray.splice(i, 1);
      flag = false;
    }
  }
}

function changeNav() {
  winScroll = window.pageYOffset || document.documentElement.scrollTop;
  winWidth = document.documentElement.clientWidth;

  scrollFade(".menu", "rgba(0,0,0,1)", "rgba(0,0,0,0.5)");
  scrollFade(".telephone", "rgba(0,0,0,1)", "rgba(0,0,0,0.5)");

  if (winWidth <= 750 - 15) {
    scrollFade(".menu__element", "rgba(0,0,0,1)", "rgba(0,0,0,0.5)");
  } else {
    scrollFade(".menu__element", "transparent", "transparent");
  }

  changeSection(["#contact", "#services", "#about"], winScroll);
}

function closeNotificationPopUp() {
  removeClass(document.querySelector(".notification-popup"), "notification-popup--open");
}

function modal(className, options) {
  var newPopUp = document.createElement("div");
  newPopUp.className = "popup popup--open";

  var newWin = document.createElement("div");
  newWin.className = className;
  console.log(options);
  var innerHTML = '';
  if (options.hasOwnProperty('text')) {
    innerHTML += options.text;
  }
  if (options.hasOwnProperty('confirm') || options.hasOwnProperty('cancel')) {
    innerHTML += '<div class="block">';
    if (options.hasOwnProperty('confirm')) {
      innerHTML += '<input type="button" class="button window__button" value="' + options.confirm + '" onclick="removeParrentClass(\'popup\', \'popup--open\')">';
    }
    innerHTML += ' ';
    if (options.hasOwnProperty('cancel')) {
      innerHTML += '<input type="button" class="button window__button" value="' + options.cancel + '" onclick="removeParrentClass(\'popup\', \'popup--open\')">';
    }
    innerHTML += '</div>';
  }

  newWin.innerHTML = innerHTML;

  newPopUp.appendChild(newWin);
  document.body.appendChild(newPopUp);
}

//smooth scroll
function smoothScroll(allAnchorLinks) {
  var menu = document.querySelector(".menu");
  var menuLinks = document.querySelectorAll(".menu__link");
  var hamburger = document.querySelector(".hamburger");
  var hamburgerLines = document.querySelectorAll(".hamburger__line");

  for (var i = 0; i < allAnchorLinks.length; i++) {
    allAnchorLinks[i].addEventListener("click", function (e) {
      var anchor = this;
      var start = null;
      var offsetBeforeElement = 50;
      var speed = 0.75;
      var currentPositionToTop = window.pageYOffset;
      var documentPositionToElement = Math.round(document.querySelector(anchor.hash).offsetTop, 0) - offsetBeforeElement;
      location.hash = anchor.hash;

      window.requestAnimationFrame(step);
      function step(time) {
        var progress = 0;
        var finalDestination = 0;

        if (start === null) {
          start = time;
        }

        progress = time - start;

        if (documentPositionToElement - currentPositionToTop < 0 - offsetBeforeElement) {
          finalDestination = Math.max(currentPositionToTop - progress / speed, documentPositionToElement);
        } else {
          finalDestination = Math.min(currentPositionToTop + progress / speed, documentPositionToElement);
        }

        window.scrollTo(0, finalDestination);

        if (finalDestination != documentPositionToElement) {
          window.requestAnimationFrame(step);
        }
      }

      for (var j = 0; j < menuLinks.length; j++) {
        removeClass(menuLinks[j], "menu__link--active menu__link--hover");
      }

      if (winWidth <= 750 - 15) {
        removeClass(menu, "menu--open");

        for (var j = 0; j < hamburgerLines.length; j++) {
          removeClass(hamburgerLines[j], "hamburger__line--open");
        }
      }

      if (hasClass(anchor, "menu__link")) {
        addClass(anchor, "menu__link--active");
      }

      e.preventDefault();
    });
  }
}

function hover(elements, hoverClassName) {
  if (isHas(elements)) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("mouseenter", function () {
        addClass(this, hoverClassName);
      });

      elements[i].addEventListener("focus", function () {
        addClass(this, hoverClassName);
      });

      elements[i].addEventListener("mouseleave", function () {
        removeClass(this, hoverClassName);
      });

      elements[i].addEventListener("blur", function () {
        removeClass(this, hoverClassName);
      });
    }
  }
}

function clickArrowLeft(carusel, count) {
  if (carusel && count) {
    var sliders = carusel.querySelectorAll(".slider__slide");
    var step = 100 / count;

    for (var i = 0; i < sliders.length; i++) {
      if (hasClass(sliders[i], 'slider__slide--first')) {
        if (i == 0) {
          break;
        }
        removeClass(sliders[i], 'slider__slide--first');
        addClass(sliders[i - 1], 'slider__slide--first');
        removeClass(sliders[i + count - 1], 'slider__slide--last');
        addClass(sliders[i + (count - 1) - 1], 'slider__slide--last');
        carusel.querySelector(".slider--line").style.transform = "translateX(" + -step * (i - 1) + "%)";
        break;
      }
    }
  }
}

function clickArrowRight(carusel, count) {
  if (carusel && count) {
    var sliders = carusel.querySelectorAll(".slider__slide");
    var step = 100 / count;

    for (var i = 0; i < sliders.length; i++) {
      if (i == sliders.length - 1) {
        break;
      }
      if (hasClass(sliders[i], 'slider__slide--last')) {
        removeClass(sliders[i - (count - 1)], 'slider__slide--first');
        addClass(sliders[i - (count - 1) + 1], 'slider__slide--first');
        removeClass(sliders[i], 'slider__slide--last');
        addClass(sliders[i + 1], 'slider__slide--last');
        carusel.querySelector(".slider--line").style.transform = "translateX(" + -step * (i - (count - 1) + 1) + "%)";
        break;
      }
    }
  }
}

function sliderLineInitial(count) {
  var carusels = document.querySelectorAll(".carusel--line");

  for (var i = 0; i < carusels.length; i++) {
    var sliders = carusels[i].querySelectorAll(".slider__slide");
    addClass(sliders[0], 'slider__slide--first');
    addClass(sliders[count - 1], 'slider__slide--last');
  }
}