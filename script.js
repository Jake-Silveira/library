const book1 = new Book('Divergent', 'Veronica Roth', 487, 'read');
const book2 = new Book('Insurgent', 'Veronica Roth', 568, 'unread');
const book3 = new Book('Alegiant', 'Veronica Roth', 526, 'in-progress');
const book4 = new Book('Alegiant', 'Veronica Roth', 526, 'unread');
const book5 = new Book('Alegiant', 'Veronica Roth', 526, 'unread');
const book6 = new Book('Alegiant', 'Veronica Roth', 526, 'unread');
const book7 = new Book('Alegiant', 'Veronica Roth', 526, 'unread');
const book8 = new Book('Alegiant', 'Veronica Roth', 526, 'unread');
const book9 = new Book('Alegiant', 'Veronica Roth', 526, 'unread');
const book10 = new Book('Alegiant', 'Veronica Roth', 526, 'unread');
const book11 = new Book('Alegiant', 'Veronica Roth', 526, 'unread');
const book12 = new Book('Alegiant', 'Veronica Roth', 526, 'unread');
const book13 = new Book('Alegiant', 'Veronica Roth', 526, 'unread');
const book14 = new Book('Alegiant', 'Veronica Roth', 526, 'unread');

const myLibrary = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12, book13, book14];

const addBtn = document.getElementById('newBtn');
const selectBtn = document.getElementById('selectBtn');
const content = document.querySelector('.contentGrid');

const userForm = document.querySelector('.userForm');
const userTitle = document.getElementById('userTitle');
const userAuthor = document.getElementById('userAuthor');
const userPages = document.getElementById('userPages');
const userColor = document.getElementById('userColor').value;
const userRead = document.getElementById('userRead');
const userUnread = document.getElementById('userUnread');
const userInProgress = document.getElementById('userIn-progress');
const submitBtn = document.querySelector('.btn-submit');


const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");
const closeUserFormBtn = document.querySelector(".userFormBtn-close");
const bookTitle = document.querySelector(".bookTitle");
const bookAuthor = document.querySelector(".bookAuthor");
const bookPages = document.querySelector(".bookPages");
const bookRead = document.getElementById('read');
const bookUnread = document.getElementById('unread');
const bookInProgress =document.getElementById('in-progress');
const bookColor = document.getElementById('bookColor');
const cellIndex = document.querySelector('.index');

function makeRows(rows, cols){
  content.style.setProperty('--grid-rows', rows);
  content.style.setProperty('--grid-cols', cols);

  for(c = 0; c < (rows * cols); c++){
    let cell = document.createElement('div');
    content.appendChild(cell).className = "grid-item";
    cell.id = "grid-item" + c;
    cell.style.padding = '1vw';
    cell.style.opacity = '0';
  };
  displayBooks();
};

makeRows(6,6);

addBtn.addEventListener('click', () =>  {
  openUserForm();
});

const openUserForm = function(){
  userTitle.value = "";
  userAuthor.value = "";
  userPages.value = "";
  userForm.classList.remove("hidden");
  overlay.classList.remove("hidden");

  userRead.addEventListener("click", function(){
    userUnread.checked = false;
    userInProgress.checked = false;
    inputRead = 'read';
  });

  userUnread.addEventListener("click", () => {
    userRead.checked = false;
    userInProgress.checked = false;
    inputRead = 'unread';
  });

  userInProgress.addEventListener("click", () =>{
    userRead.checked = false;
    userUnread.checked = false;
    inputRead = 'in-progress';
  });

};

submitBtn.addEventListener('click', () => {

  if(userTitle.value !== "" && userAuthor.value !== "" && userPages.value !== ""){
    addBookToLibrary(userTitle.value, userAuthor.value, userPages.value, inputRead, userColor);
  closeModal();
  } else {
    return alert('Please fill in all fields.');
  };
  
});

function addBookToLibrary(inputTitle, inputAuthor, inputPages, inputRead, userColor) {
  const userBook = new Book(inputTitle, inputAuthor, inputPages, inputRead, userColor);
  myLibrary.push(userBook);
  displayBooks();
};

function Book(title, author, pages, read, color) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.color = color;
  this.info = function() {
    return this.author;
  };
};


function displayBooks(){
  for (let i = 0; i < 36; i++) {
    if(typeof myLibrary[i] !== 'undefined'){
      let cell = document.getElementById('grid-item' + i);
        if(cell.style.opacity < 100){
          let icon = document.createElement('img');
          let check = document.createElement('input');
          icon.className = 'grid-item-icon';
          icon.id = 'grid-item-icon' + i;
          icon.src = 'photos/book.svg';
          icon.style.backgroundColor = myLibrary[i].color;
          check.type = 'checkbox';
          check.className = 'grid-item-check';
          check.id = 'grid-item-check' + i;
          check.classList.add('hidden');
          cell.style.opacity = '100';
          cell.textContent = String(myLibrary[i].title).substring(0, 10);
          cell.appendChild(icon);
          cell.appendChild(check);
          icon.addEventListener("click", () => {
            openModal(myLibrary[i].title, myLibrary[i].author, myLibrary[i].pages, myLibrary[i].read, i);
        });
      };
    };
  };
};

selectBtn.addEventListener('click', () =>{
  insertOrRemoveChecks();
});

const insertOrRemoveChecks = function (){
  for(let i =0; i < 36; i++) {
    let cell = document.getElementById('grid-item' + i);
    if(cell.style.opacity !== '0'){
      let check = document.getElementById('grid-item-check' + i);
      check.classList.toggle('hidden');
    };
    
  };
};

const openModal = function (title, author, pages, read, arrayIndex) {
  cellIndex.textContent = arrayIndex;
  cellIndex.style.visibility = "hidden";
  bookTitle.textContent = title;
  bookAuthor.textContent = "Author: " + author;
  bookPages.textContent = pages + " Pages";
  bookColor.addEventListener("input", changeColor, false);
  if(read == 'read'){
    bookRead.checked = true;
    bookUnread.checked = false;
    bookInProgress.checked = false;
  } else if(read == 'unread'){
    bookRead.checked = false;
    bookUnread.checked = true;
    bookInProgress.checked = false;
  } else if(read == 'in-progress'){
    bookRead.checked = false;
    bookUnread.checked = false;
    bookInProgress.checked =true;
  }
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  bookRead.addEventListener("click", function(){
    bookUnread.checked = false;
    bookInProgress.checked = false;
    myLibrary[arrayIndex].read = "read";
  });

  bookUnread.addEventListener("click", () => {
    bookRead.checked = false;
    bookInProgress.checked = false;
    myLibrary[arrayIndex].read = "unread";
  });

  bookInProgress.addEventListener("click", () =>{
    bookRead.checked = false;
    bookUnread.checked = false;
    myLibrary[arrayIndex].read = "in-progress";
  });
};

const changeColor = function(event){
  let icon = document.getElementById('grid-item-icon' + cellIndex.textContent);
  myLibrary[cellIndex.textContent].color = event.target.value;
  icon.style.backgroundColor = event.target.value;
};

const closeModal = function () {
  modal.classList.add("hidden");
  userForm.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
closeUserFormBtn.addEventListener("click", closeModal);



/*Book.prototype.sayHello = function() {
  console.log("Hello, I'm a player!");
};

console.log(book1.info());
console.log(book2.info()); 
console.log(book3.info());
book1.sayHello(); */
