// pega os botoes e a div do html
const botao = document.getElementById("btnJogo");
const divJogo = document.getElementById("jogo");
const botaoJogar = document.getElementById("btnJogar");
const botaoPassar = document.getElementById("btnPassar");

// difine a variavel deckId
let deckId = "";

// define as variaveis dos pontos
let pontosJogador = 0;
let pontosComputador = 0;

// define a variavel das cartas
let cartaJogador;
let cartaComputador;


// essa funcao cria os valores do J, Q, K e As
function valorCarta(valor) {

    if (valor == "JACK") {
        return 11;
    }

    if (valor == "QUEEN") {
        return 12;
    }

    if (valor == "KING") {
        return 13;
    }

    if (valor == "ACE") {
        return 14;
    }

    return Number(valor);
}

function valorNaipe(naipe) {

    if (naipe == "CLUBS") {
        return 4;
    }

    if (naipe == "HEARTS") {
        return 3;
    }

    if (naipe == "SPADES") {
        return 2;
    }

    if (naipe == "DIAMONDS") {
        return 1;
    }
}
// !!!!! terminar, fazer um verificador de pontos !!!!!
function verificador(pontos){
    if (pontosJogador > pontosComputador)
        window.alert("O jogador ganhou o jogo")
}






// pega a API e percorre ela, criando um baralho novo
fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(response => response.json())
    .then(dados => {

        deckId = dados.deck_id;

        console.log("Baralho criado:", deckId);
    })
    .catch(erro => {
        console.error("Erro ao criar o baralho:", erro);
    });

// pega o baralho e escolhe uma carta para o jogador
botao.addEventListener("click", function () {

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => response.json())
        .then(dados => {
            // da uma carta para o jogador
            cartaJogador = dados.cards[0];


            const imagem = document.createElement("img");

            imagem.src = cartaJogador.image;

            divJogo.appendChild(imagem);


        })
    })

// define uma carta para o computador e compara com a do jogador
botaoJogar.addEventListener("click", function () {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => response.json())
        .then(dados => {
            cartaComputador = dados.cards[0];


            const imagemComputador = document.createElement("img");

            imagemComputador.src = cartaComputador.image;

            divJogo.appendChild(imagemComputador);


            // descobrir os valores
            let valorJogador = valorCarta(cartaJogador.value);

            let valorComputador = valorCarta(cartaComputador.value);

            

            // comparar
            if (valorJogador > valorComputador) {

                window.alert("Você ganhou 3 pontos");
                pontosJogador += 3;
            }
            else if (valorJogador < valorComputador) {

                window.alert("O computador ganhou 3 pontos");
                pontosComputador += 3;
            }

            else {
                let naipeJogador = valorNaipe(cartaJogador.suit);
                let naipeComputador = valorNaipe(cartaComputador.suit);

                if (naipeJogador > naipeComputador) {
                    
                    window.alert("Você ganhou 3 pontos");
                    pontosJogador += 3;
                }
                else {
                    
                    window.alert("O computador ganhou 3 pontos");
                    pontosComputador += 3;
                }
            }

        });
});

