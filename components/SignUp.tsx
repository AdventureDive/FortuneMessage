import { REACT_APP_SERVER_URL } from "@/assets/constants";
import { Ionicons, MaterialCommunityIcons as MatComIcon } from "@expo/vector-icons";
import { Button, CheckBox, Icon, Input } from "@rneui/base";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IndexPageType, SignUpDataType } from "./APITypes";
import { RenderLoading } from "./ShowProgess";
import MyStore from "./stores/MyStore";


interface HomeProps {
    setIndexPage: (value: IndexPageType) => void;
}
const SignUP = (props: HomeProps) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [ischildAcc, setChildAcc] = useState(false);

    const { width, height } = Dimensions.get('window');
    const windowWidth = Math.round(width);
    const windowHeight = Math.round(height);


    const CallSignUpAPI = async () => {
        MyStore.setSignUpAPIResult('');
        if (!familyName ||
            !userName ||
            !password ||
            !firstName ||
            !lastName ||
            !mobile
        ) {
            MyStore.setSignUpAPIResult("Enter all mandatory field");
            return;
        }
        const urlCreateUser = REACT_APP_SERVER_URL + '/users/postUser';

        const SignUpData: SignUpDataType = {
            "userName": userName,
            "userPassword": password,
            "familyName": familyName,
            "firstName": firstName,
            "lastName": lastName,
            "mobile": mobile,
            "email": email
        };
        console.log("SignUp JSON: " + JSON.stringify(SignUpData));
        try {
            MyStore.setCallSignAPI(true);
            const response = await fetch(urlCreateUser, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(SignUpData),
            });


            if (!response.ok) {
                console.log("SignUp failed - Network Fail");
                MyStore.setSignUpAPIResult('SignUp request failed with status ' + response.status);
                // setPassword('');       
                return;
            }

            const jsonResult = await response.json();
            console.log("SignUp json Result: " + jsonResult);

            MyStore.setLoginUserId(jsonResult.id ? jsonResult.id : -1);
            if (jsonResult.id !== 0) {
                MyStore.setLoginAPIResult("You are successfully signed up, please login with your credentials...");
                props.setIndexPage(0);
            } else {
                setUserName("");
                setPassword("");
                console.log("Login failed from server");
                MyStore.setSignUpAPIResult(jsonResult.loginStatus);
            }
        } catch (error) {
            MyStore.setSignUpAPIResult('Network Error');
            setPassword("");
            console.error('Create User ERROR====', urlCreateUser, error);
        } finally {
            MyStore.setCallSignAPI(false);
        }
    };

    const DiableMobileEmail = () => {

    }

    const renderContent = () => {
        if (MyStore.callSignUpAPI) {
            <RenderLoading />
        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#faeef5ff'
                    }}>
                    <View
                        style={{
                            // flex:1,
                            marginTop: 25,
                            marginBottom: 0,
                            marginLeft: 25,
                            width: windowWidth - 50,
                            height: windowHeight,
                            backgroundColor: '#faeef5ff',
                            // backgroundColor: 'steelblue'
                        }}>
                        <View
                            style={{
                                // flex:1,
                                marginTop: 30,
                                marginBottom: 0,
                                marginLeft: 10,
                                // width: windowWidth - 50,
                                // height: windowHeight,
                                // backgroundColor: '#faeef5ff',
                                // backgroundColor: 'steelblue',                            
                            }}>
                            <TouchableOpacity onPress={() => props.setIndexPage(0)}>
                                <Ionicons name="arrow-back" color={'magenta'} size={30} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ margin: 10 }}>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 25,
                                        textAlign: 'center',
                                        color: 'purple',
                                        paddingTop: 5,
                                        paddingBottom: 30
                                    }}
                                >
                                    User details
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        textAlign: 'center',
                                        color: 'red',
                                        paddingTop: 5,
                                        paddingBottom: 5
                                    }}
                                >
                                    {MyStore.signUpAPIResult}
                                </Text>
                            </View>
                            <ScrollView style={{
                                backgroundColor: '#faeef5ff',
                                height: windowHeight - 200,
                                elevation: 100,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: 'purple'

                            }}>
                                <CheckBox textStyle={{
                                    color: 'black',
                                    fontSize: 14
                                }}
                                    containerStyle={{
                                        backgroundColor: '#faeef5ff'
                                    }}
                                    checkedColor="purple"
                                    uncheckedColor="magenta"
                                    title="Child Account"
                                    checked={ischildAcc}
                                    onPress={(prev) => {
                                        console.log("Checked: " + ischildAcc);
                                        setChildAcc(!ischildAcc); DiableMobileEmail();
                                    }} />

                                <Input
                                    containerStyle={styles.inputContainer}
                                    placeholder="Family Name"
                                    leftIcon={<MatComIcon name='family-tree' type="font-awesome" size={20} color={'powderblue'} />}
                                    onChangeText={setFamilyName}
                                    value={familyName}
                                />

                                <Input
                                    containerStyle={styles.inputContainer}
                                    placeholder="User name"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    leftIcon={<Icon name="user" type="font-awesome" size={20} color={'pink'} />}
                                    onChangeText={setUserName}
                                    value={userName}
                                />

                                <Input
                                    containerStyle={{
                                        ...styles.inputContainer,
                                    }}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    leftIcon={<Icon name="user" type="font-awesome" size={20} color={'lightgreen'} />}
                                    onChangeText={setPassword}
                                    value={password}
                                />

                                <Input
                                    containerStyle={styles.inputContainer}
                                    placeholder="First name"
                                    leftIcon={<Icon name="user" type="font-awesome" size={20} color={'pink'} />}
                                    onChangeText={setFirstName}
                                    value={firstName}
                                />

                                <Input
                                    containerStyle={{
                                        ...styles.inputContainer,
                                    }}
                                    placeholder="Last name"
                                    leftIcon={<Icon name="user" type="font-awesome" size={20} color={'lightgreen'} />}
                                    onChangeText={setLastName}
                                    value={lastName}
                                />

                                <Input
                                    containerStyle={styles.inputContainer}
                                    placeholder="Mobile"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    leftIcon={<Icon name="phone" type="font-awesome" size={20} color={'magenta'} />}
                                    onChangeText={setMobile}
                                    value={mobile}
                                />

                                <Input
                                    containerStyle={styles.inputContainer}
                                    placeholder="Email"
                                    leftIcon={<Icon name="envelope" type="font-awesome" size={20} color={'skyblue'} />}
                                    onChangeText={setEmail}
                                    value={email}
                                />
                            </ScrollView>
                            <Button
                                titleStyle={{ fontSize: 20 }}
                                buttonStyle=
                                {{
                                    marginTop: 20,
                                    borderRadius: 10,
                                }}
                                title='Submit'
                                color='magenta'
                                onPress={() => CallSignUpAPI()}
                            />
                        </View>
                    </View>
                </View>
            );
        }
    }
    return renderContent();
}
export default SignUP;


const styles = StyleSheet.create({
    inputContainer: {
        borderColor: 'white',
        // borderBottomWidth: 8,
        // borderRadius: 2
    }
});