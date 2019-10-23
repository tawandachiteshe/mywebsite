console.log("hello from spring");
var d = new Date();
var buttons = [];
var UserRequest = new XMLHttpRequest();
var Reload = new XMLHttpRequest();
$(document).ready(function(){
    $('.sidenav').sidenav();
       $('.tabs').tabs();
       $('.parallax').parallax();
       $('.collapsible').collapsible();
       $('.slider').slider();
       getUrls("/api/v1/serverinfo/time");
       userData();
       
       $('.refreshbtn').click(function(){
        console.log('hello jquery')
       
        getdata()
    });
  });
  window.addEventListener("load",function(){
    this.console.log("hi");
    loadGithubInfo();
    postStory();
    setTimeout(postStory(),1000);
   getGihubData();
    
  });
function Reloading(){
  Reload.open("GET","/admin");
  Reload.onreadystatechange = Reloading;
  
  if(Reload.readyState === 4 && Reload.status === 200){
    document.write(Reload.responseText);
  }
  
  Reload.send();

}

function postStory(){
  var story = {
    heading:"many",
    body:"hajs",
    category:"shajs"
  }
  var toJson = JSON.stringify(story);
  console.log(toJson);
  var post = new XMLHttpRequest();
  post.open("POST","/api/v1/stories");
  post.setRequestHeader("Content-Type","application/json");
  post.onreadystatechange = function(){
   switch(post.readyState){
     case 0:
        console.log("failed");
        break;
      case 1:
        console.log("opens");
        break;
      case 2:
        console.log("HEADERS RECEIVED");
        break;
      case 3:
        console.log("loading");
        break;
      case 4:
        console.log("success!!!");
        break;
   }
  }
  
  post.send(toJson);
}


function getUrls(url){
  var request = new XMLHttpRequest();
  var response;
  request.open("GET",url);
  request.onreadystatechange = function(){
    if(request.readyState === this.DONE && this.status === 200){
      if(this.responseText !== null){
        response = this.responseText;
         var serverTimeHea = document.getElementById('serverTime');
         serverTimeHea.innerHTML = this.responseText;
         console.log(response);
      return this.responseText;
      }else{
       responseText = undefined;
      }
    }
  }
  request.send();
}

function userData(){
  UserRequest.open("GET","api/v1/userinfo");
  UserRequest.onreadystatechange = reFreshUserData;
  UserRequest.send();
}

var reFreshUserData = function(){
  var div = document.getElementById('userList');
   if(UserRequest.readyState === this.DONE && this.status === 200){

            if(this.responseText !== null){
            var json = JSON.parse(this.responseText);
            
            var arr = [];
          for (let index = 0; index < json.length; index++) {
            var ch = document.createElement('li');
            var divHeader = document.createElement('h4');
            var DeleteButton = document.createElement('button');
            var enableAndDisableButton = document.createElement('button');
            DeleteButton.innerText = "delete";
            if(json[index].enabled === true){
              enableAndDisableButton.innerText = 'disable';
            }else{
              enableAndDisableButton.innerText = 'enable';
            }
            DeleteButton.setAttribute("class","btn red");
            enableAndDisableButton.setAttribute("class","btn blue pading right")
            var userInfoP = document.createElement('p');
            divHeader.setAttribute("class","collapsible-header");
            var divBody = document.createElement('div');
            divBody.setAttribute("class","collapsible-body")
            ch.appendChild(divHeader);
            ch.appendChild(divBody);
            divHeader.innerText = json[index].email;
            var userString = "Username: " + json[index].username + "\n" + "Enabled: " + json[index].enabled + "\n" + "Role: " + json[index].roles + "\n" + "UserId: "+ json[index].userId + "\n" + "Date_joined: " + json[index].date;
            divBody.appendChild(userInfoP);
            divBody.appendChild(DeleteButton);
            divBody.appendChild(enableAndDisableButton);
            userInfoP.innerText = userString;
            
            arr.push(ch);
          }
        for (let i = 0; i < arr.length; i++) {
         div.appendChild(arr[i]);
         buttons.push(arr[i].getElementsByTagName('button'));
          
        }
        deleteOrdisable(json);
            console.log(json);
            }else{

             div[0].innerText = this.status

            }

       }

       }

