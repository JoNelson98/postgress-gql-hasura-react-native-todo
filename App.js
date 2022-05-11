import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Main } from "./.expo/src/Main";
import { Auth } from "./.expo/src/Auth";

export default function App() {
  const [isLogggedIn, setIsLoggedIn] = useState(false);
  return (
    <View style={styles.container}>
      {isLogggedIn ? <Main /> : <Auth onLogin={() => setIsLoggedIn(true)} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
