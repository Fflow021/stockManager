import { type SQLiteDatabase } from 'expo-sqlite';
import Produto from '../modelo/produtoModel'; 

interface ProdutoDB {
  id: number;
  nome: string;
  quantidade: number; 
  preco_unidade: number;
  descricao: string;
  codigo: string;
}
interface EstoqueItem {
  id: number;
  nome: string;
  quantidade: number; 
  precoUnit: number; 
  descricao: string;
  codigo: string;
}

export async function initializeDatabase(database: SQLiteDatabase) {
  try {
    console.log('[DB] Inicializando o banco de dados...'); 
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
    console.log('[DB] Banco de dados inicializado com sucesso.'); 
  } catch (error) {
    console.error('[DB] Falha na inicialização do banco de dados:', error); 
    throw error; 
  }
}

export async function insertProduto(db: SQLiteDatabase, produto: Produto) {
  try {
    const result = await db.runAsync(
      `INSERT INTO cadastro (nome, quantidade, preco_unidade, descricao, codigo) VALUES (?, ?, ?, ?, ?);`,
      produto.nome,
      produto.quantidade,
      produto.precoCompra,
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
export async function getAllProdutos(
  database: SQLiteDatabase,
): Promise<EstoqueItem[]> {
  try {
    const produtosDB = await database.getAllAsync<ProdutoDB>(
      `SELECT * FROM cadastro;`,
    );
    return produtosDB.map((p) => ({
      id: p.id,
      nome: p.nome,
      quantidade: p.quantidade,
      precoUnit: p.preco_unidade,
      descricao: p.descricao,
      codigo: p.codigo,
    }));
  } catch (error) {
    console.error('Erro ao buscar todos os produtos:', error);
    throw error;
  }
}
export async function deleteProduto(db: SQLiteDatabase, id: number) {
  const result = await db.runAsync('DELETE FROM cadastro WHERE id = ?;', [id]);
  if (result.changes === 0) {
    throw new Error(`Nenhum produto encontrado com o ID ${id} para deletar.`);
  }
  console.log(`Produto com ID ${id} deletado com sucesso.`);
}
export async function reduceProdutoQuantidade(
  db: SQLiteDatabase,
  id: number,
  quantidadeAReduzir: number,
) {
  await db.withTransactionAsync(async () => {
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