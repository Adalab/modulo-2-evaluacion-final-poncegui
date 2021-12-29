'use strict';


// ****************************************************************************
// Preguntas SOPORTE;
// PORQUÉ NO FUNCIONA SIN HTTP
  //Cómo añadir la url de la imagen al objeto creadoo; la coge pero no la muestra
  
  
  // ****************************************************************************
    // Pendientes;
    // Crear mensaje por si no encuentra la series
    // Añadir replace a las búsquedas sin imagenes


//GLOBAL VARIABLES
const input = document.querySelector(".js_inputUser");
const btnSearch = document.querySelector(".js_btnSearch");
const btnReset = document.querySelector(".js_btnReset");
const btnRemoveFav = document.querySelectorAll(".js-remove");


//VARIABLES USED TO RENDER DOM WITH FRAGMENT 
const templateFavorites = document.getElementById("template-favorites").content
const templateCard = document.getElementById("template-card").content
const fragmentList = document.createDocumentFragment()
const listMovies =document.querySelector(".js_results");
const listFav =document.querySelector(".js_favorites");



//ARRAYS
let tvSerieslist = [];
let fav = [];



//FETCH PART #1

function handleSearch(ev){
    ev.preventDefault();
    let inputUser = input.value;

    fetch(`https://api.jikan.moe/v3/search/anime?q=`+ inputUser)
    .then(response => response.json())
    .then((moviesData) => {
        tvSerieslist = moviesData.results
        renderAnimeTvShows();
         

    })


}  

//RENDER PART #2  *inyect search user results & clear list

function renderAnimeTvShows(){
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
    btnReset.addEventListener("click", (ev) => {
        ev.preventDefault
        listMovies.innerHTML="";
    
    })
  
}


//RENDER PART #3   *create a favorite list

// ***Looking for btn selected***

const favorite = ev => {
    if(ev.target.classList.contains("js-favorite")){
    setFavorite(ev.target.parentElement)}
    ev.stopPropagation()
}


// ***Need create a new object with "id" and add it to favorite list***
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


// ***Render new objet into fav list

const renderFav = () => {

    // console.log(fav);
    // console.dir(fav);
    Object.values(fav).forEach(movieFav => {
        templateFavorites.querySelector("h5").textContent = movieFav.title

        const clone2 = templateFavorites.cloneNode(true)
        fragmentList.appendChild(clone2)
    })

    listFav.appendChild(fragmentList)
    console.log(listFav)
   
    // btnRemoveFav.addEventListener("click", () => {
    //     listFav.innerHTML="";
    
    // })

     
}

 //Clear fav movie selected


//LISTENERS

btnSearch.addEventListener("click", handleSearch);
listMovies.addEventListener("click", ev => {
    favorite(ev)
   })
//# sourceMappingURL=main.js.map
