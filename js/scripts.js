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
    name: 'Caterpie',
    height: 0.3,
    weight: 2.9,
    abilities: [ 'shield-dust', 'run-away' ],
    types: ['bug']
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

pokemonList = [ bulbasaur, pidgey, pikachu, caterpie, squirtle, charmander]


pokemonList.forEach(pokemon => {
    document.write(`<p><strong>Pokemon:</strong> ${pokemon.name} <strong>Type</strong>: ${pokemon.abilities}</p>` );
    ;
});