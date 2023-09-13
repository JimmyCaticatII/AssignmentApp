import { FlatList, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AssignmentItem from "./AssignmentItem";
import AddAssignment from "./AddAssignment";

const AssignmentList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTask();
  }, []);

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
      <AddAssignment tasks={tasks} setTasks={setTasks} />
      <FlatList
        data={tasks.sort((a, b) => {
          return b.id - a.id;
        })}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AssignmentItem task={item} onDelete={() => deleteTask(item.id)} />
        )}
      />
    </View>
  );
};

export default AssignmentList;

const styles = StyleSheet.create({});
