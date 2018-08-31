'use strict';

module.exports = function(settings) {
  if(typeof window.launchUtilities !="undefined" && window.launchUtilities.rulesList){
    return window.launchUtilities.rulesList.join(",")
  }
};
