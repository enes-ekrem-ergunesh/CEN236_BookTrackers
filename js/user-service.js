var UserService = {
  init: function(){
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
        // console.log(entity);
        UserService.login(entity);
      }
    });
  },
  login: function(entity){
    $.ajax({
      url: 'rest/login',
      type: 'POST',
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        console.log(result);
        localStorage.setItem("token", result.token);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        
      }
    });
  },

  logout: function(){
    localStorage.clear();
    window.location.replace("login.html");
  },
}
