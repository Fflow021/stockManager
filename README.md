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

## 1. App.tsx

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

Este é o ponto de entrada principal da aplicação React Native. Ele configura a estrutura fundamental, envolvendo a navegação e o tema global da interface do usuário. A aplicação é encapsulada por dois componentes principais: o NavigationContainer do React Navigation para gerenciar a navegação entre as telas e o PaperProvider do React Native Paper para fornecer o contexto de tema e estilo para os componentes da UI. Dentro desses provedores, o AppNavigator é renderizado, o que define as rotas da aplicação.

### Responsabilidades:

O arquivo App.tsx é responsável por inicializar a aplicação, envolvendo-a no contexto de navegação do React Navigation e aplicando o tema de design Material Design a todos os componentes da interface. Ele atua como o root da aplicação, garantindo que os componentes de navegação e UI estejam disponíveis em toda a árvore de componentes.

## 2. AppNavigator.tsx

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

Este arquivo define a estrutura de navegação da aplicação utilizando createNativeStackNavigator do React Navigation. Ele cria uma pilha de telas que podem ser navegadas, cada uma associada a um nome de rota e um componente React. A tela inicial (HomeScreen) é configurada para não exibir o cabeçalho padrão, enquanto as outras telas (TelaDeCadastro, TelaDeEstoque, TelaDeRelatorio) usam o cabeçalho padrão da pilha de navegação.

### Responsabilidades:

O AppNavigator.tsx é responsável por gerenciar as transições entre as diferentes telas da aplicação. Ele define quais telas estão disponíveis e como elas se relacionam na pilha de navegação, permitindo que o usuário se mova de uma tela para outra de forma intuitiva.

## 3. HomeScreen.tsx

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

Este componente representa a tela inicial da aplicação. Ele é estruturado com um View principal que contém um cabeçalho personalizado (CustomHeader) e três botões (CustomButton). Cada botão navega para uma tela específica da aplicação (Cadastro, Estoque, Relatório) quando pressionado. Os estilos para o contêiner e para os botões são importados de arquivos de estilo separados.

### Responsabilidades:

A HomeScreen é responsável por fornecer ao usuário o ponto de partida e o acesso rápido às principais funcionalidades do sistema de gerenciamento de estoque, como o cadastro de itens, a visualização do estoque e a geração de relatórios. Ela atua como um hub central para as operações do aplicativo.

## 4. TelaDeCadastro.tsx

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
```

### Descrição:

Este componente implementa a tela de cadastro de novos itens no estoque. Ele utiliza estados locais para gerenciar os valores dos campos de entrada de texto, como nome, quantidade, preço de compra, descrição e código do item. A tela inclui validações em tempo real para os campos de quantidade e preço, exibindo mensagens de erro se os dados inseridos não corresponderem ao formato esperado. Um botão "Salvar" permite submeter os dados, exibindo um alerta de sucesso ou erro. A tela é envolta por um ScrollView para garantir que o conteúdo seja rolado em dispositivos com telas menores e exibe um cabeçalho personalizado no rodapé.

### Responsabilidades:

A TelaDeCadastro é responsável por coletar as informações necessárias para registrar um novo item no sistema de estoque. Ela assegura que os dados inseridos pelo usuário sejam válidos antes de serem processados e salvos (atualmente logados no console), garantindo a integridade das informações do produto.

## 5. TeladeEstoque.tsx

```typescript
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
```

### Descrição

Este componente exibe uma tabela de itens do estoque utilizando o componente DataTable do React Native Paper. Ele gerencia a paginação dos itens e força a orientação da tela para o modo paisagem (LANDSCAPE) ao ser montado, retornando à orientação retrato (PORTRAIT_UP) ao ser desmontado, o que é útil para exibir tabelas com muitas colunas. Os dados dos itens são fornecidos por um mock estático, e a tabela é renderizada dentro de um ScrollView para permitir a rolagem se houver muitos itens ou se a tela for menor.

### Responsabilidades

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
