const book1 = new Book('Divergent', 'Veronica Roth', 487, 'has been read');
const book2 = new Book('Insurgent', 'Veronica Roth', 568, 'has been read');
const book3 = new Book('Alegiant', 'Veronica Roth', 526, 'have not read yet');

const myLibrary = [book1, book2, book3];

const userForm = document.getElementById('newBtn');
const content = document.querySelector('.contentGrid');

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");
const bookTitle = document.querySelector(".bookTitle");
const bookAuthor = document.querySelector(".bookAuthor");

const openModal = function (title, author) {
  bookTitle.textContent = title;
  bookAuthor.textContent = author;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", closeModal);

function makeRows(rows, cols){
  content.style.setProperty('--grid-rows', rows);
  content.style.setProperty('--grid-cols', cols);

  for(c = 0; c < (rows * cols); c++){
    let cell = document.createElement('div');
    content.appendChild(cell).className = "grid-item";
    cell.id = "grid-item" + c;
    cell.style.padding = '30px';
    cell.style.opacity = '0';
  };
  displayBooks();
};

makeRows(6,6);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return this.author;
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
  for (let i = 0; i < 36; i++) {
    if(typeof myLibrary[i] !== 'undefined'){
      let cell = document.getElementById('grid-item' + i);
      let icon = document.createElement('img');
      icon.className = 'grid-item-icon';
      icon.src = 'photos/book.svg';
      cell.style.opacity = '100';
      cell.textContent = String(myLibrary[i].title).substring(0, 10);
      cell.appendChild(icon);
      cell.addEventListener("click", () => {
        openModal(myLibrary[i].title, myLibrary[i].author);
      });
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
