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
    function add(pokemon){
        const validation = pokemonValidate(pokemon)
        if(!validation){
            pokemonList.push(pokemon)
            return pokemonList
        }else{
            alert(validation)
        }
    }

    // function to filter a pokemon by name 
    function filterByName(name){
        const filteredList = pokemonList.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase())
        return filteredList
    }

    // function to validate the pokemon 
    function pokemonValidate(pokemon) {
        if(typeof(pokemon) === 'object'){
            if(typeof(pokemon['name']) !== 'string'){
                return 'Your pokemon should have a name'
            }else if(typeof(pokemon['height']) !== 'number'){
                return 'Your pokemon should have a height and it should be a number'
            }else if(typeof(pokemon['weight']) !== 'number'){
                return 'Your pokemon should have a weight and it should be a number'
            }else if(typeof(pokemon['abilities']) !== 'object'){
                return 'Your pokemon should have abilities and should be an array'
            }else if(typeof(pokemon['types']) !== 'object'){
                return 'Your pokemon should have a type and should be an array'
            }else{
                return null
            }
        }else{
            return "Ups, this is not a pokemon"
        }  
    }

    return {
        getAll: getAll,
        add: add,
        filterByName: filterByName
    }
})()


window.onload = () => {

    const pokemonList = pokemonRepository.getAll()
    const addCharizardButton = document.getElementById('add-charizard')
    const restoreButton = document.getElementById('restore')
    const filterButton = document.getElementById('filter-pokemon')
    const filterInput = document.getElementById('filter-input')
    restoreButton.style.display = "none"

    /*  Reduce create a HTML template concatening all the cards of the pokemon list
    The reduce inside of the class does the same but with the types (this helps with the styles of the cards)*/

    const pokemonTemplate = (pokemonList) => pokemonList.reduce((acc, pokemon) => 
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

    document.getElementsByClassName('pokemon__list')[0].innerHTML = pokemonTemplate(pokemonList)

    addCharizardButton.onclick = () => {
        pokemonRepository.add(
            {
                name: "Charizard", 
                height:1.7, 
                weight:90.5, 
                abilities:["blaze", "solar-power"], 
                types: ["fire"]
            }
        )
        document.getElementsByClassName('pokemon__list')[0].innerHTML = pokemonTemplate(pokemonList)
    }

    filterButton.onclick = () => {
        const filteredList = pokemonRepository.filterByName(filterInput.value)
        document.getElementsByClassName('pokemon__list')[0].innerHTML = pokemonTemplate(filteredList)
        addCharizardButton.style.display = "none"
        restoreButton.style.display ="block"
    }

    restoreButton.onclick = () => {
        document.getElementsByClassName('pokemon__list')[0].innerHTML = pokemonTemplate(pokemonList)
        restoreButton.style.display = "none"
        addCharizardButton.style.display = "block"
    }

}

