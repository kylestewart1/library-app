function Book(name, author, pages, read, ID) {
    this.ID = ID;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${name} by ${author}, ${pages} pages, ` + `${read ? "have read it" : "not read yet"}`;
    }
}

const library = [];

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
        console.log(btn.name);
        console.log(btn.value);
        console.log(`checked? ${btn.checked}`);
        if (btn.checked) {
            haveReadBook = btn.value;
        }
    })
    console.log(`Read it? ${haveReadBook}`);
    const book = new Book(titleInput.value,
                          authorInput.value,
                          pagesInput.value,
                          haveReadBook,
                          bookID);
    console.log(book);
    library.push(book);
    bookID++;
}

function createBookDisplay(book) {
    const display = document.createElement("div");
    display.classList.add("book");
    display.setAttribute("data", book.ID);
    display.innerHTML = `<p>${book.name}</p>
                         <p>by ${book.author}</p>
                         <p>${book.pages} pages</p>
                         <p>${book.read == 'true'? "You've read this" : "You haven't read this yet"}</p>
                         <button class="delete-book">Delete</button>`;
    return display;
}


function displayLibrary() {
    container.innerHTML = "";
    library.forEach(book => {
        const display = createBookDisplay(book);
        container.appendChild(display);
    })
    deleteBtns = document.querySelectorAll(".delete-book");
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            deleteBook(btn.ID);
        })
    })
}

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
})

addBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
    dialog.close()
    displayLibrary();
}, false)

function deleteBook(ID) {
    library.splice(ID, 1);   
    console.log(library);
    displayLibrary(); 
}


let bookID = 0;

const theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", 295, true, bookID);
bookID++;
const lordOfTheRings = new Book("The Lord of the Rings", "J. R. R. Tolkien", 1137, false, bookID);
bookID++;


library.push(theHobbit);
library.push(lordOfTheRings);



displayLibrary();