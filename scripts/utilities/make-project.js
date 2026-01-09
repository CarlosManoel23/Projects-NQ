import { LogicInputs } from "/scripts/utilities/inputs.js"
import { excluirProjeto, atualizarProjeto } from "/scripts/storage/crud.js"
import { showToast } from '/scripts/utilities/toast.js'
import { confirmarAcao } from "/scripts/utilities/modal-comfirm.js";

export class CriarProjeto {
    constructor(name, budget, category, id = null, services = null) {
        this.name = name !== undefined ? name : name;
        this.budget = budget !== undefined ? budget : budget;
        this.category = category !== undefined ? category : category;
        this.id = id || `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`
        this.services = services || []
        this.dom = this.criarElemento()
    }
    criarElemento() {
        // Criando o card no dom
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
                    <p class="bud">Orçamento: ${this.budget}</p>
                    <p class="categ">Categoria: ${this.category}</p>
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
        // Criando layout de edição
        const overlay = document.createElement('div')
        overlay.classList.add('modal-overlay')
        overlay.innerHTML = `
            <div class="modal-content">
                <div class="top-edit">
                    <h2>Editar Projeto: <span>${this.name}</span></h2>
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
                                <span class="triggerSpan">${this.category}</span>
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
        const validacaoModal = new LogicInputs('#edit-name', '#edit-budget', '.conteiner-select');

        // Salvar alterações
        overlay.querySelector('#btn-save').addEventListener('click', () => {
            // validações
            const nameOk = !validacaoModal.isBlank('name') && validacaoModal.isValideName()
            const budgetOk = !validacaoModal.isBlank('budget') && validacaoModal.isValidBudget()
            const categoryOk = validacaoModal.isCategorySelected()

            // Salvando as alterações
            if (nameOk && budgetOk && categoryOk) {
                this.name = overlay.querySelector('#edit-name').value
                this.budget = overlay.querySelector('#edit-budget').value
                this.category = overlay.querySelector('.triggerSpan').textContent
                
                this.salvarEdição()
                
                showToast("Projeto editado com sucesso!", "sucesso");
            } else {
                  showToast("Ops! Verifique os campos.", "erro");
            }         
            overlay.remove()
        })
        // Apagar projeto
        overlay.querySelector('.btn-erase').addEventListener('click', async () => {

            const confirmado = await confirmarAcao("Realmente deseja excluir este projeto?")

            if (confirmado) {
                excluirProjeto(this.id)
                this.dom.remove()
                overlay.remove()
            }    
        })
        // Cancelar edição    
        overlay.querySelector('#btn-cancel').addEventListener('click', () => overlay.remove());
    }
    salvarEdição() {
        // salvar no BD
        atualizarProjeto(this.id, {name: this.name, budget: this.budget, category: this.category})
                
        // Atualizando o dom
        this.dom.querySelector('h3').textContent = this.name
        this.dom.querySelector('.bud').textContent = `Orçamento: ${this.budget}`
        this.dom.querySelector('.categ').textContent = `Categoria: ${this.category}`
    }    
    
}