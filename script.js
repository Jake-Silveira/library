const book1 = new Book('book1', 'Veronica Roth', 487, 'read', 'grey', false);
const book2 = new Book('book2', 'Veronica Roth', 568, 'unread', 'grey', false);
const book3 = new Book('book3', 'Veronica Roth', 526, 'in-progress', 'grey', false);
const book4 = new Book('book4', 'Veronica Roth', 487, 'read', 'grey', false);
const book5 = new Book('book5', 'Veronica Roth', 487, 'read', 'grey', false);
const book6 = new Book('book6', 'Veronica Roth', 487, 'read', 'grey', false);
const book7 = new Book('book7', 'Veronica Roth', 487, 'read', 'grey', false);
const book8 = new Book('book8', 'Veronica Roth', 487, 'read', 'grey', false);
const book9 = new Book('book9', 'Veronica Roth', 487, 'read', 'grey', false);
const book10 = new Book('book10', 'Veronica Roth', 487, 'read', 'grey', false);
const book11 = new Book('book11', 'Veronica Roth', 487, 'read', 'grey', false);
const book12 = new Book('book12', 'Veronica Roth', 487, 'read', 'grey', false);
const book13 = new Book('book13', 'Veronica Roth', 487, 'read', 'grey', false);
const book14 = new Book('book14', 'Veronica Roth', 487, 'read', 'grey', false);

const myLibrary = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12, book13, book14];

const addBtn = document.getElementById('newBtn');
const selectBtn = document.getElementById('selectBtn');
const removeBtn = document.getElementById('removeBtn');
const content = document.querySelector('.contentGrid');
const adSection = document.querySelector('.ad');
const container = document.querySelector('.container');

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

displayBooks();

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
  const userBook = new Book(inputTitle, inputAuthor, inputPages, inputRead, userColor, false);
  myLibrary.push(userBook);
  displayBooks();
};

function Book(title, author, pages, read, color, displayed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.color = color;
  this.displayed = displayed;
  this.info = function() {
    return this.author;
  };
};


function displayBooks(){
  for (let i = 0; i < myLibrary.length; i++) {
    if(myLibrary[i].displayed == false){
      myLibrary[i].displayed = true;
      let cell = document.createElement('div');
      content.appendChild(cell).className = "grid-item";
      cell.id = "grid-item" + i;
      cell.style.padding = '1vw';
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
        openModal(myLibrary[i].title, myLibrary[i].author, myLibrary[i].pages, i);
      });
    };
  };
};

selectBtn.addEventListener('click', () =>{
  insertOrRemoveChecks();
});

const insertOrRemoveChecks = function (){
  for(let i =0; i < myLibrary.length; i++) {
    let check = document.getElementById('grid-item-check' + i);
    if(document.body.contains(check)){
      check.classList.toggle('hidden');
    };
  };
};

removeBtn.addEventListener('click', () =>{
  let arrayLength = myLibrary.length;
  for(let i = arrayLength -1; i >= 0; i--) {
    let cell = document.getElementById('grid-item' + i);
    if(document.body.contains(cell)){
      let check = document.getElementById('grid-item-check' + i);
      if(check.checked == true){

        myLibrary.splice(i , 1);
        
        let icon = document.getElementById('grid-item-icon' + i);
        icon.remove();
        check.remove();
        cell.remove();
      };
    };
  };
  removeAllBooks(arrayLength);
  displayBooks();
});


const removeAllBooks = function(arrayLength){
  for(let i =0; i < arrayLength; i++){
    if(typeof myLibrary[i] !=='undefined'){
      myLibrary[i].displayed = false
    };

      let cell = document.getElementById('grid-item' + i);
      if(document.body.contains(cell)){
          let icon = document.getElementById('grid-item-icon' + i);
          let check = document.getElementById('grid-item-check' + i);
          icon.remove();
          check.remove();
          cell.remove();
      };
  };
};

const openModal = function (title, author, pages, arrayIndex) {
  cellIndex.textContent = arrayIndex;
  cellIndex.style.visibility = "hidden";
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  bookTitle.textContent = title;
  bookAuthor.textContent = "Author: " + author;
  bookPages.textContent = pages + " Pages";
  bookColor.addEventListener("input", changeColor, false);
  if(myLibrary[cellIndex.textContent].read == 'read'){
    bookRead.checked = true;
    bookUnread.checked = false;
    bookInProgress.checked = false;
  } else if(myLibrary[cellIndex.textContent].read == 'unread'){
    bookRead.checked = false;
    bookUnread.checked = true;
    bookInProgress.checked = false;
  } else if(myLibrary[cellIndex.textContent].read == 'in-progress'){
    bookRead.checked = false;
    bookUnread.checked = false;
    bookInProgress.checked =true;
  }

  bookRead.addEventListener("click", function(){
    bookUnread.checked = false;
    bookInProgress.checked = false;
    myLibrary[cellIndex.textContent].read = "read";
  });

  bookUnread.addEventListener("click", () => {
    bookRead.checked = false;
    bookInProgress.checked = false;
    myLibrary[cellIndex.textContent].read = "unread";
  });

  bookInProgress.addEventListener("click", () =>{
    bookRead.checked = false;
    bookUnread.checked = false;
    myLibrary[cellIndex.textContent].read = "in-progress";
  });
};

const changeColor = function(event){
  let icon = document.getElementById('grid-item-icon' + cellIndex.textContent);
  myLibrary[cellIndex.textContent].color = event.target.value;
  icon.style.backgroundColor = event.target.value;
};

const closeModal = function () {
  removeAllBooks(myLibrary.length);
  displayBooks();
  modal.classList.add("hidden");
  userForm.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
closeUserFormBtn.addEventListener("click", closeModal);

function hideElements(x){
  if(x.matches) {
    adSection.classList.add('hidden');
    container.style.gridTemplateColumns = "minmax(13vw, 20vw) minmax(40vw, 81vw)";
  } else {
    adSection.classList.remove('hidden');
    container.style.gridTemplateColumns = "minmax(13vw, 20vw) minmax(40vw, 81vw) minmax(10vw, 30vw)"
  };
};

var x = window.matchMedia("(max-width: 700px");

hideElements(x);

x.addEventListener("change", () =>{
  hideElements(x);
});

/*Book.prototype.sayHello = function() {
  console.log("Hello, I'm a player!");
};

console.log(book1.info());
console.log(book2.info()); 
console.log(book3.info());
book1.sayHello(); */
