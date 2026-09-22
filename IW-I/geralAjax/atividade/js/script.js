const nome = document.getElementById("nome");
const botao = document.getElementById("btn");
const resultado = document.getElementById("resultado");


botao.addEventListener("click", consultar);

async function consultar() {

    //pega o valor da id nome no html
    const nomePokemon = nome.value;

    //coloca a const nomePokemon na api
    const url = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`;

    //faz uma requisição .json para a API
    const resposta = await fetch(url);

    //pega os dados do .json e coloca na const dados
    const dados = await resposta.json();

    const titulo = document.createElement("h1");
    
    titulo.textContent = `Nome: ${dados.name}`;
        
    resultado.appendChild(titulo)

    //pega a const dados e percorre o objeto types
    dados.types.forEach(type => {

        const tipo = document.createElement("p");
            
        tipo.textContent = `Tipagem: ${type.type.name}`;

        resultado.appendChild(tipo);
    });

    //pega a const dados e percorre o objeto stats
    dados.stats.forEach(stat => {
        const status = document.createElement("p")

        status.textContent = `${stat.stat.name}: ${stat.base_stat}`

        resultado.appendChild(status);
    });

    //pega a const dados e puxa o objeto species.url
    const urlSpecies = dados.species.url;

    //transforma o species.url em .json
    const respostaSpecies = await fetch(urlSpecies);

    //pega e armazena o json
    const dadosSpecies = await respostaSpecies.json();


    //pega a url de dentro do species
    const urlEvolution = dadosSpecies.evolution_chain.url;

    ////faz uma requisição .json para a API
    const respostaEvolution = await fetch(urlEvolution);

    //armazena o json
    const dadosEvolution = await respostaEvolution.json();
    
    dadosEvolution.chain.evolves_to.forEach(evolucao =>{
        evolucao.species.name
        
    });
 
}

