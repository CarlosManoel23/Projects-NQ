let blurConteiner, modalConteiner, modalMsg, btnModalCancel, btnModalOk 

export const injetarModal = () => {
    const estiloModal = `
        <style id="modal-style"> 
            .blur-conteiner {
                position: fixed;
                inset: 0;
                background-color: rgba(194, 196, 195, 0.5);  
                backdrop-filter: blur(3px); 
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 20;
                margin: 0;
                padding: 0;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }
            .modal-conteiner {
                width: 20rem;
                height: 10rem;
                display: none;
                flex-direction: column;
                padding: 3rem 1rem 1rem 20px;
                justify-content: space-between;
                background: white;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 25;
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%); 
            }
            .blur-conteiner.show {
                display: flex;
            }
            .blur-conteiner.hide {
                display: none;
            }
            .modal-conteiner.show {
                display: flex;
                animation: cair 0.5s ease-out forwards;
            }
            .modal-conteiner.hide {
                display: flex;
                animation: subir 0.5s ease-out forwards;
            }
            @keyframes cair {
                from {
                    top: -100px; 
                    opacity: 0;
                }
                to {
                    top: 20px;
                    opacity: 1;
                }
            }
            @keyframes subir {
                from {
                    top: 20px; 
                    opacity: 1;
                }
                to {
                    top: -100px;
                    opacity: 0;
                }
            }
            .modal-msg {
                color: #2C3E50;
                font-size: 16px;
            }
            .buttons-conteiner {
                width: 100%;
                padding-top: 15px;
                border-top: 2px solid rgba(180, 37, 21, 0.5);
                display: flex;
                justify-content: right;
                gap: 1rem;
            }
            .modal-button {
                border: none;
                padding: 0.5rem 1rem;
                font-weight: bolder;
                border: none;
                border-radius: 15px;
                cursor: pointer;
                transition: background-color 0.3s ease, transform 0.2s ease;
            }
            #btn-modal-cancel {
                background-color: white;
                color: #b42515;
                border: 2px solid #b42515
            }
            #btn-modal-ok {
                background-color: #b42515;
                border: 2px double white;
                box-shadow: 0 0 0 2px #b42515;
                color: white;
            } `

    const modalHTML = `
        <div class="blur-conteiner">
            <div class="modal-conteiner">
                <p class="modal-msg">digite a mensagem</p>
                <div class="buttons-conteiner">
                    <button class="modal-button" id="btn-modal-cancel">Cancelar</button>
                    <button class="modal-button" id="btn-modal-ok">Ok</button>
                </div>
            </div>
        </div> `
    
    // Insere no final do head
    document.head.insertAdjacentHTML('beforeend', estiloModal)
    // Insere no início do body
    document.body.insertAdjacentHTML('afterbegin', modalHTML)

    blurConteiner = document.querySelector('.blur-conteiner')
    modalConteiner = document.querySelector('.modal-conteiner')
    modalMsg = document.querySelector('.modal-msg')
    btnModalCancel = document.querySelector('#btn-modal-cancel')
    btnModalOk = document.querySelector('#btn-modal-ok')

}
export const showModal = (msg) => {
    modalMsg.innerHTML = msg

    modalConteiner.classList.remove('hide')
    modalConteiner.classList.add('show')

    
    blurConteiner.classList.remove('hide');
    blurConteiner.classList.add('show');
    
}
export const confirmarAcao = (msg) => {
    return new Promise((resolve) => {
        showModal(msg)

        const handleOk = () => {
            closeModal()
            btnModalOk.removeEventListener('click', handleOk);
            resolve(true)
        };

        const handleCancel = () => {
            closeModal()
            btnModalCancel.removeEventListener('click', handleCancel);
            resolve(false)
        };

        btnModalOk.addEventListener('click', handleOk);
        btnModalCancel.addEventListener('click', handleCancel);
    })
}
export const closeModal = () => {
    if(blurConteiner.classList.contains('show')) {
        blurConteiner.classList.add('hide')
    }
    if(modalConteiner.classList.contains('show')) {
        modalConteiner.classList.add('hide')
    }
}