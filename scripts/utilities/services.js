import { ComponenteUI } from "/scripts/utilities/componentsUI.js";

export class Services extends ComponenteUI {
    constructor(name, coast, id, onRenderizar) {
        super(id || `service-${Date.now()}`)
        this.name = name
        this.coast = coast
        this.onRenderizar = onRenderizar
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
        
        const btnEraseService = cardService.querySelector('.btn-erase-service');
        
        // 2. Quando clicar, chamamos a função que o Pai enviou
        btnEraseService.addEventListener('click', () => {
            if (this.onRenderizar) {
                this.onRenderizar(this.id); // Passamos o ID de volta para o Pai
            }
        });
        
        return cardService;
    }
}