document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
});

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const quantity = document.getElementById('quantity').value;

    fetch('/add-book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, isbn, quantity }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayBooks();
    });
}

function displayBooks() {
    fetch('/get-books')
    .then(response => response.json())
    .then(data => {
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';

        data.forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = `${book.title} by ${book.author} (ISBN: ${book.isbn}, Quantity: ${book.quantity})`;
            bookList.appendChild(listItem);
        });
    });
}
