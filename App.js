
import Start from "./components/Start.js";
import Chat from "./components/Chat.js";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Stack = createNativeStackNavigator();

const App = () => {
  LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


