import { REACT_APP_SERVER_URL } from "@/assets/constants";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";
import MyStore from "./stores/MyStore";

interface ToastProb {
    type: string,
    message: string
}
export const RenderLoading = () => {
    return (<View>
        <Text>Loading...</Text>
        <Text style={{ color: 'red' }}>{MyStore.loginUserId}</Text>
        <View style={{
            marginTop: 200,
            marginRight: 100,
            marginLeft: 100,
            marginBottom: 100,
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
            <ActivityIndicator animating color='red' />
        </View>
    </View>);
};
export const showToast = (tMsg: ToastProb) => {
    console.log(tMsg.type + tMsg.message);
    let color = 'green';
    if (tMsg.type === 'error') {
        color = 'red';
    } else if (tMsg.type === 'info') {
        color = 'purple';
    }
    Toast.show({
        type: tMsg.type,
        text1Style: {
            color: color,
            fontSize: 18
        },
        text1: tMsg.message,
        // text2: p1
    })
};

export const callGetImageAPI = async (id: string) => {
  const url = REACT_APP_SERVER_URL + '/image/' + id;
  console.log(url);
    try {
      MyStore.setCallImageAPI(true);
      // console.log('IN callGetImageAPI...', url, MyStore.callImageAPI);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        console.log('Get Image request failed with status ' + response.status);
        return null;
      }
      const imageObj = await response.json();
      // console.log('=====response Object ...', JSON.stringify(imageObj));
      MyStore.addToimageList(imageObj);
    } catch (error) {
      console.log('An error occurred while getting image.');
      console.error('ERROR====', url, error);
      return null;
    } finally {
      MyStore.setCallImageAPI(false);
    }
  };