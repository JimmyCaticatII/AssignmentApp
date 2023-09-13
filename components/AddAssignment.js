import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const plusImage = require("../assets/plus.png");

const AddAssignment = ({ tasks, setTasks }) => {
  const [task, setTask] = useState("");

  const saveTask = async () => {
    if (task.trim() === "") {
      return;
    }

    const newTask = { id: Date.now().toString(), text: task };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTask("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputContainer}
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <Pressable onPress={saveTask}>
        <Image source={plusImage} style={styles.imageContainer} />
      </Pressable>
    </View>
  );
};

export default AddAssignment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 10,
    borderColor: "#000",
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 30,
  },
  imageContainer: {
    margin: 5,
    width: 48,
    height: 48,
  },
});
