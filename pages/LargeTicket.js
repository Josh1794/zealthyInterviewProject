import { SafeAreaView, View, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
} from 'react-native-paper';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import EditTaskModal from '../components/editTicketModal';

export default function LargeTicket({ route, navigation }) {
  const { id } = route.params;
  const [ticket, setTicket] = useState();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setLoading(true);
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
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching ticket:', error.message);
      }
    };

    getTicket();
  }, [id, editMode]);

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
    headerRight: () => (
      <Button
        icon='pencil'
        onPress={() => {
          setEditMode(true);
        }}
      >
        Edit
      </Button>
    ),
    headerTitle: () => <Text variant='headlineSmall'>Ticket</Text>,
  });

  return (
    <PaperProvider>
      <SafeAreaView>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Text>{ticket && ticket.title}</Text>
            <Text>{ticket && ticket.description}</Text>
            <Text>{ticket && ticket.status}</Text>
          </View>
        )}
        <EditTaskModal
          editMode={editMode}
          setEditMode={setEditMode}
          ticket={ticket}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}
