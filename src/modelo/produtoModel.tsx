export default class Produto {
  static validar(novoProduto: Produto) {
    throw new Error('Method not implemented.');
  }
  nome: string;
  quantidade: number;
  precoCompra: number;
  descricao: string;
  codigo: string;

  constructor({
    nome,
    quantidade,
    precoCompra,
    descricao,
    codigo,
  }: {
    nome: string;
    quantidade: number;
    precoCompra: number;
    descricao: string;
    codigo: string;
  }) {
    this.nome = nome;
    this.quantidade = quantidade;
    this.precoCompra = precoCompra;
    this.descricao = descricao;
    this.codigo = codigo;
  }
}
