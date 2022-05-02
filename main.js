// VIEWS
let booksView = document.querySelector('#book-view');
let editDeleteView = document.querySelector('#edit-delete-view');
let newBookView = document.querySelector('#new-book-view');

// BUTTONS
// Navbar
let booksViewBtn = document.querySelector('#books-view-btn');
let newBookViewBtn = document.querySelector('#new-book-view-btn');
let editDeleteViewBtn = document.querySelector('#edit-delete-btn');


//FORMS
let genreSelect = document.querySelector('#genre-select');
let publisherSelect = document.querySelector('#publisher-select')
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
    createGenericOptions();
    createPublisherOptions();
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


//Options
function createGenericOptions() {
    let text = '';
    allGenre.forEach(genre => {
        text += `
        <option value "${genre}">${genre}</option>`
        .trim()
    })
    genreSelect.innerHTML = text;
}

function createPublisherOptions(){
    let text = '';
    allPublisher.forEach(pub => {
        text +=`
        <option value="${pub}">${pub}</option>
        `.trim()
    })
    publisherSelect.innerHTML = text;
}