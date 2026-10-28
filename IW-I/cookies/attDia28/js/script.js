async function carregarApi() {
    try{
        const api = await fetch('https://jsonplaceholder.typicode.com/users');

        if(!api.ok) {
            throw new Error(`Erro na requisição: ${api.status}`);
        }

        const dados = await api.json();

        
    }
    catch (erro) {
        console.error('Ocorreu um erro ao carregar a API:', erro);
      }
};

exibirUsuarios.addEventListener("click", function() {
    carregarApi()
    api.forEach(usuario => {
  
        // Criar uma div para ser o card do produto
        const cardUsuario = document.createElement('div');
        cardUsuario.classList.add('usuario-card'); // Adiciona uma classe CSS opcional
      
        // Criar o elemento do nome do produto (H3)
        const titulo = document.createElement('h3');
        titulo.textContent = usuario.nome;
      
        // Criar o elemento do preço (Parágrafo)
        const email = document.createElement('p');
        email.textContent = `Email: ${usuario.email}`;
      
        // Colocar o título e o preço dentro do card do produto
        cardUsuario.appendChild(titulo);
        cardUsuario.appendChild(email);
      
        // Colocar o card completo dentro do container principal do HTML
        container.appendChild(cardUsuario);
      });
});
