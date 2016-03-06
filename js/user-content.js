var loggedin=0;
var fblogin=0;

(function hideUserContent(){
  $("#synergy-user-content").hide();
})();

function checkConfirmationPassword(){
    var matching=1;
    password=$("#password").val();
    confirmPassword=$("#confirm-password").val();
    if (password!=confirmPassword){
      matching=0;
    }
    if (matching){
      $("#confirm-password").removeClass("invalid");
      $("#confirm-password").addClass("valid");
    }else {
      $("#confirm-password").removeClass("valid");
      $("#confirm-password").addClass("invalid");
    }
    return matching;
}

function checkPassword(){
    var password=$("#password").val();
    if (password.length<8){
      $("#password").removeClass("valid");
      $("#password").addClass("invalid");
      return 0;
    }
    if (password.length>=8){
      $("#password").removeClass("invalid");
      $("#password").addClass("valid");
    }
    var valid=checkConfirmationPassword();
    return valid;
}

(function confirmationPasswordFieldChange(){
  $("#confirm-password").on("change",function(){
  checkConfirmationPassword();
  });
})();

(function passwordFieldChange(){
  $("#password").on("change",function(){
    checkPassword();
  });
})();

(function processRegistration(){
  $("#registration-submit").on("click", function(e){
    e.preventDefault();
    var name=$("#first_name").val()+ " " +$("#last_name").val();
    var college=$("#college").val();
    var email=$("#email").val();
    var password=$("#password").val();
    var isPasswordValid=checkPassword();
    var isEmailValid=$("#email").hasClass("valid");
    if (isPasswordValid && isEmailValid){
      var data={
           name:name,
           college:college,
           email:email,
           password:password
         };
      console.log(data);
      $.post("register.php",data)
        .done(function(data){
          console.log(data);
            var response=JSON.parse(data);
            console.log(response);
            if (response.status==="success"){
              loggedin=1;
              loadUserContent();
            }
        });
    }
  });
})();

(function processLogin(){
  $("#login-submit").on("click", function(e){
    e.preventDefault();
    var email=$("#login-email").val();
    var password=$("#login-password").val();
    var isEmailValid=$("#login-email").hasClass("valid");
    if (isEmailValid){
      var data={
           email:email,
           password:password
         };
      $.post("login.php",data)
        .done(function(data){
          var response=JSON.parse(data);
          console.log(response);
          if (response.status==="success"){
            loggedin=1;
            $(".reg-result").empty();
            loadUserContent();
          }else {
            loggedin=0;
            $(".reg-result").empty();
            $(".reg-result").html(response.description);
          }
        });
      };
  });
})();

(function processLogout(){
  $("#logout").on("click", function(e){
    e.preventDefault();
    if (fblogin==1){
      FB.logout(function(response) {
        $.post("logout.php")
          .done(function(data){
              var response=JSON.parse(data);
              console.log(response);
              if (response.status==="logout"){
                logout();
              }
          });
      });
    }else{
      $.post("logout.php")
        .done(function(data){
            var response=JSON.parse(data);
            console.log(response);
            if (response.status==="logout"){
              logout();
            }
        });
    }
  });
})();

function loadUserContent(){
  $("#synergy-reg").hide();
  $("#synergy-user-content").show();
  var url="getusercontent.php";
  $.get(url)
  .done(function(data){
    var response=JSON.parse(data);
    if (response.status=="success"){
      $("#registeredEvents").empty();
      var registeredEvents=response.registeredEvents;
      var registeredEventsCode=response.registeredEventsCode;
      var i;
      for (i=0;i<registeredEvents.length;i++){
        var id="deregister_"+registeredEventsCode[i];

        var tag = '<tr><td>' + registeredEvents[i] + '</td><td><div class="chip right green deregister" id="'+id+'"">Unregister    <i class="material-icons">close</i></div></td></tr>';
        console.log(tag);
        $("#registeredEvents").append(tag);

        $("#"+id).on("click", (function(eventcode){
          return function(){
            deregisterevent(eventcode);
          }
        })(registeredEventsCode[i]) );

      }
    }else {
      logout();
    }

  });
}

