const exibir = document.getElementById("exibir")
const btn = document.getElementById("btn")

btn.addEventListener("click", iniciar)

async function iniciar() {
    const url = await fetch("https://jsonplaceholder.typicode.com/users");

    const resposta = await url.json();

    resposta.forEach(element => {
        
        const nome = document.createElement("h1");

        nome.textContent = `Nome: ${element.name}`;

        const email = document.createElement("p");

        email.textContent = `Email: ${element.email}`;

        exibir.appendChild(nome);
        exibir.appendChild(email);
    });

}





