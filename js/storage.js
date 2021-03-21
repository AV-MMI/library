
/*
Local Variables
*/

/*
Variables
*/

/*
Methods
*/
const storageFuncs = {
    updateStorage: function(){
            return storageFuncs.updateLocal();
    },

        //--- | LOCAL STORAGE
    getLocal: function(){
        library = JSON.parse(localStorage.getItem("library"));
    },

    updateLocal: function(){
        localStorage.setItem("library", JSON.stringify(library));
    },
}

/*
Inits & Event Listeners
*/
    //In case we dont have anything store, we assign a default value to library.
if(localStorage.getItem("library")){
    storageFuncs.getLocal();
} else {
    library = defVal;
}

    //--- | DISPLAY ALL THE BOOKS
mainFuncs.displayBook(library);