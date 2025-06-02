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
