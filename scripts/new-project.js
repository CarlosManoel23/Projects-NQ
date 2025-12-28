import { carrgarLoader } from '/scripts/utilities/loader.js'
import { incluirComponente } from '/scripts/utilities/integrate.js'
import { inicializarSideBar } from '/scripts/components/side-bar.js'

carrgarLoader()
incluirComponente('.header-placeholder', '/Routes/components/header.html')
incluirComponente('.footer-placeholder', '/Routes/components/footer.html')
incluirComponente('.side-bar-placeholder','/Routes/components/side-bar.html')
  .then(() => {
        // chama a função da sidebar
        inicializarSideBar()
  });

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

// validações
const isBlank = (variable) => {
      valor = variable.value
      if (valor.length == 0) {
            return true
      }
}