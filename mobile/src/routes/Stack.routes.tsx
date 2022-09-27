import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Loading } from '../components/Loading';
import { useAuth } from '../hooks/useAuth';

import { Login } from '../screens/Login';
import { ActivityIndicator, View } from 'react-native';
import { Task } from '../screens/Task';

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  const { signed, loading } = useAuth();

  if (loading) {
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#666" />
    </View>;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {signed ? (
        <Stack.Screen name="Task" component={Task} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}
