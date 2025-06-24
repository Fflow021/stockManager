import Produto from '../modelo/produtoModel';

export default class ProdutoControle {
  static criarProduto({
    nome,
    quantidade,
    precoCompra,
    descricao,
    codigo,
  }: {
    nome: string;
    quantidade: string;
    precoCompra: string;
    descricao: string;
    codigo: string;
  }): Produto | null {
    const qtd = parseInt(quantidade, 10);
    const preco = parseFloat(precoCompra.replace(',', '.'));

    const produto = new Produto({
      nome,
      quantidade: qtd,
      precoCompra: preco,
      descricao,
      codigo,
    });
    return Produto.validar(produto) ? produto : null;
  }
}