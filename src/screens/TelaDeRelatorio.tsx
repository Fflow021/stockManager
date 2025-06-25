import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useSQLiteContext } from 'expo-sqlite';
import { getAllProdutos, EstoqueItem } from '../serviço/produtoServiço'; 
import CustomButton from '../components/button/CustomButton';

const createHtml = (products: EstoqueItem[]): string => {

    const totalValue = products.reduce((sum, product) => sum + (product.quantidade * product.precoUnit), 0);
  
    const productRows = products
      .map(
        (p) => `
      <tr>
        <td>${p.id}</td>
        <td>${p.nome}</td>
        <td>${p.quantidade}</td>
        <td>R$ ${p.precoUnit.toFixed(2)}</td>
        <td>R$ ${(p.quantidade * p.precoUnit).toFixed(2)}</td>
      </tr>
    `
      )
      .join('');
  
    return `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Relatório de Estoque</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; }
            h1 { text-align: center; color: #502f5a; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #dddddd; text-align: left; padding: 8px; }
            th { background-color: #502f5a; color: #efbd10; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .footer { text-align: right; margin-top: 20px; font-weight: bold; font-size: 1.1em; }
          </style>
        </head>
        <body>
          <h1>Relatório de Estoque</h1>
          <p>Data de Geração: ${new Date().toLocaleDateString('pt-BR')}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Qtde.</th>
                <th>Preço Unit.</th>
                <th>Valor Total</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
          </table>
          <div class="footer">
            <p>Valor Total em Estoque: R$ ${totalValue.toFixed(2)}</p>
          </div>
        </body>
      </html>
    `;
};
  
export default function TelaDeRelatorio() {
  const db = useSQLiteContext(); 
  const [products, setProducts] = useState<EstoqueItem[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProdutos(db); 
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        Alert.alert('Erro', 'Falha ao carregar os produtos do banco de dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [db]); // Adicionando 'db' como dependência para garantir a atualização se a conexão mudar

  const generateAndSharePdf = async () => {
    if (products.length === 0) {
      Alert.alert('Aviso', 'Nenhum produto cadastrado para gerar o relatório.');
      return;
    }

    try {
      const htmlContent = createHtml(products);
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Erro', 'O compartilhamento não está disponível nesta plataforma.');
        return;
      }

      await Sharing.shareAsync(uri, { dialogTitle: 'Compartilhar Relatório de Estoque' });
    } catch (error) {
      console.error("Erro ao gerar ou compartilhar PDF:", error);
      Alert.alert('Erro', 'Ocorreu um erro ao gerar o PDF.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#502f5a" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Produtos</Text>
      <Text style={styles.subtitle}>
        Pressione o botão abaixo para gerar e compartilhar o relatório de estoque em formato PDF.
      </Text>
      <CustomButton title="Gerar e Compartilhar PDF" onPress={generateAndSharePdf} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#502f5a',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
});
