import Produto from '../produto';

describe('Produto', () => {

  describe('valorTotalEstoque', () => {
    it('deve calcular corretamente o valor total do estoque', () => {
      const produto = new Produto({
        nome: 'Açaí',
        quantidade: 10,
        precoCompra: 5.50,
        descricao: 'Açaí congelado',
        codigo: 'ACAI01',
      });

      const valorTotal = produto.valorTotalEstoque();

      expect(valorTotal).toBe(55.0); // 10 * 5.50 = 55.0
    });
  });

  describe('validar', () => {
    it('deve retornar true para um produto com dados válidos', () => {
      const produtoValido = new Produto({
        nome: 'Produto Válido',
        quantidade: 1,
        precoCompra: 10,
        descricao: '...',
        codigo: 'PV01',
      });
      expect(Produto.validar(produtoValido)).toBe(true);
    });

    it('deve retornar false se o nome estiver vazio', () => {
      const produtoInvalido = new Produto({
        nome: '',
        quantidade: 1,
        precoCompra: 10,
        descricao: '...',
        codigo: 'PI01',
      });
      expect(Produto.validar(produtoInvalido)).toBe(false);
    });

    it('deve retornar false se a quantidade for negativa', () => {
      const produtoInvalido = new Produto({
        nome: 'Produto',
        quantidade: -5,
        precoCompra: 10,
        descricao: '...',
        codigo: 'PI02',
      });
      expect(Produto.validar(produtoInvalido)).toBe(false);
    });
    
    it('deve retornar false se o preço for negativo', () => {
        const produtoInvalido = new Produto({
          nome: 'Produto',
          quantidade: 5,
          precoCompra: -10,
          descricao: '...',
          codigo: 'PI03',
        });
        expect(Produto.validar(produtoInvalido)).toBe(false);
    });

    it('deve retornar false se o código estiver vazio', () => {
        const produtoInvalido = new Produto({
          nome: 'Produto',
          quantidade: 1,
          precoCompra: 10,
          descricao: '...',
          codigo: '  ', 
        });
        expect(Produto.validar(produtoInvalido)).toBe(false);
    });
  });
});