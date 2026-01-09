import { carrgarLoader } from '/scripts/utilities/loader.js'
import { injetarComponents } from '/scripts/utilities/integrate.js'
import { injetarToast } from './utilities/toast.js'
import { lerProjetos, limparTodosProjetos } from '/scripts/storage/crud.js'
import { CriarProjeto } from './utilities/make-project.js'
import { injetarModal } from './utilities/modal-comfirm.js'

carrgarLoader()
injetarComponents()
injetarToast()
injetarModal()

const adicionarCard = () => {
  const conteinerCards = document.querySelector('.conteiner-cards')
  let listProjects = lerProjetos() // Pega os dados brutos (JSON)
  listProjects.forEach(item => {
    const projeto = new CriarProjeto(item.name, item.budget, item.category, item.id)
    conteinerCards.appendChild(projeto.dom)
  })
}
adicionarCard()

