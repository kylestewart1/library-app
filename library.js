class Book {
    static count = 0;

    constructor(name, author, pages, read) {
        this.ID = Book.count;
        Book.count++;
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.name} by ${this.author}, ${this.pages} pages, ` + `${this.read ? "have read it" : "not read yet"}`;
    }
}

const library = {};

const dialog = document.querySelector("dialog");
const newBookBtn = document.getElementById("new-book-btn");


const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");

const haveYouReadBookYetBtns = document.querySelectorAll('input[name="read"]');

const addBookBtn = document.getElementById("add-book-btn");

const container = document.querySelector(".library-container");
let deleteBtns;


function addBookToLibrary() {
    let haveReadBook = false;
    haveYouReadBookYetBtns.forEach(btn => {
        if (btn.checked) {
            haveReadBook = Boolean(btn.value);
        }
    })
    const book = new Book(titleInput.value,
                          authorInput.value,
                          pagesInput.value,
                          haveReadBook);
    library[book.ID] = book;
}

function createBookDisplay(book) {
    const display = document.createElement("div");
    display.classList.add("book");
    display.dataset.book = book.ID;
    display.innerHTML = `<p>${book.name}</p>
                         <p>by ${book.author}</p>
                         <p>${book.pages} pages</p>
                         <p>${book.read ? "You've read this" : "You haven't read this yet"}</p>
                         <button class="delete-book" data-book=${book.ID}>Delete</button>`;
    return display;
}


function displayLibrary() {
    container.innerHTML = "";
    for (const id in library) {
        const book = library[id];
        const display = createBookDisplay(book);
        container.appendChild(display);
    }
    deleteBtns = document.querySelectorAll(".delete-book");
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            deleteBook(btn.dataset.book);
        })
    })
}

function checkFormValidity() {
    if (titleInput.validity.valueMissing ||
        authorInput.validity.valueMissing ||
        pagesInput.validity.valueMissing) {

        return false;
    }
    
    if (pagesInput.validity.rangeUnderflow || pagesInput.validity.rangeOverflow) {
        return false;
    }
    console.log("made it");
    return true;
}

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
})

addBookBtn.addEventListener("click", (event) => {

    if (!checkFormValidity()) {
        return;
    }
    event.preventDefault();
    addBookToLibrary();
    dialog.close()
    displayLibrary();
}, false)

function deleteBook(ID) {
    delete library[ID];
    displayLibrary(); 
}



const theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", 295, true);
const lordOfTheRings = new Book("The Lord of the Rings", "J. R. R. Tolkien", 1137, false);


library[theHobbit.ID] = theHobbit;
library[lordOfTheRings.ID] = lordOfTheRings;



displayLibrary();