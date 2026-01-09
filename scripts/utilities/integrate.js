import { inicializarSideBar } from '/scripts/components/side-bar.js'
// Integra os componentes html á pagina atual
export async function incluirComponente(classElemento, caminhoArquivo) {
    const response = await fetch(caminhoArquivo)
    const html = await response.text()
    document.querySelector(classElemento).innerHTML = html
}
export async function injetarComponents() {
    // Carrega tudo em paralelo (mais rápido)
    await Promise.all([
        incluirComponente('.header-placeholder', '/Routes/components/header.html'),
        incluirComponente('.footer-placeholder', '/Routes/components/footer.html'),
        incluirComponente('.side-bar-placeholder', '/Routes/components/side-bar.html')
    ]);

    // Executa a lógica apenas quando TODOS os arquivos chegarem
    inicializarSideBar();
}