# Gerenciador de Estoque Eita Sorvete Açaí Lanches

Esta documentação descreve a estrutura e o funcionamento do aplicativo "Gerenciador de Estoque Eita Sorvete Açaí Lanches", desenvolvido utilizando React Native. O aplicativo tem como objetivo facilitar o gerenciamento de estoque da empresa, oferecendo funcionalidades para cadastro de itens, visualização do estoque atual e geração de relatórios.

## Tecnologias Utilizadas

  - React 18.3.1
  - React-native 0.76.9
  - Expo 52.0.46
  - Roteamento: React Navigation
  - Estilos: React Native Paper
  - SQLite: Banco de dados
  - Padronização e Qualidade: Prettier
  - Testes: Jest
  - Gemini AI: Documentação

## Instalação e execução do projeto

### Instalar as dependências

```bash
npm i
```

### Inicializar o Expo

```bash
npx expo start
```

### Android Studio

No Android Studio selecione o seu dispositivo para emular e volte no terminal que tinha sido aberto com o `npx expo start` e use a opção `a`,
para iniciar a aplicação no android emulado.

## 1\. App.tsx

Este é o ponto de entrada principal do aplicativo.

```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './src/serviço/produtoServiço';

export default function App() {
  return (
    <SQLiteProvider databaseName="produtos_db" onInit={initializeDatabase}>
      <NavigationContainer>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
```

### Descrição:

Este é o ponto de entrada principal da aplicação React Native. Ele configura a estrutura fundamental, envolvendo a navegação, o tema global da interface do usuário e o provedor do banco de dados. A aplicação é encapsulada pelo `SQLiteProvider` para disponibilizar o acesso ao banco de dados, o `NavigationContainer` para gerenciar a navegação entre as telas e o `PaperProvider` para fornecer o tema de Material Design aos componentes.

### Responsabilidades:

O arquivo App.tsx é responsável por inicializar a aplicação, configurando os provedores de contexto essenciais para o banco de dados, navegação e tema. Ele atua como a raiz da aplicação, garantindo que os componentes de navegação e UI, bem como a conexão com o banco de dados, estejam disponíveis em toda a árvore de componentes.

## 2\. AppNavigator.tsx

Este arquivo define o navegador principal do aplicativo, utilizando um createNativeStackNavigator para gerenciar as diferentes telas.

```typescript
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TelaDeCadastro from '../screens/TelaDeCadastro';
import TelaDeEstoque from '../screens/TelaDeEstoque';
import TelaDeRelatorio from '../screens/TelaDeRelatorio';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Cadastro" component={TelaDeCadastro} />
      <Stack.Screen name="Estoque" component={TelaDeEstoque} />
      <Stack.Screen name="Relatorio" component={TelaDeRelatorio} />
    </Stack.Navigator>
  );
}
```

### Descrição:

Este arquivo define a estrutura de navegação da aplicação utilizando `createNativeStackNavigator` do React Navigation. Ele cria uma pilha de telas que podem ser navegadas, cada uma associada a um nome de rota e um componente React. A tela inicial (`HomeScreen`) é configurada para não exibir o cabeçalho padrão, enquanto as outras telas (`TelaDeCadastro`, `TelaDeEstoque`, `TelaDeRelatorio`) usam o cabeçalho padrão da pilha de navegação.

### Responsabilidades:

O AppNavigator.tsx é responsável por gerenciar as transições entre as diferentes telas da aplicação. Ele define quais telas estão disponíveis e como elas se relacionam na pilha de navegação, permitindo que o usuário se mova de uma tela para outra de forma intuitiva.

## 3\. HomeScreen.tsx

Esta tela é a tela inicial do aplicativo, apresentando botões para acessar as outras funcionalidades.

```typescript
import { StyleSheet, View } from 'react-native';
import CustomButton from '../components/button/CustomButton';
import buttonStyle from '../components/button/CustomButtonStyle/ButtonStyle';
import CustomHeader from '../components/button/header/CustomHeader';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <CustomHeader
        title="Gerenciador de Estoque da Eita Sorvete Açaí Lanches"
        imageSource={require('../../assets/eitaSorveteAcaiLanchesLOGO.jpg')}
      />

      <View style={buttonStyle.CustomButtonView}>
        <CustomButton
          title="Cadastro de Itens"
          onPress={() => navigation.navigate('Cadastro')}
        />
      </View>
      <View style={buttonStyle.CustomButtonView}>
        <CustomButton
          title="Visualizar Estoque"
          onPress={() => navigation.navigate('Estoque')}
        />
      </View>
      <View style={buttonStyle.CustomButtonView}>
        <CustomButton
          title="Gerar Relatório"
          onPress={() => navigation.navigate('Relatorio')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
```

### Descrição:

