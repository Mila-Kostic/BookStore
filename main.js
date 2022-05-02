// VIEWS
let booksView = document.querySelector('#book-view');
let editDeleteView = document.querySelector('#edit-delete-view');
let newBookView = document.querySelector('#new-book-view');

// BUTTONS
// Navbar
let booksViewBtn = document.querySelector('#books-view-btn');
let newBookViewBtn = document.querySelector('#new-book-view-btn');
let editDeleteViewBtn = document.querySelector('#edit-delete-btn');

// LISTENERS
booksViewBtn.addEventListener('click', displayBooksView);
newBookViewBtn.addEventListener('click', displayNewBookView);
editDeleteViewBtn.addEventListener('click', displayEditDeleteBookView);


function displayBooksView(e) {
    if (e) {
        e.preventDefault()
    }
    editDeleteView.style.display = "none";
    newBookView.style.display = "none";
    booksView.style.display = "block";
}

function displayNewBookView(e) {
    if (e) {
        e.preventDefault()
    }
    editDeleteView.style.display = "none";
    booksView.style.display = "none";
    newBookView.style.display = "block";
}

function displayEditDeleteBookView(e) {
    if (e) {
        e.preventDefault()
    }
    booksView.style.display = "none";
    newBookView.style.display = "none";
    editDeleteView.style.display = "block";
}
