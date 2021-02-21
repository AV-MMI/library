if(localStorage.getItem("library")){
    getLibrary();
} else {
    library = def;
}

function getLibrary(){
    library = JSON.parse(localStorage.getItem("library"));
}

function updateLibrary(){
    localStorage.setItem("library", JSON.stringify(library));
}

funcs.displayBook(library);