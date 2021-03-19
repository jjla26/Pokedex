// eslint-disable-next-line
const dynamicPokemonRepository = (function(){
    
    let pokemonList = []
    let step = 5
    let mainUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${step}`
    let nextPageUrl = ''
    let page = 0
    let offset = 0
    let totalItems

    // function to get all the pokemonList
    function getPokemonList(){
        return pokemonList.slice(offset, offset+step)
    }

    function renderDynamicCount(){
        const count = document.querySelector('.content').querySelector('span')
        count.classList.remove('hidden')
        count.innerText = `(Total Pokemon: ${totalItems})`
    }

    function nextPage(){
        page += 1
        offset = offset+step
        document.querySelectorAll('.pokemon__item').forEach(element => {
            element.classList.add('hidden')
        })
        document.querySelectorAll('.card').forEach(element => {
            element.classList.add('hidden')
        })
        document.querySelector('.content__previous-button').disabled = false
        const nextButton = document.querySelector('.content__next-button')
        const nextList = pokemonList.slice(offset, offset+step)
        if(nextList.length === 0){
            nextButton.disabled = true
            loadList(nextPageUrl)
            .then(() => {
                const pokemonList = getPokemonList()
                printList(pokemonList)
            })
        }else{
            const list = [ ...document.querySelectorAll('.pokemon__item') ]
            list.slice(page*step, page*step+step).forEach(element => element.classList.remove('hidden'))
            if(totalItems <= offset+step){
                nextButton.disabled = true
            }else{
                nextButton.disabled = false
            }
        }
    }

    function previousPage(){
        page -= 1
        offset = offset-step
        document.querySelectorAll('.pokemon__item').forEach(element => {
            element.classList.add('hidden')
        })
        document.querySelectorAll('.card').forEach(element => {
            element.classList.add('hidden')
        })
        const previousButton = document.querySelector('.content__previous-button')
        const nextButton = document.querySelector('.content__next-button')
        nextButton.disabled = false
        if(offset === 0 ){
            previousButton.disabled = true
        }
        const list = [ ...document.querySelectorAll('.pokemon__item') ]
        list.slice(page*step, page*step+step).forEach(element => element.classList.remove('hidden'))
    }

    // function to load data from https://pokeapi.co/api/v2/pokemon/?limit=150
    function loadList(url = mainUrl){
        const container = document.querySelector('.pokemon__dynamic-list')
        container.querySelector('.spinner').classList.remove('hidden')
        const nextButton = document.querySelector('.content__next-button')
        const previousButton = document.querySelector('.content__previous-button')
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
                    container.querySelector('.spinner').classList.add('hidden')
                    document.querySelector('.content__pagination').classList.remove('hidden')
                })
            })
            .catch((error) => {
                console.log(error)
                container.querySelector('.spinner').classList.remove('hidden')
            })
    }
    
    function addDynamicList(pokemon){
        const validation = nameValidation(pokemon)
        if(!validation){
            const newList = pokemonList.concat(pokemon)
            pokemonList = newList
        }
    }

    // function that prints the list of pokemons 
    function printCard(pokemon, element){
        const listContainer = element.parentNode

        const card = document.createElement('div')
        card.classList.add('card', ...pokemon.types) 
        card.setAttribute('data-bs-toggle', 'modal')
        card.setAttribute('data-bs-target', '#modal')

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

        cardListener(card, pokemon)

        const colorThief = new ColorThief();

        // Make sure image is finished loading to extract color
        image.addEventListener('load', function() {
            const color = colorThief.getColor(image);
            card.style.backgroundImage =  `linear-gradient(0deg, rgb(${color}), rgba(255, 255, 255))`
            card.style.border = `10px solid rgb(${color})`
        });
        
        listContainer.insertBefore(card, element.nextSibling)          
    }

    // function that prints the pokemonlist
    function printList(pokemonList){
        const listContainer = document.querySelector('.pokemon__dynamic-list')
        const list = document.createElement('ul')
        list.classList.add('list-group', 'd-flex', 'justify-content-between', 'align-items-center')
        pokemonList.forEach(pokemon => {
            const card = document.createElement('li')
            card.classList.add('pokemon__item', 'list-group-item')
            const title = document.createElement('h4')
            title.innerText = pokemon.name
            card.appendChild(title)
            list.appendChild(card)

            listContainer.appendChild(list)

            detailListener(card, pokemon)
        })
    }

    //function to add event listener for pokemon card 

    function cardListener(element, pokemon){
        element.addEventListener('click', () => {
            const detailsContainer = document.createElement('div')
            detailsContainer.classList.add('details__container')
            
            const imageContainer = document.createElement('div')
            imageContainer.classList.add('details__image')
            
            const details = document.createElement('div')
            details.classList.add('details__content')
            
            const image = document.createElement('img')
            image.classList.add('card__image')
            image.src = pokemon.img
    
            const type = document.createElement('p')
            type.innerText = `Type: ${pokemon.types}`
    
            const height = document.createElement('p')
            height.innerText = `Height: ${pokemon.height}`
            
            const weight = document.createElement('p')
            weight.innerText = `Weight: ${pokemon.weight}`
    
            const abilities = document.createElement('p')
            abilities.innerText = `Abilities: ${pokemon.abilities}`

            const moves = document.createElement('p')
            moves.innerText = `Moves: ${pokemon.moves.map(move => ` ${move}`)}`

            details.appendChild(type)
            details.appendChild(height)
            details.appendChild(weight)
            details.appendChild(abilities)
            details.appendChild(moves)
            imageContainer.appendChild(image)
            detailsContainer.appendChild(imageContainer)
            detailsContainer.appendChild(details)

            customModal.showModal('Pokemon Detail', detailsContainer)
        })
    }

    //function to add event listener for pokemon detail
    function detailListener(element, pokemon){
        element.addEventListener('click', () => {
            showDetails(pokemon, element)
        })
    }

    function showDetails(pokemon, element){
        if(pokemon.height){
            element.parentNode.querySelectorAll('.card').forEach(card => {
                if(card.querySelector('h3').innerText === pokemon.name){
                    card.classList.toggle('hidden')
                }else{
                    card.classList.add('hidden')
                }
            })
        }else{
            loadDetails(pokemon, element)
                .then(response => {
                    pokemon.img = response.sprites.other['official-artwork'].front_default
                    pokemon.height = response.height
                    pokemon.weight = response.weight
                    pokemon.types = response.types.map(type => type.type.name)
                    pokemon.abilities = response.abilities.map(ability => ability.ability.name)
                    pokemon.moves = response.moves.map(move => move.move.name)
                    printCard(pokemon, element)
                })
        }

    }

    function loadDetails(pokemon, element){
        const spinnerContainer = document.querySelector('.pokemon__dynamic-list')
        const spinner = spinnerContainer.querySelector('.spinner')
        spinner.classList.remove('hidden')
        element.parentNode.insertBefore(spinner, element.nextSibling)
        return fetch(pokemon.detailsUrl)
            .then(response => response.json())
            .then(response => {
                spinner.classList.add('hidden')
                spinnerContainer.appendChild(spinner)
                return response
            })
            .catch(() => {
                spinner.classList.add('hidden')
                spinnerContainer.appendChild(spinner)            
            })
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
            return 'Ups, this is not a pokemon'
        }

    }

    // Pagination next listener
    document.querySelector('.content__next-button').addEventListener('click', nextPage )

    // Pagination previous listener
    document.querySelector('.content__previous-button').addEventListener('click', previousPage )

    return {
        loadList: loadList,
        getPokemonList: getPokemonList,
        addDynamicList: addDynamicList,
        printList: printList,
        printCard: printCard,
        renderDynamicCount: renderDynamicCount,
    }
})()