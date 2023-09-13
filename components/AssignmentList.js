import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AssignmentItem from "./AssignmentItem";
import styles from "../styles/AssignmentListStyle";

const AssignmentList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTask();
  }, []);

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

  const loadTask = async () => {
    try {
      const saveTasks = await AsyncStorage.getItem("tasks");
      if (saveTasks) {
        setTasks(JSON.parse(saveTasks));
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const deleteTask = async (taskID) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(updatedTasks);

    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Assignment List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <Button title="Add Assignment" onPress={saveTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AssignmentItem task={item} onDelete={() => deleteTask(item.id)} />
        )}
      />
    </View>
  );
};

export default AssignmentList;
