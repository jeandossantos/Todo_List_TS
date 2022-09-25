import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { Background } from './src/components/Background';
import { Login } from './src/screens/Login';
import { Routes } from './src/routes';
import { AuthContextProvider } from './src/contexts/authContext';

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
