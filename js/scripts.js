const pokemonRepository = (function(){
    
    //list of pokemon
    let pokemonList = [ {
        id: Math.random().toString(36),
        name: 'Bulbasaur',
        img: './img/bulbasaur.svg',
        height: 0.7,
        weight: 6.9,
        abilities: [ 'chlorophyll', 'overgrow' ],
        types: ['grass', 'poison']
    
    }, 
    {
        id: Math.random().toString(36),
        name: 'Pidgey',
        img: './img/pidgey.svg',
        height: 0.3,
        weight: 1.8,
        abilities: [ 'keen-eye', 'tangled-feet', 'big-pecks' ],
        types: ['flying', 'normal']
    }, 
    {
        id: Math.random().toString(36),
        name: 'Pikachu',
        img: './img/pikachu.svg',
        height: 0.4,
        weight: 6,
        abilities: [ 'static', 'lightningrod' ],
        types: ['electric']
    }, 
    {
        id: Math.random().toString(36),
        name: 'Ponyta',
        img: './img/ponyta.svg',
        height: 1,
        weight: 30,
        abilities: [ 'flash-fire', 'flame-body', 'run-away' ],
        types: ['fire']
    }, 
    {
        id: Math.random().toString(36),
        name: 'Squirtle',
        img: './img/squirtle.svg',
        height: 0.5,
        weight: 9,
        abilities: [ 'rain-dish', 'torrent' ],
        types: ['water']
    }, 
    {
        id: Math.random().toString(36),
        name: 'Charmander',
        img: './img/charmander.svg',
        height: 0.6,
        weight: 8.5,
        abilities: [ 'blaze', 'solar-power' ],
        types: ['fire']
    }]

    let pokemonList2 = []
    let mainUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5'
    let nextPageUrl = ''
    let offset = 0
    let step = 5
    let totalItems

    // function to get all the pokemonList1
    function getAll(){
        return pokemonList
    }

    // function to get all the pokemonList2
    function getPokemonList2(){
        return pokemonList2.slice(offset, offset+step)
    }

    function nextPage(){
        offset = offset+step
        const previousButton = document.querySelector('.pokemon__previous-button')
        previousButton.disabled = false
        const nextButton = document.querySelector('.pokemon__next-button')
        const nextList = pokemonList2.slice(offset, offset+step)
        if(nextList.length === 0){
            nextButton.disabled = true
            return nextPageUrl
        }else{
            if(totalItems <= offset+step){
                nextButton.disabled = true
            }else{
                nextButton.disabled = false
            }
            return null
        }
    }

    function previousPage(){
        offset = offset-step
        const previousButton = document.querySelector('.pokemon__previous-button')
        const nextButton = document.querySelector('.pokemon__next-button')
        nextButton.disabled = false
        if(offset === 0 ){
            previousButton.disabled = true
        }
    }

    // function to load data from https://pokeapi.co/api/v2/pokemon/?limit=150
    function loadList(url = mainUrl){
        document.querySelector('.spinner').classList.remove('hidden')
        const nextButton = document.querySelector('.pokemon__next-button')
        const previousButton = document.querySelector('.pokemon__previous-button')
        return fetch(url)
            .then(response => response.json())
            .then(response => {
                totalItems = response.count
                if(response.next){
                    nextButton.disabled = false
                    nextPageUrl = response.next
                }else{
                    nextButton.disabled = true
                }
                if(response.previous){
                    previousButton.disabled = false
                    previousPageUrl = response.previous
                }else{
                    previousButton.disabled = true
                }
                response.results.forEach(item => {
                    let pokemon = {
                        id: Math.random().toString(36),
                        name: item.name,
                        detailsUrl: item.url
                    }
                    addDynamicList(pokemon)
                    document.querySelector('.spinner').classList.add('hidden')
                    document.querySelector('.pokemon__pagination').classList.remove('hidden')
                })
            })
            .catch(error => {
                document.querySelector('.spinner').classList.remove('hidden')
            })
    }
    
    function addDynamicList(pokemon){
        const validation = nameValidation(pokemon)
        if(!validation){
            const newList = pokemonList2.concat(pokemon)
            pokemonList2 = newList
        }
    }

    // function that removes a pokemon from the list
    function remove(id){
        const newPokemonList = pokemonList.filter(pokemon => pokemon.id !== id)
        pokemonList = newPokemonList
        return pokemonList 
    }

    // function that prints the pokemonlist2

    function printList2(pokemonList){
        const listContainer = document.querySelector('.pokemon__dynamic-list')
        const list = document.createElement('ul')
        pokemonList.forEach(pokemon => {
            const card = document.createElement('li')
            card.classList.add('pokemon__item')

            const title = document.createElement('h4')
            title.innerText = pokemon.name
            card.appendChild(title)
            list.appendChild(card)

            listContainer.appendChild(card)

            detailListener(card, pokemon)
        })
    }

    // function that prints the list of pokemons 
    function print(pokemonList){
        const listContainer = document.querySelector('.pokemon__list')

        // foreach create a list of pokemon cards
        pokemonList.forEach(pokemon => {
            const card = document.createElement('div')
            card.classList.add('card', ...pokemon.types) 
            
            const action = document.createElement('div')
            action.classList.add(`card__action`) 
            card.appendChild(action)

            const deleteButton = document.createElement('button')
            deleteButton.classList.add('card__delete-button')
            deleteButton.setAttribute('id', pokemon.id)
            deleteButton.innerText = '-'
            
            const editButton = document.createElement('button')
            editButton.classList.add('card__edit-button')
            editButton.innerText = 'edit'
            action.appendChild(deleteButton)
            action.appendChild(editButton)

            const imageContainer = document.createElement('div')
            imageContainer.classList.add('card__image-container')
            card.appendChild(imageContainer)

            const image = document.createElement('img')
            image.classList.add('card__image')
            image.src = pokemon.img
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

            // addlisteners for delete and edit button
            deleteButtonListener(deleteButton)
            editButtonListener(editButton, pokemon)
          
        })
    }

    //function to add event listener to delete button
    function deleteButtonListener(element){
        element.addEventListener('click', e => {
            remove(e.target.id)
            const card = e.target.parentNode.parentNode
            card.parentNode.removeChild(card)
        })
    }

    //function to add event listener for pokemon detail
    function detailListener(element, pokemon){
        element.addEventListener('click', e => {
            showDetails(pokemon)
        })
    }

    function showDetails(pokemon){
        const list = document.querySelector('.pokemon__list')
        list.classList.remove('hidden')
        if(pokemon.height){
            list.querySelectorAll('.card').forEach(card => {
                console.log(card.querySelector('h3').innerText)
                if(card.querySelector('h3').innerText === pokemon.name){
                    card.classList.toggle('hidden')
                }else{
                    card.classList.add('hidden')
                }
            })
        }else{
            list.querySelectorAll('.card').forEach(card => {
                card.classList.add('hidden')
            })
            loadDetails(pokemon)
                .then(response => {
                    pokemon.img = response.sprites.other.dream_world.front_default
                    pokemon.height = response.height
                    pokemon.weight = response.weight
                    pokemon.types = response.types.map(type => type.type.name)
                    pokemon.abilities = response.abilities.map(ability => ability.ability.name)
                    print([pokemon])
                })
        }

    }

    function loadDetails(pokemon){
        const spinner = document.querySelector('.pokemon__list').querySelector('.spinner')
        spinner.classList.remove('hidden')
        return fetch(pokemon.detailsUrl)
            .then(response => response.json())
            .then(response => {
                spinner.classList.add('hidden')
                return response
            })
            .catch(error => {
                console.log(error)
                spinner.classList.add('hidden')
            })
    }

    //function to add event listener to edit button
    function editButtonListener(element, pokemon){
        const modal = document.querySelector('.modal')
        const pokemonForm = document.querySelector('.form__pokemon')
        const modalTitle = document.querySelector('.modal__title')  
        element.addEventListener('click', () => {
            modal.classList.remove('hidden')
            pokemonForm.classList.remove('hidden')
            document.getElementById('id').value = pokemon.id
            document.getElementById('name').value = pokemon.name
            document.getElementById('img').value = pokemon.img
            document.getElementById('height').value = pokemon.height
            document.getElementById('weight').value = pokemon.weight
            document.getElementById('type').value = pokemon.types.join()
            document.getElementById('abilities').value = pokemon.abilities.join()
            pokemonForm.querySelector('button').innerText = "Edit Pokemon"
            modalTitle.innerText = 'Edit Pokemon'
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
            return newPokemon
        }else{
            alert(validation)
            return false
        }
    }

    // function to filter a pokemon by name 
    function filterByName(name){
        document.querySelectorAll('.card').forEach(el => el.classList.add('hidden'))
        const filteredList = pokemonList.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase())
        return filteredList
    }

    // function name validation 

    function nameValidation(pokemon){
        if(typeof(pokemon) === 'object'){
            if(typeof(pokemon.name) !== 'string'){
                return 'Your pokemon should have a name'
            }else{
                return null
            }
        }else{
            return "Ups, this is not a pokemon"
        }

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

    return {
        getAll: getAll,
        loadList: loadList,
        nextPage: nextPage,
        previousPage: previousPage,
        getPokemonList2: getPokemonList2,
        addDynamicList: addDynamicList,
        printList2: printList2,
        add: add,
        edit: edit,
        remove: remove,
        print: print,
        filterByName: filterByName
    }
})()

window.onload = () => {
    const listContainer = document.querySelector('.pokemon__list')
    const closeModalButton = document.querySelector('.modal__close')
    const addPokemonButton = document.querySelector('.action__list').firstElementChild
    const filterPokemonButton = addPokemonButton.nextElementSibling
    const restoreButton = document.querySelector('.action__list').lastElementChild
    const pokemonForm = document.querySelector('.form__pokemon')
    const filterPokemonForm = document.querySelector('.form__filter')
    const modal = document.querySelector('.modal')
    const modalBody = document.querySelector('.modal__body')
    const modalTitle = document.querySelector('.modal__title')

    // Action that opens modal for adding a new pokemon
    addPokemonButton.addEventListener('click', () => {
        modal.classList.remove('hidden')
        pokemonForm.classList.remove('hidden')
        document.querySelectorAll('input').forEach(el => el.value = '')
        pokemonForm.querySelector('button').innerText = "Add a new Pokemon"
        modalTitle.innerText = 'Add a new Pokemon'
    })

    // Action that opens modal for filtering pokemon by name 
    filterPokemonButton.addEventListener('click', () => {
        modal.classList.remove('hidden')
        filterPokemonForm.classList.remove('hidden')
        modalTitle.innerText = 'Filter Pokemon By Name'
        modalBody.appendChild(filterPokemonForm)
    })

    // Action to close modal
    closeModalButton.onclick = () => {
        modal.classList.add('hidden')
        pokemonForm.classList.add('hidden')
        filterPokemonForm.classList.add('hidden')
    }

    // Action for adding a new pokemon after submitting form
    pokemonForm.onsubmit = e => {
        e.preventDefault()
        const id = document.getElementById('id').value
        const name = document.getElementById('name').value
        const img = document.getElementById('img').value
        const height = parseFloat(document.getElementById('height').value)
        const weight = parseFloat(document.getElementById('weight').value)
        const types = document.getElementById('type').value.split(',')
        const abilities = document.getElementById('abilities').value.split(',')
        if(pokemonForm.querySelector('button').innerHTML === "Add a new Pokemon"){
            const sended = pokemonRepository.add({name, img, height, weight, types, abilities})
            if(sended){
                pokemonRepository.print([sended])
                modal.classList.add('hidden')
                pokemonForm.classList.add('hidden')
            }
        }else{
            const pokemonEdited = pokemonRepository.edit(id,{name, img, height, weight, types, abilities})
            if(pokemonEdited){
                const oldPokemon = pokemonEdited.oldPokemon
                const newPokemon = pokemonEdited.newPokemon
                pokemonRepository.print([newPokemon])
                const newElement = listContainer.lastElementChild
                document.querySelectorAll('.card').forEach(element => {
                    if(element.querySelector('h3').innerText === oldPokemon.name){
                        listContainer.replaceChild(newElement, element)
                    }
                })
                modal.classList.add('hidden')
                pokemonForm.classList.add('hidden')
            }
        }
    }

    // Chosing Dynamic or Static App
    const pokemonContainer = document.querySelector('.pokemon__container')
    const staticAppButton = pokemonContainer.querySelector('.pokemon__option')
    const actionList = document.querySelectorAll('.action__item')
    const appSelectionButtons = staticAppButton.querySelectorAll('button')
    // Action for Static App button
    staticAppButton.lastElementChild.onclick = () => {
        const pokemonList = pokemonRepository.getAll()
        pokemonRepository.print(pokemonList)
        pokemonContainer.querySelector('h2').innerText = "Your Pokemons"
        listContainer.classList.remove('hidden')
        actionList[0].classList.remove('hidden')
        actionList[1].classList.remove('hidden')
        appSelectionButtons.forEach(element => element.classList.add('hidden'))
    }

    //Action for Dynamic App button
    const dynamicListContainer = document.querySelector('.pokemon__dynamic-list')
    staticAppButton.firstElementChild.onclick = async () => {
        pokemonRepository
            .loadList()
            .then(() => {
                const pokemonList2 = pokemonRepository.getPokemonList2()
                pokemonRepository.printList2(pokemonList2)
            })
        pokemonContainer.querySelector('h2').innerText = "Your Pokemons"
        dynamicListContainer.classList.remove('hidden')
        appSelectionButtons.forEach(element => element.classList.add('hidden'))
    }


    // Pagination next listener
    let page = 0
    let offset = 5
    const nextPageButton = document.querySelector('.pokemon__next-button')
    nextPageButton.onclick = () => {
        page += 1
        document.querySelectorAll('.pokemon__item').forEach(element => {
            element.classList.add('hidden')
        })
        const nextPage = pokemonRepository.nextPage()
        if(nextPage){
            pokemonRepository
            .loadList(nextPage)
            .then(() => {
                const pokemonList2 = pokemonRepository.getPokemonList2()
                pokemonRepository.printList2(pokemonList2)
            })
        }else{
            const list = [ ...document.querySelectorAll('.pokemon__item') ]
            list.slice(page*offset, page*offset+offset).forEach(element => element.classList.remove('hidden'))
        }
    }

    // Pagination previous listener
    const previousButton = document.querySelector('.pokemon__previous-button')
    previousButton.onclick = () => {
        page -= 1
        document.querySelectorAll('.pokemon__item').forEach(element => {
            element.classList.add('hidden')
        })
        const list = [ ...document.querySelectorAll('.pokemon__item') ]
        list.slice(page*offset, page*offset+offset).forEach(element => element.classList.remove('hidden'))
        pokemonRepository.previousPage()
    }

    restoreButton.onclick = () => {
        listContainer.innerHTML = ''
        pokemonRepository.print(pokemonRepository.getAll())
        restoreButton.classList.add('hidden')
        filterPokemonButton.classList.remove('hidden')

    }

    filterPokemonForm.onsubmit = e => {
        e.preventDefault()
        const name = document.getElementById('name__filter').value
        const filteredPokemon = pokemonRepository.filterByName(name)
        listContainer.innerHTML = ''
        pokemonRepository.print(filteredPokemon)
        filterPokemonButton.classList.add('hidden')
        restoreButton.classList.remove('hidden')
        modal.classList.add('hidden')
        filterPokemonForm.classList.add('hidden')
    }
}

