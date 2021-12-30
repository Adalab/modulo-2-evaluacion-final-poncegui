'use strict';


// ****************************************************************************
// Preguntas SOPORTE;
// No funciona Api sin http; probar metiendolo en una variable
// ¿puedo dejar el boton añadir a favoritos o debe ser solo pinchando imagen? 
// preguntar si esta bien usar las funciones flecha en los listener directamente o hay que separarlas


  
  
  // ****************************************************************************
    // Pendientes;
    // parte #3 Cambiar color a las tarjetas
    // añadir condicionales si no encuentra la busqueda
    // parte #4 local Storage
    // Crear mensaje por si no encuentra la series
    // parte #2 Añadir replace a las búsquedas sin imagenes
    // Resetear placeholder y añadir comenzar funcion a la búsqueda (ahora solo funciona si no pongo reiniciar funcion)
    // parte #5 Crear botón limpiar favorito y favoritos
    // Limpiar HTML
    // parte #6 sass 


//GLOBAL VARIABLES
const input = document.querySelector(".js_inputUser");
const btnSearch = document.querySelector(".js_btnSearch");
let colors = document.querySelector(".card-body")



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
    // listMovies.innerHTML="";
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
        // renderAnimeTvShows();
        // handleSearch(ev);
    
    })
  
}


//RENDER PART #3   *create a favorite list

// ***Looking for btn selected and data to create a new objet***
const favorite = ev => {
    if(ev.target.classList.contains("js-favorite")){
    setFavorite(ev.target.parentElement);
    }
    ev.stopPropagation()
    console.log(ev.target.parentElement)
  
}
// console.log(setFavorite)

// ***New object with "id" and add it to favorite list***
const setFavorite = newObject => {
    const movieFav = {
        id: newObject.querySelector(".js-favorite").dataset.id,
        title: newObject.querySelector("h5").textContent,
        image_url: newObject.querySelector("img").src,
        
    }

  console.log(movieFav)
// ***New objet is pushed into "fav"
    fav[movieFav] = {...movieFav}
    renderFav()
  
}


// ***Render new objet into fav list
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

    //Clear search user
  const clearFav = document.querySelector(".js-remove")
  clearFav.addEventListener("click", () => {
    console.log("funciona")
    listFav.innerHTML ="";
  })
}
    
    
  
   
   
    


 //Clear fav movie selected



//LISTENERS

btnSearch.addEventListener("click", handleSearch);
listMovies.addEventListener("click", ev => {
    favorite(ev)
   })