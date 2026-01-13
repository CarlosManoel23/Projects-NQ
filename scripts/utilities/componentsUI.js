export class ComponenteUI {
    constructor(id) {
        this.id = id;
        this.dom = null;
    }

    // Método comum para remover do HTML
    removerDoDOM() {
        if (this.dom) this.dom.remove();
    }

    // Método para buscar elementos dentro do componente
    getElement(seletor) {
        return this.dom.querySelector(seletor);
    }
}