var loggedin=0;

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
      $.post("register.php",data)
        .done(function(data){
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
            loadUserContent();
          }
        });
      };
  });
})();

(function processLogout(){
  $("#logout").on("click", function(e){
    console.log("logout");
    e.preventDefault();
    $.post("logout.php")
      .done(function(data){
          var response=JSON.parse(data);
          console.log(response);
          if (response.status==="logout"){
            logout();
          }
      });
  });
})();

function loadUserContent(){
  $(".reg-result").empty();
  $("#synergy-reg").hide();
  $("#synergy-user-content").show();
  // Add here
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
