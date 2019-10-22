
var x = new XMLHttpRequest();
window.addEventListener('load', function(){
    var xhr = null;
   
   getXmlHttpRequestObject = function() {
        if(!xhr) { 
            // Create a new XMLHttpRequest object
             xhr = new XMLHttpRequest();
            }
             return xhr; 
           }
   updateLiveData = function() {
           var now = new Date();
           // Date string is appended as a query with live data 
           // for not to use the cached version
           var url = "api/v1/serverinfo/time";
           
           xhr = getXmlHttpRequestObject();
           xhr.onreadystatechange = evenHandler;
          
             // asynchronous requests
           xhr.open("GET", url, true);
         
               // Send the request over the network
                xhr.send(null);
                };
               updateLiveData();
               
function evenHandler() {

     // Check response is ready or not 
     if(xhr.readyState == 4 && xhr.status == 200)
     { 
        dataDiv = document.getElementsByClassName("divHeader");
       

        x.send();
      // Set current data text 
     dataDiv[0].innerHTML = xhr.responseText;
       // Update the live data every 1 sec
        setTimeout(updateLiveData(), 10000);
                    }
                   }
   
                    });
function getStories(){
    var url2 = "api/v1/stories";
    x.open("GET",url2,true);
    x.setRequestHeader("Content-Type","application/json");
   
    x.onreadystatechange = function(){
       
        if(x.readyState == 4 && x.status == 200)
        { 
         console.log( x.responseText);
        }else{
            console.log(x.status)
        }

       
        
    }             
}
                  