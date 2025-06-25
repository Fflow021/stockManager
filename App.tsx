import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';
import { initializeDatabase } from './src/serviço/produtoServiço';

export default function App() {
  console.log('[DEBUG] Componente App renderizando.');

  const handleDbError = (error: Error) => {
    console.error('[DEBUG] Erro no SQLiteProvider:', error);
  };

  return (
    <SQLiteProvider
      databaseName="produtos_db"
      onInit={initializeDatabase}
      onError={handleDbError}
    >
      <NavigationContainer>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </NavigationContainer>
    </SQLiteProvider>
  );
}