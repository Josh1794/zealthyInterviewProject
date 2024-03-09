import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Home from './pages/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Tickets from './pages/Tickets';
import Completed from './pages/Completed';
import AddTask from './pages/AddTask';
import LargeTask from './pages/LargeTask';
import { supabase } from './utils/supabase';

export default function App() {
  const Drawer = createDrawerNavigator();

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data: todos, error } = await supabase.from('todos').select();

        if (error) {
          console.error('Error fetching todos:', error.message);
          return;
        }

        if (todos && todos.length > 0) {
          setTodos(todos);
        }
      } catch (error) {
        console.error('Error fetching todos:', error.message);
      }
    };

    getTodos();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Home' component={Home} />
        <Drawer.Screen name='Tickets' component={Tickets} />
        <Drawer.Screen name='Completed' component={Completed} />
        <Drawer.Screen name='AddTask' component={AddTask} />
        <Drawer.Screen name='LargeTask' component={LargeTask} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
