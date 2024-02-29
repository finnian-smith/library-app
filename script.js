const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Demo Books
const demoBooksData = [
  { title: "Shoe Dog", author: "Phil Knight", pages: 399, read: true },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    pages: 1248,
    read: false,
  },
  { title: "Steve Jobs", author: "Walter Isaacson", pages: 656, read: false },
  { title: "Meditations", author: "Marcus Aurelius", pages: 254, read: false },
];

// Element variables
const bookCards = document.querySelector(".book-cards");
const addButton = document.querySelector(".add-book-button");
const addDemoButton = document.querySelector(".add-demo-books-button");
const bookDialog = document.querySelector(".book-dialog");
const bookForm = document.querySelector(".book-form");
const confirmAddButton = bookDialog.querySelector(".confirm-add-button");
const backdrop = document.querySelector(".backdrop");

// Displays message if library is empty
if (myLibrary.length === 0) {
  const emptyMessage = document.createElement("div");
  emptyMessage.innerHTML = `
  <div class="empty-message">
  <p class="empty-message-header">There are currently no books in your library!</p>
  <p class="empty-message-text">Click "Add Book" to add a book of your choice</p>
  <p class="empty-message-text">Click "Add Demo Books" to add some demo books</p>
  </div>
`;

  bookCards.appendChild(emptyMessage);
}

// Adds book to library
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Adds demo books to library
addDemoButton.addEventListener("click", () => {
  demoBooksData.forEach((bookData) => {
    const book = new Book(
      bookData.title,
      bookData.author,
      bookData.pages,
      bookData.read
    );
    addBookToLibrary(book);
    displayBooks(myLibrary);
  });
});

// Displays books in library
function displayBooks(library) {
  bookCards.innerHTML = "";

  library.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("data-book-index", index);
    bookCard.classList.add("book-card");
    bookCard.style.backgroundColor = hslRandomValue();

    bookCard.innerHTML = `
        <span class="material-symbols-rounded delete-icon">delete</span>
        <p class="book-card-title">${book.title}</p>
        <p class="book-card-author">by ${book.author}</p>
        <hr class="book-card-horizontal-rule" />
        <p class="book-card-pages">${book.pages} pages</p>
        <div class="read-checkbox">
        <input type="checkbox" class="read" name="read" value="read" ${
          book.read ? "checked" : ""
        }/>
        <label for="read" class="book-card-read">Read</label>
        </div>
 `;

    bookCards.appendChild(bookCard);
  });

  toggleRead();
}

// Generates random HSL value
function hslRandomValue() {
  return `hsl( ${360 * Math.random()}, ${6 + 12 * Math.random()}%, ${
    71 + 10 * Math.random()
  }%)`;
}

// Add Book button
addButton.addEventListener("click", () => {
  bookDialog.showModal();
  backdrop.style.display = "block";
});

// Confirm button
function captureBookData() {
  return {
    title: document.querySelector("#title").value,
    author: document.querySelector("#author").value,
    pages: document.querySelector("#pages").value,
    read: document.querySelector("#read").checked,
  };
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
  displayBooks(myLibrary);
  closeDialog();
}

function closeDialog() {
  bookDialog.close();
  bookForm.reset();
  backdrop.style.display = "none";
}

confirmAddButton.addEventListener("click", handleBookAddition);

// Cancel button
bookDialog.addEventListener("close", (e) => {
  closeDialog();
});

// Delete button
bookCards.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-icon")) {
    const bookIndex = e.target
      .closest(".book-card")
      .getAttribute("data-book-index");

    myLibrary.splice(bookIndex, 1);
    bookCards.innerHTML = "";
    displayBooks(myLibrary);
  }
});

// Changes values of read checkbox on book cards
function toggleRead() {
  const cardCheckboxes = bookCards.querySelectorAll(".read");

  cardCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const checkboxParentCard = e.target.parentNode.parentNode;
      const bookIndex = checkboxParentCard.getAttribute("data-book-index");
      const bookItem = myLibrary[bookIndex];

      bookItem.read = !bookItem.read;
    });
  });
}
