class UI {

  static init($current_dir) {
    this.token_check($current_dir);
    this.screen_size_change_listener();
    // if($current_dir === '.') this.avatar_radio_button_onclick();
    this.avatar_radio_button_onclick();    
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": true,
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
  }

  static token_check($current_dir) {
    var token = localStorage.getItem("token");
    if (token) {
      $.ajax({
        url: $current_dir+'/rest/current_user',
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function (user) {
          // console.log(user);
          $('#userCanvasBodyContainer').html(`
          
          <div class="row justify-content-center">
          <div class="col-10 text-center">
            <img class="img-fluid" alt="Profile Photo" style="max-height: 8rem;"
              src="`+$current_dir+`/assets/avatars/`+user.avatar_id+`.svg">
          </div>
        </div>
        <div class="row justify-content-center my-3">
          <div class="col-10 text-center">
            <h3>`+user.first_name+` `+user.last_name+`</h3>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-10">
            <div class="list-group">
              <a style="border: none;" href="`+$current_dir+`/my shelf/" class="list-group-item list-group-item-action">My Shelf</a>
              <a style="border: none;" href="`+$current_dir+`/account settings/" class="list-group-item list-group-item-action">Account
                Settings</a>
              <a style="border: none; color: red;" href="" onclick="UserService.logout();" class="list-group-item list-group-item-action">Logout</a>
            </div>
    
          </div>
        </div>
    
          `);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          toastr.error(XMLHttpRequest.responseJSON.message);
          UserService.logout();
        }
      });
    }
    //<form id="login-form" name="Login Form" class="row g-3 needs-validation justify-content-center" novalidate>
    else {
      $('#userCanvasBodyContainer').html(`
      
    <form id="login-form" name="Login Form" class="row g-3 justify-content-center">

    <div name="Email Div" class="col-lg-6">
      <label for="formEmail" class="form-label">Email</label>
      <input name="email" id="formEmail" type="text" class="form-control" required>
    </div>

    <div name="Password Div" class="col-lg-6">
      <label for="formPassword" class="form-label">Password</label>
      <input name="password" id="formPassword" type="password" class="form-control"  required>
    </div>

    <div name="Submit Div" class="col-6">
      <button class="btn btn-primary" type="submit" style="width: 100%;">Sign in</button>
    </div>
    
    <div name="SignUp Div" class="col-12 text-center" style="--bs-gutter-y: 0.3rem;">
    <p style="font-size: 12px;">Forget your password? <a href="" data-bs-toggle="modal" data-bs-target="#signUpModal">Sign Up</a></p>
      
    </div>
  </form>

      `);

    }
  }

  static navbar_toggle() {
    if ($('#navbarToggler').attr('aria-expanded') == 'true') {
      console.log('collapse: ' + $('#navbarToggler').attr('aria-expanded'));
      $('#collapsableNavbar').attr('class', 'navbar-collapse collapse');
      $('#navbarToggler').attr('aria-expanded', 'false');
    }
    else {
      console.log('expand: ' + $('#navbarToggler').attr('aria-expanded'));
      $('#collapsableNavbar').attr('class', 'navbar-collapse collapse show');
      $('#navbarToggler').attr('aria-expanded', 'true');
    }
  }

  static user_canvas_toggle() {
    if ($('#userCanvasToggler').attr('aria-expanded') == 'true') {
      // console.log('collapse: ' + $('#userCanvasToggler').attr('aria-expanded'));

      $('#userCanvas').attr('class', 'offcanvas-lg offcanvas-end');
      $('#userCanvasBackdrop').attr('class', '');
      $('#userCanvasToggler').attr('aria-expanded', 'false');
    }
    else {
      // console.log('expand: ' + $('#userCanvasToggler').attr('aria-expanded'));

      $('#userCanvas').attr('class', 'offcanvas-lg offcanvas-end show');
      $('#userCanvasBackdrop').attr('class', 'offcanvas-backdrop fade show');
      $('#userCanvasToggler').attr('aria-expanded', 'true');
    }

  }

  static screen_size_change_listener() {

    $(window).resize(function () {
      // show_size();
      remove_user_canvas_backdrop();
    });

    function show_size() {
      // var canvasWidth = $('#userCanvasBodyContainer').width();
      var canvasWidth = $(window).width();
      if (canvasWidth >= 992) {
        console.log("canvas width: " + canvasWidth);
      }
    }

    function remove_user_canvas_backdrop() {
      var backdropClass = $('#userCanvasBackdrop').attr('class');
      var togglerClass = $('#userCanvasToggler').attr('aria-expanded');
      if (togglerClass == 'true') {
        if (backdropClass == 'offcanvas-backdrop fade show' && $(window).width() >= 992) {
          $('#userCanvas').attr('class', 'offcanvas-lg offcanvas-end');
          $('#userCanvasBackdrop').attr('class', '');
        }
        else if (backdropClass == '' && $(window).width() < 992) {
          $('#userCanvas').attr('class', 'offcanvas-lg offcanvas-end show');
          $('#userCanvasBackdrop').attr('class', 'offcanvas-backdrop fade show');
        }
      }
    }

  }
  
  static avatar_radio_button_onclick() {
    const avatarButton1 = document.querySelector('#avatarButton1');

    avatarButton1.onclick = () => {
      this.avatar_radio_reselect(1);
    }

    const avatarButton2 = document.querySelector('#avatarButton2');

    avatarButton2.onclick = () => {
      this.avatar_radio_reselect(2);
    }

    const avatarButton3 = document.querySelector('#avatarButton3');

    avatarButton3.onclick = () => {
      this.avatar_radio_reselect(3);
    }

    const avatarButton4 = document.querySelector('#avatarButton4');

    avatarButton4.onclick = () => {
      this.avatar_radio_reselect(4);
    }
  }

  static avatar_radio_reselect($id) {
    $('#avatar1').removeAttr("checked");
    $('#avatar2').removeAttr("checked");
    $('#avatar3').removeAttr("checked");
    $('#avatar4').removeAttr("checked");
    switch ($id) {
      case 1:
        $('#avatar1').attr("checked", "");
        $('#avatarID').attr("value", "1");
        break;

      case 2:
        $('#avatar2').attr("checked", "");
        $('#avatarID').attr("value", "2");
        break;

      case 3:
        $('#avatar3').attr("checked", "");
        $('#avatarID').attr("value", "3");
        break;

      case 4:
        $('#avatar4').attr("checked", "");
        $('#avatarID').attr("value", "4");
        break;

      default:
        break;
    }

  }

  static enable_tooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  }

}