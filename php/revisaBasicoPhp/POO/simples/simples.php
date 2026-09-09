<?php
// cria a classe, aje como se fosse um molde para criar algo nesse formato
class Pessoa {
    // cria os atribuitos "nome" e "idade"
    public $nome;
    public $idade;

}

// cria uma nova pessoa usanda a class
$pessoa1 = new Pessoa();

// possui os atribuitos da classe
$pessoa1->nome = "Raphael";
$pessoa1->idade = 18;

// mostra o nome da pessoa1
echo $pessoa1->nome;

?>