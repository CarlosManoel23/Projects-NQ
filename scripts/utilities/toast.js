let toast, btnExit, msgText, icon;

// Injeta o componente toast
export const injetarToast = () => {
    const estiloToast = `
        <style id="Toast-style">
            .conteiner-toast {
                position: fixed;
                right: 2rem;
                bottom: 4rem;
                width: 30%;
                height: 5rem;
                display: none;
                align-items: center;
                justify-content: flex-start;
                padding: 0.5rem;
                border-radius: 10px;
                gap: 2rem;
                background: white;
                border-left: 8px solid #b42515; 
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 30;
            }
            .conteiner-toast.show {
                display: flex;
                animation: slideIn 0.5s ease forwards;
            }

            .conteiner-toast.hide {
                animation: slideOut 0.5s ease forwards;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%); 
                    opacity: 0;
                }
                to {
                    transform: translateX(0); 
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }    
            #situation {
                color: #b42515;
                font-size: 3rem;
            }
            .msg {
                font-size: 16px;
                color: #2C3E50;
                font-weight: bolder;
            }
            .btn-exit {
                position: absolute;
                border: none;
                background: transparent;
                top: 10px;
                right: 5px;
                color: #2C3E50;
            }
        </style>
    `
    const toastHTML = `
        <div class="conteiner-toast">
            <i id="situation" class="fa-regular fa-circle-xmark"></i>
            <p class="msg">ta tudo errado!</p>
            <button class="btn-exit"><i class="fa-solid fa-x"></i></button>
        </div>
    `
    // Insere no final do head
    document.head.insertAdjacentHTML('beforeend', estiloToast)
    // Insere no início do main
    const main = document.querySelector('main');
        if (main) {
            main.insertAdjacentHTML('afterbegin', toastHTML);
        } else {
            document.body.insertAdjacentHTML('afterbegin', toastHTML);
        }

    toast = document.querySelector('.conteiner-toast')
    btnExit = document.querySelector('.btn-exit')
    msgText = document.querySelector('.msg')
    icon = document.querySelector('#situation')    

    if (btnExit) {
        btnExit.addEventListener('click', closeToast)
    }        
}
// Mostra o toast na tela do usuário
export const showToast = (mensagem, tipo) => {
    if (!msgText) msgText = document.querySelector('.msg')
    if (!toast) toast = document.querySelector('.conteiner-toast')

    msgText.innerText = mensagem
    toast.classList.remove('hide')
    toast.classList.add('show')

    if (tipo === 'sucesso') {
        toast.style.borderColor = '#27ae60'
        icon.className = 'fa-regular fa-circle-check'
        icon.style.color = '#27ae60'
    } else {
        toast.style.borderColor = '#b42515' 
        icon.className = 'fa-regular fa-circle-xmark'
        icon.style.color = '#b42515'
    }

    setTimeout(() => {
        closeToast()
    }, 4000)
}
// Fecha o toast na tela do usuário
export const closeToast = () => {
    if (toast.classList.contains('show')) {
        toast.classList.add('hide')
        setTimeout(() => {
            toast.classList.remove('show')
        }, 500);
    }
}