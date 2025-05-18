# Gerenciador de Estoque Eita Sorvete Açaí Lanches
Esta documentação descreve a estrutura e o funcionamento do aplicativo "Gerenciador de Estoque Eita Sorvete Açaí Lanches", desenvolvido utilizando React Native. O aplicativo tem como objetivo facilitar o gerenciamento de estoque da empresa, oferecendo funcionalidades para cadastro de itens, visualização do estoque atual e geração de relatórios.

## 1. Arquivo: App.js
Este é o ponto de entrada principal do aplicativo.
```JavaScript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
```

### Descrição:
Importa as bibliotecas React, NavigationContainer do @react-navigation/native e o componente AppNavigator do arquivo ./src/navigation/AppNavigator.

O componente funcional App é o componente raiz do aplicativo.

NavigationContainer é um componente fornecido pelo React Navigation que envolve todo o sistema de navegação do aplicativo. Ele gerencia o estado de navegação e fornece o contexto necessário para os navegadores e rotas.

O componente AppNavigator (definido em ./src/navigation/AppNavigator) é renderizado dentro do NavigationContainer. Ele configura as rotas de navegação do aplicativo.
### Responsabilidades:
Servir como o componente inicial que envolve toda a estrutura de navegação do aplicativo.
Inicializar o ambiente de navegação do React Navigation.
Renderizar o componente responsável por definir as rotas do aplicativo (AppNavigator).
## 2. Arquivo: src/navigation/AppNavigator.js
Este arquivo define o navegador principal do aplicativo, utilizando um createNativeStackNavigator para gerenciar as diferentes telas.

```JavaScript
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
Importa as bibliotecas React e createNativeStackNavigator do @react-navigation/native-stack. Também importa os componentes de tela: HomeScreen, TelaDeCadastro, TelaDeEstoque e TelaDeRelatorio dos seus respectivos arquivos.

createNativeStackNavigator() cria um navegador de pilha que utiliza as APIs nativas para proporcionar uma melhor performance e experiência do usuário.

O componente funcional AppNavigator define as diferentes telas (rotas) do aplicativo usando o componente Stack.Navigator.
Cada Stack.Screen define uma tela individual:
name: O nome da rota, usado para navegar para esta tela.
component: O componente React a ser renderizado quando esta rota é acessada.
options: Um objeto para configurar a aparência da tela. No caso da tela "Home", headerShown: false oculta o cabeçalho padrão.
### Responsabilidades:
Definir a estrutura de navegação principal do aplicativo utilizando um navegador de pilha.
Mapear cada rota a um componente de tela específico.
Configurar opções de visualização para cada tela (como a exibição do cabeçalho).
## 3. Arquivo: src/screens/HomeScreen.js
Esta tela é a tela inicial do aplicativo, apresentando botões para acessar as outras funcionalidades.

```JavaScript
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
Importa as bibliotecas StyleSheet e View do react-native. Também importa os componentes customizados CustomButton e CustomHeader, e o estilo buttonStyle.
O componente funcional HomeScreen recebe o objeto navigation como uma prop, que é fornecido pelo React Navigation.
Renderiza um View como container principal.
Exibe um CustomHeader com o título do aplicativo e a logo da empresa.
Utiliza o componente CustomButton para criar três botões: "Cadastro de Itens", "Visualizar Estoque" e "Gerar Relatório".
A propriedade onPress de cada botão define a ação a ser executada quando o botão é pressionado. Nesse caso, navigation.navigate() é usado para navegar para a tela correspondente (Cadastro, Estoque ou Relatorio).
O estilo buttonStyle.CustomButtonView é aplicado aos containers dos botões para definir seu layout.
Define um StyleSheet para estilizar o container principal da tela.
### Responsabilidades:
Apresentar a tela inicial do aplicativo com as principais funcionalidades.
Permitir a navegação para as outras telas do aplicativo através dos botões.
Exibir o cabeçalho personalizado com o título e a logo do aplicativo.
## 4. Arquivo: src/screens/TelaDeCadastro.js
Esta tela representa a funcionalidade de cadastro de novos itens no estoque.

```JavaScript
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
Importa as bibliotecas React, useState, View, Button, StyleSheet, Alert, ScrollView e Text do react-native. Também importa os componentes customizados CustomTextField e CustomHeader.

Utiliza useState hooks para gerenciar os estados dos campos de entrada: nome, quantidade, precoCompra, descricao e codigo.
Define expressões regulares (quantidadeValida e precoValido) para validar os formatos de entrada de quantidade e preço.

A função salvar é chamada quando o botão "Salvar" é pressionado. Ela realiza as seguintes ações:
Valida se os campos de quantidade e preço estão no formato correto utilizando as expressões regulares. Se não estiverem válidos, exibe um Alert de erro e interrompe a função.

Cria um objeto dados contendo os valores dos campos de entrada. A quantidade é convertida para um número inteiro usando parseInt, e o preço de compra é convertido para um número decimal usando parseFloat após substituir a vírgula por ponto.
Exibe os dados cadastrados no console e mostra um Alert de sucesso.

A renderização do componente inclui:
1. Um ScrollView para permitir a rolagem da tela caso o conteúdo não caiba na tela.
2. Múltiplos componentes CustomTextField para cada campo de entrada (Nome, Quantidade, Preço de Compra, Descrição e Código). Cada CustomTextField recebe um label, o value do estado correspondente, a função onChangeText para atualizar o estado e um placeholder. O keyboardType é definido como numeric para o campo de quantidade e decimal-pad para o campo de preço.
3. Exibe mensagens de erro (Text com estilo errorText) caso os campos de quantidade ou preço sejam inválidos e tenham algum valor digitado.
4. Um Button "Salvar" que chama a função salvar quando pressionado. O botão é desabilitado (disabled) se a quantidade ou o preço não forem válidos.
5. Um View com estilos para o container do botão.
6. Um View para o footer que contém um CustomHeader com o título "Entrada de itens no estoque" e a logo da empresa.
7. Define um StyleSheet para estilizar os diversos elementos da tela, incluindo o wrapper, container, container do botão, texto de erro e footer.
### Responsabilidades:
Apresentar um formulário para o usuário inserir os detalhes de um novo item de estoque.
Gerenciar o estado de cada campo de entrada.
Validar a entrada dos campos de quantidade e preço.
Salvar os dados do item cadastrado (atualmente apenas log no console e um alerta de sucesso).
Exibir feedback visual para erros de validação.
Mostrar um cabeçalho personalizado na parte inferior da tela.