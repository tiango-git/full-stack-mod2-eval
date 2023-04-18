$(document).ready(function () {
    // El código escrito acá se ejecutará luego de que se carguen los elementos de la página web


    var urlApi = "https://digimon-api.vercel.app/api/digimon";
    var urlWiki = "http://en.wikipedia.org/wiki/";
    var contenido = document.querySelector("#contenido")

    // Selección de categoría
    document.getElementById('selectFilm').addEventListener('change', selectFilm);

    function selectFilm() {
        let movie = document.getElementById('selectFilm').value.toLowerCase();
        urlApiMovie = urlApi + movie;
        //console.log(url);
        fetch(urlApiMovie)
            // en la primera variable "response" queda el resultado del fetch
            .then(response => response.json())
            //en la segunda variable "datos" queda el resultado de la línea anterior
            .then(datos => {
                //console.log(datos);
                for (item of datos) {
                    showPokemon(item);
                }
            })
    }

    function showPokemon(pokemon) {
        let urlWikiPoke = urlWiki + pokemon.name.split(" ").join("_");
        let seleccion = document.getElementById('selectFilm').value.toLowerCase();


        contenido.innerHTML +=  `
        <div class="tarjeta">
        <div class="card" style="width: 18rem; ">
        <img src="${pokemon.img}" class="card-img-top" alt="${pokemon.name}">
        <div class="card-body">
          <h5 class="card-title">${pokemon.name}</h5>
          <p class="card-text">${pokemon.level}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        </div>
        `
        var urlWikiMovie = urlWiki + pokemon.name.split(" ").join("_");
        //console.log(urlWikiMovie)
        document.getElementById('botonInfo').setAttribute("onClick", "window.open('" + urlWikiMovie + "')");
    }



//////////////////////////
var url = "https://digimon-api.vercel.app/api/digimon" 
var contenido = document.querySelector("#contenido")

fetch(url)
.then(response => response.json())
.then(datos => {
    for (item of datos) {
        
            contenido.innerHTML +=  `
            <div class="tarjeta">
            <div class="card" style="width: 18rem; ">
            <img src="${item.img}" class="card-img-top" alt="${item.name}">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.level}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
            </div>
            `
            if (item.id == 3) {break;}
        }
    
})



});



