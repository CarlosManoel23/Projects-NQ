import { carrgarLoader } from '/scripts/utilities/loader.js'
import { incluirComponente } from '/scripts/utilities/integrate.js'
import { inicializarSideBar } from '/scripts/components/side-bar.js'

carrgarLoader()
incluirComponente('.header-placeholder', '/Routes/components/header.html')
incluirComponente('.footer-placeholder', '/Routes/components/footer.html')
incluirComponente('.side-bar-placeholder','/Routes/components/side-bar.html')
  .then(() => {
        // chama a função da sidebar
        inicializarSideBar()
  });