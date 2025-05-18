# Gerenciador de Estoque Eita Sorvete Açaí Lanches
Documentação do Projeto:  documentação descreve a estrutura e o funcionamento do aplicativo "Gerenciador de Estoque Eita Sorvete Açaí Lanches", desenvolvido utilizando React Native. O aplicativo tem como objetivo facilitar o gerenciamento de estoque da empresa, oferecendo funcionalidades para cadastro de itens, visualização do estoque atual e geração de relatórios.

1. Arquivo: App.js
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
Responsabilidades:

Servir como o componente inicial que envolve toda a estrutura de navegação do aplicativo.
Inicializar o ambiente de navegação do React Navigation.
Renderizar o componente responsável por definir as rotas do aplicativo (AppNavigator).
2. Arquivo: src/navigation/AppNavigator.js
Este arquivo define o navegador principal do aplicativo, utilizando um StackNavigator para gerenciar as diferentes telas.


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
Responsabilidades:

Definir a estrutura de navegação principal do aplicativo utilizando um navegador de pilha.
Mapear cada rota a um componente de tela específico.
Configurar opções de visualização para cada tela (como a exibição do cabeçalho).
3. Arquivo: src/screens/HomeScreen.js
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
Responsabilidades:

Apresentar a tela inicial do aplicativo com as principais funcionalidades.
Permitir a navegação para as outras telas do aplicativo através dos botões.
Exibir o cabeçalho personalizado com o título e a logo do aplicativo.
4. Arquivo: src/screens/TelaDeCadastro.js
Esta tela representa a funcionalidade de cadastro de novos itens no estoque. Atualmente, possui apenas um texto indicativo.


```JavaScript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TelaDeCadastro() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Cadastro de Itens</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
```
### Descrição:

Importa as bibliotecas React, View e Text do react-native, além de StyleSheet.
O componente funcional TelaDeCadastro renderiza um View que centraliza um componente Text.
O Text exibe a mensagem "Tela de Cadastro de Itens", indicando a funcionalidade desta tela.
Define um StyleSheet para estilizar o container e o texto.
Responsabilidades (Atualmente):

Exibir uma interface básica indicando a tela de cadastro de itens.
Servir como um placeholder para a futura implementação da lógica de cadastro.
5. Arquivo: src/screens/TelaDeEstoque.js
Esta tela destina-se à visualização do estoque atual. Atualmente, exibe apenas um texto indicativo.


```JavaScript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TelaDeEstoque() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Estoque</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
```
### Descrição:

Similar à TelaDeCadastro, importa as bibliotecas React, View, Text e StyleSheet.
O componente funcional TelaDeEstoque renderiza um View que centraliza um componente Text.
O Text exibe a mensagem "Tela de Estoque", indicando a funcionalidade desta tela.
Define um StyleSheet para estilizar o container e o texto.
Responsabilidades (Atualmente):

Exibir uma interface básica indicando a tela de visualização do estoque.
Servir como um placeholder para a futura implementação da lógica de visualização do estoque.
6. Arquivo: src/screens/TelaDeRelatorio.js
Esta tela será utilizada para gerar relatórios do estoque. Atualmente, exibe apenas um texto indicativo.


```JavaScript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TelaDeRelatorio() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela De Relatorio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
```
### Descrição:

Semelhante às telas anteriores, importa as bibliotecas React, View, Text e StyleSheet.
O componente funcional TelaDeRelatorio renderiza um View que centraliza um componente Text.
O Text exibe a mensagem "Tela De Relatorio", indicando a funcionalidade desta tela.
Define um StyleSheet para estilizar o container e o texto.
Responsabilidades (Atualmente):

Exibir uma interface básica indicando a tela de geração de relatórios.
Servir como um placeholder para a futura implementação da lógica de geração de relatórios.
7. Arquivo: src/styles/CustomButtonStyle/ButtonStyle.js
Este arquivo define estilos reutilizáveis para os botões customizados.


