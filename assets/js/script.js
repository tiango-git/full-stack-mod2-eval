$(document).ready(function () {
    // El código escrito acá se ejecutará luego de que se carguen los elementos de la página web


    var urlApi = "https://digimon-api.vercel.app/api/digimon";
    var urlApiLevel = "https://digimon-api.vercel.app/api/digimon/level/";
    var urlWiki = "https://digimon.fandom.com/es/wiki/";
    var contenido = document.querySelector("#contenido");

    // Selección de nivel
    document.getElementById('selectLevel').addEventListener('change', selectLevel);

    // Trae los pokemon por nivel
    function selectLevel() {
        //limpiar la pagina web
        contenido.innerHTML = "";
        // Obtener el nivel seleccionado
        let level = document.getElementById('selectLevel').value.toLowerCase();
        console.log(level);
        //Traer pokemon
        getLevel(level);
        // Si el nivel es "In Training", también traer "Training"
        if (level == "in training") {
            getLevel("Training");
        }
    }

    function getLevel(level) {
        url = urlApiLevel + level;
        //console.log(url);
        fetch(url)
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




    // Muestra los Pokemon en la página
    function showPokemon(pokemon) {
        let urlWikiPoke = urlWiki + pokemon.name.split(" ").join("_");
        let strClick = "window.open('" + urlWikiPoke + "')";


        //<div class="card d-inline-block m-2 " style="width: 18rem; ">
        contenido.innerHTML += `
            <div class="card d-inline-block col text-center"  onclick="onClickDiv(this)">
                <div class="text-center">
                    <img src="${pokemon.img}" class="card-img-top m-1" alt="${pokemon.name}" onmouseover="onInImagen(this)" onmouseout="onOutImagen(this)">
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center">${pokemon.name}</h5>
                    <p class="card-text">${pokemon.level}</p>
                    <button type="button" class="btn btn-block btn-primary mt-3" id="botonInfo" onclick="${strClick}">Más
                        información</button>
                </div>
            </div>
        `;
    }



    // Trae todos los Pokemon
    fetch(urlApi)
        .then(response => response.json())
        .then(datos => {
            for (item of datos) {
                showPokemon(item);
            }
        })





});

//Imagen
function onInImagen(element) {
    //console.log(element);
    //element.style.width = "100%";
    //element.style.filter = "grayscale(0%)";
    element.style.transform = "scaleX(-1)";

}

function onOutImagen(element) {
    //element.style.width = "80%";
    //element.style.filter = "grayscale(100%)";
    element.style.transform = "scaleX(1)";
}

function onClickDiv(element) {
    if(!element.dataset.clicked){
        element.setAttribute("data-clicked", "true");
        element.style.backgroundColor = "green";
     }else{
        element.removeAttribute("data-clicked");
        element.style.backgroundColor = "";
     }
}
