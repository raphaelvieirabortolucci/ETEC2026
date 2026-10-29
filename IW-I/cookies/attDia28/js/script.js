
let visualizacao = "texto";

// Guarda o último resultado para poder trocar a visualização
// sem precisar consultar a API de novo (null = ainda não consultou)
let usuariosExibidos = null;


// Procura um cookie pelo nome
function obterCookie(nome) {
    const cookies = document.cookie.split(";");

    let valorEncontrado = "";

    cookies.forEach(cookie => {
        const partes = cookie.trim().split("=");

        if (partes[0] === nome) {
            valorEncontrado = decodeURIComponent(partes[1]);
        }
    });

    return valorEncontrado;
}


// Salva um cookie por 7 dias
function salvarCookie(nome, valor) {
    document.cookie = nome + "=" + encodeURIComponent(valor)
        + "; max-age=604800; path=/";
}


// Exclui um cookie
function excluirCookie(nome) {
    document.cookie = nome + "=; max-age=0; path=/";
}


// Mostra a janela que pergunta sobre os cookies
function perguntarCookies() {
    document.getElementById("autorizacao").style.display = "flex";
}


// Quando clicar em Sim
document.getElementById("botaoSim").addEventListener("click", function() {

    salvarCookie("autorizacaoUsers", "sim");

    document.getElementById("autorizacao").style.display = "none";

    verificarLogin();

});


// Quando clicar em Não
document.getElementById("botaoNao").addEventListener("click", function() {

    document.getElementById("autorizacao").style.display = "none";

    document.getElementById("mensagemAcesso").textContent =
        "Você não aceitou os cookies. Não será possível acessar o site. " +
        "Recarregue a página para responder novamente.";

});


// Se o nome já estiver salvo entra direto, senão pede o nome
function verificarLogin() {

    const nomeSalvo = obterCookie("nomeUsuario");

    if (nomeSalvo !== "") {
        entrarNoSite(nomeSalvo);
    } else {
        document.getElementById("login").style.display = "block";
    }

}


// Quando clicar em entrar
document.getElementById("entrar").addEventListener("click", function() {

    const campoNome = document.getElementById("nome");
    const nomeUsuario = campoNome.value.trim();

    if (nomeUsuario === "") {
        alert("Digite seu nome de usuário!");
    } else {
        salvarCookie("nomeUsuario", nomeUsuario);

        entrarNoSite(nomeUsuario);
    }

});


// Libera o conteúdo do site
function entrarNoSite(nomeUsuario) {

    document.getElementById("conteudo").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("mensagemAcesso").textContent = "";

    document.getElementById("boasVindas").textContent =
        "Bem-vindo(a), " + nomeUsuario + "!";

    // Recupera a visualização que foi escolhida antes
    if (obterCookie("visualizacao") === "cartoes") {
        visualizacao = "cartoes";
    } else {
        visualizacao = "texto";
    }

    marcarBotaoAtivo();
    atualizarContador();
}


// Destaca o botão da visualização escolhida
function marcarBotaoAtivo() {

    const botaoTexto = document.getElementById("botaoTexto");
    const botaoCartoes = document.getElementById("botaoCartoes");

    botaoTexto.classList.remove("ativo");
    botaoCartoes.classList.remove("ativo");

    if (visualizacao === "cartoes") {
        botaoCartoes.classList.add("ativo");
    } else {
        botaoTexto.classList.add("ativo");
    }

}


// Atualiza o contador de consultas
function atualizarContador() {

    const consultas = Number(obterCookie("consultas"));

    let palavra = "consultas";

    if (consultas === 1) {
        palavra = "consulta";
    }

    document.getElementById("contador").textContent =
        "Você já realizou " + consultas + " " + palavra + " nesta aplicação.";

}


