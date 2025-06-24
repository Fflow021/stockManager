// src/components/button/model/__tests__/produto.test.tsx

import Produto from '../produto'; // Importa a classe que vamos testar

// Descreve o conjunto de testes para a classe Produto
describe('Produto', () => {

  // Testa o método que calcula o valor total do estoque
  describe('valorTotalEstoque', () => {
    it('deve calcular corretamente o valor total do estoque', () => {
      // ARRANGE (Organizar): Cria uma instância de produto com valores conhecidos
      const produto = new Produto({
        nome: 'Açaí',
        quantidade: 10,
        precoCompra: 5.50,
        descricao: 'Açaí congelado',
        codigo: 'ACAI01',
      });

      // ACT (Agir): Executa o método que queremos testar
      const valorTotal = produto.valorTotalEstoque();

      // ASSERT (Verificar): Verifica se o resultado é o esperado
      expect(valorTotal).toBe(55.0); // 10 * 5.50 = 55.0
    });
  });

  // Testa o método de validação estático
  describe('validar', () => {
    it('deve retornar true para um produto com dados válidos', () => {
      // ARRANGE
      const produtoValido = new Produto({
        nome: 'Produto Válido',
        quantidade: 1,
        precoCompra: 10,
        descricao: '...',
        codigo: 'PV01',
      });
      // ACT & ASSERT
      expect(Produto.validar(produtoValido)).toBe(true);
    });

    it('deve retornar false se o nome estiver vazio', () => {
      // ARRANGE
      const produtoInvalido = new Produto({
        nome: '', // Nome inválido
        quantidade: 1,
        precoCompra: 10,
        descricao: '...',
        codigo: 'PI01',
      });
      // ACT & ASSERT
      expect(Produto.validar(produtoInvalido)).toBe(false);
    });

    it('deve retornar false se a quantidade for negativa', () => {
      // ARRANGE
      const produtoInvalido = new Produto({
        nome: 'Produto',
        quantidade: -5, // Quantidade inválida
        precoCompra: 10,
        descricao: '...',
        codigo: 'PI02',
      });
      // ACT & ASSERT
      expect(Produto.validar(produtoInvalido)).toBe(false);
    });
    
    it('deve retornar false se o preço for negativo', () => {
        // ARRANGE
        const produtoInvalido = new Produto({
          nome: 'Produto',
          quantidade: 5,
          precoCompra: -10, // Preço inválido
          descricao: '...',
          codigo: 'PI03',
        });
        // ACT & ASSERT
        expect(Produto.validar(produtoInvalido)).toBe(false);
    });

    it('deve retornar false se o código estiver vazio', () => {
        // ARRANGE
        const produtoInvalido = new Produto({
          nome: 'Produto',
          quantidade: 1,
          precoCompra: 10,
          descricao: '...',
          codigo: '  ', // Código inválido (só espaços)
        });
        // ACT & ASSERT
        expect(Produto.validar(produtoInvalido)).toBe(false);
    });
  });
});