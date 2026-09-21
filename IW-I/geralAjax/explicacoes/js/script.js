// 22. Exercício para você praticar

// Antes de partirmos para a atividade do seu professor, eu recomendo você fazer este pequeno exercício:

// HTML
// <button id="btn">Buscar usuário</button>

// <h2 id="nome"></h2>
// <p id="email"></p>
// Objetivo

// Quando clicar no botão:

// Fazer fetch() para:
// https://jsonplaceholder.typicode.com/users/1
// Usar async.
// Usar await.
// Usar try.
// Usar catch.
// Converter a resposta para JSON.
// Mostrar:
// nome do usuário
// email do usuário

const botao = document.getElementById("btn");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", consultar);

async function consultar() {

    try {

        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const usuarios = await resposta.json();

        usuarios.forEach(dados => {

            const nomeUsuario = document.createElement("h2");
            const emailUsuario = document.createElement("p");

            nomeUsuario.textContent = dados.name;
            emailUsuario.textContent = dados.email;

            resultado.appendChild(nomeUsuario);
            resultado.appendChild(emailUsuario);

        });

    } catch (erro) {

        console.log("Erro ao consultar a API.");

    }
}







