const tablePoke = document.getElementById("tabela");

fetch("jason/pokes.json")
    .then(response => response.json())
    .then(pokes => {

        pokes.forEach(poke => {

            const tableTr = document.createElement("tr");

            const nPokedex = document.createElement("td");
            nPokedex.textContent = poke.nPokedex;

            const nome = document.createElement("td");
            nome.textContent = poke.nome;

            const tipo = document.createElement("td");
            tipo.textContent = poke.tipo;

            const tipo2 = document.createElement("td");
            tipo2.textContent = poke.tipoS;

            const regiao = document.createElement("td");
            regiao.textContent = poke.regiao;

            const evo = document.createElement("td");
            evo.textContent = poke.evo;

            const preEvo = document.createElement("td");
            preEvo.textContent = poke.preEvo;

            tableTr.appendChild(nPokedex);
            tableTr.appendChild(nome);
            tableTr.appendChild(tipo);
            tableTr.appendChild(tipo2);
            tableTr.appendChild(regiao);
            tableTr.appendChild(evo);
            tableTr.appendChild(preEvo);

            tablePoke.appendChild(tableTr);
        });

    });