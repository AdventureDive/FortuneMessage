import HomeScreen from "@/components/Home";
import LoginScreen from "@/components/Login";
import MyStore from "@/components/stores/MyStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";


const Index = observer(() => {
  const [loginResult, setLoginResult] = useState(false);

  useEffect(() => {
    if (!loginResult) {
      MyStore.setLoginUserId(-1);
    }
  }, [loginResult]);

  const renderContent = () => {
    console.log('Rendering Page...', MyStore.callAPI);    
    // if (MyStore.callAPI) {
    //    console.log('index file: In renderContent...');
    //   return (<RenderLoading />);
    // } else {
       console.log('index file: Displaying page...');
      return loginResult
        ? <HomeScreen
          setLoginResult={setLoginResult}
        />
        : <LoginScreen
          setLoginResult={setLoginResult}
        />
    // }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
});
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 40,
    // marginTop: 40,
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
