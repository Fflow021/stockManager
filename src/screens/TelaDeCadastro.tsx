import ProdutoControle from '../controle/produtoControle';
import CustomTextField from '../components/button/textField/CustomTextField';
import CustomHeader from '../components/button/header/CustomHeader';
import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
} from 'react-native';

// Supondo que você tenha um arquivo de serviço de banco de dados
import { insertProduto } from '../serviço/produtoServiço'; // Você precisará criar este arquivo
import { useSQLiteContext } from 'expo-sqlite'; // Importe o hook para acessar o DB
import Produto from '../modelo/produtoModel';

export default function TelaDeCadastro() {
  const [nome, setNome] = useState<string>('');
  const [quantidade, setQuantidade] = useState<string>('');
  const [precoCompra, setPrecoCompra] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [codigo, setCodigo] = useState<string>('');

  // Regex para validação em tempo real na UI
  const quantidadeValida = /^\d+$/.test(quantidade);
  const precoValido = /^\d+([.,]\d+)?$/.test(precoCompra);

  const db = useSQLiteContext(); // Obtenha a instância do banco de dados

  // A função 'salvar' agora será assíncrona
  const salvar = async () => {
    console.log("cheguei aqui");
    // 1. Validação inicial dos campos vazios e formatos (antes de tentar criar o Produto)
    if (
      !nome.trim() ||
      !quantidade.trim() ||
      !precoCompra.trim() ||
      !descricao.trim() ||
      !codigo.trim()
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!quantidadeValida) {
      Alert.alert(
        'Erro',
        'Quantidade inválida. Insira somente números inteiros.',
      );
      return;
    }

    if (!precoValido) {
      Alert.alert(
        'Erro',
        'Preço inválido. Insira um valor numérico com ponto ou vírgula.',
      );
      return;
    }

    // 2. Converta strings para números ANTES de passar para o ProdutoControle
    const qtdParsed = parseInt(quantidade, 10);
    const precoParsed = parseFloat(precoCompra.replace(',', '.'));

    // Verifique se as conversões resultaram em números válidos
    if (isNaN(qtdParsed) || isNaN(precoParsed)) {
      Alert.alert(
        'Erro de Conversão',
        'Erro interno na conversão de quantidade ou preço.',
      );
      return;
    }

    // 3. Crie o objeto Produto usando o ProdutoControle
    // AGORA PASSANDO OS VALORES JÁ CONVERTIDOS PARA NUMBER
    const novoProduto = ProdutoControle.criarProduto({
      nome,
      quantidade: quantidade, // Use qtdParsed (NUMBER)
      precoCompra: precoCompra, // Use precoParsed (NUMBER)
      descricao,
      codigo,
    });

    // 4. Valide o produto usando o método estático da classe Produto
    if (!novoProduto || !Produto.validar(novoProduto)) {
      Alert.alert(
        'Erro',
        'Não foi possível criar o produto com os dados fornecidos ou os dados são inválidos.',
      );
      return;
    }

    // 5. Salve o produto no banco de dados SQLite
    try {
      // Verifique se o DB está disponível antes de usar
      if (!db) {
          Alert.alert('Erro', 'Banco de dados não disponível.');
          console.error('Erro: Instância do banco de dados (db) é nula ou indefinida.');
          return;
      }
      const insertedId = await insertProduto(db, novoProduto); // Chama a função de inserção
      console.log('Produto cadastrado com sucesso! ID:', insertedId);
      Alert.alert('Sucesso', 'Item cadastrado com sucesso!');

      // 6. Limpe os campos do formulário
      setNome('');
      setQuantidade('');
      setPrecoCompra('');
      setDescricao('');
      setCodigo('');
    } catch (error) {
      console.error('Erro ao salvar produto no DB:', error);
      Alert.alert(
        'Erro',
        'Não foi possível cadastrar o item. Tente novamente.',
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomTextField
          label="Nome:"
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome"
        />

        <CustomTextField
          label="Quantidade:"
          value={quantidade}
          onChangeText={setQuantidade}
          placeholder="Digite a quantidade"
          keyboardType="numeric"
        />
        {/* Mostra mensagem de erro se quantidade não for válida e houver texto */}
        {!quantidadeValida && quantidade.length > 0 && (
          <Text style={styles.errorText}>Insira apenas números inteiros.</Text>
        )}

        <CustomTextField
          label="Preço de Compra:"
          value={precoCompra}
          onChangeText={setPrecoCompra}
          placeholder="Digite o preço"
          keyboardType="decimal-pad"
        />
        {/* Mostra mensagem de erro se precoCompra não for válido e houver texto */}
        {!precoValido && precoCompra.length > 0 && (
          <Text style={styles.errorText}>
            Insira somente número, com ponto ou vírgula para decimais.
          </Text>
        )}

        <CustomTextField
          label="Descrição:"
          placeholder="Digite a descrição"
          value={descricao}
          onChangeText={setDescricao}
        />

        <CustomTextField
          label="Código:"
          placeholder="Digite o código"
          value={codigo}
          onChangeText={setCodigo}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Salvar"
            onPress={salvar}
            color="#502f5a"
            // CONDIÇÃO ATUALIZADA AQUI: O botão estará desativado
            // se QUALQUER UM desses campos não estiver válido/preenchido.
            disabled={
              !quantidadeValida ||
              !precoValido ||
              !nome.trim() ||       // Verifica se 'nome' não está vazio ou só espaços
              !descricao.trim() ||  // Verifica se 'descricao' não está vazio ou só espaços
              !codigo.trim()        // Verifica se 'codigo' não está vazio ou só espaços
            }
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <CustomHeader
          title="Entrada de itens no estoque"
          imageSource={require('../../assets/eitaSorveteAcaiLanchesLOGO.jpg')}
        />
      </View>
    </View>
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
});