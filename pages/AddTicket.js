import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { supabase } from '../utils/supabase';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';

export default function AddTicket({ navigation }) {
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    attachment: '',
    createdBy: 1,
  });

  const addTicket = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .insert(newTicket)
      .select();

    if (data && data.length > 0) {
      setNewTicket({
        title: '',
        description: '',
        attachment: '',
        createdBy: 1,
      });
      navigation.navigate('Tickets');
    } else if (error) {
      console.log(error);
    }
  };

  navigation.setOptions({
    headerLeft: () => (
      <Button
        type='text'
        icon='arrow-left'
        textColor='black'
        onPress={() => {
          setNewTicket({
            title: '',
            description: '',
            attachment: '',
            createdBy: 1,
          });
          navigation.navigate('Tickets');
        }}
      >
        Back
      </Button>
    ),
    headerTitle: 'Add Ticket',
  });

  return (
    <View>
      <TextInput
        underlineColor='#00531B'
        activeUnderlineColor='#00531B'
        style={styles.textInput}
        contentStyle={styles.textInputContent}
        placeholder='Title'
        label='Title'
        onChangeText={(text) =>
          setNewTicket({
            title: text,
            description: newTicket.description,
            attachment: newTicket.attachment,
          })
        }
      />
      <TextInput
        multiline
        underlineColor='#00531B'
        activeUnderlineColor='#00531B'
        style={styles.textInput}
        contentStyle={styles.textInputContent}
        placeholder='Description'
        label='Description'
        onChangeText={(text) =>
          setNewTicket({
            title: newTicket.title,
            description: text,
            attachment: newTicket.attachment,
          })
        }
      />
      {/* Without Backend storage available for free I am currently only displaying a native file picker but not sending it to the backend  */}
      <Button
        style={styles.uploadButton}
        textColor='#00531B'
        onPress={() => DocumentPicker.getDocumentAsync()}
      >
        Upload File
      </Button>
      <Button
        mode='contained'
        style={styles.submitButton}
        onPress={() => addTicket()}
      >
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 200,
    marginLeft: 5,
    marginTop: 20,
    backgroundColor: '#00531B',
  },
});
