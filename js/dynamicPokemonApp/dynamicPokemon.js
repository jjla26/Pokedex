const dynamicPokemonRepository = (function(){
    
    let pokemonList2 = []
    let mainUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5'
    let nextPageUrl = ''
    let offset = 0
    let step = 5
    let totalItems


    // function to get all the pokemonList2
    function getPokemonList2(){
        return pokemonList2.slice(offset, offset+step)
    }

    function renderDynamicCount(){
        const count = document.querySelector('.pokemon').querySelector('span')
        count.classList.remove('hidden')
        count.innerText = `(Total Pokemon: ${totalItems})`
    }

    function nextPage(){
        offset = offset+step
        const previousButton = document.querySelector('.content__previous-button')
        previousButton.disabled = false
        const nextButton = document.querySelector('.content__next-button')
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
        const previousButton = document.querySelector('.content__previous-button')
        const nextButton = document.querySelector('.content__next-button')
        nextButton.disabled = false
        if(offset === 0 ){
            previousButton.disabled = true
        }
    }

    // function to load data from https://pokeapi.co/api/v2/pokemon/?limit=150
    function loadList(url = mainUrl){
        document.querySelector('.spinner').classList.remove('hidden')
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
                    document.querySelector('.content__pagination').classList.remove('hidden')
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

    // function that prints the list of pokemons 
    function printCard(pokemon){
        const listContainer = document.querySelector('.pokemon__list')

        const card = document.createElement('div')
        card.classList.add('card', ...pokemon.types) 

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

        cardListener(card, pokemon)

        listContainer.appendChild(card)          
    }

    // function that prints the pokemonlist2
    function printList(pokemonList){
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

            modal.showModal("Pokemon Detail", detailsContainer)
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
                    pokemon.moves = response.moves.map(move => move.move.name)
                    printCard(pokemon)
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
                spinner.classList.add('hidden')
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
            return "Ups, this is not a pokemon"
        }

    }

    return {
        loadList: loadList,
        nextPage: nextPage,
        previousPage: previousPage,
        getPokemonList2: getPokemonList2,
        addDynamicList: addDynamicList,
        printList: printList,
        printCard: printCard,
        renderDynamicCount: renderDynamicCount,
    }
})()