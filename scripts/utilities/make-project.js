import { LogicInputs } from "/scripts/utilities/inputs.js"
import { excluirProjeto, atualizarProjeto } from "/scripts/storage/crud.js"
import { showToast } from '/scripts/utilities/toast.js'
import { confirmarAcao } from "/scripts/utilities/modal-comfirm.js";
import { Services } from "/scripts/utilities/services.js";
import { ComponenteUI } from "/scripts/utilities/componentsUI.js";

export class CriarProjeto extends ComponenteUI {
    constructor(name, budget, category, id = null, services = null) {
        super(id || `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`);
        this.name = name !== undefined ? name : name;
        this.budget = budget !== undefined ? budget : budget;
        this.category = category !== undefined ? category : category;
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
    templateModal() {
        return `
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
                    <div class="conteiner-services">
                        <p class="status-service">Nenhum serviço adicionado</p>
                    </div>
                </div>
                <div class="conteiner-buttons">
                    <button class="buttons" id="btn-cancel">Cancelar</button>
                    <button class="buttons" id="btn-save">Salvar</button>
                </div>
                <div class="painel-service">
                    <h3>Criar Serviço</h3>
                    <input class="inputs-services" id="name-service" type="text" placeholder="Nome do Serviço">
                    <input class="inputs-services" id="coast-service" type="text" placeholder="Custo do Serviço">
                    <div class="buttons-conteiner-service">
                        <button class="buttons-service" id="btn-cancel-service">Cancelar</button>
                        <button class="buttons-service" id="btn-create-service">Criar</button>
                    </div>
                </div>    
            </div>`
    }
    editarProjeto() {
        const overlay = document.createElement('div');
        overlay.classList.add('modal-overlay');
        overlay.innerHTML = this.templateModal();
        document.body.appendChild(overlay);

        let rascunhoServicos = [...this.services];

        const conteinerServices = overlay.querySelector('.conteiner-services')
        const statusService = overlay.querySelector('.status-service')

        // Renderiza todos os serviços salvos
        const renderizarServicos = () => {
            conteinerServices.querySelectorAll('.card-service').forEach(el => el.remove());
            
            if (rascunhoServicos.length === 0) {
                statusService.style.display = 'flex';
            } else {
                statusService.style.display = 'none';
                rascunhoServicos.forEach(s => {
                    // Passamos o callback que remove do rascunho e re-renderiza
                    const sv = new Services(s.name, s.coast, s.id, (idParaRemover) => {
                        rascunhoServicos = rascunhoServicos.filter(item => item.id !== idParaRemover);
                        renderizarServicos(); 
                    });
                    conteinerServices.appendChild(sv.dom);
                });
            }
        }
        renderizarServicos()

        // logica dos services
        overlay.querySelector('.btn-services').addEventListener('click', () => {

            const validacaoService = new LogicInputs('#name-service', '#coast-service')
            const painelService = overlay.querySelector(".painel-service")
            const nameService = painelService.querySelector('#name-service')
            const coastService = painelService.querySelector('#coast-service')
            
            // Abrir painel de serviços
            painelService.classList.remove('hide')
            painelService.classList.add('show')

            // Cancelar a criação de serviço
            const btnServiceCancel = painelService.querySelector('#btn-cancel-service')
            btnServiceCancel.addEventListener('click', () => {
                painelService.classList.remove('show')
                painelService.classList.add('hide')
                nameService.innerHTML = ''
                coastService.innerHTML = ''
            })
            // criação do serviço
            const btnServiceCriar = painelService.querySelector('#btn-create-service')
            btnServiceCriar.addEventListener('click', () => {
                const nameOk = !validacaoService.isBlank('name') && validacaoService.isValideName()
                const coastOk = !validacaoService.isBlank('budget') && validacaoService.isValidBudget()

                if (nameOk && coastOk) {
                    const dadosServico = {
                        name: nameService.value,
                        coast: coastService.value,
                        id: `service-${Date.now()}`
                    }

                    // Adicione os dados ao array da classe
                    rascunhoServicos.push(dadosServico)
                    renderizarServicos()
                }                     
            })   
        })
        const validacaoModal = new LogicInputs('#edit-name', '#edit-budget', '.conteiner-select')

        // Salvar alterações
        overlay.querySelector('#btn-save').addEventListener('click', async () => {
            if (this.inputValidação(validacaoModal)) {

                this.services = rascunhoServicos
                
                this.setPropriedades(overlay)
                
                const salvo = await this.salvarEdição()
                
                if (salvo) {
                    showToast("Projeto editado com sucesso!", "sucesso")
                    overlay.remove()
                } else {
                    showToast("Erro ao salvar as alterações.", "erro")
                }
            }
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
    async salvarEdição() {
        try {
            // salvar no BD (atualizarProjeto no crud.js é síncrono, mas o async o envolve)
            const sucesso = atualizarProjeto(this.id, {
                name: this.name, 
                budget: this.budget, 
                category: this.category, 
                services: this.services
            });
                    
            if (sucesso) {
                // Atualizando o dom apenas após confirmar o sucesso no banco
                this.getElement('h3').textContent = this.name;
                this.getElement('.bud').textContent = `Orçamento: ${this.budget}`;
                this.getElement('.categ').textContent = `Categoria: ${this.category}`;
                return true;
            }
            return false
        } catch (error) {
            console.error("Erro ao salvar projeto:", error)
            return false
        }
    }
    // novo valores para as propriedades    
    setPropriedades(campo) {
        this.name = campo.querySelector('#edit-name').value
        this.budget = campo.querySelector('#edit-budget').value
        this.category = campo.querySelector('.triggerSpan').textContent
    }
    // validação do inputs do modal    
    inputValidação(validacaoModal) {
        const nameOk = !validacaoModal.isBlank('name') && validacaoModal.isValideName()
        const budgetOk = !validacaoModal.isBlank('budget') && validacaoModal.isValidBudget()
        const categoryOk = validacaoModal.isCategorySelected()

        if (nameOk && budgetOk && categoryOk) return true
        
    }
}