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
      <Text
        style={{
          color:
            item.status === 'new'
              ? 'green'
              : item.status === 'in progress'
              ? 'gold'
              : 'red',
        }}
      >
        {item.status}
      </Text>
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
    paddingRight: 5,
    height: 50,
    backgroundColor: '#999',
  },
  itemTitle: {
    width: '50%',
    overflow: 'hidden',
  },
});
