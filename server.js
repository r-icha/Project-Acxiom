const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create SQLite database
const db = new sqlite3.Database('database.db');

// Create 'books' table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY,
        title TEXT,
        author TEXT,
        isbn TEXT,
        quantity INTEGER
    )
`);

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/add-book', (req, res) => {
    const { title, author, isbn, quantity } = req.body;

    db.run('INSERT INTO books (title, author, isbn, quantity) VALUES (?, ?, ?, ?)',
        [title, author, isbn, quantity], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error adding book' });
            }

            res.json({ message: 'Book added successfully', bookId: this.lastID });
        });
});

app.get('/get-books', (req, res) => {
    db.all('SELECT * FROM books', (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching books' });
        }

        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
