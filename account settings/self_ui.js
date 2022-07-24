class selfUI {

  static init_listeners() {
    this.account_form_submit_handler();
    this.edit_password_form_validation_rules();
    // this.edit_password_form_submit_handler();
    this.edit_password_showhide_onclick();
    this.avatar_radio_button_onclick();
  }

  static account_form_submit_handler() {
    $('#accountForm').validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        console.log(entity);
        //   if (!isNaN(entity.id)){
        //     // update method
        //     var id = entity.id;
        //     delete entity.id;
        //     NoteService.update(id, entity);
        //   }else{
        //     // add method
        //     NoteService.add(entity);
        //   }
      }
    });
  }

  static edit_password_form_validation_rules() {

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const form = document.querySelector('#editPasswordForm')

    const passwordOld = document.querySelector('#formOldPassword')
    const password1 = document.querySelector('#formNewPassword')
    const password2 = document.querySelector('#formConfirmPassword')

    const passwordOld_valid = document.querySelector('#formOldPasswordValid')
    const passwordOld_invalid = document.querySelector('#formOldPasswordInvalid')

    const password1_valid = document.querySelector('#formNewPasswordValid')
    const password1_invalid = document.querySelector('#formNewPasswordInvalid')

    const password2_valid = document.querySelector('#formConfirmPasswordValid')
    const password2_invalid = document.querySelector('#formConfirmPasswordInvalid')



    // Loop over them and prevent submission
    form.addEventListener('submit', event => {

      // OLD PASSWORD
      if (passwordOld.value === "" || passwordOld.value === null) {// if empty || null
        passwordOld_valid.setAttribute("style", "display:none;")
        passwordOld_invalid.setAttribute("style", "display:block;")
        event.preventDefault()
        event.stopPropagation()
        return false;
      }
      else {
        passwordOld_invalid.setAttribute("style", "display:none;")
        passwordOld_valid.setAttribute("style", "display:block;")
      }

      // NEW PASSWORD
      if (password1.value === "" || password1.value === null) {
        password1_valid.setAttribute("style", "display:none;")
        password1_invalid.setAttribute("style", "display:block;")
        event.preventDefault()
        event.stopPropagation()
        return false;
      }
      else if (password1.value.length < 8 || password1.value.length > 20) {//if less than 8 or more than 20 char
        password1_valid.setAttribute("style", "display:none;")
        password1_invalid.setAttribute("style", "display:block")
        password1_invalid.textContent = "Your password must be between 8 and 20 characters in length.";
        event.preventDefault()
        event.stopPropagation()
        return false;
      }
      else {
        password1_invalid.setAttribute("style", "display:none;")
        password1_valid.setAttribute("style", "display:block;")
      }

      // CONFIRM PASSWORD
      if (password1.value !== password2.value) {
        password2_valid.setAttribute("style", "display:none;")
        password2_invalid.setAttribute("style", "display:block")
        password2_invalid.textContent = "Please make sure your passwords match.";
        event.preventDefault()
        event.stopPropagation()
        return false;
      }

      else {
        password2_invalid.setAttribute("style", "display:none;")
        password2_valid.setAttribute("style", "display:block;")
      }

      var entity = Object.fromEntries((new FormData(form)).entries());
      console.log(entity);

      // $('#editPasswordForm').validate({
      //   submitHandler: function (form) {
      //     var entity = Object.fromEntries((new FormData(form)).entries());
      //     console.log(entity);
      //     //   if (!isNaN(entity.id)){
      //     //     // update method
      //     //     var id = entity.id;
      //     //     delete entity.id;
      //     //     NoteService.update(id, entity);
      //     //   }else{
      //     //     // add method
      //     //     NoteService.add(entity);
      //     //   }
      //   }
      // });

    })

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

  static password_edit_button_onclick() {

  }

  static edit_password_showhide_onclick() {
    const formOldPasswordToggle = document.querySelector('#formOldPasswordToggle');
    const formOldPassword = document.querySelector('#formOldPassword');

    formOldPasswordToggle.addEventListener('click', function (e) {
      // toggle the type attribute
      const type = formOldPassword.getAttribute('type') === 'password' ? 'text' : 'password';
      formOldPassword.setAttribute('type', type);
      // toggle the eye slash icon
      this.classList.toggle('fa-eye-slash');
    });

    const formNewPasswordToggle = document.querySelector('#formNewPasswordToggle');
    const formNewPassword = document.querySelector('#formNewPassword');

    formNewPasswordToggle.addEventListener('click', function (e) {
      // toggle the type attribute
      const type = formNewPassword.getAttribute('type') === 'password' ? 'text' : 'password';
      formNewPassword.setAttribute('type', type);
      // toggle the eye slash icon
      this.classList.toggle('fa-eye-slash');
    });

    const formConfirmPasswordToggle = document.querySelector('#formConfirmPasswordToggle');
    const formConfirmPassword = document.querySelector('#formConfirmPassword');

    formConfirmPasswordToggle.addEventListener('click', function (e) {
      // toggle the type attribute
      const type = formConfirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
      formConfirmPassword.setAttribute('type', type);
      // toggle the eye slash icon
      this.classList.toggle('fa-eye-slash');
    });

  }

}