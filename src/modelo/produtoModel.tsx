export default class Produto {
  static validar(produto: Produto): boolean {
    if (!produto.nome || produto.nome.trim() === '') return false;
    if (produto.quantidade == null || produto.quantidade < 0) return false;
    if (produto.precoCompra == null || produto.precoCompra < 0) return false;
    if (!produto.codigo || produto.codigo.trim() === '') return false;
    return true;
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
  
  valorTotalEstoque(): number {
    return this.quantidade * this.precoCompra;
  }
}