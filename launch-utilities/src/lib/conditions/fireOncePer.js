'use strict';

var document = require('@adobe/reactor-document');

module.exports = function(settings,event) {
  var ruleID=event.$rule.name
  var firstTimeFiring=false //set up a variable to return false or true based on whether this rule has fired for this user before
  if(!window.launchUtilities){window.launchUtilities={}}

  if(settings.expiration=="page"){
    var pageRules=window.launchUtilities["oncePer"]?window.launchUtilities["oncePer"]:[] //check the dom for our JS object, if it exists, otherwise make an array
    if(pageRules.indexOf(ruleID)==-1){ 
      firstTimeFiring=true
      pageRules.push(ruleID)
      //_satellite.logger.info("FIRE ONCE PER: The rule '"+ruleID+"' has not yet fired on this page")
    }//else{_satellite.logger.info("FIRE ONCE PER: The rule '"+ruleID+"' has already fired on this page")}
    window.launchUtilities["oncePer"]=pageRules //put stuff back into our JS object on the dom
  }else if(settings.expiration=="visit"){
    var sessionRules=sessionStorage.getItem("launch-once-per")?sessionStorage.getItem("launch-once-per").split(","):[] //get current list of session rules (if they exist) and split it into an array, otherwise create a blank array
    if(sessionRules.indexOf(ruleID)==-1){ //before adding our rule to the list, check if the rule has previously been added, to help us tell whether we should return true or false on this condition
      firstTimeFiring=true
      sessionRules.push(ruleID) //add our rule to the list of rules to watch for
      //_satellite.logger.info("FIRE ONCE PER: The rule '"+ruleID+"' has not yet fired on this visit")
    }//else{_satellite.logger.info("FIRE ONCE PER: The rule '"+ruleID+"' has already fired on this page")}
    sessionRules=sessionRules.join(",") //turn it back into a string (in theory storage does this for us, but I don't trust IE)
    sessionStorage.setItem("launch-once-per",sessionRules)
    
  }else if(settings.expiration=="visitor"){
    var visitorRules=localStorage.getItem("launch-once-per")?localStorage.getItem("launch-once-per").split(","):[]
    if(visitorRules.indexOf(ruleID)==-1){
      firstTimeFiring=true
      visitorRules.push(ruleID)
      //_satellite.logger.info("FIRE ONCE PER: The rule '"+ruleID+"' has not yet fired for this visitor")
    }//else{_satellite.logger.info("FIRE ONCE PER: The rule '"+ruleID+"' has already fired for this visitor")}
    visitorRules=visitorRules.join(",")
    localStorage.setItem("launch-once-per",visitorRules)
  }
  return firstTimeFiring //after adding the rule ot the list of things to watch for that have fired for this user, we can now return false or true based on whether it was the first time we encountered this rule/condition for this user
};