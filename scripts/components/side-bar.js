export function inicializarSideBar() {
    const sideBar = document.querySelector('.side-bar');
    const btnExit = document.querySelector('.btn-exit');
    const overlay = document.querySelector('.overlay');
    const btnMenu = document.querySelector('.btn-menu');

    if (btnExit) btnExit.addEventListener('click', () => {
        sideBar.classList.remove('ativa');
        overlay.classList.remove('ativa');
    });
    if (overlay) overlay.addEventListener('click', () => {
        console.log("O clique no overlay funcionou!");
        sideBar.classList.remove('ativa');
        overlay.classList.remove('ativa');
    });
    if (btnMenu) btnMenu.addEventListener('click', () => {
        sideBar.classList.add('ativa');
        overlay.classList.add('ativa');
    });
}

