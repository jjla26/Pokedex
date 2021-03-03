const pokemonRepository = (function(){
    
    //list of pokemon
    const pokemonList = [ {
        name: 'Bulbasaur',
        img: './img/bulbasaur.svg',
        height: 0.7,
        weight: 6.9,
        abilities: [ 'chlorophyll', 'overgrow' ],
        types: ['grass', 'poison']
    
    }, 
    {
        name: 'Pidgey',
        img: './img/pidgey.svg',
        height: 0.3,
        weight: 1.8,
        abilities: [ 'keen-eye', 'tangled-feet', 'big-pecks' ],
        types: ['flying', 'normal']
    }, 
    {
        name: 'Pikachu',
        img: './img/pikachu.svg',
        height: 0.4,
        weight: 6,
        abilities: [ 'static', 'lightningrod' ],
        types: ['electric']
    }, 
    {
        name: 'Ponyta',
        img: './img/ponyta.svg',
        height: 1,
        weight: 30,
        abilities: [ 'flash-fire', 'flame-body', 'run-away' ],
        types: ['fire']
    }, 
    {
        name: 'Squirtle',
        img: './img/squirtle.svg',
        height: 0.5,
        weight: 9,
        abilities: [ 'rain-dish', 'torrent' ],
        types: ['water']
    }, 
    {
        name: 'Charmander',
        img: './img/charmander.svg',
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
            return false
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
                return 'Your pokemon should have abilities (you should separate them by comma)'
            }else if(pokemon['types'].find(type => (type !== 'fire' && type !== 'flying' && type !== 'grass' && type !== 'electric' && type !== 'water' && type !=='other' ))){
                return 'Your pokemon types should have one of theses (fire, flying, grass, electric, water, other)'
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
    const closeModalButton = document.getElementById('modal-close')
    const addPokemonButton = document.getElementById('add-pokemon')
    const filterPokemonButton = document.getElementById('filter-pokemon')
    const addPokemonForm = document.getElementsByClassName('form__pokemon')[0]
    const filterPokemonForm = document.getElementsByClassName('form__filter')[0]
    const modal = document.getElementById('modal')
    const modalBody = document.getElementsByClassName('modal__body')[0]
    const modalTitle = document.getElementsByClassName('modal__title')[0]

    /*  Reduce create a HTML template concatening all the cards of the pokemon list
    The reduce inside of the class does the same but with the types (this helps with the styles of the cards)*/

    const pokemonTemplate = (pokemonList) => pokemonList.reduce((acc, pokemon) => 
        `${acc}
        <div class="card ${pokemon.types.reduce((acc,el) => `${acc} ${el}`,'')}">
            <div class="card__image-container">
                <img class="card__image" src="${pokemon.img}" />
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

    // Action that opens modal for adding a new pokemon
    addPokemonButton.onclick = () => {
        modal.style.display = 'block'
        modalBody.innerHTML = ''
        modalTitle.innerHTML = 'Add a new Pokemon'
        modalBody.appendChild(addPokemonForm)
        addPokemonForm.style.display = 'block'
    }

    // Action that opens modal for filtering pokemon by name 
    filterPokemonButton.onclick = () => {
        modal.style.display = 'block'
        modalBody.innerHTML = ''
        modalTitle.innerHTML = 'Filter Pokemon By Name'
        modalBody.appendChild(filterPokemonForm)
        filterPokemonForm.style.display = 'block'    
    }

    // Action to close modal
    closeModalButton.onclick = () => {
        modal.style.display = 'none'
    }

    // Action for adding a new pokemon after submitting form
    addPokemonForm.onsubmit = e => {
        e.preventDefault()
        const name = document.getElementById('name').value
        const img = document.getElementById('img').value
        const height = parseFloat(document.getElementById('height').value)
        const weight = parseFloat(document.getElementById('weight').value)
        const types = document.getElementById('type').value.split(',')
        const abilities = document.getElementById('abilities').value.split(',')
        const sended = pokemonRepository.add({name, img, height, weight, types, abilities})
        if(sended){
            document.getElementsByClassName('pokemon__list')[0].innerHTML = pokemonTemplate(pokemonList)
            modal.style.display = 'none'
        }
    }

}

