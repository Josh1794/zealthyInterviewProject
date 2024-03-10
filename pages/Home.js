import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { supabase } from '../utils/supabase';

export default function Home({ navigation }) {
  navigation.setOptions({
    headerRight: () => (
      <Button onPress={() => navigation.navigate('AddTask')} icon='plus' />
    ),
  });

  return (
    <SafeAreaView>
      <StatusBar style='auto' />
    </SafeAreaView>
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
