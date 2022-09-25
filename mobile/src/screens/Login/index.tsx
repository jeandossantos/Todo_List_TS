import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Background } from '../../components/Background';

import { styles } from './styles';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/useAuth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  async function handleLogin() {
    await login(email, password);
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logoImg} />

        <View style={styles.loginForm}>
          <Text style={styles.title}>Faça Login</Text>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Insira seu e-mail"
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry
            placeholder="Insira sua senha"
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Cadastra-se</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Background>
  );
}
