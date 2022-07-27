var AuthorService = {

  init: function () {
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
  },

  list_author: function ($current_dir) {
    $.ajax({
      url: $current_dir + '/rest/publicauthors/' + localStorage.getItem("current_author_id"),
      type: 'GET',
      success: function (result) {
        console.log(result[0]);
        AuthorService.lister($current_dir, result[0]);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
  },

  lister: function ($current_dir, result) {
    // list all public books
    $("#author-body").html("");
    var html = `
      <div class="col-md-4 mx-auto" aria-hidden="true">
        <div class="row justify-content-center">
          <div class="col" style="max-width: 18rem;">
            <img src="`+$current_dir+`/assets/author_images/`+result.cover+`" class="rounded" alt="image" style="width: 100%;">
          </div>
        </div>
      </div>
      <div class="col-md-8 mx-auto">

        <h1 class="card-title">
        `+result.name+`
        </h1>
        <p>
        `+result.bio+`
        </p>
      </div>
    `;
    
    $("#author-body").html(html);

  },


}
