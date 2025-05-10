import { StyleSheet, View} from 'react-native';
import CustomButton from './components/button/CustomButton';

export default function App() {
  return (
    <View style={styles.container}>
      <CustomButton
        title='Botao 1'
        onPress={() => alert('Funcionou')}
        style={{ backgroundColor: '#28a745', borderRadius: 20 }}
      />
      <CustomButton
        title='Botao 2'
        onPress={() => alert('Funcionou 2')}
      />
      <CustomButton
        title='Botao 3'
        onPress={() => alert('Funcionou 3')}
      />
      <View style={{padding:5}}>
        <CustomButton
          title='Botao 4'
          onPress={() => alert('Funcionou 4')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});