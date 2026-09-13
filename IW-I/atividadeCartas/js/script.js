// pega os botoes e a div do html
const botao = document.getElementById("btnJogo");
const divJogo = document.getElementById("jogo");
const botaoJogar = document.getElementById("btnJogar");
const botaoPassar = document.getElementById("btnPassar");
const botaoRejogar = document.getElementById("btnRejogar");
 
// pega os lugares onde vamos mostrar os pontos e a mensagem
const placar = document.getElementById("placar");
const mensagem = document.getElementById("mensagem");
 
// define a variavel deckId
let deckId = "";

// define as variaveis dos pontos
let pontosJogador = 0;
let pontosComputador = 0;
 
// define as variaveis das cartas
let cartaJogador;
let cartaComputador;
 
// define que o jogo ainda nao acabou
let finalizador = false;
 
 
// essa funcao cria os valores do J, Q, K e As
function valorCarta(valor) {
 
    if (valor == "QUEEN") {
        return 11;
    }
 
    if (valor == "JACK") {
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
 
 
// define o peso dos naipes
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
 
 
// atualiza o placar na tela
function atualizarPlacar() {
 
    placar.innerHTML =
        "Jogador: " + pontosJogador +
        " | Computador: " + pontosComputador;
}
 
 
// verifica se alguem chegou a 10
function verificador() {
 
    if (pontosJogador >= 10) {
 
        finalizador = true;
 
        finalizarJogo("Você ganhou o jogo!");
    }
 
    else if (pontosComputador >= 10) {
 
        finalizador = true;
 
        finalizarJogo("O computador ganhou o jogo!");
    }
}
 
 
// finaliza o jogo
function finalizarJogo(texto) {
 
    mensagem.innerHTML = texto;
 
    botaoJogar.style.display = "none";
    botaoPassar.style.display = "none";
 
    botaoRejogar.style.display = "block";
}
 
 
// cria um novo baralho
function criarBaralho() {
 
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => response.json())
        .then(dados => {
 
            deckId = dados.deck_id;
 
            console.log("Baralho criado:", deckId);
        })
        .catch(erro => {
 
            console.error("Erro ao criar o baralho:", erro);
        });
}
 
 
// cria o primeiro baralho
criarBaralho();
 
 
// botão iniciar jogo
botao.addEventListener("click", function () {
 
    // se o jogo acabou, nao faz nada
    if (finalizador == true) {
        return;
    }
 
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => response.json())
        .then(dados => {
 
            // da uma carta para o jogador
            cartaJogador = dados.cards[0];
 
            const imagem = document.createElement("img");
 
            imagem.src = cartaJogador.image;
 
            divJogo.appendChild(imagem);
 
 
            // mostra os botoes Jogar e Passar
            botaoJogar.style.display = "block";
            botaoPassar.style.display = "block";
 
            // esconde o botao iniciar
            botao.style.display = "none";
        });
});
 
 
// botão jogar
botaoJogar.addEventListener("click", function () {
 
    // impede jogar depois que o jogo acabou
    if (finalizador == true) {
        return;
    }
 
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => response.json())
        .then(dados => {
 
            // da uma carta para o computador
            cartaComputador = dados.cards[0];
 
            const imagemComputador = document.createElement("img");
 
            imagemComputador.src = cartaComputador.image;
 
            divJogo.appendChild(imagemComputador);
 
 
            // descobre os valores das cartas
            let valorJogador = valorCarta(cartaJogador.value);
 
            let valorComputador = valorCarta(cartaComputador.value);
 
 
            // compara as cartas
            if (valorJogador > valorComputador) {
 
                window.alert("Você ganhou 3 pontos");
 
                pontosJogador += 3;
 
            }
 
            else if (valorJogador < valorComputador) {
 
                window.alert("O computador ganhou 3 pontos");
 
                pontosComputador += 3;
 
            }
 
            else {
 
                // se o valor for igual, compara os naipes
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
 
 
            // atualiza o placar
            atualizarPlacar();
 
            // verifica se alguem chegou a 10
            verificador();
 
 
            // se o jogo ainda nao acabou,
            // prepara para a proxima rodada
            if (finalizador == false) {
 
                botaoJogar.style.display = "none";
                botaoPassar.style.display = "none";
                botao.style.display = "block";
            }
 
        });
});
 
 
// botão passar
botaoPassar.addEventListener("click", function () {
 
    // impede passar depois que o jogo acabou
    if (finalizador == true) {
        return;
    }
 
 
    // computador ganha 1 ponto
    pontosComputador += 1;
 
    window.alert("Você passou. O computador ganhou 1 ponto");
 
 
    // atualiza o placar
    atualizarPlacar();
 
 
    // verifica se alguem chegou a 10
    verificador();
 
 
    // se o jogo ainda nao acabou,
    // prepara para a proxima rodada
    if (finalizador == false) {
 
        botaoJogar.style.display = "none";
        botaoPassar.style.display = "none";
        botao.style.display = "block";
    }
});
 
 
// botão rejogar
botaoRejogar.addEventListener("click", function () {
 
    // zera os pontos
    pontosJogador = 0;
    pontosComputador = 0;
 
    // o jogo volta a funcionar
    finalizador = false;
 
    // limpa as cartas da tela
    divJogo.innerHTML = "";
 
    // limpa a mensagem
    mensagem.innerHTML = "";
 
    // atualiza o placar
    atualizarPlacar();
 
 
    // mostra o botao iniciar
    botao.style.display = "block";
 
    // esconde os botoes de jogar, passar e rejogar
    botaoJogar.style.display = "none";
    botaoPassar.style.display = "none";
    botaoRejogar.style.display = "none";
 
 
    // cria um novo baralho
    criarBaralho();
});