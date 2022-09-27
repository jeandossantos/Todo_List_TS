import { StatusBar } from 'expo-status-bar';

import { Background } from './src/components/Background';
import { Routes } from './src/routes';
import { AuthContextProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <Background>
      <StatusBar translucent style="light" />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </Background>
  );
}
