'use strict';

module.exports = function(settings) {
  if(turbine.getSharedModule('adobe-mcid', 'mcid-instance')){
    return turbine.getSharedModule('adobe-mcid', 'mcid-instance').version
  }
};
