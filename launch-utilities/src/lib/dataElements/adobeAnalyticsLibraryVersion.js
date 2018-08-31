'use strict';

module.exports = function(settings) {
  if(typeof window.s != "undefined" && typeof window.s.version != "undefined"){
    return s.version
  }else{
    console.error("trying out getTracker")
    var getTracker = turbine.getSharedModule('adobe-analytics', 'get-tracker');
    getTracker().then(function(tracker) { 
      console.error("get tracker worked",tracker.version)
      return tracker.version
    })
  }
};
