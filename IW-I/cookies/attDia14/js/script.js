
const autorizacao = document.getElementById("autorizacao");
const aceitar = document.getElementById("aceitar");
const negar = document.getElementById("negar");
const salvar = document.getElementById("salvar");
const listaFavoritos = document.getElementById("listaFavoritos");

// Cria um cookie com duração de um ano
function criarCookie(nome, valor) {
    document.cookie = nome + "=" + valor + "; max-age=31536000; path=/";
}

// Procura um cookie pelo nome e retorna seu valor
function lerCookie(nome) {
    const cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        const partes = cookies[i].split("=");

        if (partes[0] === nome) {
            return partes[1];
        }
    }

    return "";
}

// Mostra os produtos que estão marcados
function mostrarFavoritos() {
    listaFavoritos.innerHTML = "";

    let temFavorito = false;

    if (document.getElementById("produto101").checked) {
        const produto = document.createElement("p");
        produto.textContent = "Teclado";
        listaFavoritos.appendChild(produto);
        temFavorito = true;
    }

    if (document.getElementById("produto102").checked) {
        const produto = document.createElement("p");
        produto.textContent = "Mouse";
        listaFavoritos.appendChild(produto);
        temFavorito = true;
    }

    if (document.getElementById("produto103").checked) {
        const produto = document.createElement("p");
        produto.textContent = "Headset";
        listaFavoritos.appendChild(produto);
        temFavorito = true;
    }

    if (document.getElementById("produto104").checked) {
        const produto = document.createElement("p");
        produto.textContent = "Monitor";
        listaFavoritos.appendChild(produto);
        temFavorito = true;
    }

    if (document.getElementById("produto105").checked) {
        const produto = document.createElement("p");
        produto.textContent = "Webcam";
        listaFavoritos.appendChild(produto);
        temFavorito = true;
    }

    if (document.getElementById("produto106").checked) {
        const produto = document.createElement("p");
        produto.textContent = "Microfone";
        listaFavoritos.appendChild(produto);
        temFavorito = true;
    }

    if (temFavorito === false) {
        listaFavoritos.textContent = "Nenhum favorito salvo.";
    }
}

// Salva os códigos dos produtos marcados
salvar.addEventListener("click", function() {

    if (lerCookie("autorizacao") !== "sim") {
        alert("Você precisa autorizar o uso de cookies.");
        return;
    }

    let codigos = "";

    // checked retorna true se o checkbox estiver marcado
    if (document.getElementById("produto101").checked) {
        codigos += "101";
    }

    if (document.getElementById("produto102").checked) {
        if (codigos !== "") {
            codigos += ",";
        }

        codigos += "102";
    }

    if (document.getElementById("produto103").checked) {
        if (codigos !== "") {
            codigos += ",";
        }

        codigos += "103";
    }

    if (document.getElementById("produto104").checked) {
        if (codigos !== "") {
            codigos += ",";
        }

        codigos += "104";
    }

    if (document.getElementById("produto105").checked) {
        if (codigos !== "") {
            codigos += ",";
        }

        codigos += "105";
    }

    if (document.getElementById("produto106").checked) {
        if (codigos !== "") {
            codigos += ",";
        }

        codigos += "106";
    }

    // Salva os códigos no cookie
    criarCookie("favoritos", codigos);

    mostrarFavoritos();

    alert("Favoritos salvos!");
});

// Aceita a utilização dos cookies
aceitar.addEventListener("click", function() {
    criarCookie("autorizacao", "sim");

    autorizacao.style.display = "none";

    carregarFavoritos();
});

// Nega a utilização dos cookies
negar.addEventListener("click", function() {
    autorizacao.style.display = "none";

    listaFavoritos.textContent = "Você não autorizou o uso de cookies.";
});

// Recupera os favoritos salvos anteriormente
function carregarFavoritos() {
    const favoritosSalvos = lerCookie("favoritos");

    if (favoritosSalvos !== "") {
        const codigos = favoritosSalvos.split(",");

        codigos.forEach(function(codigo) {

            if (codigo === "101") {
                document.getElementById("produto101").checked = true;
            }

            if (codigo === "102") {
                document.getElementById("produto102").checked = true;
            }

            if (codigo === "103") {
                document.getElementById("produto103").checked = true;
            }

            if (codigo === "104") {
                document.getElementById("produto104").checked = true;
            }

            if (codigo === "105") {
                document.getElementById("produto105").checked = true;
            }

            if (codigo === "106") {
                document.getElementById("produto106").checked = true;
            }

        });
    }

    mostrarFavoritos();
}

// Verifica a autorização quando a página abre
if (lerCookie("autorizacao") === "sim") {
    autorizacao.style.display = "none";
    carregarFavoritos();
} else {
    listaFavoritos.textContent = "Autorize os cookies para recuperar seus favoritos.";
}
