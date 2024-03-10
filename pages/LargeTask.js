import { SafeAreaView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { supabase } from '../utils/supabase';

export default function LargeTask({ route, navigation }) {
  const [ticket, setTicket] = useState();

  useEffect(() => {
    const getTicket = async () => {
      try {
        const { data: ticket, error } = await supabase
          .from('tickets')
          .select()
          .eq('id', id);

        if (error) {
          console.error('Error fetching ticket:', error.message);
          return;
        }

        if (ticket && ticket.length > 0) {
          setTicket(ticket[0]);
        }
      } catch (error) {
        console.error('Error fetching ticket:', error.message);
      }
    };

    getTicket();
  }, []);

  navigation.setOptions({
    headerLeft: () => (
      <Button
        type='text'
        icon='arrow-left'
        textColor='black'
        onPress={() => {
          navigation.navigate('Tickets');
        }}
      >
        Back
      </Button>
    ),
    headerTitle: () => <Text variant='headlineSmall'>Ticket</Text>,
  });

  const { id } = route.params;

  return (
    <SafeAreaView>
      <Text>{ticket && ticket.title}</Text>
      <Text>{ticket && ticket.description}</Text>
      <Text>{ticket && ticket.status}</Text>
    </SafeAreaView>
  );
}
