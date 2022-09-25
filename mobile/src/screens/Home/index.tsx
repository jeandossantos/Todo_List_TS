import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { useAuth } from '../../hooks/useAuth';

import { styles } from './styles';

export function Home() {
  const { logout, user } = useAuth();

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View>
          <Button onPress={logout} title="Sair" />
        </View>
      </SafeAreaView>
    </Background>
  );
}
