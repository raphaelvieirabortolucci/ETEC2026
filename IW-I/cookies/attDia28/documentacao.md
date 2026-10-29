# Documentação – Localiza Users

## O que são cookies?

Cookies são pequenos pedaços de informação (um nome e um valor) que o site
guarda no navegador do usuário. Na próxima visita, o navegador devolve essa
informação e o site consegue "lembrar" de quem está acessando. Nesta aplicação
eles guardam o nome do visitante, a forma de visualização escolhida e a
quantidade de consultas.

## Qual a diferença entre cookies e localStorage?

| | Cookies | localStorage |
|---|---|---|
| Expiração | Podem ter data para expirar (`max-age`) | Não expira sozinho; só some se for apagado |
| Envio ao servidor | São enviados ao servidor em toda requisição | Ficam só no navegador |
| Tamanho | Cerca de 4 KB | Cerca de 5 MB |
| Uso no JS | `document.cookie` (texto único, mais trabalhoso) | `localStorage.setItem` e `getItem` (mais simples) |

## Como um cookie é criado em JavaScript?

Atribuindo um texto no formato `nome=valor` a `document.cookie`:

```js
document.cookie = "nomeUsuario=" + encodeURIComponent("Carlos")
    + "; max-age=604800; path=/";
```

O `encodeURIComponent` evita problemas com espaços e acentos, e o `path=/`
faz o cookie valer para o site inteiro.

## Como recuperar o valor de um cookie?

`document.cookie` devolve todos os cookies juntos em um único texto, separados
por `;`. Para pegar um só, é preciso separar o texto, procurar o nome e
decodificar o valor. É o que a função `obterCookie` faz:

```js
const cookies = document.cookie.split(";");
// para cada cookie: cookie.trim().split("=") e comparar o nome
```

## Como funciona a expiração?

Sem expiração, o cookie some quando o navegador é fechado. Com `max-age`
(em segundos) ou `expires` (uma data), ele fica guardado até esse prazo.
Neste projeto `max-age=604800` equivale a 7 dias (7 × 24 × 60 × 60).
Para apagar um cookie, grava-se o mesmo nome com `max-age=0`.

## Quais informações não devem ser guardadas em cookies comuns?

Dados sensíveis: senhas, números de cartão, CPF e outros documentos, tokens
de acesso e qualquer informação pessoal que não possa ser vista por outras
pessoas. Cookies comuns podem ser lidos pelo JavaScript da página (e por quem
usar o computador) e viajam em toda requisição, então não são seguros para isso.
