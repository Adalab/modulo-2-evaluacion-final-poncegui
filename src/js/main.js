'use strict';

//GLOBAL VARIABLES
const input = document.querySelector(".js_inputUser");
const btnSearch = document.querySelector(".js_btnSearch");
const imageError = "https://via.placeholder.com/100x75?text=Ups!+we+are+not+perfect";
const colors = document.querySelectorAll(".js-favorite");
const messageError = document.querySelector(".js-messageError");

//VARIABLES USED TO RENDER DOM WITH FRAGMENT 
const templateFavorites = document.getElementById("template-favorites").content
const templateCard = document.getElementById("template-card").content
const fragmentList = document.createDocumentFragment();
const listMovies =document.querySelector(".js_results");
const listFav =document.querySelector(".js_favorites");

//ARRAYS
let tvSerieslist = [];
let fav = [];


//FETCH Part #1
function handleSearch(ev){
    ev.preventDefault();
    const inputUser = input.value;

    fetch(`https://api.jikan.moe/v3/search/anime?q=`+ inputUser)
    .then(response => response.json())
    .then((moviesData) => {
        tvSerieslist = moviesData.results;
        if (tvSerieslist == undefined) {
            renderError();
            input.value="";
            handleSearch(ev);  

        } else 
        renderAnimeTvShows();    
    });
}  

function renderError(){
    messageError.innerHTML ="Sorry! not found. Let's try another movie";
}

//RENDER Part #2  *user results & clear list
function renderAnimeTvShows(){
    listMovies.innerHTML="";

            tvSerieslist.forEach(choice => { 
                    templateCard.querySelector("h5").textContent = choice.title
                    templateCard.querySelector("img").setAttribute("src", choice.image_url)
                    templateCard.querySelector(".js-favorite").dataset.id = choice.mal_id
            
                const clone = templateCard.cloneNode(true)
                fragmentList.appendChild(clone)
            })

            listMovies.appendChild(fragmentList)
            console.log(fragmentList)

            //Clear search user
            const btnReset = document.querySelector(".js_btnReset");
            btnReset.addEventListener("click", (ev) => {
                ev.preventDefault
                listMovies.innerHTML="";
                input.value="";
                messageError.innerHTML ="";
                
               
            })

}

//RENDER Part #3   *create a favorite list
// ***Change colors***
const favorite = ev => {
    if(ev.target.classList.contains("js-favorite")){
    setFavorite(ev.target.parentElement);
    }
    const changeColor = ev.target.parentElement;
    changeColor.classList.toggle("js-colors")
    ev.stopPropagation() 
}

// ***New object with "id" and add it to favorite list***
const setFavorite = newObject => {
    const movieFav = {
        id: newObject.querySelector(".js-favorite").dataset.id,
        title: newObject.querySelector("h5").textContent,
        image_url: newObject.querySelector("img").src,        
    }

// ***New objet is pushed into "fav"
    fav[movieFav] = {...movieFav}
    renderFav()
}

// ***Push new objet into fav list
const renderFav = () => {
    // listFav.innerHTML ="";
    Object.values(fav).forEach(movieFav => {
        templateFavorites.querySelector("h5").textContent = movieFav.title
        templateFavorites.querySelector("img").src = movieFav.image_url
        const clone = templateFavorites.cloneNode(true)
        fragmentList.appendChild(clone)
    })

    listFav.appendChild(fragmentList)
    console.log(listFav)
    

    // BONUS Part #5; Clear full list of favorites
    const btnRemoveAllFav = document.querySelector(".js-removeAll");
    btnRemoveAllFav.addEventListener("click", () => {
    listFav.innerHTML ="";
  })

}
    

// LOCAL STORAGE; Part #4
  
    const getLocalstorageFav = () => {
        const localStorageTvSeriesFav = localStorage.getItem("fav");
        if (localStorageTvSeriesFav !== null) {
           fav = JSON.parse(localStorageTvSeriesFav);
        }
    };

   
    getLocalstorageFav();


    const setLocalStorageFav = () => {
        const stringifytvSeriesFav = JSON.stringify(fav);
        localStorage.setItem("fav", stringifytvSeriesFav);
    };

    setLocalStorageFav();
    console.log(fav)



//LISTENERS

btnSearch.addEventListener("click", handleSearch);
listMovies.addEventListener("click", ev => {
    favorite(ev)
   })

