const DB = 'meusProjetos'

export const salvarProjeto = (projeto) => {
    const projetos = lerProjetos()
    const novoDado = {
        id: projeto.id || Date.now(),
        name: projeto.name,
        budget: projeto.budget,
        category: projeto.category,
        services: projeto.services || []
    };
    
    projetos.push(novoDado);
    localStorage.setItem(DB, JSON.stringify(projetos))
}
export const lerProjetos = () => {
    const dados = localStorage.getItem(DB)
    // Se não existir nada, retorna um array vazio
    return dados ? JSON.parse(dados) : []
}
export const atualizarProjeto = (id, novosDados) => {
    let projetos = lerProjetos()
    const index = projetos.findIndex(p => p.id === id)
    
    if (index !== -1) {
        // Mescla os dados antigos com os novos
        projetos[index] = { ...projetos[index], ...novosDados }
        localStorage.setItem(DB, JSON.stringify(projetos))
        return true
    }
    return false
}
export const excluirProjeto = (id) => {
    const projetos = lerProjetos()
    const novaLista = projetos.filter(p => p.id !== id)
    localStorage.setItem(DB, JSON.stringify(novaLista))
}
export const excluirServico = (idProjeto, idServico) => {
    const projetos = lerProjetos()
    const index = projetos.findIndex(p => p.id === idProjeto)
    if (index !== -1) {
        // 3. Filtra o array de serviços para remover apenas o ID solicitado
        const servicosAtualizados = projetos[index].services.filter(s => s.id !== idServico)
        
        // 4. Atualiza o projeto com a nova lista de serviços
        projetos[index].services = servicosAtualizados
        
        // 5. Salva a lista inteira de projetos novamente no DB
        localStorage.setItem(DB, JSON.stringify(projetos))
        return true
    }
    return false
}
export const limparTodosProjetos = () => {
    localStorage.removeItem(DB); 
};