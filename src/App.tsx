import { StyleSheet, View} from 'react-native';
import CustomButton from './components/button/CustomButton';
import buttonStyle from './styles/CustomButtonStyle/ButtonStyle';
import CustomHeader from './components/button/header/CustomHeader';

export default function App() {
  return (
    <View style={styles.container}>
      <CustomHeader 
      title='Gerenciador de Estoque da Eita Sorvete Açaí Lanches'
      imageSource={require('../assets/eitaSorveteAcaiLanchesLOGO.jpg')} />

      <View style={buttonStyle.CustomButtonView}>
        <CustomButton 
          title='Cadastro de Itens'
          onPress={() => alert('Funcionou 1')}
          
        />
      </View>
      <View style={buttonStyle.CustomButtonView}>
        <CustomButton
          title='Visualizar Estoque'
          onPress={() => alert('Funcionou 2')}
        />
      </View>
      <View style={buttonStyle.CustomButtonView}>
        <CustomButton
          title='Gerar Relatório'
          onPress={() => alert('Funcionou 3')}
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