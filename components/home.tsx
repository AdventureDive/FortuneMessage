import { observer } from 'mobx-react-lite';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton } from 'react-native-paper';
import HomeComponenets from './HomeComponents';
import MyStore from "./stores/MyStore";

interface HomeProps {
    setLoginResult: (value: boolean) => void
}

const HomeScreen = observer((props: HomeProps) => {
    console.log("Inside home screen");

    // useEffect(() => {
    //    
    // }, []);

    return MyStore.loginUserId > 0 ? (
        <View style={{ minHeight:'95%', backgroundColor:'#f5faf6'}}>
            <TouchableOpacity style={{alignItems:'flex-end'}} onPress={() => props.setLoginResult(false)}>
                <IconButton
                    icon={'logout'}
                    size={24}
                    iconColor='red'
                />
            </TouchableOpacity>
            {/* {HomeComponenets()} */}
            <HomeComponenets/>
            <Text>"Inside Home"</Text>
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
