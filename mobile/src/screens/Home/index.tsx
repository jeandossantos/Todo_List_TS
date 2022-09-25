import { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

import { styles } from './styles';

interface Task {
  id: string;
  userId: string;
  name: string;
  description?: string;
  time: Date | null;
  done: boolean;
  createdAt: Date;
}
export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { logout, user } = useAuth();

  useEffect(() => {
    console.log('Home', user?.token);

    api.get('/tasks').then((resp) => console.log(resp.data));
  }, []);

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
