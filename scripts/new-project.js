import { carrgarLoader } from '/scripts/utilities/loader.js'
import { incluirComponente } from '/scripts/utilities/integrate.js'
import { inicializarSideBar } from '/scripts/components/side-bar.js'
import { injetarToast, showToast } from './utilities/toast.js'
import { LogicInputs } from '/scripts/utilities/inputs.js'
import { salvarProjeto } from '/scripts/storage/crud.js'

carrgarLoader()
incluirComponente('.header-placeholder', '/Routes/components/header.html')
incluirComponente('.footer-placeholder', '/Routes/components/footer.html')
incluirComponente('.side-bar-placeholder','/Routes/components/side-bar.html')
  .then(() => {
        // chama a função da sidebar
        inicializarSideBar()
  });
injetarToast()  

// instancia da classe
const logicInputs = new LogicInputs('#name-project', '#budget-project', '.conteiner-select')

// dados
const name = document.querySelector('#name-project')
const budget = document.querySelector('#budget-project')
const category = document.querySelector('#triggerSpan')

// Botão de envio
const btnSubmit = document.querySelector('.btn-submit')

// Valida e envia as informações dos inputs
if (btnSubmit) {
      btnSubmit.addEventListener('click', (evt) => {
            evt.preventDefault()

            const nameOk = !logicInputs.isBlank('name') && logicInputs.isValideName()
            const budgetOk = !logicInputs.isBlank('budget') && logicInputs.isValidBudget()
            const categoryOk = logicInputs.isCategorySelected()

            if (nameOk && budgetOk && categoryOk) {
                  const novo = {name: name.value, budget: budget.value, category: category.textContent}
                  salvarProjeto(novo)

                  showToast("Projeto criado com sucesso!", "sucesso");
                  setTimeout(() => {
                        location.href = "/Routes/pages/history-projects.html" 
                  }, 1000);
            } else {
                  showToast("Ops! Verifique os campos.", "erro");
            }   
      })
}


      






