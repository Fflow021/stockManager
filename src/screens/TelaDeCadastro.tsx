import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
} from 'react-native';
import CustomTextField from '../components/button/textField/CustomTextField';
import CustomHeader from '../components/button/header/CustomHeader';
import { insertProduto } from '../serviço/produtoServiço';
import Produto from '../modelo/produtoModel';
import { useSQLiteContext } from 'expo-sqlite';

export default function TelaDeCadastro() {
  const [nome, setNome] = useState<string>('');
  const [quantidade, setQuantidade] = useState<string>('');
  const [precoCompra, setPrecoCompra] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [codigo, setCodigo] = useState<string>('');

  const quantidadeValida = /^\d+$/.test(quantidade);
  const precoValido = /^\d+([.,]\d+)?$/.test(precoCompra);
  const db = useSQLiteContext();

  const salvar = async () => {
    if (!quantidadeValida) {
      Alert.alert('Erro', 'Quantidade inválida. Insira somente números inteiros.');
      return;
    }
    if (!precoValido) {
      Alert.alert('Erro', 'Preço inválido. Insira um valor numérico com decimal.');
      return;
    }
  
    const produto = new Produto({
      nome,
      quantidade: parseInt(quantidade, 10),
      precoCompra: parseFloat(precoCompra.replace(',', '.')),
      descricao,
      codigo,
    });
  
    try {
      const id = await insertProduto(db, produto);
      console.log('Produto inserido com sucesso. ID:', id);
      Alert.alert('Sucesso', 'Item cadastrado com sucesso!');
      // Limpar campos, se quiser
      setNome('');
      setQuantidade('');
      setPrecoCompra('');
      setDescricao('');
      setCodigo('');
    } catch (error) {
      console.error('Erro ao inserir produto:', error);
      Alert.alert('Erro', 'Não foi possível salvar o produto.');
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
            disabled={!quantidadeValida || !precoValido}
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
