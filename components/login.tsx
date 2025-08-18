import { observer } from 'mobx-react-lite';
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LoginCredentials } from './APITypes';
import MyStore from "./stores/MyStore";

interface Props {
  setLoginResult: (value: boolean) => void,
}

const LoginScreen = observer((props: Props) => {
  const [user, setUser] = useState('sasi');
  const [password, setPassword] = useState('sasi');
  const [loginResult, setLoginResult] = useState('');
  //   const router = useRouter();
  const offline = false;

  const login = async () => {
    if(offline){
      props.setLoginResult(true);      
      MyStore.setLoginUserId(152);     
      return;
    }
    console.log("-> Login async functions");
    //Clear old error/result message
    setLoginResult('');
    if (!user || !password) {
      setLoginResult("Enter both username and password");
      return;
    }
    const url = 'http://172.16.1.72:8080/users/login';

    const loginCredentials: LoginCredentials = {
      "userName": user,
      "userPassword": password
    };

    try {
      MyStore.setCallAPI(true);
       console.log("-> Fetch login details");
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
        setLoginResult('Login request failed with status ' + response.status);
        // setPassword('');       
        return;
      }

      const jsonResult = await response.json();
      console.log(jsonResult);
      props.setLoginResult(jsonResult.success);
      //   props.setLoginUserId(jsonResult.userId ? jsonResult.userId : -1);
      MyStore.setLoginUserId(jsonResult.userId ? jsonResult.userId : -1);
      //   setLoginResult(jsonResult.loginStatus || '');
      if (jsonResult.success && jsonResult.loginStatus.toLowerCase().includes("success")) {
        console.log("Login success from server");
        setUser('');
        setPassword('');
        setLoginResult("success");
        // router.push("/home");
      } else {
        // Clear password on failed attempt for security reasons
        console.log("Login failed from server");
        setPassword('');
        setLoginResult(jsonResult.loginStatus);
      }
    } catch (error) {
      setLoginResult('An error occurred during login.');
      setPassword('');
      console.error('ERROR====', url, error);
    } finally {
      MyStore.setCallAPI(false);
    }
  };

  const renderContent = () => {
    // if(MyStore.callAPI){
    //   <RenderLoading/>
    // }else{
    return (
      <View style={styles.container}>
        <View style={{top:250}}>
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
        <Text style={{ color: 'red' }}>{loginResult}</Text>
        {/* <Text style={{ color: 'red' }}>{MyStore.loginUserId}</Text> */}
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
    flex: 1,
    padding: 40,
    // marginTop: 300,
    backgroundColor: '#faeef5ff'
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
    backgroundColor: "red",
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
