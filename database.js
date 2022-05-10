

let db = [];
let allGenre = ['Fantasy', 'Sci-Fi', 'Mystery', 'Thriller', 'Romance', 'Westerns', 'Dystopian', 'Contemporary'];
let allPublisher = ['Pub1', 'Pub2', 'Pub3', 'Pub4'];


if (localStorage.db) {
    db = JSON.parse(localStorage.db);
}