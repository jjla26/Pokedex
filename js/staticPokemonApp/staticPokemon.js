const staticPokemonRepository = (function(){
    
    //list of pokemon
    let pokemonList = [ {
        id: Math.random().toString(36),
        name: 'Bulbasaur',
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        height: 0.7,
        weight: 6.9,
        abilities: [ 'chlorophyll', 'overgrow' ],
        types: ['grass', 'poison']
    
    }, 
    {
        id: Math.random().toString(36),
        name: 'Pidgey',
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/16.svg',
        height: 0.3,
        weight: 1.8,
        abilities: [ 'keen-eye', 'tangled-feet', 'big-pecks' ],
        types: ['flying', 'normal']
    }, 
    {
        id: Math.random().toString(36),
        name: 'Pikachu',
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
        height: 0.4,
        weight: 6,
        abilities: [ 'static', 'lightningrod' ],
        types: ['electric']
    }, 
    {
        id: Math.random().toString(36),
        name: 'Ponyta',
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/77.svg',
        height: 1,
        weight: 30,
        abilities: [ 'flash-fire', 'flame-body', 'run-away' ],
        types: ['fire']
    }, 
    {
        id: Math.random().toString(36),
        name: 'Squirtle',
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg',
        height: 0.5,
        weight: 9,
        abilities: [ 'rain-dish', 'torrent' ],
        types: ['water']
    }, 
    {
        id: Math.random().toString(36),
        name: 'Charmander',
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
        height: 0.6,
        weight: 8.5,
        abilities: [ 'blaze', 'solar-power' ],
        types: ['fire']
    }]

    // function to get all the pokemonList1
    function getAll(){
        return pokemonList
    }

    function renderStaticCount(){
        const count = document.querySelector('.content').querySelector('span')
        count.classList.remove('hidden')
        count.innerText = `(Total Pokemon: ${getAll().length})`
    }

    // function that removes a pokemon from the list
    function remove(id){
        const newPokemonList = pokemonList.filter(pokemon => pokemon.id !== id)
        pokemonList = newPokemonList
        renderStaticCount()
        return pokemonList 
    }

    // function that prints the list of pokemons 
    function print(pokemon){
        const listContainer = document.querySelector('.pokemon__list')

        const card = document.createElement('div')
        card.classList.add('card', ...pokemon.types) 
        
        const action = document.createElement('div')
        action.classList.add(`card__action`) 
        card.appendChild(action)

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-btn', 'action__button')
        deleteButton.setAttribute('id', pokemon.id)
        deleteButton.innerText = '-'
        
        const editButton = document.createElement('button')
        editButton.classList.add('edit-btn', 'action__button')
        editButton.innerText = 'edit'
        action.appendChild(deleteButton)
        action.appendChild(editButton)

        const imageContainer = document.createElement('div')
        imageContainer.classList.add('card__image-container')
        card.appendChild(imageContainer)

        const image = document.createElement('img')
        image.classList.add('card__image')
        image.src = pokemon.img
        image.crossOrigin = 'anonymous'
        imageContainer.appendChild(image)

        const name = document.createElement('h3')
        name.innerText = pokemon.name
        card.appendChild(name)

        const descriptionContainer = document.createElement('div')
        descriptionContainer.classList.add('card__description')
        card.appendChild(descriptionContainer)

        const type = document.createElement('p')
        type.innerText = `Type: ${pokemon.types}`
        descriptionContainer.appendChild(type)

        const height = document.createElement('p')
        height.innerText = `Height: ${pokemon.height}`
        descriptionContainer.appendChild(height)
        
        const weight = document.createElement('p')
        weight.innerText = `Weight: ${pokemon.weight}`
        descriptionContainer.appendChild(weight)

        const abilities = document.createElement('p')
        abilities.innerText = `Abilities: ${pokemon.abilities}`
        descriptionContainer.appendChild(abilities)

        listContainer.appendChild(card)

        image.addEventListener('load', function() {
            var vibrant = new Vibrant(image);
            var swatches = vibrant.swatches()
            for (var swatch in swatches) {
                if (swatches.hasOwnProperty(swatch) && swatches[swatch]){
                    console.log(swatch, swatches[swatch].getHex())
                    if(swatch === 'Vibrant'){
                        const color = swatches[swatch].getHex()
                        console.log(color)
                        card.style.backgroundImage =  `linear-gradient(0deg, ${color}, rgba(255, 255, 255))`
                        card.style.border = `10px solid ${color}`
                    }
                }
        }});

        // addlisteners for delete and edit button
        deleteButtonListener(deleteButton)
        editButtonListener(editButton, pokemon)
    }

    //function to add event listener to delete button
    function deleteButtonListener(element){
        element.addEventListener('click', e => {
            remove(e.target.id)
            const card = e.target.parentNode.parentNode
            card.parentNode.removeChild(card)
        })
    }

    //function to add event listener to edit button
    function editButtonListener(element, pokemon){
        element.addEventListener('click', () => {
            const pokemonContainer = document.querySelector('.pokemon__section')
            const pokemonForm = document.querySelector('.form__pokemon')
            const filterPokemonForm = document.querySelector('.form__filter')
            pokemonForm.classList.remove('hidden')
            filterPokemonForm.classList.add('hidden')
            pokemonContainer.appendChild(filterPokemonForm)    
            document.getElementById('id').value = pokemon.id
            document.getElementById('name').value = pokemon.name
            document.getElementById('img').value = pokemon.img
            document.getElementById('height').value = pokemon.height
            document.getElementById('weight').value = pokemon.weight
            document.getElementById('type').value = pokemon.types.join()
            document.getElementById('abilities').value = pokemon.abilities.join()
            pokemonForm.querySelector('button').innerText = "Edit Pokemon"
            modal.showModal("Edit Pokemon", pokemonForm)
        })  
    }

    // function to edit a pokemon
    function edit(id, pokemonEdited){
        const validation = pokemonValidate(pokemonEdited)
        if(!validation){
            const newPokemon = {id, ...pokemonEdited}
            if(pokemonList.find(pokemon => pokemon.id === id )){
                const oldPokemon = pokemonList.find(pokemon => pokemon.id === id )
                const newPokemonList = pokemonList.map(pokemon => {
                    if(pokemon.id === id){
                        return newPokemon
                    }else{
                        return pokemon
                    }
                })
                pokemonList = newPokemonList
                return { newPokemon, oldPokemon }
            }else{
                const oldPokemon = pokemonList2.find(pokemon => pokemon.id === id )
                const newPokemonList = pokemonList2.map(pokemon => {
                    if(pokemon.id === id){
                        return newPokemon
                    }else{
                        return pokemon
                    }
                })
                pokemonList = newPokemonList
                return { newPokemon, oldPokemon } 
            }
        }else{
            alert(validation)
            return false
        }
    }

    // function to add a pokemon to the list 
    function add(pokemon){
        const validation = pokemonValidate(pokemon)
        if(!validation){
            const newPokemon = { id: Math.random().toString(36), ...pokemon }
            const newPokemonList = pokemonList.concat(newPokemon)
            pokemonList = newPokemonList
            renderStaticCount()
            return newPokemon
        }else{
            alert(validation)
            return false
        }
    }

    // funcion to restore the list of pokemon
    function restoreList(){
        document.querySelectorAll('.card').forEach(el => el.classList.remove('hidden'))
    }

    // function to filter a pokemon by name 
    function filterByName(name){
        document.querySelectorAll('.card').forEach(el => {
            if(el.querySelector('h3').innerText.toLowerCase().indexOf(name.toLowerCase()) > -1){
                el.classList.remove('hidden')
            }else{
                el.classList.add('hidden')
            }
        })
    }

    // function to validate the pokemon 
    function pokemonValidate(pokemon) {
        if(typeof(pokemon) === 'object'){
            if(typeof(pokemon.name) !== 'string'){
                return 'Your pokemon should have a name'
            }else if(typeof(pokemon.height) !== 'number'){
                return 'Your pokemon should have a height and it should be a number'
            }else if(typeof(pokemon.weight) !== 'number'){
                return 'Your pokemon should have a weight and it should be a number'
            }else if(typeof(pokemon.abilities) !== 'object'){
                return 'Your pokemon should have abilities (you should separate them by comma)'
            }else if(!pokemon.types.find(type => (type === 'fire' || type === 'flying' || type === 'grass' || type === 'electric' || type === 'water' || type ==='other' ))){
                return 'Your pokemon types should have one of theses (fire, flying, grass, electric, water, other)'
            }else{
                return null
            }
        }else{
            return "Ups, this is not a pokemon"
        }  
    }

    // Function that shows a modal to add a pokemon
    function addButtonAction(){
        const pokemonContainer = document.querySelector('.pokemon__section')
        const filterPokemonForm = document.querySelector('.form__filter')
        const pokemonForm = document.querySelector('.form__pokemon')
        filterPokemonForm.classList.add('hidden')
        pokemonContainer.appendChild(filterPokemonForm)
        document.querySelectorAll('input').forEach(el => el.value = '')
        pokemonForm.classList.remove('hidden')
        pokemonForm.querySelector('button').innerText = "Add a new Pokemon"
        modal.showModal('Add a new Pokemon', pokemonForm)
    }

    // Function that shows a filter modal
    function filterButtonAction(){
        const pokemonContainer = document.querySelector('.pokemon__section')
        const pokemonForm = document.querySelector('.form__pokemon')
        pokemonForm.classList.add('hidden')
        pokemonContainer.appendChild(pokemonForm)
        const filterPokemonForm = document.querySelector('.form__filter')
        filterPokemonForm.classList.remove('hidden')
        modal.showModal('Filter Pokemon By Name', filterPokemonForm)
    }

    //function that restore the pokemon list after filtered
    function restoreButtonAction(){
        const restoreButtonHeader = document.querySelector('.content__header-actions').lastElementChild
        const restoreButtonSidebar = document.querySelector('.sidebar__list').lastElementChild
        restoreButtonHeader.classList.add('hidden')
        restoreButtonSidebar.classList.add('hidden')
        restoreButtonSidebar.previousElementSibling.classList.remove('hidden')
        restoreButtonHeader.previousElementSibling.classList.remove('hidden')
        restoreList()
    }

    // Add buttons listeners
    document.querySelector('.sidebar__list').firstElementChild.addEventListener('click', () => {
        addButtonAction()
    })

    // Action that shows a filter pokemon form
    document.querySelector('.sidebar__list').firstElementChild.nextElementSibling.addEventListener('click', () => {
        filterButtonAction()
    })

    // Action that restore the list of pokemon
    document.querySelector('.sidebar__list').lastElementChild.addEventListener('click', restoreButtonAction)

    // Action to filter pokemon by name 
    document.querySelector('.header__filter').addEventListener('input', e => {
        filterByName(e.target.value)
    })

    return {
        getAll: getAll,
        add: add,
        edit: edit,
        remove: remove,
        print: print,
        restoreList: restoreList,
        filterByName: filterByName,
        renderStaticCount: renderStaticCount,
        addButtonAction: addButtonAction,
        filterButtonAction: filterButtonAction,
        restoreButtonAction: restoreButtonAction
    }
})()