const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title + ',';
  this.author = ' by ' + author + ', ';
  this.pages = pages + ' pages, ';
  this.read = read + '.';
  this.info = function() {
      return this.title + this.author + this.pages + this.read;
  };
}

function addBookToLibrary() {
  // do stuff here
}
