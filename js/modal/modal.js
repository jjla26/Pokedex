const customModal = (function(){

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
        let modalEl = document.getElementById('modal')
        modalEl = bootstrap.Modal.getInstance(modalEl)
        modalEl.hide()
    }

    return {
        showModal: showModal,
        hideModal: hideModal,
    }

})()