class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class UI {
    static displayBooks() {
        const storedBooks = [
            {
                title: 'Book One',
                author: 'John Doe'
            },
            {
                title: 'Book Two',
                author: 'Jane Doe'
            }
        ];

        const books = storedBooks;

        books.forEach(function(book) {
            UI.addBook(book);
        });
    }

    static addBook(book) {
        const booklist = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        booklist.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    const newBook = new Book(title, author);

    UI.addBook(newBook);

    UI.clearFields();
});