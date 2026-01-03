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

// instancia da classe
const logicInputs = new LogicInputs('#name-project', '#budget-project', '.conteiner-select')

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
                  showToast("Projeto criado com sucesso!", "sucesso");
                  const name = document.querySelector('#name-project')
                  const budget = document.querySelector('#budget-project')
                  const category = document.querySelector('#triggerSpan')
                  //BD.push(new CriarProjeto(name, budget, category))
                  setTimeout(() => {
                        location.href = "/Routes/pages/history-projects.html" 
                  }, 1000);
            } else {
                  showToast("Ops! Verifique os campos.", "erro");
            }   
      })
}

// Criação de projetos
class CriarProjeto {
      constructor(name, budget, category) {
            this.name = name.value
            this.budget = budget.value
            this.category = category.textContent
            this.id = `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            this.dom = this.criarElemento()
      }
      criarElemento() {
            const card = document.createElement('div')
            card.id = this.id
            card.classList.add('card-project')
            card.innerHTML = `
                  <div class="card">      
                        <div class="header-card">
                              <h3>${this.name}</h3>
                              <button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                        </div>      
                        <div class="content-card">
                              <p>Orçamento: R$ ${this.budget.toFixed(2)}</p>
                              <p>Categoria: ${this.category}</p>
                              <button class="btn-dowload"><i class="fa-solid fa-download"></i></button>
                        </div>
                  </div>           
            `
            const btnEdit = card.querySelector('.btn-edit')
            btnEdit.addEventListener('click', (evt)=>{
                  this.editarProjeto()
            })
            
            return card
      }
      editarProjeto() {
            const overlay = document.createElement('div')
            overlay.classList.add('modal-overlay')
            overlay.innerHTML = `
                  <div class="modal-content">
                        <div class="top-edit">
                              <h2>Editar Projeto -> ${this.name}</h2>
                              <button class="btn-erase"><i class="fa-solid fa-trash"></i></button>
                        </div>
                        <div class="Info-project">
                              <h3>Informações</h3>
                              <div class="input-group">
                                    <label for="edit-name">Nome</label>
                                    <input type="text" class="inputs-digits" id="edit-name" value="${this.name}">
                              </div>
                              <div class="input-group">
                                    <label for="edit-budget">Orçamento</label>
                                    <input type="text" class="inputs-digits" id="edit-budget" value="${this.budget}">
                              </div>
                              <div class="conteiner-select">
                                    <div class="input-group">
                                          <label for="trigger">Categoria</label>
                                          <div class="inputs-digits" id="trigger">
                                                <span>Selecione uma opção</span>
                                          </div>
                                    </div>
                                    <div class="conteiner-options">
                                          <div class="option">Infra</div>
                                          <div class="option">Design</div>
                                          <div class="option">Desenvolvimento</div>
                                          <div class="option">Planejamento</div>
                                    </div>
                              </div>
                        </div>
                        <div class="info-services">
                              <div class="top-services">
                                    <h3>Serviços</h3>
                                    <button class="btn-services"><i class="fa-solid fa-plus"></i></button>
                              </div>
                                    <p>Nenhum serviço adicionado</p>
                        </div>
                        <div class="conteiner-buttons">
                              <button class="buttons" id="btn-cancel">Cancelar</button>
                              <button class="buttons" id="btn-save">Salvar</button>
                        </div>
                  </div>
                  `
            document.body.appendChild(overlay)

            overlay.querySelector('#save').addEventListener('click', () => {
                  // 1. Atualiza os dados no Objeto (Lógica)
                  this.name = overlay.querySelector('#edit-name').value;
                  this.budget = parseFloat(overlay.querySelector('#edit-budget').value);

                  // 2. Atualiza o que o usuário vê (Interface)
                  this.atualizarInterface();
                  
                  overlay.remove();
            });

            overlay.querySelector('#cancel').addEventListener('click', () => overlay.remove());
      }

      atualizarInterface() {
            // Buscamos os elementos dentro do próprio this.dom do objeto
            const h3 = this.dom.querySelector('.display-name');
            const spanBudget = this.dom.querySelector('.display-budget');

            h3.textContent = this.name;
            spanBudget.textContent = this.budget.toFixed(2);
      }
}

      






