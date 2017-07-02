'use strict';

var min = '';

requirejs.config({
  baseUrl: './dist/js'
});

requirejs(['properties' + min, 'DOM' + min, 'styles' + min, 'interactions' + min, 'scripts' + min], function () {
  scriptsLoad();
});