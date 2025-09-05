import uploadImage from '@/components/ImageUpload';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import ImageViewer from '@/components/ImageViewer';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@rn-vui/base';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { REACT_APP_SERVER_URL } from '../components/constants';
import { ImageData } from './APITypes';
import ImageGallery from './ImageGallery';
import { callGetImageAPI } from './ShowProgess';
import MyStore from './stores/MyStore';

interface Props {
  setShowHeader: (value: boolean) => void;
  familyId: number,
}

const PlaceholderImage = require('@/assets/images/splash-icon.png');
const ImageShare = observer((props: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [galleryImage, setGalleryImage] = useState<ImageData | undefined>(undefined);
  const [selectedImageURI, setSelectedImageURI] = useState<string | undefined>(undefined);
  const urlGetIds = REACT_APP_SERVER_URL + '/imageIds/';


  useEffect(() => {
    if (props.familyId !== MyStore.currentFamilyId) {
      MyStore.setCurrentFamilyId(props.familyId)
      getImagesAsyn();
    }
  }, [props.familyId]);


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getImagesAsyn = async () => {

    const responseIds = await callGetIdsAPI(urlGetIds + props.familyId);
    console.log('----------responseIds=====', responseIds);
    // responseIds.forEach(async (id: string) => {
    //   console.log('----------callGetImageAPI=====>>>>>>>', id);
    //   callGetImageAPI(id);
    //   console.log('--- imageObj 111=', new Date());
    //   await delay(5000);
    //   console.log('--- imageObj 222=', new Date());
    // });

    for (let i = 0; i < responseIds.length; i++) {
      callGetImageAPI(responseIds[i]);
      await delay(1000);
    };
  };

  const callGetIdsAPI = async (url: string) => {
    try {
      MyStore.setCallImageIdsAPI(true);
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

  const pickImageAsync = async () => {
    setGalleryImage(undefined);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Crucial for getting the Base64 string
    });
    console.log('--- pickImageAsync 111=', new Date());
    if (!result.canceled) {
      setSelectedImageURI(result.assets[0].uri);
      setSelectedImage(result.assets[0].base64);
    }
  };

  const upload = () => {
    const retValue = uploadImage(selectedImage);
    if (retValue) {
      setSelectedImage(undefined);
      setSelectedImageURI(undefined);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        { }
        {galleryImage ? <Image
          source={{ uri: `data:image/jpeg;base64,${galleryImage.image}` }}
          style={{
            width: 300,
            height: 300,
            borderRadius: 10,
          }}
        /> : <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImageURI} />}
      </View>
      <View style={styles.buttonContainer}>
        {/* {!selectedImage && <Button
          titleStyle={{ fontSize: 20 }}
          buttonStyle=
          {{
            marginTop: 20,
            borderRadius: 10,
          }}
          title='Choose a photo'
          color='magenta'
          onPress={pickImageAsync}
        />
        } */}
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
      <View style={{ height: 370, borderRadius: 20 }}>
        <ImageGallery
          galleryImage={galleryImage}
          setGalleryImage={setGalleryImage}
        />
      </View>
      {!selectedImage &&
        <View style={{
          padding: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginRight: 20,
          height: 50,
          alignItems: 'flex-end',
          alignSelf: 'flex-end'
        }}>
          <TouchableOpacity onPress={pickImageAsync}>
            <Ionicons
              size={50}
              name={'add-circle'}
              color={'#f109b7ff'}
            />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
});

export default ImageShare;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e6f2ff',//'red'
    alignItems: 'center',
  },
  imageContainer: {
    top: 20,
  },
  buttonContainer: {
    marginHorizontal: 40,
    marginVertical: 20,
    // flex: 1 / 3,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f5e6f2ff'

  }
});
