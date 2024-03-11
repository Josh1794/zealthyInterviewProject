import { SafeAreaView, View, StyleSheet, Image } from 'react-native';
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
  const [editedTicket, setEditedTicket] = useState();

  useEffect(() => {
    setEditedTicket({
      title: ticket && ticket.title,
      description: ticket && ticket.description,
      status: ticket && ticket.status,
    });
  }, [ticket]);

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
        textColor='black'
        icon='pencil'
        onPress={() => {
          setEditMode(true);
        }}
      >
        Edit
      </Button>
    ),
    headerTitle: 'Ticket',
  });

  return (
    <PaperProvider>
      <SafeAreaView>
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator color='#00531B' />
          ) : (
            <>
              <View style={styles.contentHeader}>
                <Text style={styles.title}>
                  Title: {ticket && ticket.title}
                </Text>
                <Text style={styles.status}>
                  Status: {ticket && ticket.status}
                </Text>
              </View>
              <Text style={styles.description}>
                Description: {ticket && ticket.description}
              </Text>
              <Text>User: {ticket && ticket.createdBy}</Text>
              <Text>
                If backend storage was paid for I would display photo here
              </Text>
              <Image
                style={{ alignSelf: 'center', marginTop: 10 }}
                source={require('../assets/R.732bb9a21aa32bacc9daeae6fca08f94.png')}
              />
            </>
          )}
        </View>
        {ticket && (
          <EditTaskModal
            editMode={editMode}
            setEditMode={setEditMode}
            ticket={ticket}
            editedTicket={editedTicket}
            setEditedTicket={setEditedTicket}
          />
        )}
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  },
  description: {
    fontSize: 16,
  },
  status: {
    fontSize: 20,
  },
});
