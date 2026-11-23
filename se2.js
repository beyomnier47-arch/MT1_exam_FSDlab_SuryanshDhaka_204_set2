
const express = require("express");
const app = express();

app.use(express.json());

let books = [
    {id: 101, title: "Wings of Fire", author: "APJ Abdul Kalam", genre: "Autobiography", publishedYear: 1999, available: true},
    {id: 102, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", publishedYear: 1988, available: true},
    {id: 103, title: "Harry Potter", author: "JK Rowling", genre: "Fantasy", publishedYear: 1997, available: false}
];

// Get all books
app.get("/api/books", (req, res) => {
    res.send(books);
});

// Add new book
app.post("/api/books", (req, res) => {
    let b = req.body;

    if (!b.title || !b.author || !b.genre || !b.publishedYear || typeof b.available !== "boolean") {
        return res.status(400).send("Invalid data");
    }

    let newBook = {
        id: books.length + 101,
        title: b.title,
        author: b.author,
        genre: b.genre,
        publishedYear: b.publishedYear,
        available: b.available
    };

    books.push(newBook);
    res.status(201).send(newBook);
});

// Filter books by author
app.get("/api/books/filter", (req, res) => {
    let result = [];

    for (let i = 0; i < books.length; i++) {
        if (books[i].author.toLowerCase() == (req.query.author || "").toLowerCase()) {
            result.push(books[i]);
        }
    }

    res.send(result);
});

// Get book by ID
app.get("/api/books/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
            res.send(books[i]);
            found = true;
            break;
        }
    }

    if (!found) {
        res.status(404).send("Book not found");
    }
});

// Update book
app.put("/api/books/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
            let b = req.body;

            if (!b.title || !b.author || !b.genre || !b.publishedYear || typeof b.available !== "boolean") {
                return res.status(400).send("Invalid data");
            }

            books[i].title = b.title;
            books[i].author = b.author;
            books[i].genre = b.genre;
            books[i].publishedYear = b.publishedYear;
            books[i].available = b.available;

            res.send(books[i]);
            found = true;
            break;
        }
    }

    if (!found) {
        res.status(404).send("Book not found");
    }
});

// Delete book
app.delete("/api/books/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
            books.splice(i, 1);
            res.send("Book deleted successfully");
            found = true;
            break;
        }
    }

    if (!found) {
        res.status(404).send("Book not found");
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