```JavaScript
import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
  CustomButtonView: {
    alignItems: 'stretch',
    position: 'relative',
    paddingVertical: 5,
    paddingHorizontal: 10
  }
});

export default buttonStyles;
```
### Descrição:

Importa a biblioteca StyleSheet do react-native.
Cria um objeto buttonStyles utilizando StyleSheet.create() para definir estilos.
CustomButtonView: Um estilo para o container que envolve o CustomButton.
alignItems: 'stretch': Faz com que os itens filhos (neste caso, o botão) se estendam ao longo do eixo transversal do container.
position: 'relative': Permite que posicionamentos relativos sejam aplicados a elementos filhos, se necessário.
paddingVertical: 5: Define um preenchimento vertical de 5 unidades.
paddingHorizontal: 10: Define um preenchimento horizontal de 10 unidades.
Exporta o objeto buttonStyles para ser utilizado em outros componentes.
Responsabilidades:

Centralizar e fornecer estilos consistentes para os containers dos botões customizados no aplicativo.
8. Arquivo: src/styles/CustomHeaderStyle/CustomHeaderStyle.js
Este arquivo define estilos para o componente de cabeçalho customizado (CustomHeader).


```JavaScript
import { StyleSheet } from 'react-native';

const CustomHeaderStyles = StyleSheet.create({
    headerContainer: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: '#502f5a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        color: '#efbd10',
        fontWeight: 'bold',
        marginTop: 10
    },
    headerImage: {
        width: 60,
        height: 60
    },
});

export default CustomHeaderStyles;
```
### Descrição:

Importa a biblioteca StyleSheet do react-native.
Cria um objeto CustomHeaderStyles utilizando StyleSheet.create() para definir estilos para o cabeçalho.
headerContainer: Estilos para o container principal do cabeçalho.
paddingVertical: Define um preenchimento vertical de 20 unidades.
paddingHorizontal: Define um preenchimento horizontal de 16 unidades.
backgroundColor: Define a cor de fundo como #502f5a (um tom de roxo).
alignItems: 'center': Centraliza os itens filhos horizontalmente.
justifyContent: 'center': Centraliza os itens filhos verticalmente.
headerText: Estilos para o texto do título no cabeçalho.
fontSize: Define o tamanho da fonte como 24.
color: Define a cor do texto como #efbd10 (um tom de amarelo).
fontWeight: Define o peso da fonte como negrito.
marginTop: Define uma margem superior de 10 unidades.
headerImage: Estilos para a imagem exibida no cabeçalho.
width: Define a largura da imagem como 60 unidades.
height: Define a altura da imagem como 60 unidades.
Exporta o objeto CustomHeaderStyles para ser utilizado no componente CustomHeader.
Responsabilidades:

Fornecer estilos consistentes para a aparência do cabeçalho customizado em diferentes telas do aplicativo.
9. Arquivo: src/components/button/CustomButton.js
Este arquivo define um componente de botão customizado reutilizável.


```JavaScript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import buttonStyles from '../../styles/CustomButtonStyle/ButtonStyle';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && styles.disabled,
        style, // estilo externo personalizado
      ]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#efbd10',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
```
### Descrição:

Importa as bibliotecas React, TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle e TextStyle do react-native. Também importa os estilos de botão de ../../styles/CustomButtonStyle/ButtonStyle.
Define uma interface CustomButtonProps para tipar as propriedades do componente.
title: O texto a ser exibido no botão (string).
onPress: Uma função a ser chamada quando o botão é pressionado (recebe um GestureResponderEvent).
disabled (opcional): Um booleano que indica se o botão está desabilitado (default: false).
style (opcional): Estilos adicionais para o container do botão (ViewStyle).
textStyle (opcional): Estilos adicionais para o texto do botão (TextStyle).
O componente funcional CustomButton recebe as props definidas na interface.
Renderiza um TouchableOpacity, que é um componente que responde a toques.
onPress: A função passada como prop é executada ao pressionar o botão.
disabled: Controla se o botão está interativo ou não.