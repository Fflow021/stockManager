# Gerenciador de Estoque Eita Sorvete Açaí Lanches

Esta documentação descreve a estrutura e o funcionamento do aplicativo "Gerenciador de Estoque Eita Sorvete Açaí Lanches", desenvolvido utilizando React Native. O aplicativo tem como objetivo facilitar o gerenciamento de estoque da empresa, oferecendo funcionalidades para cadastro de itens, visualização do estoque atual e geração de relatórios.

## Tecnologias Utilizadas
- 18.3.1
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

## 1. App.tsx

Este é o ponto de entrada principal do aplicativo.

```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </NavigationContainer>
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
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
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
import { StyleSheet, View} from 'react-native';
import CustomButton from '../components/button/CustomButton';
import buttonStyle from '../styles/CustomButtonStyle/ButtonStyle';
import CustomHeader from '../components/button/header/CustomHeader';

export default function HomeScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <CustomHeader
        title='Gerenciador de Estoque da Eita Sorvete Açaí Lanches'
        imageSource={require('../../assets/eitaSorveteAcaiLanchesLOGO.jpg')} />

      <View style={buttonStyle.CustomButtonView}>
        <CustomButton
          title='Cadastro de Itens'
          onPress={() => navigation.navigate('Cadastro')}

        />
      </View>
      <View style={buttonStyle.CustomButtonView}>
        <CustomButton
          title='Visualizar Estoque'
          onPress={() => navigation.navigate('Estoque')}
        />
      </View>
      <View style={buttonStyle.CustomButtonView}>
        <CustomButton
          title='Gerar Relatório'
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
import { View, Button, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import CustomTextField from '../components/button/textField/CustomTextField';
import CustomHeader from '../components/button/header/CustomHeader';

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

```
### Descrição
Este componente exibe uma tabela de itens do estoque utilizando o componente DataTable do React Native Paper. Ele gerencia a paginação dos itens e força a orientação da tela para o modo paisagem (LANDSCAPE) ao ser montado, retornando à orientação retrato (PORTRAIT_UP) ao ser desmontado, o que é útil para exibir tabelas com muitas colunas. Os dados dos itens são fornecidos por um mock estático, e a tabela é renderizada dentro de um ScrollView para permitir a rolagem se houver muitos itens ou se a tela for menor.
### Responsabilidades
A TelaDeEstoque é responsável por apresentar uma visão organizada e paginada dos itens atualmente no estoque. Ela permite ao usuário visualizar rapidamente detalhes como nome, quantidade, preço unitário, descrição e código de cada item, facilitando o acompanhamento do inventário.
## 6. TeladeRelatório.tsx

```typescript
TODO: CODE HERE
```
### Descrição
Este componente é uma tela placeholder para a funcionalidade de relatórios da aplicação. Atualmente, ele exibe apenas um texto simples "Tela De Relatorio" centralizado na tela. O código inclui um comentário //TODO: indicando que a implementação completa da funcionalidade de relatórios ainda precisa ser desenvolvida.
### Responsabilidades
A TelaDeRelatorio tem a responsabilidade futura de gerar e exibir relatórios sobre o estoque, fornecendo insights e análises baseadas nos dados dos itens. No momento, sua responsabilidade é servir como um marcador de lugar para a funcionalidade a ser implementada.

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