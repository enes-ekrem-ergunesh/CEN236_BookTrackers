class selfUI {

  static init_listeners() {
    this.account_form_submit_handler();
    this.avatar_radio_button_onclick();
  }

  static account_form_submit_handler() {
    $('#as_accountForm').validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        console.log(entity);
        selfUI.update_user(entity);
      }
    });
  }

  static update_user(entity){
    const current_dir = '..';
    $.ajax({
      url: current_dir+'/rest/current_user',
      type: 'PUT',
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function (result) {
        // console.log(result);
        localStorage.setItem("token", result.token);
        UI.token_check(current_dir);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
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
    $('#as_avatar1').removeAttr("checked");
    $('#as_avatar2').removeAttr("checked");
    $('#as_avatar3').removeAttr("checked");
    $('#as_avatar4').removeAttr("checked");
    switch ($id) {
      case 1:
        $('#as_avatar1').attr("checked", "");
        $('#as_avatarID').attr("value", "1");
        break;

      case 2:
        $('#as_avatar2').attr("checked", "");
        $('#as_avatarID').attr("value", "2");
        break;

      case 3:
        $('#as_avatar3').attr("checked", "");
        $('#as_avatarID').attr("value", "3");
        break;

      case 4:
        $('#as_avatar4').attr("checked", "");
        $('#as_avatarID').attr("value", "4");
        break;

      default:
        break;
    }

  }

}