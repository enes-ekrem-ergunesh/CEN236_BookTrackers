class selfUI {

  static init_listeners() {
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
    this.window_size_change_listener();
    this.window_size_change_listener_reinforcement();
    this.read_book_from_file();
  }

  static window_size_change_listener_reinforcement() {

    $(window).resize(function () {
      // console.log("windows resized");

      document.getElementById("bookReaderContainer").style.height = document.getElementById("bookContainer").clientHeight - document.getElementById("bookContainerTitleRow").clientHeight + "px";

      document.getElementsByTagName("main")[0].style.height = document.getElementsByTagName("body")[0].clientHeight - document.getElementsByTagName("header")[0].clientHeight - 20 + "px";
    });
  }

  static window_size_change_listener() {

    document.getElementById("bookReaderContainer").style.height = document.getElementById("bookContainer").clientHeight - document.getElementById("bookContainerTitleRow").clientHeight + "px";

    document.getElementsByTagName("main")[0].style.height = document.getElementsByTagName("body")[0].clientHeight - document.getElementsByTagName("header")[0].clientHeight - 20 + "px";

    $(window).resize(function () {

      document.getElementById("bookReaderContainer").style.height = document.getElementById("bookContainer").clientHeight - document.getElementById("bookContainerTitleRow").clientHeight + "px";

      document.getElementsByTagName("main")[0].style.height = document.getElementsByTagName("body")[0].clientHeight - document.getElementsByTagName("header")[0].clientHeight - 20 + "px";

    });
  }

  static content_toggler_onclick() {
    if ($('#bookContents').attr("class") === "col-3 fit collapse-horizontal collapse show") {
      $('#bookContents').attr("class", "col-3 fit collapse-horizontal collapse");
      $('#bookContentsToggler').html(`
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                  </svg>
      `);
    }
    else {
      $('#bookContents').attr("class", "col-3 fit collapse-horizontal collapse show");
      $('#bookContentsToggler').html(`
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"></path>
                  </svg>
      `);
    }
  }

  static pages_toggler_onclick() {
    if ($('#bookPagesCol').attr("class") === "col-3 fit collapse-horizontal collapse show") {
      $('#bookPagesCol').attr("class", "col-3 fit collapse-horizontal collapse");
      $('#bookPagesToggler').html(`
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"></path>
                  </svg>
      `);
    }
    else {
      $('#bookPagesCol').attr("class", "col-3 fit collapse-horizontal collapse show");
      $('#bookPagesToggler').html(`
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                  </svg>
      `);
    }
  }

  static read_book_from_file() {

    var current_book = localStorage.getItem("current_book_id");
    var file = "../assets/books/" + current_book + ".txt";
    // var file = "../assets/books/3-Old-Bear-Paw_Martine-Max test.txt";

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var book_text = rawFile.responseText;
          // console.log("mytext: " + book_text);

          // split the book into chapters
          var chapters = book_text.split("{c}");
          var html_book = "";
          var html_chap = "";
          var page_counter = 1;
          var chap_counter = 1;

          // for each chapter
          for (var i = 0; i < chapters.length; i++) {

            // split the chapter into pages
            var pages = chapters[i].split("{p}");
            if (chapters[i] !== "") {
              // add chapter heading to book text
              html_book += "<div id='chapter-" + chap_counter + "'>"
                + "<h3 style='margin-bottom: -3rem; padding-top: 1rem;'>" + pages[0] + "</h3>";

              // add chapter heading to contents
              html_chap += `
              <a class="nav-link" href="#chapter-`+ chap_counter + `" onclick="localStorage.setItem('page_change', '1'); selfUI.on_content_click();">` + pages[0] + `</a>
              `;

              // add page group to contents
              html_chap += `<nav class="nav nav-pills flex-column">`;

              chap_counter++;
            }

            // for each page in chapter
            for (var j = 1; j < pages.length; j++) {
              if (pages[j] !== "") {

                // split page into paragraphs
                var current_page = pages[j].split("\n");
                var current_page_html = "";
                // add paragraph texts to page text
                for (var k = 0; k < current_page.length; k++) {
                  current_page_html += `
                    <p>`+ current_page[k] + `</p>
                    `;
                }

                // add page text to book text
                html_book += "<div id='page-" + page_counter + "' name='Book Page' style='margin-bottom:0rem;'>" + "<p style='font-size: 14px; text-align: end; margin-bottom:0rem; margin-top:2rem'>page " + page_counter + "</p>" + current_page_html + "</div>";

                // add page headings to contents
                html_chap += `
                  <a name="Page Heading" style="visibility: hidden; height: 0;" href="#page-`+ page_counter + `">Page ` + page_counter + `</a>
                `;


                page_counter++;
              }
            }
            // close the div for chapter
            if (chapters[i] !== "") {

              // add page group to contents
              html_chap += `</nav>`;
              html_book += "</div>";
            }

          }
          $('#bookText').html(html_book);

          // <a class="list-group-item list-group-item-action" href="#list-page-1">Page 1</a>


          $('#bookChapters').html(html_chap);

          // var html_page = "";
          // for (var i = 1; i < page_counter; i++) {
          //   html_page += `
          //         <a class="list-group-item list-group-item-action" href="#page-`+ i + `">Page ` + i + `</a>
          //         `;
          // }
          // $('#bookPages').html(html_page);



        }
      }
    }
    rawFile.send(null);
  }

  static increase_page_selector() {
    var number_of_pages = document.getElementsByName('Book Page').length;
    var page_selector = document.getElementById('page-selector-input');
    var value = page_selector.value;
    value++;
    if (value <= number_of_pages) {
      page_selector.value = value;
    }
  }

  static decrease_page_selector() {
    var page_selector = document.getElementById('page-selector-input');
    var value = page_selector.value;
    value--;
    if (value > 0) {
      page_selector.value = value;
    }
  }

  static page_selector_go() {
    var page_number = document.getElementById('page-selector-input').value;
    var pages = document.getElementsByName('Book Page');
    var number_of_pages = pages.length;
    if (page_number > number_of_pages || page_number <= 0) {
      var pageheads = document.getElementsByName("Page Heading");
      var activepage = 0;
      for (var i = 0; i < pageheads.length; i++) {
        if (pageheads[i].getAttribute("class") == "active") {
          activepage = i + 1;
        }
      }
      // set value to active page
      document.getElementById('page-selector-input').value = activepage;
      toastr.error("Page number out of range!");
    }
    else {
      localStorage.setItem("page_change", '1');
      this.go_to_page(page_number);
    }
  }

  static go_to_page($page_number) {
    // window.location.replace('./tester2.html#page-'+$page_number); //test
    window.location.replace('./#page-' + $page_number);
  }

  static on_book_scroll() {
    if (localStorage.getItem("page_change") === '1') localStorage.setItem("page_change", '0');
    else {
      selfUI.go_to_active_page();
    }
  }

  static go_to_active_page() {
    for (var i = 0; i < document.getElementsByName("Page Heading").length; i++) {
      if (document.getElementsByName("Page Heading")[i].getAttribute("class") == "active") {
        // set value to active page
        document.getElementById('page-selector-input').value = (i + 1);
      }
    }
  }

  static on_content_click() {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function click(){
      await sleep(200);
      selfUI.go_to_active_page();
    }

    click();    
  }

  static on_bookmark_click(){    
    $.ajax({
      url: current_dir+'/rest/userbook_shelf/'+localStorage.getItem('token'),
      type: 'PUT',
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

}