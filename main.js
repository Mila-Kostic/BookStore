window.addEventListener('beforeunload', save);
// VIEWS
let booksView = document.querySelector('#book-view');
let editDeleteView = document.querySelector('#edit-delete-view');
let newBookView = document.querySelector('#new-book-view');
let editBookView = document.querySelector('#edit-book-view');

let booksTbody = booksView.querySelector('tbody');
let editTbody = editDeleteView.querySelector('tbody');

// BUTTONS
// Navbar
let booksViewBtn = document.querySelector('#books-view-btn');
let newBookViewBtn = document.querySelector('#new-book-view-btn');
let editDeleteViewBtn = document.querySelector('#edit-delete-btn');
let saveBtn = document.querySelector('#save-btn');
// Edit btn
let editSaveBtn = document.querySelector("#e-save-btn");


//FORMS
// Add new book
let inputName = document.querySelector('.new-book');
let inputDate = document.querySelector('#date');
// Options
let genreSelect = document.querySelector('#genre-select');
let publisherSelect = document.querySelector('#publisher-select');
// Edit
let editName = document.querySelector('#e-name');
let editGenreSelect = document.querySelector('#e-genre-select');
let editPublisherSelect = document.querySelector('#e-publisher-select');
let editData = document.querySelector('#e-date');


// LISTENERS
booksViewBtn.addEventListener('click', displayBooksView);
newBookViewBtn.addEventListener('click', displayNewBookView);
editDeleteViewBtn.addEventListener('click', displayEditDeleteBookView);
saveBtn.addEventListener('click', saveNewBook);
editSaveBtn.addEventListener('click', editBook);

function save() {
    localStorage.db = JSON.stringify(db);
}

//Save new book
function saveNewBook() {
    let newBook = {
        id: generateId(),
        name: inputName.value,
        genre: genreSelect.value,
        publisher: publisherSelect.value,
        date: inputDate.value
    }
    db.push(newBook);
    createBooksTable(db);
    displayBooksView();
    resetInputForm();
}
function editBook() {
    let currentBook = db.find(book => book.id === this.getAttribute('data-id'));
    currentBook.name = editName.value;
    currentBook.genre = editGenreSelect.value;
    currentBook.publisher = editPublisherSelect.value;
    currentBook.date = editData.value;
    createBooksTable();
    displayBooksView();
}

function resetInputForm() {
    inputName.value = "";
    inputDate.value = "";
    genreSelect.value = "";
    publisherSelect.value = "";
}
// Displays
function displayBooksView(e) {
    if (e) {
        e.preventDefault()
    }
    editDeleteView.style.display = "none";
    newBookView.style.display = "none";
    editBookView.style.display = "none";
    booksView.style.display = "block";
}

function displayNewBookView(e) {
    if (e) {
        e.preventDefault()
    }
    createGenreOptions();
    createPublisherOptions();
    editDeleteView.style.display = "none";
    booksView.style.display = "none";
    editBookView.style.display = "none";
    newBookView.style.display = "block";
}

function displayEditDeleteBookView(e) {
    if (e) {
        e.preventDefault()
    }
    createEditDeleteTable();
    booksView.style.display = "none";
    newBookView.style.display = "none";
    editBookView.style.display = "none";
    editDeleteView.style.display = "block";
}

createBooksTable(db);

function displayEditView() {
    let id = this.getAttribute('data-id');
    editSaveBtn.setAttribute('data-id', id);
    let currentBook = db.find(el => el.id === id);
    fillEditForm(currentBook);

    booksView.style.display = "none";
    newBookView.style.display = "none";
    editDeleteView.style.display = "none";
    editBookView.style.display = "block";

}
// Options
function createGenreOptions() {
    let text = '';
    allGenre.forEach(genre => {
        text += `
            <option value="${genre}">${genre}</option>
        `.trim()
    })
    genreSelect.innerHTML = text;
}

function createEditGenreOptions(currentGenre) {
    let text = '';
    allGenre.forEach(genre => {
        text += `
            <option value="${genre}" ${(genre === currentGenre) ? "selected" : ""}">${genre}</option>
        `.trim()
    })
    editGenreSelect.innerHTML = text;
}

function createPublisherOptions() {
    let text = '';
    allPublisher.forEach(pub => {
        text += `
            <option value="${pub}">${pub}</option>
        `.trim()
    })
    publisherSelect.innerHTML = text;
}

function createEditPublisherOptions(currentPublisher) {
    let text = '';
    allPublisher.forEach(pub => {
        text += `
            <option value="${pub}" ${(pub === currentPublisher) ? "selected" : ""}">${pub}</option>
        `.trim()
    })
    editPublisherSelect.innerHTML = text;
}

// novo
function fillEditForm(currentBook) {
    createEditGenreOptions(currentBook.genre);
    createEditPublisherOptions(currentBook.publisher);
    editName.value = currentBook.name;
    editGenreSelect.value = currentBook.genre;
    editPublisherSelect.value = currentBook.publisher;
    editData.value = currentBook.date;
}

// Create Books Table
function createBooksTable(currentDb) {
    // console.log(currentDb);
    if (!currentDb) {
        currentDb = db;
    }
    let text = '';
    currentDb.forEach(book => {
        text += `
        <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.genre}</td>
            <td>${book.publisher}</td>
            <td>${book.date}</td>
        </tr>
        `.trim()
    })
    booksTbody.innerHTML = text;

}

// Create Edit/Delete Table
function createEditDeleteTable() {
    let text = '';
    db.forEach(book => {
        text += `
            <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.genre}</td>
            <td>${book.publisher}</td>
            <td>${book.date}</td>
            <td><button class="btn btn-sm btn-danger edit-btns" data-id="${book.id}">Edit</button></td>
            <td><button class="btn btn-sm btn-warning delete-btns" data-id="${book.id}">Delete</button></td>
            </tr>
        `.trim();
    })
    editTbody.innerHTML = text;
    let allDeleteBtn = document.querySelectorAll('.delete-btns');
    let allEditBtn = document.querySelectorAll('.edit-btns');
    allDeleteBtn.forEach((book, index) => {
        book.addEventListener('click', deleteBook);
        allEditBtn[index].addEventListener('click', displayEditView);
    })
}

function deleteBook() {
    let id = this.getAttribute('data-id');
    db = db.filter(book => book.id !== id);
    createBooksTable();
    displayBooksView();

}

// create ID
function generateId() {
    let randomId;
    let unique = false;
    while (!unique) {
        unique = true;
        randomId = Math.floor(Math.random() * 100000);
        db.forEach(book => {
            if (parseInt(book.id) === randomId) {
                unique = false;
            }
        })
    }
    return randomId.toString();
}