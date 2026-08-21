let btnObjeto = document.getElementById("botaoObjeto");

btnObjeto.addEventListener("click", mostrarObjeto);

function mostrarObjeto() {

    let resultadoDiv = document.getElementById("resultado");
    
    resultadoDiv.innerHTML = "";

    for (let pessoa of pessoas){
        let card = document.createElement("div");

        let nome = document.createElement("h2");
        nome.textContent = pessoa.nome

        let idade = document.createElement("p");
        idade.textContent = `Idade: ${pessoa.idade}`;

        let funcao = document.createElement("p");
        funcao.textContent = `Função: ${pessoa.funcao}`;

        card.appendChild(nome);
        card.appendChild(idade);
        card.appendChild(funcao);  
        resultadoDiv.appendChild(card);;      
    }
    
}


let pessoas = [
    {
    nome: "Raphael",
    idade: 18,
    funcao: "desenvolvedor"
    },
    {
    nome: "caio",
    idade: 18,
    funcao: "desenvolvedor"
    }
] // objeto