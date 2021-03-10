const modal = (function(){

    // function to show the modal
    function showModal(title, content){
        const modal = document.querySelector('.modal')
        const modalBody = document.querySelector('.modal__body')
        const modalTitle = document.querySelector('.modal__title')
        modal.classList.remove('hidden')
        modalTitle.innerHTML = ''
        modalBody.innerHTML = ''
        modalTitle.innerHTML = title
        modalBody.appendChild(content)
    }

    // function to hide the modal
    function hideModal(){
        const modal = document.querySelector('.modal')
        modal.classList.add('hidden')
    }

    // close button listener
    document.querySelector('.modal__close').addEventListener('click', hideModal)

    // click outside the modal window close the modal
    document.querySelector('.modal__close').addEventListener('click', e => {
        let target = e.target
        if (target === modal) hideModal()
    })

    // esc key listener to close modal
    window.addEventListener('keydown', e => {
        const modal = document.querySelector('.modal')
        if(e.key === "Escape") hideModal()
    })

    return {
        showModal: showModal,
        hideModal: hideModal,
    }

})()