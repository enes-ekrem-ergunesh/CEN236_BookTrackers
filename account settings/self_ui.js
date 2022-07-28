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
        $('#avatarID').attr("value", "1");
        break;

      case 2:
        $('#as_avatar2').attr("checked", "");
        $('#avatarID').attr("value", "2");
        break;

      case 3:
        $('#as_avatar3').attr("checked", "");
        $('#avatarID').attr("value", "3");
        break;

      case 4:
        $('#as_avatar4').attr("checked", "");
        $('#avatarID').attr("value", "4");
        break;

      default:
        break;
    }

  }

}