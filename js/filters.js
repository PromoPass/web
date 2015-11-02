'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }])
  .filter('compress', function(){
    return function(text){ 
      return String(text).replace(/\s*/mg, "-")
    };
  });
