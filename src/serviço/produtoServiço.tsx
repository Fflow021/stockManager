import { type SQLiteDatabase } from 'expo-sqlite';
import Produto from '../modelo/produtoModel'; // Seu modelo Produto

// Interface para o formato dos dados COMO ELES ESTÃO NA SUA TABELA 'cadastro' no DB.
// Note que a coluna da quantidade é 'quantidade' e do preço é 'preco_unidade'.
interface ProdutoDB {
  id: number;
  nome: string;
  quantidade: number; // Coluna 'quantidade' no DB
  preco_unidade: number; // Coluna 'preco_unidade' no DB
  descricao: string;
  codigo: string;
}

// Interface para o formato dos dados que sua TelaDeEstoque (front-end) espera.
// Note que a propriedade do preço é 'precoUnit'.
interface EstoqueItem {
  id: number;
  nome: string;
  quantidade: number; // Propriedade 'quantidade' no front-end
  precoUnit: number; // Propriedade 'precoUnit' esperada no front-end
  descricao: string;
  codigo: string;
}

/**
 * Inicializa o banco de dados criando a tabela 'cadastro' se ela não existir.
 * @param database A instância do banco de dados SQLite.
 */
export async function initializeDatabase(database: SQLiteDatabase) {
  try {
    console.log('[DB] Inicializando o banco de dados...'); // Log de início
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS cadastro (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        quantidade INTEGER NOT NULL,
        preco_unidade REAL NOT NULL,
        descricao TEXT NOT NULL,
        codigo TEXT NOT NULL
      );
    `);
    console.log('[DB] Banco de dados inicializado com sucesso.'); // Log de sucesso
  } catch (error) {
    console.error('[DB] Falha na inicialização do banco de dados:', error); // Log de erro
    throw error; // Relança o erro para ser capturado pelo provider
  }
}

/**
 * Insere um novo produto na tabela 'cadastro' do banco de dados.
 * @param db A instância do banco de dados SQLite.
 * @param produto O objeto Produto a ser inserido.
 * @returns Uma Promise que resolve para o ID da linha inserida.
 */
export async function insertProduto(db: SQLiteDatabase, produto: Produto) {
  try {
    const result = await db.runAsync(
      // CORREÇÃO AQUI: Adicionada a coluna 'quantidade' e um placeholder '?'
      `INSERT INTO cadastro (nome, quantidade, preco_unidade, descricao, codigo) VALUES (?, ?, ?, ?, ?);`,
      produto.nome,
      produto.quantidade, // Passando o valor para a coluna 'quantidade'
      produto.precoCompra, // Mapeia 'precoCompra' do Produto para 'preco_unidade' no DB
      produto.descricao,
      produto.codigo,
    );
    console.log('Produto inserido com ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Erro ao inserir produto:', error);
    throw error;
  }
}

/**
 * Busca todos os produtos da tabela 'cadastro' no banco de dados SQLite.
 * Realiza o mapeamento dos nomes das colunas do DB para as propriedades do front-end.
 * @param database A instância do banco de dados SQLite.
 * @returns Uma Promise que resolve para um array de objetos EstoqueItem.
 */
export async function getAllProdutos(
  database: SQLiteDatabase,
): Promise<EstoqueItem[]> {
  try {
    // Usa getAllAsync para buscar todas as linhas da tabela 'cadastro'.
    // O tipo genérico <ProdutoDB> informa ao TypeScript o formato bruto dos dados do DB.
    const produtosDB = await database.getAllAsync<ProdutoDB>(
      `SELECT * FROM cadastro;`,
    );

    // Mapeia os resultados brutos do banco de dados (ProdutoDB)
    // para o formato que sua tela (EstoqueItem) espera.
    return produtosDB.map((p) => ({
      id: p.id,
      nome: p.nome,
      quantidade: p.quantidade,
      precoUnit: p.preco_unidade, // Mapeamento crucial: preco_unidade (DB) -> precoUnit (Front-end)
      descricao: p.descricao,
      codigo: p.codigo,
    }));
  } catch (error) {
    console.error('Erro ao buscar todos os produtos:', error);
    // Em caso de erro, é melhor relançar para que a TelaDeEstoque possa tratar.
    throw error;
  }
}

/**
 * Deleta um produto da tabela 'cadastro' pelo seu ID.
 * @param db A instância do banco de dados SQLite.
 * @param id O ID do produto a ser deletado.
 */
export async function deleteProduto(db: SQLiteDatabase, id: number) {
  const result = await db.runAsync('DELETE FROM cadastro WHERE id = ?;', [id]);
  if (result.changes === 0) {
    throw new Error(`Nenhum produto encontrado com o ID ${id} para deletar.`);
  }
  console.log(`Produto com ID ${id} deletado com sucesso.`);
}

/**
 * Atualiza a quantidade de um produto, reduzindo o valor especificado.
 * @param db A instância do banco de dados SQLite.
 * @param id O ID do produto a ser atualizado.
 * @param quantidadeAReduzir A quantidade a ser subtraída do estoque.
 */
export async function reduceProdutoQuantidade(
  db: SQLiteDatabase,
  id: number,
  quantidadeAReduzir: number,
) {
  // Inicia uma transação para garantir a atomicidade da operação de leitura e escrita.
  await db.withTransactionAsync(async () => {
    // Busca o produto atual para verificar a quantidade em estoque.
    const produtoAtual = await db.getFirstAsync<ProdutoDB>(
      'SELECT quantidade FROM cadastro WHERE id = ?;',
      [id],
    );

    if (!produtoAtual) {
      throw new Error(`Produto com ID ${id} não encontrado.`);
    }

    const novaQuantidade = produtoAtual.quantidade - quantidadeAReduzir;

    if (novaQuantidade < 0) {
      throw new Error(
        'A quantidade a reduzir é maior que a quantidade em estoque.',
      );
    }

    // Atualiza a quantidade do produto no banco de dados.
    const result = await db.runAsync(
      'UPDATE cadastro SET quantidade = ? WHERE id = ?;',
      [novaQuantidade, id],
    );

    if (result.changes === 0) {
      throw new Error(
        `Nenhum produto foi atualizado. Verifique se o ID ${id} é válido.`,
      );
    }
    console.log(
      `Quantidade do produto com ID ${id} atualizada para ${novaQuantidade}.`,
    );
  });
}