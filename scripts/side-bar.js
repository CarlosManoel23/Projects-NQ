const bodyBackground = document.querySelector('body')
const sideBar = document.querySelector('.side-bar')
const btnMenu =  document.querySelector('.btn-menu')
const btnExit = document.querySelector('.btn-exit')
const overlay = document.querySelector('.overlay')

// Abrir side bar
btnMenu.addEventListener('click', (event) => {
    sideBar.classList.add('ativa')
    overlay.classList.add('ativa') // borrar fundo
})

// Fechar side bar
const fecharMenu = () => {
    sideBar.classList.remove('ativa');
    overlay.classList.remove('ativa'); // Remove o borrão
};

btnExit.addEventListener('click', fecharMenu);
overlay.addEventListener('click', fecharMenu);


