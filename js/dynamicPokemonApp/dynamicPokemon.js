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
                    staticPokemonRepository.print([pokemon])
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
        printList2: printList2,
        print: print,
    }
})()