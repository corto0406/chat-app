import React, { useEffect } from "react";
import { LogBox, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Start from "./components/Start.js";
import Chat from "./components/Chat.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAY1oJmQiXui7O3sFi6-fNQ94N6Amt0yY",
  authDomain: "shopping-list-demo-45338.firebaseapp.com",
  projectId: "shopping-list-demo-45338",
  storageBucket: "shopping-list-demo-45338.appspot.com",
  messagingSenderId: "465531118121",
  appId: "1:465531118121:web:c0da611a2664af2936b238"
};

// Initialize Firebase with the provided configuration
const app = initializeApp(firebaseConfig);

// Create a Firestore database instance
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    const handleConnectionStatus = () => {
      if (connectionStatus.isConnected === false) {
        Alert.alert("Connection Lost!");
        disableNetwork(db);
      } else if (connectionStatus.isConnected === true) {
        enableNetwork(db);
      }
    };

    handleConnectionStatus();

    return () => {

    };
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


