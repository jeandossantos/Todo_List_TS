import { NavigationContainer } from '@react-navigation/native';
import { DrawerStack } from './Drawer.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}
