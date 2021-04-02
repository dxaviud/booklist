class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class UI {
    static displayBooks() {
        const storedBooks = Store.getBooks();

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

    static deleteBook(elem) {
        console.log(elem);
        if (elem.classList.contains('delete')) {
            elem.parentElement.parentElement.remove();
            UI.showAlert('Book removed', 'alert-info');
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }
}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title, author) {
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if (book.title === title && book.author === author) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    if (title === '' || author === '') {
        UI.showAlert('Please fill in all fields', 'alert-danger');
    } else {
        const newBook = new Book(title, author);
        UI.addBook(newBook);
        Store.addBook(newBook);
        UI.showAlert('Book added', 'alert-success');
        UI.clearFields();
    }
});

document.querySelector('#book-list').addEventListener('click', function(e) {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent, e.target.parentElement.previousElementSibling.textContent);
});