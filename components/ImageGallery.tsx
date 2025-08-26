import { REACT_APP_SERVER_URL } from "@/assets/constants";
import { observer } from "mobx-react-lite";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton } from "react-native-paper";
import { ImageData } from "./APITypes";
import deleteAPIAsync from "./DeleteAPIAsync";
import MyStore from "./stores/MyStore";


interface ParameterProps {
  setGalleryImage: (value: ImageData) => void;
};

const deleteImage = async (imageItem: ImageData) => {
  console.log("=========Delete Image URL: " + REACT_APP_SERVER_URL + '/deleteImage/' + imageItem.id);
  const urlDelete = REACT_APP_SERVER_URL + '/deleteImage/' + imageItem.id;
  const result = await deleteAPIAsync(urlDelete);
  if (result) {
    console.log("Image got deleted in server, delete in client now");
    MyStore.removeImage(imageItem.id);
  } else {
    console.log("Image not deleted in server, Keep the list");
  }
}

const ImageGallery = observer((props: ParameterProps) => {
  console.log('---------IN ImageGallery..', MyStore.imageList.length);

  const renderItem = ({ item }) => {
    return (
      <View style={{
        margin: 10,
      }} >
        <TouchableOpacity onPress={() => props.setGalleryImage(item)}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${item.image}` }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
        <IconButton
          style={{
            backgroundColor: 'white',
            alignSelf: 'flex-end',
            marginTop: -30,
          }}
          icon="delete"
          iconColor="red"
          size={20}
          onPress={() => deleteImage(item)}
        />
      </View>
    )
  };
  return (
    <View style={{
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
