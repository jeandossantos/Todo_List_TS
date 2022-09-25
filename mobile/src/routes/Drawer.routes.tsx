import { createDrawerNavigator } from '@react-navigation/drawer';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Home } from '../screens/Home';
import { Login } from '../screens/Login';

const Drawer = createDrawerNavigator();

export function DrawerStack() {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={'#ccc'} />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {signed ? (
        <Drawer.Screen name="home" component={Home} />
      ) : (
        <Drawer.Screen name="login" component={Login} />
      )}
    </Drawer.Navigator>
  );
}
