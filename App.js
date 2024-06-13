import { StatusBar } from 'expo-status-bar';
import { initializeApp } from 'firebase/app';
import { disableNetwork, enableNetwork, getFirestore } from 'firebase/firestore';
import { useEffect } from 'react';
import { Alert, LogBox, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import components
import Start from './components/Start';
import Chat from './components/Chat';

LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

// create the navigator
const Stack = createNativeStackNavigator();

const App = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyAj84VjCo9BJOwD-HicPAGD3TiFD7EJjdc",
    authDomain: "hello-world-8e66d.firebaseapp.com",
    projectId: "hello-world-8e66d",
    storageBucket: "hello-world-8e66d.appspot.com",
    messagingSenderId: "480455209847",
    appId: "1:480455209847:web:2c4f84513a1e14d640e772"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen name='Chat'>
          {props => <Chat db={db} {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: '88%',
    borderWidth: 1,
    height: 50,
    padding: 10
  },
  textDisplay: {
    height: 50,
    lineHeight: 50
  }
});

export default App;