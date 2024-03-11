import { StyleSheet } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { supabase } from '../utils/supabase';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function EditTaskModal({
  editMode,
  setEditMode,
  ticket,
  editedTicket,
  setEditedTicket,
}) {
  const editTicket = async (id) => {
    if (editedTicket.status === 'resolved') {
      console.log('Would Normally send email here with body...');
    }
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

  // Would be modified depending on user permissions to add or remove certain editing fields such as status and overriding who completed a task

  return (
    <Portal>
      <Modal
        visible={editMode}
        onDismiss={() => setEditMode(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <Text>Edit Ticket</Text>
        <TextInput
          defaultValue={ticket && ticket.title}
          underlineColor='#00531B'
          activeUnderlineColor='#00531B'
          style={styles.textInput}
          contentStyle={styles.textInputContent}
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
          defaultValue={ticket && ticket.description}
          underlineColor='#00531B'
          activeUnderlineColor='#00531B'
          style={styles.textInput}
          contentStyle={styles.textInputContent}
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
        <Button
          mode='contained'
          onPress={() => editTicket(ticket.id)}
          style={styles.submitButton}
        >
          Submit
        </Button>
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

  textInput: {
    margin: 10,
  },
  textInputContent: {
    backgroundColor: '#e8e8e8',
  },
  uploadButton: {
    margin: 5,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#00531B',
  },
});
