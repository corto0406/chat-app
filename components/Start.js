import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        // Ensure user is authenticated before navigating
        if (result.user) {
          navigation.navigate("Chat", {
            userID: result.user.uid,
            user: user,
            background: '#757083',
          });
          Alert.alert("Signed In Successfully!");
        } else {
          Alert.alert("Authentication failed.");
        }
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
      });
  };

  const [user, setUser] = useState("");

  // Placeholder for handleBackgroundChange function
  const handleBackgroundChange = (color) => {
    // Implement the logic to change the background color
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Chat App</Text>
      <View style={styles.formInput}>
        <TextInput
          style={styles.textInput}
          value={user}
          placeholder="Your Username"
          onChangeText={setUser}
        />

        <View style={styles.backgroundColorButtonWrapper}>
          <Text style={styles.chooseBackgroundColor}>
            Choose Background Color
          </Text>
          <View style={styles.backgroundColorButtonsOnly}>
            <TouchableOpacity
              style={styles.backgroundColorButton1}
              onPress={() => handleBackgroundChange("#090C08")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.backgroundColorButton2}
              onPress={() => handleBackgroundChange("#474056")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.backgroundColorButton3}
              onPress={() => handleBackgroundChange("#8A95A5")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.backgroundColorButton4}
              onPress={() => handleBackgroundChange("#B9C6AE")}
            ></TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.enterButton} onPress={signInUser}>
          <Text style={styles.buttonText}>Enter chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (previous styles)

  // Add or modify styles as needed
});

export default Start;
