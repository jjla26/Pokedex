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

    // Chosing Dynamic or Static App
    const pokemonContainer = document.querySelector('.pokemon')
    const appOptions = pokemonContainer.querySelector('.pokemon__option')
    const actionList = document.querySelectorAll('.action__item')
    const appSelectionButtons = appOptions.querySelectorAll('button')
    // Action for Static App button
    appOptions.lastElementChild.onclick = () => {
        const pokemonList = staticPokemonRepository.getAll()
        pokemonList.forEach(pokemon => staticPokemonRepository.print(pokemon))
        pokemonContainer.querySelector('h2').innerText = "Your Pokemons"
        listContainer.classList.remove('hidden')
        actionList[0].classList.remove('hidden')
        actionList[1].classList.remove('hidden')
        appSelectionButtons.forEach(element => element.classList.add('hidden'))
    }

    //Action for Dynamic App button
    const dynamicListContainer = document.querySelector('.pokemon__dynamic-list')
    appOptions.firstElementChild.onclick = async () => {
        dynamicPokemonRepository
            .loadList()
            .then(() => {
                const pokemonList2 = dynamicPokemonRepository.getPokemonList2()
                dynamicPokemonRepository.printList(pokemonList2)
            })
        pokemonContainer.querySelector('h2').innerText = "Your Pokemons"
        dynamicListContainer.classList.remove('hidden')
        appSelectionButtons.forEach(element => element.classList.add('hidden'))
    }

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
            const sended = staticPokemonRepository.add({name, img, height, weight, types, abilities})
            if(sended){
                staticPokemonRepository.print(sended)
                modal.classList.add('hidden')
                pokemonForm.classList.add('hidden')
            }
        }else{
            const pokemonEdited = staticPokemonRepository.edit(id,{name, img, height, weight, types, abilities})
            if(pokemonEdited){
                const oldPokemon = pokemonEdited.oldPokemon
                const newPokemon = pokemonEdited.newPokemon
                staticPokemonRepository.print(newPokemon)
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


    // Pagination next listener
    let page = 0
    let offset = 5
    const nextPageButton = document.querySelector('.pokemon__next-button')
    nextPageButton.onclick = () => {
        page += 1
        document.querySelectorAll('.pokemon__item').forEach(element => {
            element.classList.add('hidden')
        })
        const nextPage = dynamicPokemonRepository.nextPage()
        if(nextPage){
            dynamicPokemonRepository
            .loadList(nextPage)
            .then(() => {
                const pokemonList2 = dynamicPokemonRepository.getPokemonList2()
                dynamicPokemonRepository.printList(pokemonList2)
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
        dynamicPokemonRepository.previousPage()
    }

    restoreButton.onclick = () => {
        staticPokemonRepository.restoreList()
        restoreButton.classList.add('hidden')
        filterPokemonButton.classList.remove('hidden')

    }

    filterPokemonForm.onsubmit = e => {
        e.preventDefault()
        const name = document.getElementById('name__filter').value
        staticPokemonRepository.filterByName(name)
        filterPokemonButton.classList.add('hidden')
        restoreButton.classList.remove('hidden')
        modal.classList.add('hidden')
        filterPokemonForm.classList.add('hidden')
    }
}

