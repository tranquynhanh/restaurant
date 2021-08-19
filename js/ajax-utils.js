(function (global){
    var ajaxUtils = {};
//return an http request object
    function getRequestObject(){
        if(window.XMLHttpRequest){
            return (new XMLHttpRequest());
        }
        //For very old IE browsers (optional)
        else if(window.ActiveXObject){
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }
        else {
            global.alert("Ajax is not supported");
            return(null);
        }
    }
    //makes an ajax GET request to "requestUrl"
    ajaxUtils.sendGetRequest = 
    function(requestUrl, responseHandler, isJsonResponse){
        var request = getRequestObject(); 
        request.onreadystatechange = 
        function() {
        handleReponse(request, responseHandler, isJsonResponse);  
        };
        request.open("GET", requestUrl, true);
        request.send(null);
    };
    //only calls users provided 'responseHandler'
    //function if response is ready
    //and not an error
    function handleReponse(request, responseHandler, isJsonResponse){
        if((request.readyState ==4)&&(request.status == 200)){
            //if này cho json
            if(isJsonResponse == undefined){
                isJsonResponse = true;
            }
            if(isJsonResponse){
                responseHandler(JSON.parse(request.responseText))
            }
            else{
                responseHandler(request.responseText);
            }
            //responseHandler(request);
        }
    }
    //expose utility to the global object
    global.$ajaxUtils = ajaxUtils;
})(window);