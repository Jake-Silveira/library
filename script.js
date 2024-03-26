const book1 = new Book('Divergent', 'Veronica Roth', 487, 'has been read');
const book2 = new Book('Insurgent', 'Veronica Roth', 568, 'has been read');
const book3 = new Book('Alegiant', 'Veronica Roth', 526, 'have not read yet');

const myLibrary = [book1, book2, book3];

const userForm = document.getElementById('newBtn');
const content = document.querySelector('.contentGrid');

function makeRows(rows, cols){
  content.style.setProperty('--grid-rows', rows);
  content.style.setProperty('--grid-cols', cols);

  for(c = 0; c < (rows * cols); c++){
    let cell = document.createElement('div');
    content.appendChild(cell).className = "grid-item";
    cell.id = "grid-item" + c;
    cell.style.backgroundColor = 'grey';
    cell.style.padding = '45px';
    cell.style.opacity = '0'
  };

  displayBooks();
};

makeRows(4,4);

function Book(title, author, pages, read) {
  this.title = title + ',';
  this.author = ' by ' + author + ', ';
  this.pages = pages + ' pages, ';
  this.read = read + '.';
  this.info = function() {
    return this.title + this.author + this.pages + this.read;
  };
};

function addBookToLibrary(inputTitle, inputAuthor) {
  const userBook = new Book(inputTitle, inputAuthor, "", "");
  myLibrary.push(userBook);
  displayBooks();
};

userForm.addEventListener('click', () =>  {
  let inputTitle = prompt('Enter a title');
  let inputAuthor = prompt('Enter an Author');
  addBookToLibrary(inputTitle, inputAuthor);
});

function displayBooks(){
  for (let i = 0; i < 16; i++) {
    if(typeof myLibrary[i] !== 'undefined'){
    document.getElementById('grid-item' + i).textContent = myLibrary[i].info();
    document.getElementById('grid-item' + i).style.opacity = '100';
  };
};
};

/*Book.prototype.sayHello = function() {
  console.log("Hello, I'm a player!");
};

console.log(book1.info());
console.log(book2.info()); 
console.log(book3.info());
book1.sayHello(); */
