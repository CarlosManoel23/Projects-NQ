import { carrgarLoader } from '/scripts/utilities/loader.js'
import { incluirComponente } from '/scripts/utilities/integrate.js'
import { inicializarSideBar } from '/scripts/components/side-bar.js'
import { injetarToast } from './utilities/toast.js'
import { lerProjetos, limparTodosProjetos } from '/scripts/storage/crud.js'
import { CriarProjeto } from './utilities/make-project.js'

carrgarLoader()
incluirComponente('.header-placeholder', '/Routes/components/header.html')
incluirComponente('.footer-placeholder', '/Routes/components/footer.html')
incluirComponente('.side-bar-placeholder','/Routes/components/side-bar.html')
  .then(() => {
        // chama a função da sidebar
        inicializarSideBar()
  });
injetarToast()

const adicionarCard = () => {
  const conteinerCards = document.querySelector('.conteiner-cards')
  let listProjects = lerProjetos() // Pega os dados brutos (JSON)
  listProjects.forEach(item => {
    const projeto = new CriarProjeto(item.name, item.budget, item.category, item.id)
    conteinerCards.appendChild(projeto.dom)
  })
}
adicionarCard()