function deleteOrdisable(json){
for (let i = 0; i< buttons.length; i++) {

  for (let j = 0; j < buttons[i].length; j++) {
      buttons[i][0].onclick = function(){
        var disable = new XMLHttpRequest();
     
          disable.open("GET","delete/?id=" + json[i].userId);
          disable.onreadystatechange = function(){
           if(disable.readyState === this.DONE && this.status === 200){
             console.log(this.responseText);
             M.toast({html: 'Deletion was successful'});
           }
          }
          disable.send();
        }
      buttons[i][1].onclick = function(){
        console.log(buttons[i][j].innerText);
        var disable = new XMLHttpRequest();
        if(buttons[i][1].innerText === "DISABLE"){
          disable.open("GET","disable/?id=" + json[i].userId);
          disable.onreadystatechange = function(){
           if(disable.readyState === this.DONE && this.status === 200){
             console.log(this.responseText);
             M.toast({html: 'Disabled'});
           }
         }
        }else{
          disable.open("GET","confirm/?token=" + json[i].userId);
          disable.onreadystatechange = function(){
           if(disable.readyState === this.DONE && this.status === 200){
             console.log(this.responseText);
             M.toast({html: 'Enabled'});
           }
         }
        }
       

      disable.send();
      }
    
    
  }
  
}
}

 function getGihubData (){
    var request = new XMLHttpRequest();
 request.open("get",'https://api.github.com/users/tawandachiteshe/repos?client_id=e43c4c5068f0fc057adb&client_secret=bcf961aa817de1dbc64efa3d0b4fda58c472672a');
  request.onreadystatechange = function(){
  var div = document.getElementsByClassName("divHeader");
   if(request.readyState === this.DONE && this.status === 200){

            if(this.responseText !== null){
            console.log(request.responseText)
            localStorage.setItem("jsonGitResponse",request.responseText)
            }else{

             div[0].innerText = this.status

            }

       }

       }

       request.send();

  }


  function loadGithubInfo(){
    console.log("hi");
    let arr = [];
    var f = localStorage.jsonGitResponse
    var gitJson = JSON.parse(f);
    for (let i = 0; i < gitJson.length; i++) {
      var ch = document.createElement('li');
      var a = document.createElement('a');
      var downloadButton = document.createElement('button');
      var br = document.createElement('br');
      downloadButton.setAttribute("class","blue btn center-align");
      downloadButton.innerHTML = "download";
      a.setAttribute("class","blue-text");
      a.setAttribute("href",gitJson[i].url);
      a.innerText = "Url: " + gitJson[i].url;
      var divHeader = document.createElement('h4');
      var userInfoP = document.createElement('p');
      divHeader.setAttribute("class","collapsible-header");
      var divBody = document.createElement('div');
      divBody.setAttribute("class","collapsible-body")
      ch.appendChild(divHeader);
      ch.appendChild(divBody);
      divHeader.innerText = i + "." + " " + gitJson[i].name;
      userInfoP.innerText = "Full_name: " + gitJson[i].full_name + "\n" + "Description: " + gitJson[i].description + "\n" + "Created At: " + gitJson[i].created_at + "\n" + "Programming Language: " + gitJson[i].language + "\n";
      divBody.appendChild(userInfoP);
      divBody.appendChild(a);
      divBody.appendChild(br);
      divBody.appendChild(downloadButton);
      arr.push(ch);
      
    }
    let conta = document.getElementById('ProjectList');
    for (let i = 0; i < arr.length; i++) {
      conta.appendChild(arr[i]);
      
    }

  }
  
