const bookListDiv = document.querySelector('.library__book-list');

let library = [];

const Book = (title, author, isRead) =>
{
	return {
		title: title,
		author: author,
		isRead: isRead,
	};
}

function addBookToLibrary(book)
{
	console.log(`Added book "${book.title}" by "${book.author}" to library (read: ${book.isRead})`);
	library.push(book);
}

function toggleReadStatus(book, button)
{
	book.isRead = !book.isRead;

	button.classList.remove('read');
	button.classList.remove('unread');

	button.classList.add(book.isRead ? 'read' : 'unread');
	button.textContent = book.isRead ? 'Read' : 'Unread';
}

function deleteBook(book, container)
{
	library.splice(library.indexOf(book));
	container.remove();
}

function createBookElement(book)
{
	console.log(`Creating element for book ${book.title}`);

	// Create the div
	const container = document.createElement('div');
	// Add the 'book' class
	container.classList.add('book');
	
	// Create the title element
	const title = document.createElement('div');
	title.classList.add('book__title');
	title.textContent = book.title;
	
	// Create the author element
	const author = document.createElement('div');
	author.classList.add('book__author');
	author.textContent = book.author;

	// Create the actions element
	const actions = document.createElement('div');
	actions.classList.add('book__actions');

	// Create the delete action element
	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('book__delete');
	deleteBtn.textContent = 'Delete';
	deleteBtn.onclick = () => deleteBook(book, container);

	// Create the toggle read status action element
	const toggleReadBtn = document.createElement('button');
	toggleReadBtn.classList.add('book__is-read');
	toggleReadBtn.classList.add(book.isRead ? 'read' : 'unread');
	toggleReadBtn.textContent = book.isRead ? 'Read' : 'Unread';
	toggleReadBtn.onclick = () => toggleReadStatus(book, toggleReadBtn);

	// Add action elements to actions div
	actions.appendChild(deleteBtn);
	actions.appendChild(toggleReadBtn);

	// Add elements to book div
	container.appendChild(title);
	container.appendChild(author);
	container.appendChild(actions);

	return container;
}

function displayBooks()
{
	console.log(`Displaying ${library.length} books`);
	for (const i in library)
	{
		bookListDiv.appendChild(createBookElement(library[i]));
	}
}

const addBookBtn = document.querySelector('.library__add-book');
const cancelBookBtn = document.querySelector('.library__cancel-book');

const bookFormContainerDiv = document.querySelector('.library__book-form-container');
const bookFormTitleInput = document.querySelector('#book-form__title');
const bookFormAuthorInput = document.querySelector('#book-form__author');
const bookFormAddBtn = document.querySelector('#book-form__add');

addBookBtn.onclick = () =>
{
	addBookBtn.disabled = true;
	cancelBookBtn.hidden = false;
	bookFormContainerDiv.hidden = false;

	bookFormTitleInput.value = '';
	bookFormAuthorInput.value = '';
};

cancelBookBtn.onclick = () =>
{
	addBookBtn.disabled = false;
	cancelBookBtn.hidden = true;
	bookFormContainerDiv.hidden = true;
}

bookFormAddBtn.onclick = () =>
{
	const title = bookFormTitleInput.value;
	const author = bookFormAuthorInput.value;

	if (title === '') return alert('Please enter the book\'s title.');
	if (author === '') return alert('Please enter the book\'s author.');

	const book = Book(title, author, false);

	addBookToLibrary(book);
	bookListDiv.appendChild(createBookElement(book));

	addBookBtn.disabled = false;
	cancelBookBtn.hidden = true;
	bookFormContainerDiv.hidden = true;
}

const book = Book('To kill a mockingbird 2', 'vincevaris', true);
const book2 = Book('percy jackson 10', 'vincevaris 2', false);

addBookToLibrary(book);
addBookToLibrary(book2);

displayBooks();