import { StyleSheet } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { supabase } from '../utils/supabase';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function EditTaskModal({ editMode, setEditMode, ticket }) {
  const [editedTicket, setEditedTicket] = useState({
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
  });
  console.log(editedTicket);
  const editTicket = async (id) => {
    try {
      const { data: ticket, error } = await supabase
        .from('tickets')
        .update(editedTicket)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error fetching ticket:', error.message);
        return;
      }

      if (ticket && ticket.length > 0) {
        console.log('Hello', ticket);
        setEditedTicket({
          title: ticket.title,
          description: ticket.description,
          status: ticket.status,
        });
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error fetching ticket:', error.message);
    }
  };

  return (
    <Portal>
      <Modal
        visible={editMode}
        onDismiss={() => setEditMode(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <Text>Edit Ticket</Text>
        <TextInput
          defaultValue={ticket.title}
          style={styles.textInput}
          onChangeText={(text) =>
            setEditedTicket({
              title: text,
              description: editedTicket.description,
              status: editedTicket.status,
            })
          }
        />
        <TextInput
          multiline
          defaultValue={ticket.description}
          style={styles.textInput}
          onChangeText={(text) =>
            setEditedTicket({
              title: editedTicket.title,
              description: text,
              status: editedTicket.status,
            })
          }
        />
        <Picker
          selectedValue={editedTicket.status}
          defaultValue={editedTicket.status}
          onValueChange={(value) =>
            setEditedTicket({
              title: editedTicket.title,
              description: editedTicket.description,
              status: value,
            })
          }
        >
          <Picker.Item label='New' value={'new'} />
          <Picker.Item label='In Progress' value={'in progress'} />
          <Picker.Item label='Resolved' value={'resolved'} />
        </Picker>
        <Button onPress={() => editTicket(ticket.id)}>Submit</Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
  },
  textInput: {
    margin: 10,
  },
  submitButton: {
    width: 200,
    marginLeft: 5,
  },
});
