var UserService = {

  init: function ($current_dir) {
    $('#login-form').validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        // console.log(entity);
        UserService.login(entity, $current_dir);
      }
    });
    $('#signup-form').validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        // if(typeof(entity.avatar_id) != "undefined"){
        //   console.log('avatar_id: '+entity.avatar_id);

        // }
        // console.log(entity);
        UserService.signup(entity, $current_dir);
      }
    });
  },

  login: function (entity, $current_dir) {
    $.ajax({
      url: $current_dir + '/rest/login',
      type: 'POST',
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        // console.log(result);
        localStorage.setItem("token", result.token);
        UI.token_check($current_dir);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
  },

  signup: function (entity, $current_dir) {
    $.ajax({
      url: $current_dir + '/rest/sign_up',
      type: 'POST',
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        // console.log(result);
        localStorage.setItem("token", result.token);
        $('#signUpModal').modal('toggle');
        var modalBackdrops = document.getElementsByClassName('modal-backdrop fade show');
        while (modalBackdrops.length > 0) modalBackdrops[0].remove();
        UI.token_check($current_dir);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
  },

  logout: function () {
    localStorage.removeItem('token');
    UI.token_check();
  },

  account_settings: function ($current_dir) {    
    $.ajax({
      url: $current_dir + '/rest/current_user',
      type: 'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function (result) {
        console.log(result);
        UserService.lister(result);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
  },

  lister: function (result) {
    // fill account settings form
    $("#as_accountForm").html("");
    var html = "";
    html += `
      <div name="Avatar Div" class="col-12 text-center">
        <label for="as_avatars" class="form-label" style="width:100%;">Avatar</label>
        <div class="btn-group" id="as_avatars">

          <input id="as_avatar1" type="radio" class="btn-check" autocomplete="off">
          <label class="btn btn-outline-info" for="avatarButton1">
            <img name="Avatar button 1" id="avatarButton1" src="../assets/avatars/1.svg" alt="" width="80rem"
              height="80rem" />
          </label>

          <input id="as_avatar2" type="radio" class="btn-check" autocomplete="off">
          <label class="btn btn-outline-info" for="avatarButton2">
            <img name="Avatar button 2" id="avatarButton2" src="../assets/avatars/2.svg" alt="" width="80rem"
              height="80rem" />
          </label>

          <input id="as_avatar3" type="radio" class="btn-check" autocomplete="off">
          <label class="btn btn-outline-info" for="avatarButton3">
            <img name="Avatar button 3" id="avatarButton3" src="../assets/avatars/3.svg" alt="" width="80rem"
              height="80rem" />
          </label>

          <input id="as_avatar4" type="radio" class="btn-check" autocomplete="off">
          <label class="btn btn-outline-info" for="avatarButton4">
            <img name="Avatar button 4" id="avatarButton4" src="../assets/avatars/4.svg" alt="" width="80rem"
              height="80rem" />
          </label>


        </div>
        <input name="avatar_id" id="as_avatarID" class="my-0" type="number"
          style="visibility: hidden; width:100%; height:0;" value="`+result.avatar_id+`" required>
      </div>

      <div name="First Name Div" class="col-md-6">
        <label for="as_formFirstName" class="form-label">First name</label>
        <input name="first_name" id="as_formFirstName" type="text" class="form-control" value="`+result.first_name+`" required>
      </div>

      <div name="Last Name Div" class="col-md-6">
        <label for="as_formLastName" class="form-label">Last name</label>
        <input name="last_name" id="as_formLastName" type="text" class="form-control" value="`+result.last_name+`" required>
      </div>

      <div name="Old Password Div" class="col-md-6">
        <label for="as_formOldPassword" class="form-label">Old Password</label>
        <input name="old_password" id="as_formOldPassword" type="password" class="form-control"
          value="" required>
      </div>

      <div name="New Password Div" class="col-md-6">
        <label for="as_formNewPassword" class="form-label">New Password</label>
        <input name="password" id="as_formNewPassword" type="password" class="form-control"
          value="" required>
      </div>

      <div name="Submit Div" class="col-12">
        <button class="btn btn-primary" type="submit">Save Changes</button>
      </div>
    
      `;
    $("#as_accountForm").html(html);
    $('#as_avatar'+result.avatar_id).attr("checked", "");
    selfUI.init_listeners();

  },

}
