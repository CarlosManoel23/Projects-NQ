// Função que cria e injeta o Loader no DOM
export const injetarLoader = () => {
    const estiloLoader = `
        <style id="loader-style">
            .loader-container {
                position: fixed;
                inset: 0;
                background-color: rgba(244, 247, 246, 0.5);  
                backdrop-filter: blur(10px); 
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 20;
                margin: 0;
                padding: 0;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }

            .spinner {
                width: 50px;
                height: 50px;
                border: 5px solid rgba(180, 37, 21, 0.1);
                border-top: 5px solid #b42515;
                border-radius: 50%;
                box-shadow: 0 0 15px rgba(0,0,0,0.05);
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            .loader-hidden {
                opacity: 0;
                visibility: hidden;
            }
        </style>
    `
    const loaderHTML = `
        <div id="loader" class="loader-container">
            <div class="spinner"></div>
        </div>
    `
    // Insere no final do head
    document.head.insertAdjacentHTML('beforeend', estiloLoader);
    // Insere no início do body
    document.body.insertAdjacentHTML('afterbegin', loaderHTML)
}
// Adiciona o loader antes da pagina carragar completamente
export function carrgarLoader() {
    injetarLoader()
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        const style = document.getElementById('loader-style');
        
        if (loader) {
            loader.classList.add('loader-hidden');

            // Espera os 0.5s da transição CSS antes de remover do DOM
            setTimeout(() => {
                loader.remove()
                if (style) style.remove() // Limpa também o estilo injetado
            }, 500)
        }
    })
}    