import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [user, setUser] = useState("");
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState("#757083");

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        if (result.user) {
          navigation.navigate("Chat", {
            userID: result.user.uid,
            user: user,
            background: selectedBackgroundColor,
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

  const handleBackgroundChange = (color) => {
    setSelectedBackgroundColor(color);
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
          <Text style={styles.chooseBackgroundColor}>Choose Background Color</Text>
          <View style={styles.backgroundColorButtonsOnly}>
            <TouchableOpacity
              style={[styles.backgroundColorButton, { backgroundColor: "#090C08" }]}
              onPress={() => handleBackgroundChange("#090C08")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.backgroundColorButton, { backgroundColor: "#474056" }]}
              onPress={() => handleBackgroundChange("#474056")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.backgroundColorButton, { backgroundColor: "#8A95A5" }]}
              onPress={() => handleBackgroundChange("#8A95A5")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.backgroundColorButton, { backgroundColor: "#B9C6AE" }]}
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formInput: {
    width: "80%",
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  backgroundColorButtonWrapper: {
    marginBottom: 20,
  },
  chooseBackgroundColor: {
    fontSize: 16,
    marginBottom: 10,
  },
  backgroundColorButtonsOnly: {
    flexDirection: "row",
  },
  backgroundColorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  enterButton: {
    backgroundColor: "#757083",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Start;
