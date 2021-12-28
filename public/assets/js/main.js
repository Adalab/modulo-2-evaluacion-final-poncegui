'use strict';


//VARIABLES
const input = document.querySelector(".js_inputUser");
const btnSearch = document.querySelector(".js_btnSearch");
const btnReset = document.querySelector(".js_reset");
const templateCard = document.getElementById("template-card").content
const fragmentList = document.createDocumentFragment()
const listMovies =document.querySelector(".js_results");
let tvSerieslist= [];

//FETCH
// PREGUNTAR EN TUTORIA PORQUÉ NO FUNCIONA SIN HTTMP
function handleSearch(ev){
    ev.preventDefault();
    let inputUser = input.value;

    fetch(`https://api.jikan.moe/v3/search/anime?q=`+ inputUser)
    .then(response => response.json())
    .then((moviesData) => {
        tvSerieslist = moviesData.results
        console.log(tvSerieslist)
        renderAnimeTvShows();
         

    })


}  

//RENDER 
// NO OLVIDAR PONER REPLACE EN LAS FOTOS CON https://via.placeholder.com/210x295/ffffff/666666/?text=TV


function renderAnimeTvShows(){
    tvSerieslist.forEach(choice => {
        console.log(choice);
        templateCard.querySelector("h5").textContent = choice.title
        templateCard.querySelector("img").setAttribute("src", choice.image_url)
        const clone = templateCard.cloneNode(true)
        fragmentList.appendChild(clone)
    })

    listMovies.appendChild(fragmentList)
    console.log(fragmentList)
}


//LISTENERS

btnSearch.addEventListener("click", handleSearch);
//# sourceMappingURL=main.js.map
