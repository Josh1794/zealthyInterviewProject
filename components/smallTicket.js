import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function SmallTicket({ item, navigation }) {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('LargeTask', { id: item.id });
      }}
      style={styles.item}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Checkbox.Android status={item.complete ? 'checked' : 'unchecked'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: '1px',
    borderRadius: '8px',
    marginTop: 5,
    alignSelf: 'center',
    paddingLeft: 5,
  },
  itemTitle: {
    width: '50%',
    overflow: 'hidden',
  },
});
