<?php
// cria a classe, aje como se fosse um molde para criar algo nesse formato
class Pessoa {
    // cria os atribuitos "nome" e "idade"
    public $nome;
    public $idade;

    // cria um metodo (basicamente um função), que ao ser chamada ele faz algo
    // nessse caso ele da um output e diz "Meu nome é " variavel nome
    public function apresentar() {
        echo "Meu nome é " . $this->nome;
    }

}

// cria uma nova pessoa usanda a class
$pessoa1 = new Pessoa();


// possui os atribuitos da classe
$pessoa1->nome = "Raphael";

// executa a função chamada, usando as informações da pessoa1
$pessoa1->apresentar();

?>