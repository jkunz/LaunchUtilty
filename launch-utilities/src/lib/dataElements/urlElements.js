'use strict';

module.exports = function(settings) {
  //protocol
  var protocol=document.location.href.split("//")[1]

  //Query params
  if(document.location.href.split("?").length>0){
    var queryParams=document.location.href.split("?")[1]
  }
};
