import { excluirServico } from "/scripts/storage/crud.js"


export class Services {
    constructor(name, coast, id, idProjeto) {
        this.name = name
        this.coast = coast
        this.id = id || `service-${Date.now()}`
        this.idProjeto = idProjeto
        this.dom = this.criarServico()
    }
    criarServico() {
        const cardService = document.createElement('div')
        cardService.id = this.id
        cardService.classList.add('card-service')
        cardService.innerHTML = `
                <div class="conteiner-name">
                    <p class="p-name">${this.name}</p>
                </div>
                <div class="conteiner-coast">
                    <p class="p-coast">${this.coast}</p>
                </div>
                <button class="btn-erase-service"><i class="fa-solid fa-x"></i></button>`
        
        const btnEraseService = cardService.querySelector('.btn-erase-service')
        btnEraseService.addEventListener('click', () => {
            this.apagarServico()    
        })
        
        return cardService
    }
    apagarServico() {
        excluirServico(this.idProjeto, this.id)
        this.dom.remove()
    }
}