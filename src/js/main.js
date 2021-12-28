'use strict';


// ****************************************************************************
// Preguntas SOPORTE;
// PORQUÉ NO FUNCIONA SIN HTTP
  //Cómo añadir la url de la imagen al objeto creadoo; la coge pero no la mete en src
  
  
  // ****************************************************************************
    // Pendientes;
    // Crear mensaje por si no encuentra la series
    // Añadir replace a las búsquedas sin imagenes


//GLOBAL VARIABLES
const input = document.querySelector(".js_inputUser");
const btnSearch = document.querySelector(".js_btnSearch");
const btnReset = document.querySelector(".js_reset");


//VARIABLES USED TO RENDER DOM WITH FRAGMENT 
const templateFavorites = document.getElementById("template-favorites").content
const templateCard = document.getElementById("template-card").content
const fragmentList = document.createDocumentFragment()
const listMovies =document.querySelector(".js_results");
const listFav =document.querySelector(".js_favorites");


//ARRAYS
let tvSerieslist= [];
let fav=[];



//FETCH

function handleSearch(ev){
    ev.preventDefault();
    let inputUser = input.value;

    fetch(`https://api.jikan.moe/v3/search/anime?q=`+ inputUser)
    .then(response => response.json())
    .then((moviesData) => {
        tvSerieslist = moviesData.results
        // console.log(tvSerieslist)
        renderAnimeTvShows();
         

    })


}  

//RENDER PART #2


function renderAnimeTvShows(){
    tvSerieslist.forEach(choice => {
        console.log(choice);
        templateCard.querySelector("h5").textContent = choice.title
        templateCard.querySelector("img").setAttribute("src", choice.image_url)
        templateCard.querySelector(".js-favorite").dataset.id = choice.mal_id
        const clone = templateCard.cloneNode(true)
        fragmentList.appendChild(clone)
    })

    listMovies.appendChild(fragmentList)
    // console.log(fragmentList)
}

//ADD TO FAVORITES LIST
// ***Looking for btn selected***


const favorite = ev => {
    console.log(ev.target);
    // console.log(ev.target.classList.contains("js-favorite"))
    if(ev.target.classList.contains("js-favorite")){
// console.log(ev.target.parentElement);}
    setFavorite(ev.target.parentElement)}
    ev.stopPropagation();
}


// ***Need create a new object with id***
const setFavorite = newObject =>{
    // console.log(newObject);
    const movieFav = {
        id: newObject.querySelector(".js-favorite").dataset.id,
        title: newObject.querySelector("h5").textContent,
        // image_url: newObject.querySelector("img").setAttribute("src", choice.image_url),

    
    }

   

    fav[movieFav] = {...movieFav}
    console.log(movieFav);
    renderFav()
  
}


//RENDER FAVORITES

const renderFav= () =>{
    console.log(fav);
    Object.values(fav).forEach(movieFav => {
        // templateFavorites.querySelector("h5").textContent = movieFav.title
        templateFavorites.querySelector("h5").textContent = movieFav.title
        const clone = templateFavorites.cloneNode(true)
        fragmentList.appendChild(clone)
    })

    listFav.appendChild(fragmentList)
}



//LISTENERS

btnSearch.addEventListener("click", handleSearch);
listMovies.addEventListener("click", ev => {
    favorite(ev)
   })