<!-- 18 -->
<?php

class Pessoa {
    // cria um valor privado
    private $nome;

    // SET, pega o valor privado e usa o "$this" para dizer que o "nome" é igual a "$nome"
    public function setNome($nome) {
        $this->nome = $nome;
    }

    // GET, pega o set e deixa ele pronto para armazenar o valor novo dele
    public function getNome() {
        return $this->nome;
    }

}

$pessoa1 = new Pessoa();

// Enviando um valor para o atributo, o get
$pessoa1->setNome("Raphael");

// Pegando o valor do atributo
echo $pessoa1->getNome();

?>