import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
export default function AddTask({ navigation }) {
  navigation.setOptions({
    headerLeft: () => (
      <Button
        type='text'
        icon='arrow-left'
        textColor='black'
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        Back
      </Button>
    ),
  });

  return (
    <View>
      <TextInput placeholder='Title'></TextInput>
      <TextInput placeholder='Description'></TextInput>
      <TextInput placeholder='Title'></TextInput>
      <TextInput></TextInput>
    </View>
  );
}
