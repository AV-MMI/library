/*
Local Variables
*/
let library = [];

		// Book Constructor
function Book(title, author, pages, boolRead, id){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.boolRead = boolRead;
	this.id = id;
}

Book.prototype.info = function(){
	return this.title + ", " + "by " + this.author + ", " + this.pages + " pages";
}

const hobbit = new Book("The hobbit", "J.R.R Tolkien", 314, false, 0);
library.push(hobbit);
const potter = new Book("Harry Potter", "J.K Rolling", 567, true, 1) ;
library.push(potter);
const history = new Book("The clash of empires", "Future self", 8883, false, 2);
library.push(history);
const cook = new Book("The cuisine of the earth", "Alien self", 5900, true, 3);
library.push(cook);


/*
Variables
*/
const testing = document.querySelector("#testing");

	//--- | WANT TO ADD ANOTHER BOOK
const addBookCont = document.querySelector("#addBook-container");
const addBookBtn = document.querySelector("#addBook");
const fold = document.querySelector("#fold");
const close = document.querySelector("#close");

	//--- | INPUT
let title = document.querySelector("#in-title");
let author =  document.querySelector("#in-author");
let pages = document.querySelector("#in-pages");
let boolRead;

	//--- | CREATE BOOK
const createBtn = document.querySelector("#create-book");

	//--- | DISPLAY BOOK
		// did not read bookshelf
const notRead = document.querySelector("#noRead-bookshelf");

		//already read bookshelf
const haveRead = document.querySelector("#read-bookshelf");

	//--- | REMOVE BOOK
const removeEl = document.querySelectorAll(".remove");
const removeList = document.getElementsByClassName("remove");
/*
Methods
*/
const funcs = {
	//--- | WANT TO ADD ANOTHER BOOK
	unfold: function(e){
		fold.style.height = "290px";
		addBookCont.style.bottom = "40px";
		if(fold.style.height = "290px"){
			fold.style.borderLeft = "1px solid #cdd0eb";
			fold.style.borderBottom = "1px solid #cdd0eb";
			fold.style.borderRight = "1px solid #cdd0eb";
		}
	},

	fold: function(e){
		fold.style.height = "0px";
		addBookCont.style.bottom = "0px";
	},

	transition: function(e){
		if(fold.style.height == "0px"){
			fold.style.borderLeft = "1px solid #F5F7F9";
			fold.style.borderBottom = "1px solid #F5F7F9";
			fold.style.borderRight = "1px solid #F5F7F9";
		}
	},

	//--- | INPUT
	boolRead: function(){
		const checkRadio = document.querySelector("#radioYes").checked;
		if(checkRadio){
			boolRead = true;
		}
		else {
			boolRead = false;
		}
	},

	//--- | CREATE BOOK
		createBookEl: function(bookshelf, info, status, id){
		const book = document.createElement("div");
		book.classList.add("book");

		const remove = document.createElement("button");
		const img = document.createElement("img");
		img.setAttribute("src", "./img/icons/close.svg");
		remove.classList.add("remove");
		remove.classList.add("btn");
		remove.appendChild(img);

		//EventListener in each element that is created.
		remove.addEventListener("click", funcs.remove)

		const bookInfo = document.createElement("span");
		bookInfo.classList.add("book-info");
		bookInfo.classList.add("incon-font");
		bookInfo.classList.add("font-20");
		bookInfo.textContent = info;

		const toggle = document.createElement("div");
		toggle.classList.add("toggle");
		toggle.addEventListener("click", funcs.toggle);

		const circle = document.createElement("div");
		circle.classList.add("circle");
		toggle.appendChild(circle);

		if(status){
			toggle.classList.add("toggle-active");
			circle.classList.add("circle-active");
		}

		book.appendChild(remove);
		book.appendChild(bookInfo);
		book.appendChild(toggle);
		book.setAttribute("id", id);
		return bookshelf.append(book);
	},

	bookshelfOrg: function(obj){
		if(obj.boolRead){
			return haveRead;
		}

		if(!obj.boolRead){
			return notRead;
		}
	},

	tomeObj: function(e){
		funcs.boolRead();
		if(title.value !== "" && author.value !== ""){
			const lastItem = library.length-1;
			const tome = new Book(title.value, author.value, pages.value, boolRead, lastItem+1);

			library.push(tome)
			title.value = "";
			author.value = "";
			pages.value = "";

										//Bookshelf  						Info 							status 					id;
			funcs.createBookEl(funcs.bookshelfOrg(library[lastItem+1]),library[lastItem+1].info(), library[lastItem+1].boolRead, lastItem+1);
		}
	},

	//--- | DISPLAY BOOK
	displayBook: function(){
		for(let i = 0; i < library.length; i++){
			funcs.createBookEl(funcs.bookshelfOrg(library[i]), library[i].info(), library[i].boolRead, i);
		}
	},

	//--- | REMOVE BOOK
	deleteItem: function(arr, parameter,item){
		let target;
		for(let i = 0; i < arr.length; i++){
			if(arr[i][parameter] == item){
				target = i;
			}
		}

		if(target == 0){
			library = library.slice(0, library.length);
		}

		if(target == library.length-1){
			library = library.slice(0,library.length-1);
		}

		else{
			let firstPart = library.slice(0, target);
			let secondPart = library.slice(target+1, library.length);

			library = firstPart.concat(secondPart);
		}
	},

	remove: function(e){
		let parentEl = e.target.parentElement;
		if(String(parentEl) == "[object HTMLDivElement]"){
			parentEl.remove();
			funcs.deleteItem(library, "id", parentEl.id);
		}

		if(String(parentEl) == "[object HTMLButtonElement]"){
			parentEl = e.target.parentElement.parentElement;
			parentEl.remove();
			funcs.deleteItem(library, "id", parentEl.id);
		}
	},

	toggle: function(e){
		let parentEl;
		let toggleEl;
		let bookId;
		let targetItem;

		if(e.target.parentElement.classList.contains("book")){
			parentEl = e.target.parentElement;
		}

		if(e.target.parentElement.classList.contains("toggle")){
			parentEl = e.target.parentElement.parentElement;
		}

		toggleEl = parentEl.childNodes[2];
		toggleEl.style.transition = "1s";
		toggleEl.classList.toggle("toggle-active");
		toggleEl.childNodes[0].style.transition = "1s";
		toggleEl.childNodes[0].classList.toggle("circle-active");

		bookId = toggleEl.parentElement.id;
		if(toggleEl.classList.contains("toggle-active")){
			targetItem = library.find((item)=> item.id == bookId);
			targetItem.boolRead = true;

			funcs.createBookEl(funcs.bookshelfOrg(targetItem), targetItem.info(), targetItem.boolRead, targetItem.id);
			parentEl.remove();
		}

		if(!toggleEl.classList.contains("toggle-active")){
			targetItem = library.find((item)=> item.id == bookId);
			targetItem.boolRead = false;

			funcs.createBookEl(funcs.bookshelfOrg(targetItem), targetItem.info(), targetItem.boolRead, targetItem.id);
			parentEl.remove();
		}
	}
}

/*
Inits & Event Listeners
*/
	//--- | WANT TO ADD ANOTHER BOOK
addBookBtn.addEventListener("click", funcs.unfold);
close.addEventListener("click", funcs.fold);
fold.addEventListener("transitionend", funcs.transition);

	//--- | CREATE BOOK
createBtn.addEventListener("click", funcs.tomeObj);

	//--- | DISPLAY BOOK
funcs.displayBook();