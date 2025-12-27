// Integra os componentes html á pagina atual
export async function incluirComponente(classElemento, caminhoArquivo) {
    const response = await fetch(caminhoArquivo)
    const html = await response.text()
    document.querySelector(classElemento).innerHTML = html
}