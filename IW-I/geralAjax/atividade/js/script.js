const nome = document.getElementById("nome");
const botao = document.getElementById("btn");
const resultado = document.getElementById("resultado");


botao.addEventListener("click", consultar);

async function consultar() {


    const nomePokemon = nome.value;

    const url = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`;

    const resposta = await fetch(url);

    const dados = await resposta.json();

    const titulo = document.createElement("h1");
    
    titulo.textContent = `Nome: ${dados.name}`;
        
    resultado.appendChild(titulo)

    dados.types.forEach(type => {

        const tipo = document.createElement("p");
            
        tipo.textContent = `Tipagem: ${type.type.name}`;

        resultado.appendChild(tipo);
    });

    dados.stats.forEach(stat => {
        const status = document.createElement("p")

        status.textContent = `${stat.stat.name}: ${stat.base_stat}`

        resultado.appendChild(status);
    });
        
}

