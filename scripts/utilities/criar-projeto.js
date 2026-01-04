import { LogicInputs } from "/scripts/utilities/inputs.js";

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
                    <p>Orçamento: ${this.budget}</p>
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
                                <span>${this.category}</span>
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

        overlay.querySelector('#btn-save').addEventListener('click', () => {
            // 1. Atualiza os dados no Objeto (Lógica)
            this.name = overlay.querySelector('#edit-name').value;
            this.budget = parseFloat(overlay.querySelector('#edit-budget').value);

                  
            overlay.remove();
        });

        overlay.querySelector('#btn-cancel').addEventListener('click', () => overlay.remove());
    }
}