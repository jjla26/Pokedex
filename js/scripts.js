(function(){

    // Building the static data pokemon app when click in static App

    document.querySelector('.content__option').lastElementChild.addEventListener('click', () => {
        const pokemonContainer = document.querySelector('.content')
        const listContainer = document.querySelector('.pokemon__list')
        const appOptions = pokemonContainer.querySelector('.content__option')
        const appSelectionButtons = appOptions.querySelectorAll('button')
        const pokemonList = staticPokemonRepository.getAll()

        pokemonList.forEach(pokemon => staticPokemonRepository.print(pokemon))
        staticPokemonRepository.renderStaticCount()
        listContainer.classList.remove('hidden')
        document.querySelector('#addPokemon').classList.remove('hidden')
        document.querySelector('.header__filter').classList.remove('hidden')
        pokemonContainer.querySelector('h2').innerText = "Your Pokemons"

        appSelectionButtons.forEach(element => element.classList.add('hidden'))
    })


    // Event listener to build the dynamic data pokemon app

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