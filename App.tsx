import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './src/serviço/produtoServiço';

export default function App() {
  return (
    <SQLiteProvider databaseName='produtos_db'
    onInit={initializeDatabase}>
      <NavigationContainer>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
