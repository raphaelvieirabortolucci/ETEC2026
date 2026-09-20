<?php

class Pessoa {

    // ATRIBUTOS
    private $nome;
    private $idade;


    // SET NOME
    public function setNome($nome) {
        $this->nome = $nome;
    }


    // GET NOME
    public function getNome() {
        return $this->nome;
    }


    // SET IDADE
    public function setIdade($idade) {

        if ($idade >= 0) {
            $this->idade = $idade;
        }

    }


    // GET IDADE
    public function getIdade() {
        return $this->idade;
    }


    // MÉTODO
    public function apresentar() {

        echo "Meu nome é " . $this->nome;
        echo "<br>";
        echo "Eu tenho " . $this->idade . " anos";

    }

}


// CRIANDO O OBJETO
$pessoa1 = new Pessoa();


// USANDO OS SETTERS
$pessoa1->setNome("Raphael");
$pessoa1->setIdade(18);


// USANDO OS GETTERS
echo $pessoa1->getNome();

echo "<br>";

echo $pessoa1->getIdade();

echo "<br><br>";


// USANDO UM MÉTODO
$pessoa1->apresentar();

?>
