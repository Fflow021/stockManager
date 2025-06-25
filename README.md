# Gerenciador de Estoque Eita Sorvete Açaí Lanches

Esta documentação descreve a estrutura e o funcionamento do aplicativo "Gerenciador de Estoque Eita Sorvete Açaí Lanches", desenvolvido utilizando React Native. O aplicativo tem como objetivo facilitar o gerenciamento de estoque da empresa, oferecendo funcionalidades para cadastro de itens, visualização do estoque atual e geração de relatórios.

## Tecnologias Utilizadas

- React 18.3.1
- React-native 0.76.9
- Expo 52.0.46
- Roteamento: React Navigation
- Estilos: React Native Paper
- SQLite: Banco de dados local com `expo-sqlite`
- Geração de PDF: `expo-print`
- Compartilhamento: `expo-sharing`
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

A TelaDeEstoque é responsável por apresentar uma visão organizada e paginada dos itens atualmente no estoque. Ela permite ao usuário visualizar rapidamente detalhes como nome, quantidade, preço unitário, descrição e código de cada item, facilitando o acompanhamento do inventário.

## 6. TeladeRelatório.tsx

Esta tela busca os dados do estoque e gera um relatório em formato PDF que pode ser compartilhado.

```typescript

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
  
    return \`
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
          <p>Data de Geração: \${new Date().toLocaleDateString('pt-BR')}</p>
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
              \${productRows}
            </tbody>
          </table>
          <div class="footer">
            <p>Valor Total em Estoque: R$ \${totalValue.toFixed(2)}</p>
          </div>
        </body>
      </html>
    \`;
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
  }, [db]);

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

```

### Descrição

Este componente implementa a funcionalidade de geração de relatórios. Ao carregar, ele busca todos os produtos do banco de dados SQLite. O usuário pode então clicar em um botão para gerar um relatório em PDF, que é criado a partir de um template HTML preenchido com os dados do estoque. Após a geração, o menu de compartilhamento do sistema operacional é aberto para permitir que o usuário envie ou salve o arquivo PDF.

### Responsabilidades

A TelaDeRelatorio é responsável por consolidar os dados do estoque em um formato portátil (PDF) e facilitar sua distribuição. Ela abstrai a complexidade de buscar os dados, formatar o HTML, renderizar o PDF e interagir com as APIs de compartilhamento do dispositivo.

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
