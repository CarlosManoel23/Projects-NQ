export class LogicInputs {
    constructor(nameCSS, budgetCSS, selectCSS) {
        this.nameProject = document.querySelector(nameCSS)
        this.budget = document.querySelector(budgetCSS)
        this.selectContainer = document.querySelector(selectCSS)
        this.trigger = this.selectContainer.querySelector('#trigger')
        this.triggerSpan = this.trigger.querySelector('span')
        this.options = this.selectContainer.querySelectorAll('.option')

        this.initEvents()
    }
    initEvents() {
        this.nameProject.addEventListener('change', (evt) => {
            const valor = evt.target.value.trim()
            evt.target.value = valor
        })
        this.budget.addEventListener('input', (evt) => {

            const valor = evt.target.value.replace(/\D/g, "");

            if (!valor.startsWith('R$ ')) {
                const apenasNumeros = valor.replace('R$', '').trim();
                evt.target.value = 'R$ ' + apenasNumeros;
        }
        })
        // apagar o cifrão se não digitar nada
        this.budget.addEventListener('change', (evt) => {
            if (evt.target.value === "R$ ") {
                    evt.target.value = '' 
            }
        });
        this.trigger.addEventListener('click', (evt) => {
            evt.stopPropagation(); 
            this.selectContainer.classList.toggle('active')
        });

        // Lógica para selecionar uma opção
        this.options.forEach(option => {
            option.addEventListener('click', () => {
                this.triggerSpan.innerText = option.innerText
                this.triggerSpan.style.color = '#2C3E50'
                this.selectContainer.classList.remove('active')
            });
        });

        // Fecha o menu se clicar em qualquer lugar fora
        window.addEventListener('click', (evt) => {
            if (this.selectContainer.classList.contains('active')) {
                this.selectContainer.classList.remove('active')
            }
        });
    }
    // O input está vazio
    isBlank(tip) {
        let element
    
        // Escolhe qual elemento validar baseado no texto passado
        if (tip === 'name') element = this.nameProject
        if (tip === 'budget') element = this.budget

        const valor = element.value.trim()

        if (valor.trim().length == 0) {
                this.pointOutErro('Preencha esse espaço, por favor!', element)
                return true
        }
        return false
    }
    pointOutErro(msg, input) {
       const valorInput = msg
       input.value = valorInput
       input.classList.add('erro')

       input.addEventListener('click', (evt) => {
            input.classList.remove('erro')
            input.value = ''
       })
    }
    // O name tem menos de 3 caracteres?
    isValideName() {
        const valor = this.nameProject.value.trim()
        if (valor.length < 3) {
                this.pointOutErro('O nome precisa de 3 ou mais caracteres!', this.nameProject)
                return false
        }
        return true
    }

    // O o budget é maior que zero?
    isValidBudget() {
        const numeros = this.budget.value.replace(/\D/g, "")
        const valorNumerico = parseFloat(numeros);

        if (isNaN(valorNumerico) || valorNumerico <= 0) {
                this.pointOutErro('O valor não pode ser nulo ou negativo!', this.budget)
                return false
        }
        return true
    }

    // Selecionou alguma opção
    isCategorySelected() {
        if (this.triggerSpan.innerText === "Selecione uma opção") {
                this.pointOutErro('Você esqueceu de selecionar uma opção', this.trigger)
                this.triggerSpan.style.color = '#e74c3c'    
                return false
        }
        return true
    }

}

