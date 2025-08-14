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
    console.log('In renderLoading...');
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
    Toast.show({
        type: tMsg.type,
        text1Style: {
            color: (tMsg.type === 'error') ? 'red' : 'green'
        },
        text1: tMsg.message,
        // text2: p1
    })
}
