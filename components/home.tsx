import { observer } from 'mobx-react-lite';
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import HomeComponenets from './HomeComponents';
import MyStore from "./stores/MyStore";

interface HomeProps {
    setLoginResult: (value: boolean) => void
}

const HomeScreen = observer((props: HomeProps) => {
    console.log("Inside home screen");
    const [showHomeButton, setShowHomeButton] = useState(false);
    const [selectedScreen, setSelectedScreen] = useState('');

    const renderHeader = () => {
        return (
            <View style={{flex:1, flexDirection:'row', alignItems:'center', maxHeight:50}}>
            <View style={{width:'50%'}}>
                {showHomeButton &&
            <TouchableOpacity style={{alignItems:'flex-start'}} onPress={() => setSelectedScreen('')}>
                <IconButton
                    icon={'home'}
                    size={24}
                    iconColor='red'
                />
            </TouchableOpacity>}
            </View>
            <View style={{width:'50%'}}>
            <TouchableOpacity style={{alignItems:'flex-end'}} onPress={() => props.setLoginResult(false)}>
                <IconButton
                    icon={'logout'}
                    size={24}
                    iconColor='red'
                />
            </TouchableOpacity>
            </View>   
            </View>
        );
    }

    return MyStore.loginUserId > 0 ? (
        <View style={{ minHeight:'95%', backgroundColor:'#faeef5ff'}}>
            {renderHeader()}

            <HomeComponenets
                selectedScreen={selectedScreen}
                setSelectedScreen={setSelectedScreen}
                setShowHomeButton={setShowHomeButton}
            />
            <Text>"Inside Home"</Text>
            <Toast position='bottom'/>
        </View>

    ) : (
        <View>
            <Text>Invalid user : {MyStore.loginUserId}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => props.setLoginResult(false)}>
                <Text style={styles.addButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
});

export default HomeScreen;

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
