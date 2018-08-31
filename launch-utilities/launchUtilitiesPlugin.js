
//MUST use appMeasurement 1.8 or higher

runLaunchUtilities=function(){
    if(!window.launchUtilities){
        window.launchUtilities={
            rulesList:[],
            backwardsCompatibility:[]
        }//define launchUtilities Object
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

    var lastRule=launchUtilities.lastRule?launchUtilities.lastRule:"s_code"
    //backwards-compatibility tracking
    if(typeof _satellite.getQueryParam!="function"){
        _satellite.getQueryParam(name)=function(name){
            launchUtilities.getParameterByName(name)
            window.launchUtilities.backwardsCompatibility.push("Rule '" + lastRule+"' is using _satellite.getQueryParam on the param '"+name+"'")
        }
    }
    if(typeof _satellite.getQueryParamCaseInsensitive!="function"){
        _satellite.getQueryParamCaseInsensitive(name)=function(name){
            launchUtilities.getParameterByName(name)
            window.launchUtilities.backwardsCompatibility.push("Rule '" + lastRule+"' is using _satellite.getQueryParamCaseInsensitive on the param '"+name+"'")
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
        window.launchUtilities.backwardsCompatibility.push(lastRule+" is using _satellite.notify")
    }

    //clear out rule lists- must be after s code is substantiated, must be appMeasurement 1.8 or higher
    if(typeof s!="undefined" && parseFloat(s.version) >= 1.8){
        s.registerPostTrackCallback(function(requestUrl, s) { 
            window.launchUtilities.rulesList=[]   
            window.launchUtilities.backwardsCompatibility=[]
        }, s); 
    }
}
