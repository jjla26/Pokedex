const modal = (function(){

    // function to show the modal
    function showModal(title, content){
        const modalBody = document.querySelector('.modal-body')
        const modalTitle = document.querySelector('.modal-title')
        modalTitle.innerHTML = ''
        modalBody.innerHTML = ''
        modalTitle.innerHTML = title
        modalBody.appendChild(content)
    }

    // function to hide the modal
    function hideModal(){
        // const modal = document.querySelector('.modal')
        // modal.classList.add('hidden')
    }

    // close button listener
    // document.querySelector('.modal__close').addEventListener('click', hideModal)

    // click outside the modal window close the modal
    // document.querySelector('.modal').addEventListener('click', e => {
    //     const modal = document.querySelector('.modal')
    //     let target = e.target
    //     if (target === modal) hideModal()
    // })

    // esc key listener to close modal
    // window.addEventListener('keydown', e => {
    //     if(e.key === "Escape") hideModal()
    // })



    return {
        showModal: showModal,
        hideModal: hideModal,
    }

})()