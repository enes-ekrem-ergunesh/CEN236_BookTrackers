var BookService = {

  list_home: function ($current_dir) {
    $.ajax({
      url: $current_dir + '/rest/publicbooks',
      type: 'GET',
      success: function (result) {
        // console.log(result);
        BookService.lister($current_dir, result);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
  },

  list_author: function ($current_dir) {
    $.ajax({
      url: $current_dir + '/rest/publicbooks_by_author/' + localStorage.getItem("current_author_id"),
      type: 'GET',
      success: function (result) {
        // console.log(result);
        BookService.lister($current_dir, result);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
  },

  lister: function ($current_dir, result) {
    // list all public books
    $("#books-row").html("");
    var html = "";
    for (let i = 0; i < result.length; i++) {
      html += `
        <div class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3 col-xxl-3 my-3">
          <div class="card">

            <a href="./read" onclick="localStorage.setItem('current_book_id', '`+ result[i].id + `');">
              <img src="`+ result[i].cover + `"
                class="card-img-top" alt="Book Cover">
            </a>

            <div class="container">
              <div class="row justify-content-end align-items-end"
                style="padding: 1em; padding-bottom:0; padding-right:0.3em;">

                <a class="list-group-item" href="`+ $current_dir + `/read" onclick="localStorage.setItem('current_book_id', '` + result[i].id + `');" style="padding-right:0.7em;">
                  <h6 id="book-name-`+ result[i].id + `" name="Book Name" class="card-title" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" data-bs-toggle="none" data-bs-title="` + result[i].name + `" data-bs-placement="top" >` + result[i].name + `</h6>
                </a>

                <a class="list-group-item" href="./author" onclick="localStorage.setItem('current_author_id', '`+ result[i].author_id + `');" style="padding-right:0.7em;">
                  <p style="font-size:14px;">`+ result[i].author_name + `</p>
                </a>

                <a href=" javascript:void(0);" class="list-group-item" 
                  style="width:fit-content; height:fit-content; position:absolute; padding-bottom:0.3em;" onclick="UserbookService.on_add('`+ $current_dir + `', `+ result[i].id + `);">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-circle"
                    viewBox="0 0 16 16" width="21" height="21">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                    </path>
                  </svg>
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

  set_reader: function ($current_dir) {
    // console.log($book_id);
    var current_book_id = localStorage.getItem("current_book_id");

    $.ajax({
      url: $current_dir + '/rest/publicbooks/' + current_book_id,
      type: 'GET',
      success: function (result) {
        // console.log(result[0]);
        $('#book-name').html(result[0].name);
        $('#author-name').html("by " + result[0].author_name); 
        selfUI.get_bookmark();
        selfUI.check_bookmark();
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
  },

}
