import { carrgarLoader } from '/scripts/utilities/loader.js';
import { inicializarSideBar } from '/scripts/components/side-bar.js';

carrgarLoader()

// Integra os componentes html á pagina atual
async function incluirComponente(classElemento, caminhoArquivo) {
    const response = await fetch(caminhoArquivo)
    const html = await response.text()
    document.querySelector(classElemento).innerHTML = html
}

incluirComponente('.header-placeholder', '/Routes/components/header.html')
incluirComponente('.footer-placeholder', '/Routes/components/footer.html')
incluirComponente('.side-bar-placeholder','/Routes/components/side-bar.html')
  .then(() => {
        // chama a função da sidebar
        inicializarSideBar()
  });