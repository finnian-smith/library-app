const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return title + " by " + author + ", " + pages + " pages, " + read;
  };
}

// Template Books
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "read");
const book2 = new Book(
  "Who Moved My Cheese?",
  "Dr Spencer Johnson",
  94,
  "not read yet"
);
const book3 = new Book("Meditations", "Marcus Aurelius", 254, "not read yet");
const book4 = new Book("Shoe Dog", "Phil Knight", 399, "read");

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Addings templates books to library
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

function loopLibrary(myLibrary) {
  const bookCards = document.querySelector(".book-cards");

  myLibrary.forEach((book) => {
    // make p -> div then create elements like h3, p, image etc. and append to div
    const bookCard = document.createElement("p");
    bookCard.innerText = book.title;
    bookCard.classList.add("book-card");
    bookCards.appendChild(bookCard);
  });
}

loopLibrary(myLibrary);
