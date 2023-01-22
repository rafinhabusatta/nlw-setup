import { createNativeStackNavigator } from '@react-navigation/native-stack'; // para criar estratégia de navegação

const { Navigator, Screen } = createNativeStackNavigator();
// criar escopo da rota / definir qual tela renderizar para cada rota

import { Home } from '../screens/Home';
import { New } from '../screens/New';
import { Habit } from '../screens/Habit';

export function AppRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
    <Screen 
      name="home" 
      component={Home} 
    />
    <Screen
      name="new"
      component={New}
    />
    <Screen
      name="habit"
      component={Habit}
    />
  </Navigator>
  )
}
