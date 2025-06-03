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
