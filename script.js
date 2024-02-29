const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Demo Books
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const book2 = new Book("Who Moved My Cheese?", "Dr Spencer Johnson", 94, false);
const book3 = new Book("Meditations", "Marcus Aurelius", 254, false);
const book4 = new Book("Shoe Dog", "Phil Knight", 399, true);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Add demo books to library
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

// Element variables
const bookCards = document.querySelector(".book-cards");
const addButton = document.querySelector(".add-book-button");
const bookDialog = document.querySelector(".book-dialog");
const bookForm = document.querySelector(".book-form");
const confirmAddButton = bookDialog.querySelector(".confirm-add-button");
const backdrop = document.querySelector(".backdrop");

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
}

displayBooks(myLibrary);

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