Este componente representa a tela inicial da aplicação. Ele é estruturado com um `View` principal que contém um cabeçalho personalizado (`CustomHeader`) e três botões (`CustomButton`). Cada botão navega para uma tela específica da aplicação (Cadastro, Estoque, Relatório) quando pressionado.

### Responsabilidades:

A HomeScreen é responsável por fornecer ao usuário o ponto de partida e o acesso rápido às principais funcionalidades do sistema de gerenciamento de estoque. Ela atua como um hub central para as operações do aplicativo.

## 4\. TelaDeCadastro.tsx

Esta tela representa a funcionalidade de cadastro de novos itens no estoque.

```typescript
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
      Alert.alert(
        'Erro',
        'Quantidade inválida. Insira somente números inteiros.',
      );
      return;
    }
    if (!precoValido) {
      Alert.alert(
        'Erro',
        'Preço inválido. Insira um valor numérico com decimal.',
      );
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
//...
```

### Descrição:

Este componente implementa a tela de cadastro de novos itens no estoque. Ele utiliza estados locais para gerenciar os valores dos campos de entrada de texto e inclui validações em tempo real para os campos de quantidade e preço. Ao pressionar "Salvar", os dados são validados e, se corretos, um novo produto é criado e inserido no banco de dados através da função `insertProduto` do serviço.

### Responsabilidades:

A `TelaDeCadastro` é responsável por coletar, validar e persistir as informações de um novo item no banco de dados do sistema. Ela garante a integridade dos dados inseridos pelo usuário antes de salvá-los e fornece feedback sobre o sucesso ou falha da operação.

## 5\. TelaDeEstoque.tsx

```typescript
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

// ...

export default function TelaDeEstoque() {
    // ...
}

const styles = StyleSheet.create({
  // ...
});
```

### Descrição:

Este componente exibe uma tabela paginada (`DataTable`) com todos os itens do estoque, buscando os dados do banco de dados SQLite. A tela é forçada para a orientação de paisagem (`LANDSCAPE`) para melhor visualização da tabela. Na parte inferior, dois botões permitem ao usuário "Reduzir Quantidade" ou "Excluir Item", abrindo modais com formulários para inserir o ID do produto e a quantidade (se aplicável) para executar a ação desejada.

### Responsabilidades:

A `TelaDeEstoque` é responsável por:

  * Apresentar uma visão organizada e paginada dos itens em estoque.
  * Buscar e exibir os dados mais recentes do banco de dados.
  * Fornecer uma interface (via modais) para que o usuário possa modificar o estoque (reduzir quantidade) ou remover itens, interagindo com o banco de dados através das funções do `produtoServiço`.

## 6\. TelaDeRelatorio.tsx

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//TODO: Tela de Relatorio
export default function TelaDeRelatorio() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela De Relatorio</Text>
    </View>
  );
}
//...
```

### Descrição:

Este componente é um placeholder para a futura funcionalidade de relatórios da aplicação. Atualmente, ele exibe apenas um texto simples e contém um comentário `//TODO:` indicando que a implementação ainda está pendente.

### Responsabilidades:

No futuro, será responsável por gerar e exibir relatórios sobre o estoque, fornecendo insights e análises baseadas nos dados dos itens.

## 7\. produtoServiço.tsx

Este arquivo centraliza toda a lógica de interação com o banco de dados SQLite.

```typescript
import { type SQLiteDatabase } from 'expo-sqlite';
import Produto from '../modelo/produtoModel';

// ... interfaces

export async function initializeDatabase(database: SQLiteDatabase) {
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
}

export async function insertProduto(db: SQLiteDatabase, produto: Produto) {
  // ...
}

export async function getAllProdutos(
  database: SQLiteDatabase,
): Promise<EstoqueItem[]> {
  // ...
}

export async function deleteProduto(db: SQLiteDatabase, id: number) {
  // ...
}

export async function reduceProdutoQuantidade(
  db: SQLiteDatabase,
  id: number,
  quantidadeAReduzir: number,
) {
  // ...
}
```

### Descrição:

Este arquivo atua como a camada de serviço de dados da aplicação. Ele contém todas as funções necessárias para interagir com o banco de dados `expo-sqlite`, incluindo a criação da tabela, inserção, busca, deleção e atualização de produtos.

### Responsabilidades:

  * **Inicialização do Banco de Dados:** Contém a função `initializeDatabase` para criar a tabela de produtos.
  * **Operações CRUD:** É responsável por todas as operações de Criar (`insertProduto`), Ler (`getAllProdutos`), Atualizar (`reduceProdutoQuantidade`) e Deletar (`deleteProduto`).
  * **Abstração:** Abstrai a lógica de acesso ao banco de dados dos componentes da interface, tornando o código mais organizado e fácil de manter.

## Usando o Prettier

```bash
npx prettier --write .
```

### Em um arquivo específico

```bash
npx prettier --write src/App.js
```

### Ver quais arquivos vão ser formatados

```bash
npx prettier --check .
```
