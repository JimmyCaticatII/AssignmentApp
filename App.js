import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AssignmentList from "./components/AssignmentList";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.appTitle}>Assignment App</Text>
        <AssignmentList />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  appTitle: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
});
