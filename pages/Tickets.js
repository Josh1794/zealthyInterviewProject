import { View, Text, FlatList } from 'react-native';
import SmallTicket from '../components/smallTicket';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Button } from 'react-native-paper';

export default function Tickets({ navigation }) {
  const [tickets, setTickets] = useState();
  navigation.setOptions({
    headerRight: () => (
      <Button onPress={() => navigation.navigate('AddTicket')} icon='plus' />
    ),
  });
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      console.log('Hello Here');
      getTickets();
    });
    const getTickets = async () => {
      try {
        const { data: tickets, error } = await supabase
          .from('tickets')
          .select();

        if (error) {
          console.error('Error fetching tickets:', error.message);
          return;
        }

        if (tickets && tickets.length > 0) {
          setTickets(tickets);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error.message);
      }
    };
  }, [navigation]);

  return (
    <View>
      <Text>Zealthy Ticketing System</Text>
      <FlatList
        data={tickets}
        renderItem={({ item }) => (
          <SmallTicket item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
