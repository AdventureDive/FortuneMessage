import HomeScreen from "@/components/home";
import LoginScreen from "@/components/login";
import MyStore from "@/components/stores/MyStore";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [loginResult, setLoginResult] = useState(false);

  useEffect(() => {
    if(!loginResult) {
      MyStore.setLoginUserId(-1);
    }
  }, [loginResult]);

  const renderContent = () => {
    return loginResult 
      ? <HomeScreen 
          setLoginResult={setLoginResult}
        /> 
      : <LoginScreen 
          setLoginResult={setLoginResult}
        />
  }

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  inputText: {
    borderWidth: 3,
    borderColor: "grey",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
