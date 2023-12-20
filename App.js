import { useEffect } from 'react';
import { Alert, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


  const firebaseConfig = {
    apiKey: "AIzaSyAAY1oJmQiXui7O3sFi6-fNQ94N6Amt0yY",
    authDomain: "shopping-list-demo-45338.firebaseapp.com",
    projectId: "shopping-list-demo-45338",
    storageBucket: "shopping-list-demo-45338.appspot.com",
    messagingSenderId: "465531118121",
    appId: "1:465531118121:web:c0da611a2664af2936b238"
  };

  
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// import the screens
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';

// create the navigator
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['@firebase/auth: Auth']);

const App = () => {
  const connectionStatus = useNetInfo();

  // Initialize Cloud Firestore and Cloud Storage and get a reference to the services
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={StartScreen} />
        <Stack.Screen name="ChatScreen">
          {(props) => <ChatScreen isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;