import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Main } from "./.expo/src/Main";
import { Auth } from "./.expo/src/Auth";
import * as SecureStore from "expo-secure-store";
import { ID_TOKEN_KEY } from "./config";

export default function App() {
  const [authToken, setToken] = useState(null);
  const [user, setNewUser] = useState(null);

  const onLogin = async (isNewUser = false) => {
    console.log("onlogin fired!!");
    await SecureStore.getItemAsync(ID_TOKEN_KEY).then((session) => {
      if (session) {
        const sessionObj = JSON.parse(session);
        const { exp, token, id, name } = sessionObj;
        if (exp > Date.now() / 1000) {
          setToken(token);
          setNewUser({ id, name, isNewUser });
        }
      }
    });
  };

  React.useEffect(() => {
    console.log("authToken: ", authToken);
    onLogin();
  }, []);

  return (
    <View style={styles.container}>
      {authToken && user && <Main authToken={authToken} user={user} />}
      <Auth
        authToken={authToken}
        onLogout={() => setToken(null)}
        onLogin={onLogin}
      />
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
