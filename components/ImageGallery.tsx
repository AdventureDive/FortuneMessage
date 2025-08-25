import { REACT_APP_SERVER_URL } from "@/assets/constants";
import { Buffer } from "buffer";
import { observer } from "mobx-react-lite";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import deleteAPIAsync from "./DeleteAPIAsync";
import MyStore from "./stores/MyStore";


interface ParameterProps {
  // imageData:string[],
  setImageData?: [];
};
interface DataProps {
  item: string,
  index: string
}

const deleteImage = async (props: DataProps) => {
  const urlDelete = REACT_APP_SERVER_URL + '/member/deleteImage/' + "";
  const result = await deleteAPIAsync(urlDelete);
  if (result) {

  } else {

  }
}

const ImageGallery = observer((props: ParameterProps) => {
  console.log('---------IN ImageGallery..', MyStore.imageList.length);

  const renderItem = ({ item }) => {
    const byteArray = Buffer.from(item, "base64");
    return (
      <View style={{
        margin: 10,
        backgroundColor: 'green',
      }} >
        <TouchableOpacity onPress={() => { deleteImage(item) }}>
          <Text
            style=
            {{
              fontSize: 20,
              textAlign: 'right',
              color: 'red',
              fontWeight: 'bold'
            }}
          >
            X
          </Text>
        </TouchableOpacity>
        <Image
          source={{ uri: `data:image/jpeg;base64,${item}` }}
          style={{ width: 100, height: 100, borderRadius: 10 }} // Adjust dimensions as needed
        />
      </View>
    )
  };
  return (
    <View style={{
      // backgroundColor:'red',
      marginLeft: 5,
      marginRight: 5,
      maxHeight: 500,
      width: '100%',
      minHeight: 100
    }}
    >
      <FlatList data={MyStore.imageList} renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()} numColumns={3}
      >
      </FlatList>
    </View>

  );
});

export default ImageGallery;

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
