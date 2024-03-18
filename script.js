let types = ['grass', 'fire', 'water', 'electric', 'rock', 'fighting', 'ground', 'ice', 'dragon', 'normal', 'steel', 'ghost', 'poison', 'flying', 'bug', 'psychic', 'shadow', 'dark', 'unknown', 'fairy'];
let selectedPokemonJSON;
let start = 1;                                                                  
let end = 25;


async function loadPokemon() {                                                  

    for( let i = start; i < end; i++) {                                         

        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let pokemonJSON = await response.json();

        let container = document.getElementById('allPokemon');
        container.innerHTML += renderPokemon(pokemonJSON, i);                
        setPokemonName(pokemonJSON, i);                        
        typeColor(pokemonJSON, i);                        
    }
    increaseLoopValues();        
}


function renderPokemon(JSON, i) {
    return `<div id="pokemon${i}" class="pokemon" onclick="showPokemon(${i})">
              <h2 id="pokemonName${i}"></h2>
              <div class="type-and-image">
                <span class="type">${JSON['types'][0]['type']['name']}</span>
                <img class="pokemonIMG" src="${JSON['sprites']['other']['official-artwork']['front_default']}">
              </div>  
            </div>`;
}


function setPokemonName(JSON, i) {                                       
    let name = JSON['name'];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById(`pokemonName${i}`).innerHTML = name;
}


function typeColor(JSON, i) {                                            
    let type = JSON['types'][0]['type']['name'];
    let pokemon = document.getElementById(`pokemon${i}`);

    for(let j = 0; j < types.length; j++) {
        if(type == types[j]) {
            pokemon.classList.add(`${types[j]}`);                        
        }
    }
}
 

function increaseLoopValues() {
    start = end;
    end = end+25;
}


async function showPokemon(i) {                                                        
    document.getElementById('selectedPokemon-div').style.display = 'flex';
    
    let selectedPokemonURL = `https://pokeapi.co/api/v2/pokemon/${i}`;                 
    let response = await fetch(selectedPokemonURL);
    selectedPokemonJSON = await response.json();

    getSelectedName(selectedPokemonJSON);
    document.getElementById('type').innerHTML = selectedPokemonJSON['types'][0]['type']['name'];
    document.getElementById('id').innerHTML =  `#${selectedPokemonJSON['id']}`;
    getSelectedColor(selectedPokemonJSON);
    document.getElementById('selectedPokemon-IMG').src = selectedPokemonJSON['sprites']['other']['official-artwork']['front_default'];
    aboutInfos(selectedPokemonJSON);
}


function getSelectedName(JSON) {                                                    
    let name = JSON['name'];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById('selectedPokemonName').innerHTML = name;
}


function getSelectedColor(JSON) {                                                          
    let type = JSON['types'][0]['type']['name'];

    for(let j = 0; j < types.length; j++) {
        if(type == types[j]) {
            document.getElementById('selectedPokemonName').classList.add(`${types[j]}`);
            document.getElementById('type-and-id').classList.add(`${types[j]}`);
        }
    }    
}


function closeWindow() {                                                                   
    document.getElementById('selectedPokemon-div').style.display = 'none';
}


function doNotClose(event) {                                                              
    event.stopPropagation();
}


function aboutInfos(JSON) {                                                               
    let content = document.getElementById('pokemonInfos-content');
    content.innerHTML = '';
    content.innerHTML += renderAboutInfos(JSON);
    getAbilities(JSON);                                                                                  
}


function renderAboutInfos(JSON) {
    return `<div class="aboutInfos">
              <div class="aboutInfos-container"><span class="aboutInfos-properties">Height</span><span>${JSON['height']*10} cm</span></div>
              <div class="aboutInfos-container"><span class="aboutInfos-properties">Weight</span><span>${JSON['weight']/10} kg</span></div>
              <div class="aboutInfos-container"><span class="aboutInfos-properties">Abilities</span><span id="abilities"></span></div>
            </div>`;
}


function getAbilities(JSON) {
    for( let i = 0; i < JSON['abilities'].length; i++) {
        let ability = JSON['abilities'][i]['ability']['name'];
        let abilityUpperCase = makeUpperCase(ability);                                 
        document.getElementById('abilities').innerHTML += `${abilityUpperCase} `;      
    }    
}


function makeUpperCase(word) {                                                         
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word;
}


function getStats(JSON) {                                                    
    let statLabels = [];                                                     
    let statValues = [];

    for (let i = 0; i < JSON['stats'].length; i++) {
        let statLabel = JSON['stats'][i]['stat']['name'];
        statLabels.push(statLabel);
    }
    for (let i = 0; i < JSON['stats'].length; i++) {
        let statValue = JSON['stats'][i]['base_stat'];
        statValues.push(statValue);
    }
    showStats(statLabels, statValues);                                     
}


function showMoves(JSON) {                                                                              
    document.getElementById('pokemonInfos-content').innerHTML = '';
    document.getElementById('pokemonInfos-content').innerHTML = `<div id="moves"></div>`;
    
    for ( let i = 0; i < 50; i++) {
        let move = JSON['moves'][i]['move']['name'];
        let moveUpperCase = makeUpperCase(move);
        document.getElementById('moves').innerHTML += `<span class="move">${moveUpperCase} </span>`; 
   }
}


async function search() {                                                              
    document.getElementById('allPokemon').innerHTML = '';
    document.getElementById('loadPokemon-button').style.display = 'none';             
    let input = document.getElementById('input').value;
    input = input.charAt(0).toLowerCase() + input.slice(1);                           

    if(input == '') {
        noInput();
    } else {
        showSearchResults(input);
    }
}


function noInput() {
    alert("Bitte gib einen Namen ein !");
    reset();
}


async function reset() {                                                           
    document.getElementById('allPokemon').innerHTML = '';
    document.getElementById('input').value = '';
    document.getElementById('loadPokemon-button').style.display = '';              
    start = 1;
    end = 25;
    loadPokemon();                                                                  
}


async function showSearchResults(input) {
    for( let i = 1; i < 350; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let pokemonJSON = await response.json();
    
        if(pokemonJSON['name'].includes(input)) {
           let container = document.getElementById('allPokemon');
           container.innerHTML += renderPokemon(pokemonJSON, i);
           setPokemonName(pokemonJSON, i);                        
           typeColor(pokemonJSON, i);                        
        }
    }
}

