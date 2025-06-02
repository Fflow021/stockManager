import { StyleSheet, ScrollView } from 'react-native';
import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation'; // <- Import necessário

export default function TelaDeEstoque() {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([3, 5, 7, 9]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  // Parte do codigo que forca a ir na horizontal
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    };
  }, []);

  // mock de itens do codigo
  const [items] = React.useState([
    {
      key: 1,
      name: 'Açaí',
      quantidade: 400,
      precoUnit: 16.99,
      descricao: 'Desc 1',
      codigo: '1235813213455',
    },
    {
      key: 2,
      name: 'Calda Morango',
      quantidade: 20,
      precoUnit: 19.2,
      descricao: 'Desc 2',
      codigo: '1235813213455',
    },
    {
      key: 3,
      name: 'Granola',
      quantidade: 15,
      precoUnit: 12.5,
      descricao: 'Desc 3',
      codigo: '1235813213455',
    },
    {
      key: 4,
      name: 'Leite em pó',
      quantidade: 10,
      precoUnit: 22.0,
      descricao: 'Desc 4',
      codigo: '222222222',
    },
    {
      key: 5,
      name: 'Banana',
      quantidade: 50,
      precoUnit: 1.2,
      descricao: 'Desc 5',
      codigo: '333333333',
    },
    {
      key: 6,
      name: 'Morango',
      quantidade: 30,
      precoUnit: 6.0,
      descricao: 'Desc 6',
      codigo: '444444444',
    },
    {
      key: 7,
      name: 'Leite condensado',
      quantidade: 25,
      precoUnit: 4.8,
      descricao: 'Desc 7',
      codigo: '555555555',
    },
    {
      key: 8,
      name: 'Chocolate granulado',
      quantidade: 20,
      precoUnit: 3.7,
      descricao: 'Desc 8',
      codigo: '666666666',
    },
    {
      key: 9,
      name: 'Copo 300ml',
      quantidade: 100,
      precoUnit: 0.15,
      descricao: 'Desc 9',
      codigo: '777777777',
    },
    {
      key: 10,
      name: 'Tampa 300ml',
      quantidade: 100,
      precoUnit: 0.1,
      descricao: 'Desc 10',
      codigo: '888888888',
    },
    {
      key: 11,
      name: 'Colher descartável',
      quantidade: 200,
      precoUnit: 0.08,
      descricao: 'Desc 11',
      codigo: '999999999',
    },
    {
      key: 12,
      name: 'Guardanapo',
      quantidade: 300,
      precoUnit: 0.05,
      descricao: 'Desc 12',
      codigo: '101010101',
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

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

        {items.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell
              style={{ flex: 0.4 }}
              textStyle={styles.cellStyleText}
            >
              {item.key}
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 1 }}
              textStyle={styles.cellStyleText}
            >
              {item.name}
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
              R${item.precoUnit}
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
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'flex-start',
    backgroundColor: '#502f5a',
  },
  title: {
    flex: 0.3,
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cellStyleText: {
    flex: 6,
    fontWeight: 'bold',
    color: '#000000',
  },
});
