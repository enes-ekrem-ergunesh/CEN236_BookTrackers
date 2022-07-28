var UserbookService = {


  list_shelf: function ($current_dir) {
    var token = localStorage.getItem("token");
    if (token) {
      $.ajax({
        url: $current_dir + '/rest/userbooks_shelf/',
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function (result) {
          // console.log(result);

          // if shelf is empty 
          if (result.length === 0) {
            UserbookService.empty_shelf();
          }
          // else
          else {
            UserbookService.lister($current_dir, result);
          }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          toastr.error(XMLHttpRequest.responseJSON.message);
        }
      });
    }
    else{

    }
  },

  lister: function ($current_dir, result) {
    // list all public books
    $("#books-row").html("");
    var html = "";
    for (let i = 0; i < result.length; i++) {
      html += `
        <div class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3 col-xxl-3 my-3">
          <div class="card">

            <a href="`+ $current_dir + `/read" onclick="localStorage.setItem('current_book_id', '` + result[i].id + `');">
              <img src="`+ result[i].cover + `"
                class="card-img-top" alt="Book Cover">
            </a>

            <div class="container">
              <div class="row justify-content-end align-items-end"
                style="padding: 1em; padding-bottom:0; padding-right:0.3em;">

                <a class="list-group-item" href="`+ $current_dir + `/read" onclick="localStorage.setItem('current_book_id', '` + result[i].id + `');" style="padding-right:0.7em;">
                  <h6 id="book-name-`+ result[i].id + `" name="Book Name" class="card-title" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" data-bs-toggle="none" data-bs-title="` + result[i].name + `" data-bs-placement="top" >` + result[i].name + `</h6>
                </a>

                <a class="list-group-item" href="`+ $current_dir + `/author" onclick="localStorage.setItem('current_author_id', '` + result[i].author_id + `');" style="padding-right:0.7em;">
                  <p style="font-size:14px;">`+ result[i].author_name + `</p>
                </a>

                <a href=" javascript:void(0);" class="list-group-item" 
                  style="width:fit-content; height:fit-content; position:absolute; padding-bottom:0.3em; color:red;" onclick="UserbookService.on_remove('`+ $current_dir + `', ` + result[i].id + `);">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path
                      d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                  </svg>
                </a>
                <a href="#delete" class="list-group-item"
                          style="width:fit-content; height:fit-content; position:absolute; padding-bottom:0.3em; color:red;">
                        </a>

              </div>
            </div>

          </div>
        </div>
        `;
    }
    $("#books-row").html(html);

    // add tooltip where name doesn't fit
    var books = document.getElementsByName('Book Name');
    for (let j = 0; j < books.length; j++) {
      if (books[j].scrollWidth > books[j].clientWidth) {
        // console.log(books[j]);
        books[j].setAttribute('data-bs-toggle', 'tooltip');
      }
    }
    UI.enable_tooltips();
  },

  empty_shelf: function () {
    $("#books-container").html("");
    var html = "";
    html += `
      <div id="books-row" name="Books (shelf)" class="row justify-content-center">
        <div class="col-5 col-md-4 col-lg-4">
          <img style="width:100%" src="../assets/state_images/empty.svg" alt="empty state ui image">
        </div>
        <div class="col-8 col-sm-8 col align-self-center text-center" style="height: fit-content; width:fit-content">
          <p class="fs-1 fw-semibold" style="color: #888;white-space: nowrap; margin-bottom: 0.2em;">Ooops! shelf is empty...</p>
          <span class="fs-3" style="color: #888;">When you find books you like, add to shelf and they'll appear here.</span>
        </div>
      </div>
    `;
    $("#books-container").html(html);

  },

  on_add: function ($current_dir, $id) {

    var token = localStorage.getItem("token");
    if (token) {
      $.ajax({
        url: $current_dir + '/rest/userbook_shelf/' + $id,
        type: 'POST',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function (result) {
          // console.log(result);
          toastr.success(result.message);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          toastr.error(XMLHttpRequest.responseJSON.message);
        }
      });
    }
    else {
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
      toastr.warning("You have to be logged in first!");
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
  },

  on_remove: function ($current_dir, $id) {
    $.ajax({
      url: $current_dir + '/rest/userbooks_shelf/' + $id,
      type: 'DELETE',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function (result) {
        // console.log(result);
        toastr.success(result.message);
        UserbookService.list_shelf(current_dir);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
  },

}
