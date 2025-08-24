import { IndexPageType } from "@/components/APITypes";
import HomeScreen from "@/components/Home";
import LoginScreen from "@/components/Login";
import { RenderLoading } from "@/components/ShowProgess";
import SignUP from "@/components/SignUp";
import MyStore from "@/components/stores/MyStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ErrorProps {
  message: any
}

const Index = observer(() => {
  const [indexPage, setIndexPage] = useState<IndexPageType>(0);

  useEffect(() => {
    if (indexPage === 0) {
      MyStore.setLoginUserId(-1);
    }
  }, [indexPage]);

  const RenderError = (props: ErrorProps) => {
    return (
      <View><Text>{props.message}</Text>
        <Text
          style={{
            color: 'red',
            fontSize: 15,
            fontFamily: 'bold'
          }}
        >
          {props.message}
        </Text>
      </View>
    );
  }
  const RenderContent = () => {
    if (MyStore.callAPI) {
      return (<RenderLoading />);
    }

    try {
      if (indexPage !== 0) {
        if (indexPage !== 1) return <SignUP setIndexPage={setIndexPage} />
        return <HomeScreen setIndexPage={setIndexPage} />
      }
      return <LoginScreen setIndexPage={setIndexPage} />
    } catch (error) {
      console.error("Index Page: ", error);
      return <RenderError message={error} />;
    }

  };

  return (
    <View style={styles.container}>
      {RenderContent()}
    </View>
  );
});
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 40,
    // marginTop: 40,
    minHeight:'100%',
    backgroundColor: '#f5e6f2ff',
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


