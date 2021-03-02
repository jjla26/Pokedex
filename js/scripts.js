const pokemonRepository = (function(){
    
    //list of pokemon
    const pokemonList = [ {
        name: 'Bulbasaur',
        height: 0.7,
        weight: 6.9,
        abilities: [ 'chlorophyll', 'overgrow' ],
        types: ['grass', 'poison']
    
    }, 
    {
        name: 'Pidgey',
        height: 0.3,
        weight: 1.8,
        abilities: [ 'keen-eye', 'tangled-feet', 'big-pecks' ],
        types: ['flying', 'normal']
    }, 
    {
        name: 'Pikachu',
        height: 0.4,
        weight: 6,
        abilities: [ 'static', 'lightningrod' ],
        types: ['electric']
    }, 
    {
        name: 'Ponyta',
        height: 1,
        weight: 30,
        abilities: [ 'flash-fire', 'flame-body', 'run-away' ],
        types: ['fire']
    }, 
    {
        name: 'Squirtle',
        height: 0.5,
        weight: 9,
        abilities: [ 'rain-dish', 'torrent' ],
        types: ['water']
    }, 
    {
        name: 'Charmander',
        height: 0.6,
        weight: 8.5,
        abilities: [ 'blaze', 'solar-power' ],
        types: ['fire']
    }]

    // function to get all the pokemon
    function getAll(){
        return pokemonList
    }

    // function to add a pokemon to the list 
    function add(item){
        pokemonList.push(item)
        return pokemonList
    }

    return {
        getAll: getAll,
        add: add,

    }
})()


window.onload = () => {

    const pokemonList = pokemonRepository.getAll()

    // Reduce create a HTML template concatening the cards for each pokemon
    const pokemonTemplate = pokemonList.reduce((acc, pokemon) => 
    `${acc}
    <div class="card ${pokemon.types.reduce((acc,el) => `${acc} ${el}`,'')}"> 
        <div class="card__image">
            <img src="./img/${pokemon.name}.svg" />
        </div>
        <h3>${pokemon.name}</h3>
        <div class="card__description">
            <p>Type: ${pokemon.types}</p>
            <p>Height: ${pokemon.height}</p>
            <p>Weight ${pokemon.weight}</p>
            <p>Abilities: ${pokemon.abilities}</p>
        </div>
        <p id="${pokemon.name}"></p>
    </div>`
    , '')

    document.getElementsByClassName('pokemon__list')[0].innerHTML = pokemonTemplate

}

