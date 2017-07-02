'use strict';

let winHeight       = document.documentElement.clientHeight;
let winWidth        = document.documentElement.clientWidth;
let winScroll       = window.pageYOffset || document.documentElement.scrollTop;
const LoadDate      = new Date();
let currentDate     = new Date();
const UpdateDelay   = 1000;
const XHR           = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
