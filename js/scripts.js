(function(){

    // Building the static pokemon app when click in static App

    document.querySelector('.content__option').lastElementChild.addEventListener('click', () => {
        const pokemonContainer = document.querySelector('.content')
        const listContainer = document.querySelector('.pokemon__list')
        // const sidebarActions = document.querySelectorAll('.sidebar__item')
        const headerActions = document.querySelector('.content__header-actions')
        const appOptions = pokemonContainer.querySelector('.content__option')
        const appSelectionButtons = appOptions.querySelectorAll('button')
        const pokemonList = staticPokemonRepository.getAll()

        pokemonList.forEach(pokemon => staticPokemonRepository.print(pokemon))
        staticPokemonRepository.renderStaticCount()
        listContainer.classList.remove('hidden')
        // sidebarActions[0].classList.remove('hidden')
        // sidebarActions[1].classList.remove('hidden')
        document.querySelector('#addPokemon').classList.remove('hidden')
        document.querySelector('.header__filter').classList.remove('hidden')
        pokemonContainer.querySelector('h2').innerText = "Your Pokemons"

        const addButton = document.createElement('button')
        addButton.classList.add('add-btn', 'action__button')
        addButton.innerText = "+"
        headerActions.appendChild(addButton)

        addButton.addEventListener('click', staticPokemonRepository.addButtonAction)

        const filterButton = document.createElement('button')
        filterButton.classList.add('add-btn', 'action__button')
        const filterImage = document.createElement('img')
        filterImage.src = './img/filter.svg'
        filterButton.appendChild(filterImage)
        headerActions.appendChild(filterButton)

        filterButton.addEventListener('click', staticPokemonRepository.filterButtonAction)

        const restoreButton = document.createElement('button')
        restoreButton.classList.add('add-btn', 'action__button', 'hidden')
        const restoreImage = document.createElement('img')
        restoreImage.src = './img/restore.svg'
        restoreButton.appendChild(restoreImage)
        headerActions.appendChild(restoreButton)

        restoreButton.addEventListener('click', staticPokemonRepository.restoreButtonAction)

        appSelectionButtons.forEach(element => element.classList.add('hidden'))
    })


    // Event listener to build the dynamic pokemon app

    document.querySelector('.content__option').firstElementChild.addEventListener('click', () => {
        const dynamicListContainer = document.querySelector('.pokemon__dynamic-list')
        const pokemonContainer = document.querySelector('.content')
        const appOptions = pokemonContainer.querySelector('.content__option')
        const appSelectionButtons = appOptions.querySelectorAll('button')
        dynamicPokemonRepository
            .loadList()
            .then(() => {
                const pokemonList = dynamicPokemonRepository.getPokemonList2()
                dynamicPokemonRepository.printList(pokemonList)
                dynamicPokemonRepository.renderDynamicCount()
            })
        pokemonContainer.querySelector('h2').innerText = "Your Pokemons"
        dynamicListContainer.classList.remove('hidden')
        appSelectionButtons.forEach(element => element.classList.add('hidden'))
    })
    
})()