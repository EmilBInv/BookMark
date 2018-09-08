// Developed By Emil Barranco | Asher 
// 2018 

document.getElementById('MyForm').addEventListener('submit', BookMark);

function BookMark() {
    //Get form values
    var SiteName = document.getElementById('SiteName').value;
    var SiteURL = document.getElementById('SiteURL').value;

    if(!validateForm(SiteName, SiteURL)) {
        return false; 
    }

    var bookMark = {
        name: SiteName,
        url: SiteURL
    }

    if(localStorage.getItem('bookmarks') === null) {

        var bookMarks = [];
        bookMarks.push(bookMark);
        localStorage.setItem('bookmarks', JSON.stringify(bookMarks));

    } else {

        var bookMarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookMarks.push(bookMark);
        localStorage.setItem('bookmarks', JSON.stringify(bookMarks));
    }

    document.getElementById('MyForm').reset();

    FetchBookMark();
    //Prevents form from submitting
    event.preventDefault(); 
}

function FetchBookMark() {

    var bookMarks = JSON.parse(localStorage.getItem('bookmarks'));
    var BookResult = document.getElementById('BookResult');   
    BookResult.innerHTML = '';

    for(var i = 0; i < bookMarks.length; i++) {
        var name = bookMarks[i].name;
        var url = bookMarks[i].url;

        BookResult.innerHTML += '<div class="card">' +
                                '<div class="card-body">'+
                                '<h2 class="card-title">'+name+'</h2>' +
                                '<a href="'+url+'" class="btn btn-primary" target="_blank">Visit</a>' +
                                '<a onclick="DelBookMark(\''+url+'\')" href="#" class="btn btn-danger">Delete</a>' +
                                '</div>'+
                                '</div>'

    }
}

function DelBookMark(url) {

    console.log(url);
    var bookMarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i = 0; i < bookMarks.length; i++) {
        if(bookMarks[i].url == url) {
            bookMarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookMarks));
    FetchBookMark();
}

function validateForm(SiteName, SiteURL){
    if(!SiteName || !SiteURL){
      alert('Please fill in the form.');
      return false;
    }
  
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    if(!SiteURL.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
  
    return true;
  }
  
  function addhttp(url) {
    if (!url.startsWith("https://" || "http://")) {
        url = "https://" + url;
    }
    return url;
  }


