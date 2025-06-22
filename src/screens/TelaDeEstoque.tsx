import { StyleSheet, ScrollView, Text, Alert } from 'react-native';
import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

// Importe o hook para acessar o banco de dados
import { useSQLiteContext } from 'expo-sqlite';
// Importe a função para buscar todos os produtos (AJUSTE ESTE CAMINHO!)
import { getAllProdutos } from '../serviço/produtoServiço';

// Defina a interface do item do seu estoque para tipagem correta.
// Sua função getAllProdutos (em databaseService.ts) precisará mapear
// 'preco_unidade' (do DB) para 'precoUnit' (nesta interface).
interface EstoqueItem {
  id: number;
  nome: string;
  quantidade: number;
  precoUnit: number;
  descricao: string;
  codigo: string;
}

export default function TelaDeEstoque() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([3, 5, 7, 9]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  // O estado 'items' agora será preenchido com dados do SQLite
  const [items, setItems] = useState<EstoqueItem[]>([]);

  // Obtenha a instância do banco de dados a partir do contexto do Expo SQLite
  const db = useSQLiteContext();

  // Efeito para forçar a orientação da tela para horizontal
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Função de limpeza para retornar à orientação vertical ao sair da tela
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    };
  }, []);

  // Efeito para carregar os dados do banco de dados
  useEffect(() => {
    const loadItemsFromDatabase = async () => {
      try {
        // Busca os produtos do DB usando a função que você implementará
        const loadedItems = await getAllProdutos(db);
        setItems(loadedItems); // Atualiza o estado com os dados carregados
      } catch (error) {
        console.error('Falha ao carregar itens do banco de dados:', error);
        Alert.alert('Erro', 'Não foi possível carregar os itens do estoque.');
      }
    };

    // Só tenta carregar se a instância do banco de dados estiver disponível
    if (db) {
      loadItemsFromDatabase();
    }
  }, [db]); // Dependência 'db' garante que o carregamento aconteça quando o DB estiver pronto

  // Lógica de paginação
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  // Redefine a página para 0 quando o número de itens por página muda
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={{ flex: 0.4 }} textStyle={styles.titleText}>
            ID
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1 }} textStyle={styles.titleText}>
            Nome
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1 }} textStyle={styles.titleText}>
            Quantidade
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1 }} textStyle={styles.titleText}>
            Preço unitário
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1 }} textStyle={styles.titleText}>
            Descrição
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1 }} textStyle={styles.titleText}>
            Código
          </DataTable.Title>
        </DataTable.Header>

        {/* Mapeia sobre os itens carregados do banco de dados */}
        {items.slice(from, to).map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell
              style={{ flex: 0.4 }}
              textStyle={styles.cellStyleText}
            >
              {item.id}
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 1 }}
              textStyle={styles.cellStyleText}
            >
              {item.nome}
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 1 }}
              textStyle={styles.cellStyleText}
            >
              {item.quantidade}
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 1 }}
              textStyle={styles.cellStyleText}
            >
              R${item.precoUnit.toFixed(2)}
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 1 }}
              textStyle={styles.cellStyleText}
            >
              {item.descricao}
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 0.99 }}
              textStyle={styles.cellStyleText}
            >
              {item.codigo}
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} de ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Linhas por página'}
        />
      </DataTable>

      {/* Mensagem exibida se não houver itens no estoque */}
      {items.length === 0 && (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 16,
            color: '#555',
          }}
        >
          Nenhum item cadastrado no estoque.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  buttonContainer: {
    marginTop: 24,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    marginBottom: 8,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  cellStyleText: {
    flex: 6,
    fontWeight: 'bold',
    color: '#000000',
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  header: {
    alignItems: 'flex-start',
    backgroundColor: '#502f5a',
  },
});
