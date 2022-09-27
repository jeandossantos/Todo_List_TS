import { useEffect, useState } from 'react';
import { Button, FlatList, SafeAreaView, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { TaskCard } from '../../components/TaskCard';
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

interface PaginatedTask {
  tasks: Task[];
  count: number;
  limit: number;
}
export function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);

  const { logout } = useAuth();

  useEffect(() => {
    api.get<PaginatedTask>('/tasks').then((resp) => {
      setTasks(resp.data.tasks);
      setCount(resp.data.count);
      setLimit(resp.data.limit);
    });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Tarefas</Text>
        <FlatList
          contentContainerStyle={styles.contentList}
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard key={item.id} nameTask={item.name} />
          )}
        />
        <Button onPress={logout} title="Sair" />
      </SafeAreaView>
    </Background>
  );
}
