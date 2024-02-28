const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Template Books
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const book2 = new Book("Who Moved My Cheese?", "Dr Spencer Johnson", 94, false);
const book3 = new Book("Meditations", "Marcus Aurelius", 254, false);
const book4 = new Book("Shoe Dog", "Phil Knight", 399, true);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Addings templates books to library
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

function displayBook(book) {
  const bookCards = document.querySelector(".book-cards");

  // make p -> div then create elements like h3, p, image etc. and append to div
  const bookCard = document.createElement("p");
  bookCard.innerText = book.title;
  bookCard.classList.add("book-card");
  bookCards.appendChild(bookCard);
}

myLibrary.forEach((book) => {
  displayBook(book);
});

// MODAL
const addButton = document.querySelector(".add-book-button");
const bookDialog = document.querySelector(".book-dialog");
const bookForm = document.querySelector(".book-form");
const confirmAddButton = bookDialog.querySelector(".confirm-add-button");
const backdrop = document.querySelector(".backdrop");

// "Add Book" button opens the modal and applies backdrop
addButton.addEventListener("click", () => {
  bookDialog.showModal();
  backdrop.style.display = "block";
});

// HANDLE SUBMIT - this can maybe be cleaned up?
function captureBookData() {
  const bookData = {
    title: document.querySelector("#title").value,
    author: document.querySelector("#author").value,
    pages: document.querySelector("#pages").value,
    read: document.querySelector("#read").checked,
  };
  return bookData;
}

function handleBookAddition(event) {
  event.preventDefault();
  const bookData = captureBookData();
  const newBook = new Book(
    bookData.title,
    bookData.author,
    bookData.pages,
    bookData.read
  );
  addBookToLibrary(newBook);
  console.log(newBook);
  displayBook(newBook);
  bookDialog.close();
  bookForm.reset();
  backdrop.style.display = "none";
}

confirmAddButton.addEventListener("click", handleBookAddition);

// "Cancel" button closes the dialog
bookDialog.addEventListener("close", (e) => {
  backdrop.style.display = "none";
  // maybe reset form here too?
});
