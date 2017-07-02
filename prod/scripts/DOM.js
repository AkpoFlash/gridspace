'use strict';


function addClass(element, strClassesName){
  var arClassesName = strClassesName.split(' ');

  for(var i = 0; i < arClassesName.length; i++){
    element.className += ' ' + arClassesName[i];
  }

  element.className = element.className.trim();

  return element.className;
}


function removeClass(element, strClassesName){
  var arElementClasses  = element.className.trim().split(' ');
  var arClassesName     = strClassesName.trim().split(' ');
  element.className     = '';

  nextClass:  for(var i = 0; i < arElementClasses.length; i++){
    for(var j = 0; j < arClassesName.length; j++){
      if(arElementClasses[i] === arClassesName[j]){
        continue nextClass;
      }

    }
    element.className += ' ' + arElementClasses[i];
  }

  element.className = element.className.trim();

  return element.className;
}


function removeParrentClass(parrentClassname, removeClassName){
  var elements = document.querySelectorAll("." + parrentClassname);
  for(var i = 0; i < elements.length; i++){
    removeClass(elements[i], removeClassName)
  }
}


function toggleClass(element, strClassesName){
  var arClassesName = strClassesName.trim().split(' ');


  var isSetClasses = arClassesName.every(function(currentValue, item, arr){
    return hasClass(element, currentValue);
  });

  if(isSetClasses){
    removeClass(element, strClassesName);
  }
  else{
    addClass(element, strClassesName);
  }

  return isSetClasses;
}


function hasClass(element, strClassName){
  var strElementClasses = ' ' + element.className.trim() + ' ';
  strClassName          = strClassName.trim();

  if(~strElementClasses.indexOf(' ' + strClassName + ' ')){
    return true;
  }

  return false;
}


function isHas(element){
  if(element === null){
    return false;
  }
  if(typeof element == 'object'){
    if(Object.prototype.toString.call(element) == '[object NodeList]'){
      if(element.length > 0){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return true;
    }
  }
}

function getClosest(element, selector){
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }
  // Get closest match
  for ( ; element && element !== document; element = element.parentNode ) {
    if ( element.matches( selector ) ) return element;
  }
  return null;
};

function getParents(element, selector){
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }
  // Setup parents array
  var parents = [];
  // Get matching parent elements
  for ( ; element && element !== document; element = element.parentNode ) {
    // Add matching parents to array
    if ( selector ) {
        if ( element.matches( selector ) ) {
            parents.push( element );
        }
    } else {
        parents.push( element );
    }
  }
  return parents;
};
