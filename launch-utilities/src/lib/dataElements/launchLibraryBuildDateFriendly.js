'use strict';

module.exports = function(settings) {
  return new Date(_satellite.buildInfo.buildDate).toGMTString()
};
