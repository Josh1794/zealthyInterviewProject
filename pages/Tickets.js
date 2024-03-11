import { View, FlatList, StyleSheet, Image } from 'react-native';
import SmallTicket from '../components/smallTicket';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Button, Text } from 'react-native-paper';

export default function Tickets({ navigation }) {
  const [tickets, setTickets] = useState();
  // const [users, setUsers] = useState();

  navigation.setOptions({
    headerRight: () => (
      <Button
        textColor='black'
        style={{ justifyContent: 'center' }}
        onPress={() => navigation.navigate('AddTicket')}
        icon='plus'
      />
    ),
  });
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTickets();
      // getUsers();
    });
    const getTickets = async () => {
      try {
        const { data: tickets, error } = await supabase
          .from('tickets')
          .select();

        if (error) {
          console.error('Error fetching tickets:', error.message);
          return;
        }

        if (tickets && tickets.length > 0) {
          setTickets(tickets);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error.message);
      }
    };

    // Retrieves Users would be used to determine user permissions and what to show them

    // const getUsers = async () => {
    //   try {
    //     const { data: users, error } = await supabase.from('users').select();

    //     if (error) {
    //       console.error('Error fetching users:', error.message);
    //       return;
    //     }

    //     if (users && users.length > 0) {
    //       setUsers(users);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching users:', error.message);
    //   }
    // };
  }, [navigation]);

  // Signed in users would see their own tickets where as IT Users would see all tickets
  // Backend includes additional fields for determining who created a ticket and who completed it
  return (
    <View>
      <Image
        style={styles.header}
        height={30}
        resizeMode='contain'
        source={{
          uri: 'https://d9hhrg4mnvzow.cloudfront.net/www.getzealthy.com/62505a5b-f5ce-4614-9fb2-d565091ed7bb-7a9110e1-4a3b-42bb-8ee9-fde718b5b632-zealthy.png',
        }}
      />
      <FlatList
        data={tickets}
        renderItem={({ item }) => (
          <SmallTicket item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
  },
});
