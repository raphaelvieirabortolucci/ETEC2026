const nome = document.getElementById("nome");
const botao = document.getElementById("btn");
const resultado = document.getElementById("resultado");

async function mostrarEvolucoes(cadeia, nomePokemon, evolucoes) {

    if (cadeia.species.name === nomePokemon) {

        cadeia.evolves_to.forEach(async evolucao => {

            const evo = document.createElement("p");

            const urlEvolucao = `https://pokeapi.co/api/v2/pokemon/${evolucao.species.name}`;

            const respostaEvolucao = await fetch(urlEvolucao);

            const dadosEvolucao = await respostaEvolucao.json();

            evo.textContent = `Evolução: ${evolucao.species.name}`;

            evolucoes.appendChild(evo);

            dadosEvolucao.types.forEach(type => {

                const tipo = document.createElement("p");

                tipo.textContent = `Tipagem: ${type.type.name}`;

                evolucoes.appendChild(tipo);
            });

            mostrarEvolucoes(evolucao, nomePokemon, evolucoes);
        });

        return;
    }

    cadeia.evolves_to.forEach(evolucao => {
        mostrarEvolucoes(evolucao, nomePokemon, evolucoes);
    });
}


botao.addEventListener("click", consultar);

async function consultar() {
    try {

        resultado.innerHTML = "";

        // pega o valor da id nome no html
        const nomePokemon = nome.value.toLowerCase();

        // coloca a const nomePokemon na api
        const url = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`;

        // faz uma requisição .json para a API
        const resposta = await fetch(url);

        if (!resposta.ok) {
            resultado.textContent = "Pokémon não encontrado!";
            return;
        }

        // pega os dados do .json e coloca na const dados
        const dados = await resposta.json();

        const card = document.createElement("div");

        const evolucoes = document.createElement("div");

        const titulo = document.createElement("h1");

        titulo.textContent = `Nome: ${dados.name}`;

        card.appendChild(titulo);

        // pega a const dados e percorre o objeto types
        dados.types.forEach(type => {

            const tipo = document.createElement("p");

            tipo.textContent = `Tipagem: ${type.type.name}`;

            card.appendChild(tipo);
        });

        // pega a const dados e percorre o objeto stats
        dados.stats.forEach(stat => {

            const status = document.createElement("p");

            status.textContent = `${stat.stat.name}: ${stat.base_stat}`;

            card.appendChild(status);
        });

        // coloca a área de evoluções dentro do card
        card.appendChild(evolucoes);

        // pega a const dados e puxa o objeto species.url
        const urlSpecies = dados.species.url;

        // pede para o species.url o .json
        const respostaSpecies = await fetch(urlSpecies);

        // pega e armazena o json
        const dadosSpecies = await respostaSpecies.json();

        // pega a url de dentro do species
        const urlEvolution = dadosSpecies.evolution_chain.url;

        // faz uma requisição .json para a API
        const respostaEvolution = await fetch(urlEvolution);

        // armazena o json
        const dadosEvolution = await respostaEvolution.json();

        mostrarEvolucoes(dadosEvolution.chain, nomePokemon, evolucoes);

        resultado.appendChild(card);

    } catch (erro) {

        resultado.textContent = "Ocorreu um erro ao consultar o Pokémon.";

        console.log(erro);
    }
}