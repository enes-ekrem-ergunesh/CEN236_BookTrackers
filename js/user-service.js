var UserService = {

  init: function($current_dir){
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "3000",
      "extendedTimeOut": "1500",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    $('#login-form').validate({
      submitHandler: function(form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        console.log(entity);
        UserService.login(entity, $current_dir);
      }
    });
    $('#signup-form').validate({
      submitHandler: function(form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        // if(typeof(entity.avatar_id) != "undefined"){
        //   console.log('avatar_id: '+entity.avatar_id);

        // }
        console.log(entity);
        UserService.signup(entity, $current_dir);
      }
    });
  },

  login: function(entity, $current_dir){
    $.ajax({
      url: $current_dir+'/rest/login',
      type: 'POST',
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        console.log(result);
        localStorage.setItem("token", result.token);
        UI.token_check($current_dir);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
  },

  signup: function(entity, $current_dir){
    $.ajax({
      url: $current_dir+'/rest/sign_up',
      type: 'POST',
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        console.log(result);
        localStorage.setItem("token", result.token);
        UI.token_check($current_dir);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
  },

  logout: function(){
    localStorage.clear();
    UI.token_check();
  },
}
