import { observer } from 'mobx-react-lite';
import { useEffect, useState } from "react";
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import myAppImage from '../assets/images/MasterBallIconPoke_1024.png';
import { ImageBackground } from 'expo-image';
import { IndexPageType, LoginCredentials } from './APITypes';
import MyStore from "./stores/MyStore";



interface Props {
  setIndexPage: (value: IndexPageType) => void,
}
const LoginScreen = observer((props: Props) => {
  const [user, setUser] = useState('sasi');
  const [password, setPassword] = useState('sasi');
  //   const router = useRouter();
  //   const image = useImage(myAppImage, {
  //   maxWidth: 800,
  //   onError(error, retry) {
  //     console.error('Loading failed:', error.message);
  //   }
  // });

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
      MyStore.setLoginUserId(jsonResult.userId ? jsonResult.userId : -1);
      if (jsonResult.success) {
        MyStore.setLoginAPIResult('');
        props.setIndexPage(1);
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
    MyStore.setLoginAPIResult('');
    props.setIndexPage(-1);
  }

  const [keyboardOn, setKeyboardOn] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOn(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOn(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const logoHeight = 380;
  const keyboardRatio = 0.75;

  const renderContent = () => {
    // if(MyStore.callAPI){
    //   <RenderLoading/>
    // }else{
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: '#f5e6f2ff',}}
      >
        <View style={{
          flex: 1,
          backgroundColor: '#f5e6f2ff',
        }}>
          <View style={{
            marginTop: 80,
            backgroundColor: '#f5e6f2ff',
            alignItems: 'center',
          }}>
            <ImageBackground
              source={require('../assets/images/masterball_login2.png')}
              style={{
                width: keyboardOn ? windowWidth * keyboardRatio : windowWidth,
                height: keyboardOn ? logoHeight * keyboardRatio : logoHeight,
                backgroundSize: 'cover',
                backgroundColor: '#f5e6f2ff',
                // opacity: 0.5,
              }}
            >

            </ImageBackground>
          </View>

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
                fontStyle: 'italic'
              }}>New User? Please </Text>
              <TouchableOpacity onPress={GoToSignUpPage}>
                <Text style={{
                  color: 'magenta',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}> SignUP</Text>
              </TouchableOpacity>

            </View>
          </View>

        </View>
      </KeyboardAvoidingView>
    );
    // }
  };

  return renderContent();
});

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    marginTop: 30,
    // backgroundColor: '#faeef5ff',
    backgroundColor: '#f5e6f2ff',
    // backgroundColor: 'red',
    // minHeight: Dimensions.get("screen").height,
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: 'red',
    opacity: 0.9,
  },
});
