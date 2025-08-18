import React from "react";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";
import MyStore from "./stores/MyStore";

interface toastProb {
    type: string,
    message: string
}

export const RenderLoading = () => {
    return (<View>
        <Text>Loading...</Text>
        <Text style={{ color: 'red' }}>{MyStore.loginUserId}</Text>
        <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator animating color='red' />
        </View>
    </View>);
};
export const showToast = (tMsg: toastProb) => {
    console.log(tMsg.type + tMsg.message);
    let color='green';
    if(tMsg.type === 'error'){
        color='red';
    } else if(tMsg.type === 'info'){
        color='purple';
    }
    
    Toast.show({
        type: tMsg.type,
        text1Style: {
            color: color,
            fontSize:18
        },
        text1: tMsg.message,
        // text2: p1
    })
}
