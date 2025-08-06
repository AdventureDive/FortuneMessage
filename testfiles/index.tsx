import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [user, setUser] = useState('sasi');
  const [password, setPassword] = useState('sasi');
  const [loginResult, setLoginResult] = useState('');
  const router = useRouter;


  const login = () => {
    if (!user || !password) {
      setLoginResult("Enter both username and password");
    } else {
      const url = 'http://172.16.1.72:8080/users/login';
      fetch(url,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': 'http://localhost:8080',
            // 'Access-Control-Allow-Headers' : 'Content-Type',
            // Host: 'localhost:8081'
          },
          body: JSON.stringify({
            "userName": user,
            "userPassword": password
          }),
          // mode:'no-cors',
        })
        .then(response => {
          const resp = response.clone();
          return response.json();
        })
        // .then(json => { setLoginResult(JSON.stringify(json)); })
        .then(jsonResult => {
          const loginJSON = JSON.parse(JSON.stringify(jsonResult));
          // console.log("jsonResult stringify======" + ((JSON.stringify(jsonResult))));
          // console.log("jsonResult parse======" + (JSON.parse(JSON.stringify(jsonResult))));
          // console.log("jsonResult object======" + (Object.values(JSON.parse(JSON.stringify(jsonResult)))));
          // console.log("success======" + loginJSON.success);
          // console.log("loginMessage======" + loginJSON.loginStatus);
          // console.log("loginMessage======" + loginJSON["loginStatus"]);
          setLoginResult(loginJSON.loginStatus);
        }).catch(error => console.error('ERROR====', url, error));

      if (loginResult.includes("success")) {
        // <Link href={{ pathname: '/details', params: { itemId: '123' } }}/>
        // (<Link href={"/home"}/>);
        navigateToHome();

        setUser('');
        setPassword('');

      } else {

      }

    }

  };

  const navigateToHome = () => {
    return (
      <View>
        <Link href={"/home"} /></View>
    );
  };

  const getAllUsers = () => {
    const url = 'http://172.16.1.72:8080/users/api/getAllUsers';
    // const url = 'https://255.255.255.0:8080/users/api/getAllUsers';
    // alert("GOT DETAILS..." + url);
    console.log(url);
    fetch(url,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          // 'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': 'http://localhost:8080',
          // 'Access-Control-Allow-Headers' : 'Content-Type',
          // Host: 'localhost:8081'
        },
        // mode:'no-cors',


      })
      .then(response => {
        const resp = response.clone();
        return response.json();
      })
      .then(json => { setLoginResult(JSON.stringify(json)); })
      // .then(json => { console.log(JSON.stringify(json)); })
      .catch(error => console.error('ERROR====', url, error));

  };


  return (
    <View style={styles.container}>
      <TextInput style={styles.inputText} placeholder="Username" value={user}
        onChangeText={setUser} onSubmitEditing={login} />
      <TextInput style={styles.inputText} placeholder="Password" value={password}
        onChangeText={setPassword} onSubmitEditing={login} secureTextEntry={true} />
      <TouchableOpacity style={styles.addButton}
        onPress={login}>
        <Text style={styles.addButtonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{loginResult} </Text>

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