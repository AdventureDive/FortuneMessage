import uploadImage from '@/components/ImageUpload';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { REACT_APP_SERVER_URL } from '@/assets/constants';
import ImageViewer from '@/components/ImageViewer';
import { Button } from '@rn-vui/base';
import React from 'react';
import ImageGallery from './ImageGallery';
import { callGetImageAPI } from './ShowProgess';
import MyStore from './stores/MyStore';

interface Props {
  setShowHeader: (value: boolean) => void;
  familyId: number,
}
interface ImageProps {
  id: string,
}

const PlaceholderImage = require('@/assets/images/splash-icon.png');
const ImageShare = (props: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [selectedImageURI, setSelectedImageURI] = useState<string | undefined>(undefined);
  const urlGetIds = REACT_APP_SERVER_URL + '/imageIds/';
  

  useEffect(() => {
    if(props.familyId !== MyStore.currentFamilyId){
      MyStore.setCurrentFamilyId(props.familyId)
      console.log('ImageShare useEffect=========Call Image API=========')
      getImagesAsyn();
    } else {
      console.log('ImageShare useEffect=========DONT Call Image API=========')
    }
  }, [props.familyId]);

  // useEffect(() => {
  //   console.log('=========USE EFFECT=========imageList=', props.imageList.length);
  // }, [props.imageList]);

  const getImagesAsyn = async () => {
    // console.log('Inside getImagesAsyn ');
    // const responseImage = [];
    const responseIds = await callGetIdsAPI(urlGetIds + props.familyId);
    console.log('----------responseIds=', responseIds);
    responseIds.forEach(async (id: string) => {
      const imageObj = await callGetImageAPI(id);
      console.log('--- imageObj 111=', imageObj.id);
      // responseImage.push(imageObj.image);
      // MyStore.addToimageList(imageObj.image);
    });
    // setImageList(responseImage);
  };

  const callGetIdsAPI = async (url: string) => {
    try {
      MyStore.setCallImageIdsAPI(true);
      // console.log('IN callGetIdsAPI...', url, MyStore.callImagesIdsAPI);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        console.log('Get Image id request failed with status ' + response.status);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.log('An error occurred while getting image id.');
      console.error('ERROR====', url, error);
      return null;
    } finally {
      MyStore.setCallContactAPI(false);
    }
  }

  // const callGetImageAPI = async (url: string) => {
  //   try {
  //     MyStore.setCallImageAPI(true);
  //     // console.log('IN callGetImageAPI...', url, MyStore.callImageAPI);
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //       },
  //     });
  //     if (!response.ok) {
  //       console.log('Get Image request failed with status ' + response.status);
  //       return null;
  //     }
  //     // console.log('=====response ...', response);
  //     return await response.json();

  //   } catch (error) {
  //     console.log('An error occurred while getting image.');
  //     console.error('ERROR====', url, error);
  //     return null;
  //   } finally {
  //     MyStore.setCallImageAPI(false);
  //   }
  // }


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Crucial for getting the Base64 string
    });

    if (!result.canceled) {
      setSelectedImageURI(result.assets[0].uri);
      setSelectedImage(result.assets[0].base64);
      // Now you have the Base64 string of the image
      // You can send this in your network request
    }
  };

  const upload = () => {
    const retValue = uploadImage(selectedImage);
    if(retValue){
      setSelectedImage(undefined);
      setSelectedImageURI(undefined);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImageURI} />
      </View>
      <View style={styles.buttonContainer}>
        {!selectedImage && <Button
          titleStyle={{ fontSize: 20 }}
          buttonStyle=
          {{
            marginTop: 20,
            borderRadius: 10,
          }}
          title='Choose a photo'
          color='magenta'
          // onPress={pickImageAsync}
          onPress={pickImageAsync}
        />
        }
        {selectedImage && <Button
          titleStyle={{ fontSize: 20 }}
          buttonStyle=
          {{
            marginTop: 20,
            borderRadius: 10,
          }}
          title='Share'
          color='magenta'
          onPress={() => upload()}
        />
        }
      </View>
      <View>
        {/* <ImageGallery imageData={imageList}/>  */}
        <ImageGallery/> 
        </View>
    </View>
  );
}
export default ImageShare;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e6f2ff',//'red'
    alignItems: 'center',
  },
  imageContainer: {
    top: 40,
    // flex: 1,
  },
  buttonContainer: {
    marginHorizontal:40,
    marginVertical:40,
    // flex: 1 / 3,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f5e6f2ff'

  }
});
