import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Tickets from './pages/Tickets';
import AddTicket from './pages/AddTicket';
import LargeTicket from './pages/LargeTicket';

export default function App() {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Tickets'>
        <Drawer.Screen name='Tickets' component={Tickets} />
        <Drawer.Screen name='AddTicket' component={AddTicket} />
        <Drawer.Screen name='LargeTicket' component={LargeTicket} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
