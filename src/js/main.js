'use strict';


//VARIABLES

const input = document.querySelector(".js_inputUser");
const btnSearch = document.querySelector(".js_btnSearch");
const btnReset = document.querySelector(".js_reset");

let tvSerieslist= [];


function handleSearch(ev){
    ev.preventDefault();
    let inputUser = input.value;

    fetch(`https://api.jikan.moe/v3/search/anime?q=`+ inputUser)
    .then(response => response.json())
    .then((moviesData) => {
        tvSerieslist = moviesData
        console.log(tvSerieslist)
         

    })


}  




//LISTENERS

btnSearch.addEventListener("click", handleSearch);