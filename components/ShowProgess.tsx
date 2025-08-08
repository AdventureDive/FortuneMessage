import React from "react";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import MyStore from "./stores/MyStore";



const RenderLoading = () => {
    console.log('In renderLoading...');
    return (<View>
        <Text>Loading...</Text>
        <Text style={{ color: 'red' }}>{MyStore.loginUserId}</Text>
        <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator animating color='red' />
        </View>
    </View>);
};
export default RenderLoading;