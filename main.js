window.addEventListener('beforeunload', save);
// VIEWS
let booksView = document.querySelector('#book-view');
let editDeleteView = document.querySelector('#edit-delete-view');
let newBookView = document.querySelector('#new-book-view');

let booksTbody = booksView.querySelector('tbody');
let editTbody = editDeleteView.querySelector('tbody');
// BUTTONS
// Navbar
let booksViewBtn = document.querySelector('#books-view-btn');
let newBookViewBtn = document.querySelector('#new-book-view-btn');
let editDeleteViewBtn = document.querySelector('#edit-delete-btn');
let saveBtn = document.querySelector('#save-btn');

//FORMS
// Add new book
let inputName = document.querySelector('[name="book"]');
let inputDate = document.querySelector('#date');
// Options
let genreSelect = document.querySelector('#genre-select');
let publisherSelect = document.querySelector('#publisher-select');

// LISTENERS
booksViewBtn.addEventListener('click', displayBooksView);
newBookViewBtn.addEventListener('click', displayNewBookView);
editDeleteViewBtn.addEventListener('click', displayEditDeleteBookView);
saveBtn.addEventListener('click', saveNewBook);

function save() {
    localStorage.db = JSON.stringify(db);
}

// Displays
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
    createGenreOptions();
    createPublisherOptions();
    editDeleteView.style.display = "none";
    booksView.style.display = "none";
    newBookView.style.display = "block";
}

function displayEditDeleteBookView(e) {
    if (e) {
        e.preventDefault()
    }
    createEditDeleteTable();
    booksView.style.display = "none";
    newBookView.style.display = "none";
    editDeleteView.style.display = "block";
}

createBooksTable(db);


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

function createPublisherOptions() {
    let text = '';
    allPublisher.forEach(pub => {
        text += `
            <option value="${pub}">${pub}</option>
        `.trim()
    })
    publisherSelect.innerHTML = text;
}

// Create Books Table
function createBooksTable(currentDb) {
    console.log(currentDb);
    if (!currentDb) {
        currentDb = db;
    }
    let text = '';
    currentDb.forEach(book => {
        text += `
        <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.ganre}</td>
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
            <td><button class="btn btn-sm btn-danger">Edit</button></td>
            <td><button class="btn btn-sm btn-warning delete-btns" data-id="${book.id}"">Delete</button></td>
            </tr>
        `.trim();
    })
    editTbody.innerHTML = text;
    let allDelete = document.querySelectorAll('.delete-btns');
    allDelete.forEach(book => {
        book.addEventListener('click', deleteBook);

    })
}

//Save new book
function saveNewBook() {
    let newBook = {
        id: generateId(),
        name: inputName.value,
        ganre: genreSelect.value,
        publisher: publisherSelect.value,
        date: inputDate.value
    }
    db.push(newBook);
    // console.log(db);
    createBooksTable(db);
    displayBooksView();
    resetInutForm();


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

function resetInutForm() {
    inputName.value = "";
    inputDate.value = "";
    genreSelect.value = "";
    publisherSelect.value = "";
}
function deleteBook(){
    let id = this.getAttribute('data-id');
    db = db.filter(book => book.id !== id);
    createBooksTable();
    displayBooksView();
}