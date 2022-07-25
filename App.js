import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Home} from './src/screens/Home';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddToDoScreen} from './src/screens/AddToDoScreen';
import {SelectExercise} from './src/screens/SelectExercise';
import {ExcersiseScreen} from './src/screens/ExcersiseScreen';
import {LoginScreen} from './src/screens/LogInScreen';
import {authantication} from './src/firebase/firebase';
import {RegisterScreen} from './src/screens/RegisterScreen';
import {store} from './src/redux';
import {Provider} from 'react-redux';
import {AddExercise} from './src/screens/AddExercise';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
let persistor = persistStore(store);

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const updateUserData = () => {
    authantication?.onAuthStateChanged(user => setUser(user));
  };

  useEffect(() => {
    updateUserData();
  }, []);
  console.log(user);

  const header = () => {
    return <View style={styles.header}></View>;
  };
  const delIcon = () => <Icon name="delete" size={30} onPress={()=>{}}/>;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{}}>
            {/* {!user ? (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </>
          ) : ( */}
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="AddToDoScreen"
                component={AddToDoScreen}
              />
              <Stack.Screen name="SelectExercise" component={SelectExercise} />
              <Stack.Screen
                name="ExcersiseScreen"
                component={ExcersiseScreen}
              />
              <Stack.Screen name="AddExercise" component={AddExercise} />
            </>
            {/* )} */}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
const styles = StyleSheet.create({
  header: {backgroundColor: '#212121', height: 300},
});

export default App;
