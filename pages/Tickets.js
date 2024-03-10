import { View, Text, FlatList } from 'react-native';
import SmallTicket from '../components/smallTicket';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export default function Tickets({ navigation }) {
  const [tickets, setTickets] = useState();

  useEffect(() => {
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

    getTickets();
  }, []);
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
