import { StyleSheet, ScrollView, Text, Alert, View } from 'react-native';
import * as React from 'react';
import {
  DataTable,
  Button,
  Modal,
  Portal,
  TextInput,
} from 'react-native-paper';
import { useEffect, useState, useCallback } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useSQLiteContext } from 'expo-sqlite';
import {
  getAllProdutos,
  deleteProduto,
  reduceProdutoQuantidade,
} from '../serviço/produtoServiço';

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
  const [itemsPerPage] = useState(numberOfItemsPerPageList[0]);

  const onItemsPerPageChange = (newItemsPerPage: number) => {
    console.log(`Items per page changed to: ${newItemsPerPage}`);
  };
  const [items, setItems] = useState<EstoqueItem[]>([]);
  const [reduceModalVisible, setReduceModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');

  const db = useSQLiteContext();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    };
  }, []);

  const loadItemsFromDatabase = useCallback(async () => {
    try {
      const loadedItems = await getAllProdutos(db);
      setItems(loadedItems);
    } catch (error) {
      console.error('Falha ao carregar itens do banco de dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar os itens do estoque.');
    }
  }, [db]);

  useEffect(() => {
    if (db) {
      loadItemsFromDatabase();
    }
  }, [db, loadItemsFromDatabase]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const showReduceModal = () => {
    setItemId('');
    setQuantity('');
    setReduceModalVisible(true);
  };
  const hideReduceModal = () => setReduceModalVisible(false);

  const showDeleteModal = () => {
    setItemId('');
    setDeleteModalVisible(true);
  };
  const hideDeleteModal = () => setDeleteModalVisible(false);

  const handleReduce = async () => {
    const id = parseInt(itemId, 10);
    const quant = parseInt(quantity, 10);
    if (isNaN(id) || isNaN(quant) || id <= 0 || quant <= 0) {
      Alert.alert('Erro', 'Por favor, insira um ID e uma quantidade válidos.');
      return;
    }

    try {
      await reduceProdutoQuantidade(db, id, quant);
      Alert.alert('Sucesso', 'Quantidade do item atualizada com sucesso!');
      hideReduceModal();
      loadItemsFromDatabase();
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        'Erro',
        error.message ?? 'Não foi possível atualizar a quantidade do item.',
      );
    }
  };

  const handleDelete = async () => {
    const id = parseInt(itemId, 10);
    if (isNaN(id) || id <= 0) {
      Alert.alert('Erro', 'Por favor, insira um ID válido.');
      return;
    }

    try {
      await deleteProduto(db, id);
      Alert.alert('Sucesso', 'Item deletado com sucesso!');
      hideDeleteModal();
      loadItemsFromDatabase();
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', error.message ?? 'Não foi possível deletar o item.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView>
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

        {items.length === 0 && (
          <Text style={styles.noItemsText}>
            Nenhum item cadastrado no estoque.
          </Text>
        )}
      </ScrollView>
      <View style={styles.footerButtons}>
        <Button
          mode="contained"
          onPress={showReduceModal}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Reduzir Quantidade
        </Button>
        <Button
          mode="contained"
          onPress={showDeleteModal}
          style={[styles.button, styles.deleteButton]}
          labelStyle={styles.buttonLabel}
        >
          Excluir Item
        </Button>
      </View>

      <Portal>
        <Modal
          visible={reduceModalVisible}
          onDismiss={hideReduceModal}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Reduzir Quantidade</Text>
          <TextInput
            label="ID do Produto"
            value={itemId}
            onChangeText={setItemId}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Quantidade a Reduzir"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.modalActions}>
            <Button onPress={hideReduceModal}>Cancelar</Button>
            <Button onPress={handleReduce}>Confirmar</Button>
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={deleteModalVisible}
          onDismiss={hideDeleteModal}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Excluir Item</Text>
          <TextInput
            label="ID do Produto"
            value={itemId}
            onChangeText={setItemId}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.modalActions}>
            <Button onPress={hideDeleteModal}>Cancelar</Button>
            <Button onPress={handleDelete}>Confirmar</Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cellStyleText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  header: {
    backgroundColor: '#502f5a',
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#c0392b',
  },
  buttonLabel: {
    fontSize: 12,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});