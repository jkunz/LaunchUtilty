'use strict';

module.exports = function(settings) {
  if(!window.launchUtilities){
    window.launchUtilities={} //create it if it doesn't exist
  }
  window.launchUtilities.rulesList=[] //clear it out
  window.launchUtilities.lastRule="" //clear it out
};