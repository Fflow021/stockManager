import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import CustomTextField from '../components/button/textField/CustomTextField';

export default function TelaDeCadastro() {
  const [nome, setNome] = useState<string>('');
  const [quantidade, setQuantidade] = useState<string>('');
  const [precoCompra, setPrecoCompra] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [codigo, setCodigo] = useState<string>('');

  const quantidadeValida = /^\d+$/.test(quantidade);
  const precoValido = /^\d+([.,]\d+)?$/.test(precoCompra);

  const salvar = () => {
    if (!quantidadeValida) {
      Alert.alert('Erro', 'Quantidade inválida. Insira somente números inteiros.');
      return;
    }
    if (!precoValido) {
      Alert.alert('Erro', 'Preço inválido. Insira um valor numérico, com opcional decimal.');
      return;
    }

    const dados = {
      nome,
      quantidade: parseInt(quantidade, 10),
      preco_compra: parseFloat(precoCompra.replace(',', '.')),
      descricao,
      codigo,
    };

    console.log('Dados cadastrados:', dados);
    Alert.alert('Sucesso', 'Item cadastrado com sucesso!');
  };

  return (
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
        <Text style={styles.errorText}>
          Insira apenas números inteiros.
        </Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 24,
  },
});