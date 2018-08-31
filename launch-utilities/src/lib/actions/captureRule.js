'use strict';

module.exports = function(settings,event) {
  var ruleID=event.$rule.name

  if(!window.launchUtilities){
    window.launchUtilities={}//define launchUtilities Object
  }else{
      if(typeof window.launchUtilities.rulesList!="object"){
          window.launchUtilities.rulesList=[] //define rules list if it doesn't exist
      }
      if(typeof window.launchUtilities.backwardsCompatibility!="object"){
          window.launchUtilities.backwardsCompatibility=[] //define backwards compatibility list if it doesn't exist
      }
  } 

  //getQueryParam
  launchUtilities.getParameterByName=function(name, url) {
      if (!url) url = window.location.href
      url=url.toLowerCase();
      name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  //backwards-compatibility tracking
  if(typeof _satellite.getQueryParam!="function"){
    _satellite.getQueryParam=function(name){
        launchUtilities.getParameterByName(name)
        window.launchUtilities.backwardsCompatibility.push(ruleID+" uses _satellite.getQueryParam on "+name)
        _satellite.logger.info("LAUNCH UTILITIES- BACKWARDS COMPATIBILITY: Launch doesn't have a function for getQueryParam, but 33 sticks has your back!")
    }
}
  if(typeof _satellite.getQueryParamCaseInsensitive!="function"){
    _satellite.getQueryParamCaseInsensitive=function(name){
        launchUtilities.getParameterByName(name)
        window.launchUtilities.backwardsCompatibility.push(ruleID+" uses _satellite.getQueryParamCaseInsensitive on "+name)
        _satellite.logger.info("LAUNCH UTILITIES- BACKWARDS COMPATIBILITY: Launch doesn't have a function for getQueryParamCaseInsensitive, but 33 sticks has your back!")
    }
}
  _satellite.notify=function(msg,priority){
    if(priority){priority=parseInt(parseInt)}else{priority=1}
    if(priority==4){
        _satellite.logger.warn(msg)
    }else if(priority==5){
        _satellite.logger.error(msg)
    }else{
        _satellite.logger.info(msg)
    }
    window.launchUtilities.backwardsCompatibility.push(ruleID+" is using _satellite.notify")
    _satellite.logger.info("LAUNCH UTILITIES- BACKWARDS COMPATIBILITY: Launch uses _satellite.logger instead of _satellite.notify.")
  } 

  window.launchUtilities.lastRule=ruleID
  window.launchUtilities.rulesList.push(ruleID)

  /*
  var s=window.s?window.s:turbine.getSharedModule('adobe-analytics', 'get-tracker') //if "s" lives on the DOM, grab it, otherwise pull it from the adobe-analytics module
  if(typeof s!="undefined" && parseFloat(s.version) >= 1.8){
    //set to variables
    s.registerPreTrackCallback(function(requestUrl, s) { //set to variables before beacon fires
      if(typeof window.launchUtilities !="undefined" && window.launchUtilities.rulesList && turbine.getExtensionSettings("rulesListVar")){
        s[turbine.getExtensionSettings("rulesListVar")]=window.launchUtilities.rulesList.join(",")
      }
      if(typeof window.launchUtilities !="undefined" && window.launchUtilities.rulesList && turbine.getExtensionSettings("backWardsRulesVar")){
        s[turbine.getExtensionSettings("backWardsRulesVar")]=window.launchUtilities.backwardsCompatibility.join(",")
      }
    }, s); 

    s.registerPostTrackCallback(function(requestUrl, s) { //clear it out
        window.launchUtilities.rulesList=[]   
        window.launchUtilities.backwardsCompatibility=[]
        window.launchUtilities.lastRule="" 
    }, s); 
  }*/  
};
