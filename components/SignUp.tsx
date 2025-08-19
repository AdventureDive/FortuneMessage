import { Ionicons, MaterialCommunityIcons as MatComIcon } from "@expo/vector-icons";
import { Button, CheckBox, Icon, Input } from "@rneui/base";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IndexPageType } from "./APITypes";


interface HomeProps {
    setIndexPage: (value: IndexPageType) => void;
}
const SignUP = (props: HomeProps) => {

    const [familyName, setFamilyName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [ischildAcc, setChildAcc] = useState(false);

    const { width, height } = Dimensions.get('window');
    const windowWidth = Math.round(width);
    const windowHeight = Math.round(height);

    const SubmitSignUp = () => void {

    }

    const DiableMobileEmail = () => {

    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#faeef5ff'
            }}>
            <View
                style={{
                    // flex:1,
                    marginTop: 50,
                    marginBottom: 0,
                    marginLeft: 30,
                    width: windowWidth - 60,
                    height: windowHeight,
                    backgroundColor: '#faeef5ff',
                    // backgroundColor: 'steelblue'
                }}>
                <View>
                    <TouchableOpacity onPress={() => props.setIndexPage(0)}>
                        <Ionicons name="arrow-back" color={'magenta'} size={30} />
                    </TouchableOpacity>
                </View>

                <View style={{ margin: 10 }}>
                    <View><Text
                        style={{
                            fontSize: 25,
                            textAlign: 'center',
                            color: 'purple',
                            paddingTop: 30,
                            paddingBottom: 30
                        }}
                    >
                        Contact details
                    </Text>
                    </View>
                    <ScrollView style={{ backgroundColor: '#faeef5ff' }}>


                        <CheckBox textStyle={{ color: 'grey', 
                            fontSize:14
                         }}
                        containerStyle={{
                            backgroundColor:'#faeef5ff' 
                        }}
                            checkedColor="pink"
                            uncheckedColor="purple"
                            title="Child Account"
                            checked={ischildAcc}
                            onPress={(prev) => {
                                console.log("Checked");
                                setChildAcc(!setChildAcc); DiableMobileEmail();
                            }} />

                        <Input
                            containerStyle = {styles.inputContainer}
                            placeholder="Family Name"
                            leftIcon={<MatComIcon name='family-tree' type="font-awesome" size={20} color={'powderblue'} />}
                            onChangeText={setFamilyName}
                            value={familyName}
                        />

                        <Input
                            containerStyle = {styles.inputContainer}                            
                            placeholder="First name"
                            leftIcon={<Icon name="user" type="font-awesome" size={20} color={'pink'} />}
                            onChangeText={setFirstName}
                            value={firstName}
                        />

                        <Input
                            containerStyle = {{...styles.inputContainer, 
                                
                            }}
                            placeholder="Last name"
                            leftIcon={<Icon name="user" type="font-awesome" size={20} color={'lightgreen'} />}
                            onChangeText={setLastName}
                            value={lastName}
                        />

                        <Input
                            containerStyle = {styles.inputContainer}
                            placeholder="Mobile"
                            keyboardType="numeric"
                            maxLength={10}
                            leftIcon={<Icon name="phone" type="font-awesome" size={20} color={'magenta'} />}
                            onChangeText={setMobile}
                            value={mobile}
                        />

                        <Input
                            containerStyle = {styles.inputContainer}
                            placeholder="Email"
                            leftIcon={<Icon name="envelope" type="font-awesome" size={20} color={'skyblue'} />}
                            onChangeText={setEmail}
                            value={email}
                        />


                        <Button
                            titleStyle={{ fontSize: 20 }}
                            buttonStyle={{
                                marginTop: 20,
                                borderRadius: 10,

                            }}

                            title='Submit'
                            color='magenta'
                            onPress={SubmitSignUp()} />
                    </ScrollView>
                </View>
            </View>
        </View>
    );

}
export default SignUP;


const styles = StyleSheet.create({
    inputContainer: {
        borderColor: 'white',
        borderBottomWidth: 8,
        borderRadius: 2
    }
});