import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Tickets from './pages/Tickets';
import AddTicket from './pages/AddTicket';
import LargeTicket from './pages/LargeTicket';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from './utils/supabase';
import Auth from './pages/Login';
import { View } from 'react-native';

export default function App() {
  const Drawer = createNativeStackNavigator();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    // <View>
    //   {session && session.user ? (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Tickets'>
        <Drawer.Screen name='Tickets' component={Tickets} />
        <Drawer.Screen name='AddTicket' component={AddTicket} />
        <Drawer.Screen name='LargeTicket' component={LargeTicket} />
      </Drawer.Navigator>
    </NavigationContainer>
    //   ) : (
    //     <Auth />
    //   )}
    // </View>
  );
}
