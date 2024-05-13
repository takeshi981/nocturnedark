const pwShowHide = document.querySelectorAll(".pw_hide"),
      home = document.querySelector(".home"),
      username = document.querySelector("#login__username"),
      pass = document.querySelector("#login__password"),
      buttonLogin = document.querySelector("#login-button"),
      formOpenBtn = document.querySelector("#login-picture"),
      formContainer = document.querySelector(".form_container"),
      formCloseBtn = document.querySelector("#form_close"),

      back = document.querySelector("#userback"), 
      fwd = document.querySelector("#userfwd"),
      dropdown = document.querySelector(".dropdown"),
      dropdown2 = document.querySelector(".dropdown2");


let current_user = 0;

var default_session = window.lightdm.default_session;

function display_user_picture(current_user){

        if ( current_user >= 0 && lightdm.users[current_user] !== null ) {
      document.getElementById("login-picture").style.opacity = 0;
  
        setTimeout(function(){
          document.getElementById("login-picture").src = lightdm.users[current_user].image;
          document.getElementById("login-picture").addEventListener("load", function(){
            document.getElementById("login-picture").style.opacity = 1;
          });
        }, 350);
        var default_user = lightdm.users.lenght === 1;
        default_user = lightdm.users[0];
        username.value = default_user.username;

        document.getElementById("login__password").focus();
      }
    }

    

      pwShowHide.forEach((icon) => {
        icon.addEventListener("click", () => {
          let getPwInput = icon.parentElement.parentElement.querySelector("input");
          if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("octicon--eye-closed", "octicon--eye")
          } else {
            getPwInput.type = "password";
            icon.classList.replace("octicon--eye", "octicon--eye-closed");
          }
        });
      });
      const dropdownBtns = document.querySelectorAll('.dropdown2');
      let lastOpened = null;
      
      dropdownBtns.forEach(btn => btn.addEventListener('click', function() {
        const menuContent = this.nextElementSibling;
      
        if (lastOpened !== null) {
          const target = lastOpened;
       
          target.addEventListener('animationend', () => {
            target.classList.remove('show', 'animate-out');
       
            if (target === lastOpened) {
              lastOpened = null;
            }
          }, {
            once: true
          });
      
          target.classList.add('animate-out');
        }
      
        if (lastOpened !== menuContent) {
          menuContent.classList.add('show');
          lastOpened = menuContent;
        }
      }));


       function populate_dropdown(){

         lightdm.sessions.forEach(function(session, index){
           let session_name = lightdm.sessions[index].key;
           var object = document.querySelector("#list");
           var html = `<li id="option"><span class="options">`+session_name+`</span></li>`
           object.insertAdjacentHTML("beforeend", html);


        });


      }

    dropdown.addEventListener("click", function(evt){

        var options = document.querySelectorAll(".option")
        options.forEach((item) => {

            item.classList.remove("options");

        });
        dropdown.classList.add("selected");
        const droph1 = document.querySelector("h1");

        droph1.textContent = evt.target.innerText;
        default_session = droph1.textContent;

      });




back.addEventListener("click", function(evt){
  
  current_user--;
    if (lightdm.users[current_user] !== undefined){
      
        display_user_picture(current_user);
    }
   
 
});
fwd.addEventListener("click", function(evt){
  
  current_user++;
  
    if (lightdm.users[current_user] !== undefined){
      display_user_picture(current_user);
    }
  
  
});

 buttonLogin.addEventListener("click", function(evt){
   respond();
   evt.preventDefault();

});         

 function start_authentication(user){

   window.lightdm.authenticate(user);


}

function respond(){
  let password = pass.value || null;
  if(password !== null) {
    window.lightdm.respond(password);
    authenticationDone();
  } else {
    window.lightdm.cancel_authentication();

  }
}
function authenticationDone(){
  lightdm.authentication_complete.connect(() => {
    if (lightdm.is_authenticated) {

      authentication_complete();

    }
    else {

      authentication_failed();

    }

});
}


async function authentication_complete()
{

    lightdm.start_session(default_session);


}

async function authentication_failed(){

  window.lightdm.cancel_authentication();

  start_authentication(username.value);

}


function init(){
  display_user_picture(current_user);
  populate_dropdown();
  authenticationDone();
  start_authentication(username.value);
}


init();


