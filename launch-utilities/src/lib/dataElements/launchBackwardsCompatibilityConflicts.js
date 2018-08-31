'use strict';

module.exports = function(settings) {
  if(typeof window.launchUtilities !="undefined" && typeof window.launchUtilities.backwardsCompatibility=="object"){
    return window.launchUtilities.backwardsCompatibility.join(",") //define backwards compatibility list if it doesn't exist
  }
};
