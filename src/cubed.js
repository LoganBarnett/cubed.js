'use strict';

var cubed = (function() {
  var cubed = {};

  var callbacks = [];
  var readySubmodules = [];
  var submodulesNeeded = ['grid', 'voxel', 'chunk', 'vector'];

  cubed.onModuleReady = function(callback) {
    callbacks.push(callback);
  };

  cubed.reportSubmoduleReady = function(submodule) {
    readySubmodules.push(submodule);
    var index = submodulesNeeded.indexOf(submodule);
    if(index > -1) {
      submodulesNeeded.splice(index, 1);
      if(submodulesNeeded.length == 0) {
        cubed.fireModuleReady();
      }
    }
  };

  cubed.fireModuleReady = function() {
    callbacks.forEach(function(cb) { cb(); });
  };

  return cubed;
}());
