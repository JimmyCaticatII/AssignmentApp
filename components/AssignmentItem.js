import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
const deleteImage = require("../assets/delete.png");

const AssignmentItem = ({ task, onDelete }) => {
  const [checkboxState, setCheckboxState] = useState(false);

  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity>
        <Text style={styles.taskText}>{task.text}</Text>
      </TouchableOpacity>
      <View style={styles.buttonGroup}>
        <BouncyCheckbox
          onPress={() => setCheckboxState(!checkboxState)}
          isChecked={checkboxState}
        />
        <Pressable
          onPress={() =>
            Alert.alert("Are you sure?", "", [
              {
                text: "Cancel",
              },
              {
                text: "OK",
                onPress: onDelete,
              },
            ])
          }
        >
          <Image source={deleteImage} style={styles.imageContainer}></Image>
        </Pressable>
      </View>
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
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
    fontWeight: "bold",
    paddingVertical: 5,
  },
  imageContainer: {
    width: 36,
    height: 36,
    marginStart: 10,
  },
  buttonGroup: {
    flexDirection: "row",
  },
  checkbox: {
    padding: 6,
    paddingEnd: 14,
    borderRightWidth: 1,
  },
});
