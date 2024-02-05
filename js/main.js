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


const defVal = [];
const hobbit = new Book("The hobbit", "J.R.R Tolkien", 314, false, 0);
defVal.push(hobbit);
const potter = new Book("Harry Potter", "J.K Rolling", 567, true, 1) ;
defVal.push(potter);

/*
Variables
*/

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
const mainFuncs = {
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
		remove.addEventListener("click", mainFuncs.remove)

		const bookInfo = document.createElement("span");
		bookInfo.classList.add("book-info");
		bookInfo.classList.add("incon-font");
		bookInfo.classList.add("font-20");
		bookInfo.textContent = info;

		const toggle = document.createElement("div");
		toggle.classList.add("toggle");
		toggle.addEventListener("click", mainFuncs.toggle);

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
		mainFuncs.boolRead();

		if(title.reportValidity() && author.reportValidity() && pages.reportValidity()){
			const lastItem = library.length;
			const tome = new Book(title.value, author.value, pages.value, boolRead, lastItem);

			library.push(tome)
			storageFuncs.updateStorage();

			title.value = "";
			author.value = "";
			pages.value = "";

										//Bookshelf  						Info 							status 					id;
			mainFuncs.createBookEl(mainFuncs.bookshelfOrg(library[lastItem]),library[lastItem].info(), library[lastItem].boolRead, lastItem);
		} else {

			// display error messages
			if(!title.reportValidity()){
				let validityState = title.validity;
				if(validityState.valueMissing){
					title.setCustomValidity("Bro, it's empty...");

				}
				else {
					title.setCustomValidity("");
				}
			}

			else if(!author.reportValidity()){

				let validityState = author.validity;
				if(validityState.valueMissing){
					author.setCustomValidity("Bro, it's empty...")

				}
				else {
					author.setCustomValidity("");
				}
			}

			else if(!pages.reportValidity()){
				let validityState = pages.validity;
				console.log(validityState, '<<')
				if(validityState.valueMissing){
					pages.setCustomValidity("Insert number of pages");

				} 
				
				else if(validityState.badInput){
					pages.setCustomValidity("This is not a number");

				}

				else {
					pages.setCustomValidity("");
				}
			}
		}
	},

	//--- | DISPLAY BOOK
	displayBook: function(obj){
		for(let i = 0; i < obj.length; i++){
			if("info" in obj[i]){
				mainFuncs.createBookEl(mainFuncs.bookshelfOrg(obj[i]), obj[i].info(), obj[i].boolRead, obj[i].id);
			} else {
				obj[i].info = () => {
					return obj[i].title + ", " + "by " + obj[i].author + ", " + obj[i].pages + " pages";
				}

				mainFuncs.createBookEl(mainFuncs.bookshelfOrg(obj[i]), obj[i].info(), obj[i].boolRead, obj[i].id);
			}
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

		if(target == 0 && library.length == 1){
			library = [];
		}
		if(target == 0 && library.length > 1){
			library = library.slice(1, library.length);
		}

		if(target == library.length-1 && target !== 0){
			library = library.slice(0,library.length-1);
		}

		if(target > 0 && target < library.length-1){
			let firstPart = library.slice(0, target);
			let secondPart = library.slice(target+1, library.length);

			library = firstPart.concat(secondPart);
		}
	},

	remove: function(e){
		let parentEl = e.target.parentElement;
		if(String(parentEl) == "[object HTMLDivElement]"){
			mainFuncs.deleteItem(library, "id", parentEl.id);
			parentEl.remove();
			storageFuncs.updateStorage();
		}

		if(String(parentEl) == "[object HTMLButtonElement]"){
			parentEl = e.target.parentElement.parentElement;
			mainFuncs.deleteItem(library, "id", parentEl.id);
			parentEl.remove();
			storageFuncs.updateStorage();
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

			mainFuncs.createBookEl(mainFuncs.bookshelfOrg(targetItem), targetItem.info(), targetItem.boolRead, targetItem.id);
			parentEl.remove();

			storageFuncs.updateStorage();
		}

		if(!toggleEl.classList.contains("toggle-active")){
			targetItem = library.find((item)=> item.id == bookId);
			targetItem.boolRead = false;

			mainFuncs.createBookEl(mainFuncs.bookshelfOrg(targetItem), targetItem.info(), targetItem.boolRead, targetItem.id);
			parentEl.remove();

			storageFuncs.updateStorage();
		}
	}
}

/*
Inits & Event Listeners
*/
	//--- | WANT TO ADD ANOTHER BOOK
addBookBtn.addEventListener("click", mainFuncs.unfold);
close.addEventListener("click", mainFuncs.fold);
fold.addEventListener("transitionend", mainFuncs.transition);

	//--- | CREATE BOOK
createBtn.addEventListener("click", mainFuncs.tomeObj);

