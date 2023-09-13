import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Image,
  Modal,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const plusImage = require("../assets/plus.png");
const backImage = require("../assets/back-button.png");

const AddAssignment = ({ tasks, setTasks }) => {
  const [task, setTask] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const saveTask = async () => {
    if (task.trim() === "") {
      return;
    }

    const newTask = { id: Date.now().toString(), text: task };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTask("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image source={plusImage} style={styles.buttonSize} />
        {/* <Text style={styles.floatingButton}>Add Assignment</Text> */}
      </Pressable>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Image source={backImage} style={[styles.buttonSize]} />
            </Pressable>
            <TextInput
              value={task}
              onChangeText={(text) => setTask(text)}
              style={styles.inputContainer}
            />
            <Pressable onPress={saveTask}>
              <Image
                source={plusImage}
                style={[styles.buttonSize, styles.alignButton]}
              />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddAssignment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputContainer: {
    alignItems: "center",
    marginVertical: 10,
    borderColor: "#000",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 15,
    width: "100%",
  },
  buttonSize: {
    width: 60,
    height: 60,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    // alignItems: "center",
    alignContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  alignButton: {
    alignSelf: "flex-end",
  },
});
