'use strict';

//GLOBAL VARIABLES
const input = document.querySelector(".js_inputUser");
const btnSearch = document.querySelector(".js_btnSearch");
const imageError = "https://via.placeholder.com/100x75?text=Ups!+we+are+not+perfect";
const messageError = document.querySelector(".js_messageError");
const listContainer = document.querySelector(".js_results");
const listFavDom = document.querySelector(".js_favorites");

//ARRAYS
let tvSerieslist = [];
let fav = [];

//Part #1; FETCH 
function handleSearch(ev){
    ev.preventDefault();
    const inputUser = input.value;
    listContainer.innerHTML = "";

    fetch(`https://api.jikan.moe/v3/search/anime?q=`+ inputUser)
    .then(response => response.json())
    .then((moviesData) => {
        tvSerieslist = moviesData.results;
        if (tvSerieslist == undefined) {
            renderError();
            input.value="";
        } else 
        renderAnimeTvShows();    
    });
}  

// fail search user
function renderError(){
    messageError.innerHTML ="Sorry! not found. Let's try another movie.";
}

//RENDER Part #2  *user results & clear list
function renderAnimeTvShows(){
    listContainer.innerHTML="";


    tvSerieslist.forEach(choice => {
    const replaceImg = choice.image_url.replace(imageError)
    listContainer.innerHTML +=`<li class="js_results js-eachCard" data-id="${choice.mal_id}"> 
                                <img class="movie_img" src= ${replaceImg}" alt="anime show"  
                                <h3 class="movie_title">${choice.title}</h3> </li>`;    
                                
                                
                    
    })       
          
     listenEachCard(); 


     // Keep favorite class after reset
     const listUser = document.getElementsByClassName("js-eachCard");
     const listFav = document.getElementsByClassName("js_favorites__childs");

     for (const eachClassFav  of listFav) {
       for (const eachClassList of listUser) {
         if ((eachClassList.dataset.id) === (eachClassFav.dataset.id)) {
            eachClassList.classList.add("js_colors");
            eachClassList.classList.remove("js-eachCard");
         }
       }
     }
}

//Reset search user & fail search
const btnReset = document.querySelector(".js_btnReset");
btnReset.addEventListener("click", (ev) => {
    ev.preventDefault
    listContainer.innerHTML="";
    input.value="";
    messageError.innerHTML ="";   
})

//RENDER Part #3   *create a favorite list
// looking for "click"
const listenEachCard = () => {
    let cards = document.querySelectorAll(".js-eachCard");
    for (const card of cards){
        card.addEventListener("click",handleAddCardFav)
    }   
}

// Part #3.1 
// Check if fav is already included & change display colors
const handleAddCardFav = (favorite) => {
 
        const favClickedId = parseInt(favorite.currentTarget.dataset.id)
        const changeColor = favorite.target.parentElement;
        changeColor.classList.toggle("js_colors");
        changeColor.classList.toggle("js_results");
        const listUser = document.getElementsByClassName("js-eachCard");

        const lookingClickedObject = tvSerieslist.find(
            (favoriteId) => favoriteId.mal_id === favClickedId);
       
        const selectedFav = fav.find(
            (eachFav) => eachFav.mal_id === favClickedId);    


// Part #3.2
// Push fav object into fav list & remove if it is unselected on searching list


        if (selectedFav === undefined) {
            fav.push(lookingClickedObject);
          } else {
            const removeFavFromList = fav.findIndex(id => id.mal_id === favClickedId);
            fav.splice(removeFavFromList,1);
            // listUser.classList.add("js-eachCard");
          }

        renderFav(fav)
        setLocalStorageFav(); 
        
};

// Part #3.3 
// Render fav list by DOM

const renderFav = () => {     
    listFavDom.innerHTML = '';
    
    Object.values(fav).forEach(favMovie =>{
        const titleFav = document.createElement("li");
        titleFav.classList.add("js_favorites__title");
        const imgFav = document.createElement("img");
        const btnFav = document.createElement("btn");
        btnFav.classList.add("js_favorites__childs");

            titleFav.textContent = favMovie.title
            imgFav.src = favMovie.image_url
            imgFav.alt = favMovie.title
            btnFav.textContent = "x"
            btnFav.dataset.id = favMovie.mal_id
            
            listFavDom.appendChild(titleFav)
            listFavDom.appendChild(imgFav)
            listFavDom.appendChild(btnFav)
        })

        // BONUS Part #5.2 Reset full list favorites
        const btnResetFav = document.querySelector(".js_resetFav");
        btnResetFav.addEventListener("click", (ev) => {
            ev.preventDefault
            listFavDom.innerHTML="";
            fav.splice(0, fav.length)
            setLocalStorageFav();
        })

        listenRemoveFav();      
}       

// BONUS Part #5.1 Remove fav one by one
const listenRemoveFav = () =>{
    if (fav.length > 0){
        const btnRemoveFav = document.querySelectorAll(".js_favorites__childs");
        for (const eachBtnRemove of btnRemoveFav)
        eachBtnRemove.addEventListener("click",handleRemoveFavCard)
    }
}

const handleRemoveFavCard = (remove) => {
    const removeClickedFav = parseInt(remove.currentTarget.dataset.id)
    const removeFavFromList = fav.findIndex(id => id.mal_id === removeClickedFav);
    fav.splice(removeFavFromList,1);

    renderFav(fav)
    setLocalStorageFav(); 
}   
 
// Part #4; LOCAL STORAGE
    const setLocalStorageFav = () => {
        const stringifytvSeriesFav = JSON.stringify(fav);
        localStorage.setItem("fav", stringifytvSeriesFav); 
    };

    const getLocalstorageFav = () => {
        const localStorageTvSeriesFav = localStorage.getItem("fav");
        if (localStorageTvSeriesFav !== null) {
        fav = JSON.parse(localStorageTvSeriesFav);
        }
        renderFav();
    };

    getLocalstorageFav();
   

// //LISTENERS
btnSearch.addEventListener("click", handleSearch);