function logout(){
  loggedin=0;
  $("#synergy-reg").show();
  $("#synergy-user-content").hide();
  $(".reg-result").empty();
}

function registerevent(event){
  console.log(event);
  if (loggedin === 1){
    var url="eventreg.php?event=" + event;
    console.log('asdf');
    console.log(url);
    $.get(url)
    .done(function(data){
      var response=JSON.parse(data);
      console.log(response);
      if (response.status==="success"){
        $("#"+event+" .reg-result").html(response.description);
        loadUserContent();
      }else if (response.status==="fail"){
        $("#"+event+" .reg-result").html(response.description);
      }else if (response.status==="logout"){
        $("#"+event+" .reg-result").html(response.description);
        logout();
      }
    });
  }else{
      $("#"+event+" .reg-result").html("You need to login to register");
  }
}

function deregisterevent(eventcode){
  console.log(eventcode);
  if (loggedin === 1){
    var url="eventreg.php?event=" + eventcode + "&deregister=1";
    $.get(url);
    loadUserContent();
  }else{
    logout();
  }
}

(function eventRegistrations(){
    $("#fixemup-register").on("click",function(e){
      registerevent("fixemup");
    });
    $("#engineerofthefuture-register").on("click",function(e){
      e.preventDefault();
      registerevent("engineerofthefuture");
    });
    $("#techyhunt-register").on("click",function(e){
      e.preventDefault();
      registerevent("techyhunt");
    });
    $("#junkyardwars-register").on("click",function(e){
      e.preventDefault();
      registerevent("junkyardwars");
    });
    $("#paperpresentation-register").on("click",function(e){
      e.preventDefault();
      registerevent("paperpresentation");
    });
    $("#waterrocketry-register").on("click",function(e){
      e.preventDefault();
      registerevent("waterrocketry");
    });
    $("#sanrachana-register").on("click",function(e){
      e.preventDefault();
      registerevent("sanrachana");
    });
    $("#paperplane-register").on("click",function(e){
      e.preventDefault();
      registerevent("paperplane");
    });
    $("#selfpropellingvehicle-register").on("click",function(e){
      e.preventDefault();
      registerevent("selfpropellingvehicle");
    });
    $("#cadmodelling-register").on("click",function(e){
      e.preventDefault();
      registerevent("cadmodelling");
    });
    $("#mcquiz-register").on("click",function(e){
      e.preventDefault();
      registerevent("mcquiz");
    });
})();

$("#campus-ambassador").on('click',function(e){
  e.preventDefault();
  $('html, body').animate({
      'scrollTop' : $("#campus-ambassador-reg").position().top
  });
  $("#campus-ambassador-reg").show();

});
$("#campus-ambassador-reg-hide").on('click', function(){
  console.log("hide");
  $("#campus-ambassador-reg").hide();
});

(function processCARegistration(){
  $("#CA-registration-submit").on("click", function(e){
    e.preventDefault();
    var name=$("#CA_first_name").val()+ " " +$("#CA_last_name").val();
    var college=$("#CA_college").val();
    var email=$("#CA_email").val();
    var phone=$("#CA_phone").val();
    var password=$("#CA_password").val();
    var confirmPassword=$("#CA_confirm_password").val();
    if (confirmPassword!=password){
      $("#CA_confirm_password").removeClass("valid");
      $("#CA_confirm_password").addClass("invalid");
      return;
    }
    var data={
         name:name,
         college:college,
         email:email,
         phone:phone,
         password:password
       };
    $.post("caregister.php",data)
      .done(function(data){
          var response=JSON.parse(data);
          if (response.status==="success"){
            $(".ca-status").empty();
            $(".ca-status").html(response.description);
          }else{
            $(".ca-status").empty();
            $(".ca-status").html(response.description);
          }
      });
  });
})();
