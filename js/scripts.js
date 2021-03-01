let pokemonList = []

let bulbasaur = {
    name: 'Bulbasaur',
    height: 0.7,
    weight: 6.9,
    abilities: [ 'chlorophyll', 'overgrow' ],
    types: ['grass', 'poison']

}

let charmander = {
    name: 'Charmander',
    height: 0.6,
    weight: 8.5,
    abilities: [ 'blaze', 'solar-power' ],
    types: ['fire']
}

let squirtle = {
    name: 'Squirtle',
    height: 0.5,
    weight: 9,
    abilities: [ 'rain-dish', 'torrent' ],
    types: ['water']
}

let caterpie = {
    name: 'Ponyta',
    height: 1,
    weight: 30,
    abilities: [ 'flash-fire', 'flame-body', 'run-away' ],
    types: ['fire']
}

let pidgey = {
    name: 'Pidgey',
    height: 0.3,
    weight: 1.8,
    abilities: [ 'keen-eye', 'tangled-feet', 'big-pecks' ],
    types: ['flying', 'normal']
}

let pikachu = {
    name: 'Pikachu',
    height: 0.4,
    weight: 6,
    abilities: [ 'static', 'lightningrod' ],
    types: ['electric']
}

pokemonList = [ bulbasaur, pidgey, pikachu, caterpie, squirtle, charmander] // list of Pokemon


// document.write(`<h2>Grass Type</h2>`)

document.write('<div class="pokemon__list">')
// For each to print pokemon with type "grass"
pokemonList.forEach(pokemon => {
    if(pokemon.types.find(type => type === "grass")){
        document.write(`
            <div class="card grass"> 
                <div class="card__image">
                    <img src="https://via.placeholder.com/300x200" />
                </div>
                <h3>${pokemon.name}</h3>
                <div class="card__description">
                    <p>Type: ${pokemon.types}</p>
                    <p>Height: ${pokemon.height}</p>
                    <p>Weight ${pokemon.weight}</p>
                    <p>Abilities: ${pokemon.abilities}</p>
                </div>
                <p id="${pokemon.name}"></p>
            </div>
        `);
        // Conditional to print whether the pokemon is heavy or not
        if(pokemon.weight > 8){
            document.getElementById(`${pokemon.name}`).innerHTML = "This is a heavy pokemon"
        }
    }
});


// document.write(`<h2>Flying Type</h2>`)
// For each to print pokemon with type "flying"
pokemonList.forEach(pokemon => {
    if(pokemon.types.find(type => type === "flying")){
        document.write(`
            <div class="card flying"> 
                <div class="card__image">
                    <img src="https://via.placeholder.com/300x200" />
                </div>
                <h3>${pokemon.name}</h3>
                <div class="card__description">
                    <p>Type: ${pokemon.types}</p>
                    <p>Height: ${pokemon.height}</p>
                    <p>Weight ${pokemon.weight}</p>
                    <p>Abilities: ${pokemon.abilities}</p>
                </div>
                <p id="${pokemon.name}"></p>
            </div>
        `);
        // Conditional to print whether the pokemon is heavy or not
        if(pokemon.weight > 8){
            document.getElementById(`${pokemon.name}`).innerHTML = "This is a heavy pokemon"
        }
    }
});

// document.write(`<h2>Fire Type</h2>`)

// For each to print pokemon with type "Fire"
pokemonList.forEach(pokemon => {
    if(pokemon.types.find(type => type === "fire")){
        document.write(`
            <div class="card fire"> 
                <div class="card__image">
                    <img src="https://via.placeholder.com/300x200" />
                </div>
                <h3>${pokemon.name}</h3>
                <div class="card__description">
                    <p>Type: ${pokemon.types}</p>
                    <p>Height: ${pokemon.height}</p>
                    <p>Weight ${pokemon.weight}</p>
                    <p>Abilities: ${pokemon.abilities}</p>
                </div>
                <p id="${pokemon.name}"></p>
            </div>
        `);
        // Conditional to print whether the pokemon is heavy or not
        if(pokemon.weight > 8){
            document.getElementById(`${pokemon.name}`).innerHTML = "This is a heavy pokemon"
        }
    }
});


// document.write(`<h2>Rest of Types</h2>`)

// For each to print pokemon with the rest of types
pokemonList.forEach(pokemon => {
    if(!pokemon.types.find(type => type === "fire" || type === "flying" || type === "grass")){
        document.write(`
            <div class="card ${pokemon.types}"> 
                <div class="card__image">
                    <img src="https://via.placeholder.com/300x200" />
                </div>
                <h3>${pokemon.name}</h3>
                <div class="card__description">
                    <p>Type: ${pokemon.types}</p>
                    <p>Height: ${pokemon.height}</p>
                    <p>Weight ${pokemon.weight}</p>
                    <p>Abilities: ${pokemon.abilities}</p>
                </div>
                <p id="${pokemon.name}"></p>
            </div>
        `);
        // Conditional to print whether the pokemon is heavy or not
        if(pokemon.weight > 8){
            document.getElementById(`${pokemon.name}`).innerHTML = "This is a heavy pokemon"
        }
    }
});


document.write('</div>')
