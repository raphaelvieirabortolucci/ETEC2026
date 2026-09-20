import 'dart:io';

void main() {
  List<String> frutas = [];

  // Pergunta quantas frutas o usuário quer cadastrar
  stdout.write("Quantas frutas deseja cadastrar? ");
  int quantidade = int.parse(stdin.readLineSync()!);

  // Cadastra as frutas
  for (int i = 0; i < quantidade; i++) {
    stdout.write("Digite o nome da fruta: ");
    String fruta = stdin.readLineSync()!;

    frutas.add(fruta);
  }

  // Mostra a primeira fruta cadastrada
  print("Primeira fruta: ${frutas[0]}");

  // Pergunta qual fruta deseja remover
  stdout.write("Digite a fruta que deseja remover: ");
  String remover = stdin.readLineSync()!;

  // Verifica se a fruta está na lista
  if (frutas.contains(remover)) {
    frutas.remove(remover);
    print("Fruta removida com sucesso.");
  } else {
    print("Fruta não encontrada.");
  }

  // Mostra quantidade restante
  print("Quantidade de frutas restantes: ${frutas.length}");

  // Percorrendo com for
  print("\nFrutas usando for:");

  for (int i = 0; i < frutas.length; i++) {
    print(frutas[i]);
  }

  // Percorrendo com for-in
  print("\nFrutas usando for-in:");

  for (String fruta in frutas) {
    print(fruta);
  }

  // Percorrendo com while
  print("\nFrutas usando while:");

  int i = 0;

  while (i < frutas.length) {
    print(frutas[i]);
    i++;
  }
}