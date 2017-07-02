'use strict';

var winHeight = document.documentElement.clientHeight;
var winWidth = document.documentElement.clientWidth;
var winScroll = window.pageYOffset || document.documentElement.scrollTop;
var LoadDate = new Date();
var currentDate = new Date();
var UpdateDelay = 1000;
var XHR = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;