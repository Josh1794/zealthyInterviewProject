import { useState } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';

export default function SmallTicket({ item, navigation }) {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('LargeTicket', { id: item.id });
      }}
      style={styles.item}
    >
      <View style={styles.itemLeftContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>
          Description: {item.description}
        </Text>
      </View>
      <Text> Status: </Text>
      <Text
        style={{
          color:
            item.status === 'new'
              ? 'red'
              : item.status === 'in progress'
              ? 'goldenrod'
              : '#00531B',
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
    paddingVertical: 10,
    height: 70,
    backgroundColor: 'white',
    borderColor: '#999',
  },
  itemLeftContent: { width: '65%' },
  itemTitle: {
    fontWeight: 'bold',
  },
  itemDescription: { overflow: 'hidden' },
});
