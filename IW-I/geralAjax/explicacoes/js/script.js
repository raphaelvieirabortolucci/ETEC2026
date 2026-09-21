// Pega o botão do HTML através do ID "btn"
const botao = document.getElementById("btn");

// Pega a div onde os resultados serão mostrados
const resultado = document.getElementById("resultado");


// Quando o botão for clicado, chama a função "consultar"
botao.addEventListener("click", consultar);


// "async" permite usar o "await" dentro da função
async function consultar() {

    // O "try" tenta executar o código
    // Se acontecer algum erro, ele vai para o "catch"
    try {

        // O "fetch" faz uma requisição para a API
        // O "await" espera a API responder antes de continuar
        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );


        // Converte a resposta da API para JSON
        // O "await" espera a conversão terminar
        const usuarios = await resposta.json();


        // Percorre todos os usuários que vieram da API
        // "dados" representa um usuário de cada vez
        usuarios.forEach(dados => {


            // Cria um novo elemento <h2> para colocar o nome
            const nomeUsuario = document.createElement("h2");

            // Cria um novo elemento <p> para colocar o email
            const emailUsuario = document.createElement("p");


            // Coloca o nome do usuário dentro do <h2>
            nomeUsuario.textContent = dados.name;

            // Coloca o email do usuário dentro do <p>
            emailUsuario.textContent = dados.email;


            // Adiciona o <h2> dentro da div "resultado"
            resultado.appendChild(nomeUsuario);

            // Adiciona o <p> dentro da div "resultado"
            resultado.appendChild(emailUsuario);

        });


    // Se acontecer algum erro dentro do "try",
    // o código passa para o "catch"
    } catch (erro) {

        // Mostra uma mensagem de erro no console
        console.log("Erro ao consultar a API.");

    }
}