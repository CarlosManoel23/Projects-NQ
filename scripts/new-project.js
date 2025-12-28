import { carrgarLoader } from '/scripts/utilities/loader.js'
import { incluirComponente } from '/scripts/utilities/integrate.js'
import { inicializarSideBar } from '/scripts/components/side-bar.js'
import { injetarToast, showToast } from './utilities/toast.js'

carrgarLoader()
incluirComponente('.header-placeholder', '/Routes/components/header.html')
incluirComponente('.footer-placeholder', '/Routes/components/footer.html')
incluirComponente('.side-bar-placeholder','/Routes/components/side-bar.html')
  .then(() => {
        // chama a função da sidebar
        inicializarSideBar()
  });
injetarToast()  

// Parte visual do input name
const nameProject = document.querySelector('#name-project')

// apagar espaços inúteis
nameProject.addEventListener('change', (evt) => {
      const valor = evt.target.value.trim()
      evt.target.value = valor
})

// Parte visual do input budget
const budget = document.querySelector('#budget-project')

// Adicionar o cifrão caso não exista
budget.addEventListener('input', (evt) => {

      const valor = evt.target.value.replace(/\D/g, "");

      if (!valor.startsWith('R$ ')) {
            const apenasNumeros = valor.replace('R$', '').trim();
            evt.target.value = 'R$ ' + apenasNumeros;
      }
})
// apagar o cifrão se não digitar nada
budget.addEventListener('change', (evt) => {
      if (evt.target.value === "R$ ") {
            evt.target.value = '' 
      }
});

// Parte visual do select
const selectContainer = document.querySelector('.conteiner-select');
const trigger = document.getElementById('trigger');
const triggerSpan = trigger.querySelector('span');
const options = document.querySelectorAll('.option');

// Abre e fecha o menu ao clicar
trigger.addEventListener('click', (evt) => {
      evt.stopPropagation(); 
      selectContainer.classList.toggle('active');
});

// Lógica para selecionar uma opção
options.forEach(option => {
      option.addEventListener('click', () => {
          triggerSpan.innerText = option.innerText;
          triggerSpan.style.color = '#2C3E50'
          selectContainer.classList.remove('active');
      });
});

// Fecha o menu se clicar em qualquer lugar fora
window.addEventListener('click', (evt) => {
      if (selectContainer.classList.contains('active')) {
          selectContainer.classList.remove('active');
      }
});

// Validações
// O input está vazio?
const isBlank = (element) => {
      const valor = element.value
      if (valor.trim().length == 0) {
            return true
      }
      return false
}

// O name tem menos de 3 caracteres?
const isValideName = () => {
      const valor = nameProject.value.trim()
      if (valor.length < 3) {
        return false
      }
    return true
}

// O o budget é maior que zero?
const isValidBudget = () => {
    const numeros = budget.value.replace(/\D/g, "")
    const valorNumerico = parseFloat(numeros);

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
        return false
    }
    return true
}

// Selecionou alguma opção
const isCategorySelected = () => {
    if (triggerSpan.innerText === "Selecione uma opção") {
        return false
    }
    return true
}

// Botão de envio
const btnSubmit = document.querySelector('.btn-submit')

if (btnSubmit) {
      btnSubmit.addEventListener('click', (evt) => {
            evt.preventDefault()

            const nameOk = !isBlank(nameProject) && isValideName()
            const budgetOk = !isBlank(budget) && isValidBudget()
            const categoryOk = isCategorySelected()

            if (nameOk && budgetOk && categoryOk) {
                  showToast("Projeto criado com sucesso!", "sucesso");
            } else {
                  showToast("Ops! Verifique os campos.", "erro");
            }   
      })
}
