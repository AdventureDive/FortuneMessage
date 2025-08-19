import { observer } from 'mobx-react-lite';
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IndexPageType, LoginCredentials } from './APITypes';
import MyStore from "./stores/MyStore";



interface Props {
  setIndexPage: (value: IndexPageType) => void,
}
const LoginScreen = observer((props: Props) => {
  const [user, setUser] = useState('sasi');
  const [password, setPassword] = useState('sasi');
  //   const router = useRouter();

  const login = async () => {
    MyStore.setLoginAPIResult('');
    if (!user || !password) {
      MyStore.setLoginAPIResult("Enter both username and password");
      return;
    }
    const url = 'http://172.16.1.72:8080/users/login';

    const loginCredentials: LoginCredentials = {
      "userName": user,
      "userPassword": password
    };

    try {
      MyStore.setCallAPI(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
      });


      if (!response.ok) {
        console.log("Login failed - Network Fail");
        MyStore.setLoginAPIResult('Login request failed with status ' + response.status);
        // setPassword('');       
        return;
      }

      const jsonResult = await response.json();
      console.log(jsonResult);
      if (jsonResult.success) {
        props.setIndexPage(1);
      }

      MyStore.setLoginUserId(jsonResult.userId ? jsonResult.userId : -1);
      if (jsonResult.success) {
        MyStore.setLoginAPIResult('');
        //   setUser('');
        //   setPassword('');
      } else {
        // setPassword('');
        console.log("Login failed from server");
        MyStore.setLoginAPIResult(jsonResult.loginStatus);
      }
    } catch (error) {
      MyStore.setLoginAPIResult('Network Error');
      setPassword('');
      console.error('ERROR====', url, error);
    } finally {
      MyStore.setCallAPI(false);
    }
  };

  const GoToSignUpPage = () => {
    props.setIndexPage(-1);
  }

  const renderContent = () => {
    // if(MyStore.callAPI){
    //   <RenderLoading/>
    // }else{
    return (
      <View style={styles.container}>
        <View style={{ maxHeight: 250 }}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            value={user}
            onChangeText={setUser}
            onSubmitEditing={login}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={login}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.addButton} onPress={login}>
            <Text style={styles.addButtonText} disabled={MyStore.callAPI}>Submit</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: 'red',
              fontSize: 15,
              fontFamily: 'bold'
            }}
          >
            {MyStore.loginAPIResult}
          </Text>
        </View>
        <View style={{
          margin: 0,
          paddingLeft: 150,
          flexDirection: 'row'
        }}>
          <Text style={{
            fontSize: 13,
            fontStyle:'italic'
          }}>New User? Please </Text>
          <TouchableOpacity onPress={GoToSignUpPage}>
            <Text style={{
              color: 'magenta',
              fontSize: 14,
              fontWeight:'bold'
            }}> SignUP</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
    // }
  };

  return renderContent();
});

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 40,
    marginTop: 300,
    backgroundColor: '#faeef5ff',
    // backgroundColor: 'red',
    minHeight: Dimensions.get("screen").height,
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
    backgroundColor: "magenta",
    padding: 10,
    borderRadius: 10,
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
