const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const dataShinyButton = document.querySelector('[data-shiny-button]');

let globalData;



//Colores dependiendo de su tipo
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event =>{
    event.preventDefault(); //Para evitar el submit del form
    const { value } = event.target.pokemon; //Obtenemos el valor del input

    //Fetch para obtener el valor en la API
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`) //Para minusculas
    .then (data => data.json())
    .then (response => renderPokemonData(response))
    .catch((error)=>{
        renderNotFound();
    });

};

const renderPokemonData = data =>{

    globalData = data;
    
    const sprite = data.sprites.front_default;
    const {stats, types } = data;
    pokeImg.setAttribute('src', sprite); //Agregamos en el src la imagen que nos arroja el resultado de la API
    dataShinyButton.setAttribute('style', 'cursor:pointer;');
    dataShinyButton.setAttribute('onclick', `shiny('${data.forms[0].url}', '${sprite}')`);
    
    pokeId.textContent = `N° ${data.id}`; //Agregamos el N° de Pokemon
    typesOfPokemon(types); //Pasamos los tipos para  el color
    renderOfPokemonStats(stats);
    
};

const shiny = (data) =>{


        pokeImg.setAttribute('src', globalData.sprites.front_shiny), //Cambiamos la imagen
        dataShinyButton.setAttribute('style', 'color:#02b9ff!important; cursor:pointer;'), //Ponemos la estrella gris
        dataShinyButton.setAttribute('onclick', `noShiny()`)
    
    
};

const noShiny = data =>{
    pokeImg.setAttribute('src', globalData.sprites.front_default); //Agregamos en el src la imagen que nos arroja el resultado de la API
    dataShinyButton.setAttribute('style', 'color:#8d8d8d !important; cursor:pointer;'), //Ponemos la estrella gris
    dataShinyButton.setAttribute('onclick', `shiny()`)
};



const typesOfPokemon = types =>{ //Obtenemos los tipos, y accedemos al objeto para sacar el color dependiendo de su tipo
    
    //Colores
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name]: typeColors.default;
    
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`; //Puntitos
    pokeImg.style.backgroundSize = '5px 5px';  //Tamaño del fondo


    //Tipos
    pokeTypes.innerHTML = ''; //Reseteamos
    types.forEach( type =>{
        const typeElementText = document.createElement("div");
        typeElementText.style.color = typeColors[type.type.name];
        typeElementText.textContent = type.type.name;
        pokeTypes.appendChild(typeElementText);
        
    });


};

const renderOfPokemonStats = stats =>{
        pokeStats.innerHTML = ''; //Reseteamos
        stats.forEach( stat =>{
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmont = document.createElement("div");
        statElementName.textContent= stat.stat.name;
        statElementAmont.textContent= stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmont);
        pokeStats.appendChild(statElement);
    });
};


const renderNotFound = () =>{
    pokeName.textContent = '¿Quien es ese Pokemon?';
    pokeImg.setAttribute('src', './quien_Es.png');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    dataShinyButton.setAttribute('style', 'display:none !important;'), 
    pokeId.textContent = '';
};