import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import React from "react";

const deleteImage = require("../assets/delete.png");

const AssignmentItem = ({ task, onDelete }) => {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity>
        <Text style={styles.taskText}>{task.text}</Text>
      </TouchableOpacity>
      <Pressable onPress={onDelete}>
        <Image source={deleteImage} style={styles.imageContainer}></Image>
      </Pressable>
    </View>
  );
};

export default AssignmentItem;

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
    fontWeight: "bold",
  },
  imageContainer: {
    width: 36,
    height: 36,
  },
});
