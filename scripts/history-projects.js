import { carrgarLoader } from '/scripts/utilities/loader.js'
import { incluirComponente } from '/scripts/utilities/integrate.js'
import { inicializarSideBar } from '/scripts/components/side-bar.js'
import { injetarToast, showToast } from './utilities/toast.js'
import { LogicInputs } from '/scripts/utilities/inputs.js'

carrgarLoader()
incluirComponente('.header-placeholder', '/Routes/components/header.html')
incluirComponente('.footer-placeholder', '/Routes/components/footer.html')
incluirComponente('.side-bar-placeholder','/Routes/components/side-bar.html')
  .then(() => {
        // chama a função da sidebar
        inicializarSideBar()
  });
injetarToast()

const logicInputs = new LogicInputs('#edit-name', '#edit-budget', '.conteiner-select')