// Consulta a API. Se vier um termo, mostra só os usuários que combinam com ele
async function consultarApi(termo) {

    const container = document.getElementById("resultado");

    try {
        const api = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!api.ok) {
            throw new Error("Erro na requisição: " + api.status);
        }

        const dados = await api.json();

        // Atualiza o contador
        let consultas = Number(obterCookie("consultas"));

        consultas++;

        salvarCookie("consultas", consultas);

        atualizarContador();

        // A API não faz busca por parte do nome, então o filtro é feito aqui
        if (termo === "") {
            usuariosExibidos = dados;
        } else {
            const busca = termo.toLowerCase();

            usuariosExibidos = dados.filter(usuario => {
                return usuario.name.toLowerCase().includes(busca)
                    || usuario.username.toLowerCase().includes(busca);
            });
        }

        exibirUsuarios();

    } catch (erro) {

        console.error("Erro ao carregar a API:", erro);

        usuariosExibidos = null;

        container.replaceChildren();
        container.className = "";

        const mensagem = document.createElement("p");
        mensagem.textContent =
            "Não foi possível consultar os dados. Tente novamente mais tarde.";
        container.appendChild(mensagem);

    }

}


// Mostra os usuários na tela, em cartões ou em texto
function exibirUsuarios() {

    const container = document.getElementById("resultado");

    container.replaceChildren();

    if (usuariosExibidos.length === 0) {
        container.className = "";

        const aviso = document.createElement("p");
        aviso.textContent = "Nenhum usuário encontrado.";
        container.appendChild(aviso);

        return;
    }

    if (visualizacao === "cartoes") {
        container.className = "cartoes";
    } else {
        container.className = "texto";
    }

    usuariosExibidos.forEach(usuario => {

        if (visualizacao === "cartoes") {
            container.appendChild(criarCartao(usuario));
        } else {
            container.appendChild(criarLinha(usuario));
        }

    });

}


// Cria o cartão de um usuário
function criarCartao(usuario) {

    const cardUsuario = document.createElement("div");
    cardUsuario.classList.add("usuario-card");

    const titulo = document.createElement("h3");
    titulo.textContent = usuario.name;

    const nomeUsuario = document.createElement("p");
    nomeUsuario.textContent = "Usuário: " + usuario.username;

    const email = document.createElement("p");
    email.textContent = "E-mail: " + usuario.email;

    const cidade = document.createElement("p");
    cidade.textContent = "Cidade: " + usuario.address.city;

    const empresa = document.createElement("p");
    empresa.textContent = "Empresa: " + usuario.company.name;

    cardUsuario.appendChild(titulo);
    cardUsuario.appendChild(nomeUsuario);
    cardUsuario.appendChild(email);
    cardUsuario.appendChild(cidade);
    cardUsuario.appendChild(empresa);

    return cardUsuario;

}


// Cria a linha de texto de um usuário
function criarLinha(usuario) {

    const linha = document.createElement("p");

    linha.textContent =
        usuario.name + " (" + usuario.username + ") - " +
        usuario.email + " - " +
        usuario.address.city + " - " +
        usuario.company.name;

    return linha;

}


// Botão para procurar um usuário
document.getElementById("botaoProcurar").addEventListener("click", function() {

    const termo = document.getElementById("busca").value.trim();

    if (termo === "") {
        alert("Digite um nome para procurar!");
    } else {
        consultarApi(termo);
    }

});


// Botão para carregar todos os usuários
document.getElementById("botaoTodos").addEventListener("click", function() {
    consultarApi("");
});


// Escolher visualização em texto
document.getElementById("botaoTexto").addEventListener("click", function() {

    visualizacao = "texto";

    salvarCookie("visualizacao", "texto");

    mudarVisualizacao();

});


// Escolher visualização em cartões
document.getElementById("botaoCartoes").addEventListener("click", function() {

    visualizacao = "cartoes";

    salvarCookie("visualizacao", "cartoes");

    mudarVisualizacao();

});


// Atualiza os botões e refaz a exibição sem consultar a API de novo
function mudarVisualizacao() {

    marcarBotaoAtivo();

    if (usuariosExibidos !== null) {
        exibirUsuarios();
    }

}


// Limpar as preferências
document.getElementById("limpar").addEventListener("click", function() {

    excluirCookie("nomeUsuario");
    excluirCookie("visualizacao");
    excluirCookie("consultas");
    excluirCookie("autorizacaoUsers");

    alert("Preferências apagadas. A página será reiniciada.");

    location.reload();

});


// Verifica se a pessoa já autorizou os cookies
function iniciarSite() {

    if (obterCookie("autorizacaoUsers") === "sim") {
        verificarLogin();
    } else {
        perguntarCookies();
    }

}


// Executa ao abrir a página
iniciarSite();
