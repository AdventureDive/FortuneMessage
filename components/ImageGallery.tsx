import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton } from "react-native-paper";
import { REACT_APP_SERVER_URL } from "../components/constants";
import { ImageData } from "./APITypes";
import deleteAPIAsync from "./DeleteAPIAsync";
import MyStore from "./stores/MyStore";


interface ParameterProps {
  galleryImage:ImageData,
  setGalleryImage: (value: ImageData) => void;
};



const ImageGallery = observer((props: ParameterProps) => {
  console.log('IN ImageGallery....MyStore.imageList=', MyStore.imageList.length);

  useEffect(() => {
      console.log('IN ImageGallery.useEffect...MyStore.imageList=', MyStore.imageList.length);
  }, [MyStore.imageList]);

  const deleteImage = async (imageItem: ImageData) => {
  console.log("=========Delete Image URL: " + REACT_APP_SERVER_URL + '/deleteImage/' + imageItem.id);
  const urlDelete = REACT_APP_SERVER_URL + '/deleteImage/' + imageItem.id;
  const result = await deleteAPIAsync(urlDelete);
  if (result) {
    console.log("Image got deleted in server, delete in client now");
    MyStore.removeImage(imageItem.id);
    if(props.galleryImage.id === imageItem.id){
      props.setGalleryImage(undefined);
    }
  } else {
    console.log("Image not deleted in server, Keep the list");
  }
}

  const renderItem = ({ item }) => {
    return (
      <View style={{
        margin: 10,
        // borderColor:'#d2f7f4ff',
        borderColor:'purple',
        borderWidth:2,
        // elevation:5,
        // backgroundColor:'red'
        borderRadius: 10,
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
            marginTop: -27,
            height:20,
            width:20,
            padding:0
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
      marginLeft: 10,
      marginRight: 10,
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
