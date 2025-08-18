import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Icon, Input } from '@rneui/base';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { REACT_APP_SERVER_URL } from '../assets/constants';
import { ContactData } from './APITypes';
import { RenderLoading, showToast } from './ShowProgess';
import MyStore from './stores/MyStore';

interface formProb {
  field: string,
  value: string
}

interface Props {
  setShowContactDetails: (value: boolean) => void,
  setReloadContactPage: (value: boolean) => void,
  editContact?: ContactData
}

const ContactInfoForm = observer((props: Props) => {
  console.log("=========Welcome Contact info OLD Form=======1");
  const contactInfo = props.editContact ? props.editContact : {
    firstName: '',
    lastName: '',
    label: '',
    mobile: '',
    email: '',
    address: '',
    dob: '',
    note: '',
  };

  const [error, setAPICallError] = useState('');
  const [formData, setFormData] = useState(contactInfo);

  console.log("=========" + JSON.stringify(formData));

  const feedContactForm = (f: string, v: string) => {
    setFormData(data => ({ ...data, [f]: [v] }))
  };

  console.log("=========Welcome Contact info Form=======2");

  const offline = false;
  const createContactAPICall = async () => {
    if (offline) {
      console.log('-----------CALL showToast');

      setAPICallError("Conact saved");
      showToast({ type: "success", message: error });
      props.setReloadContactPage(true);
      props.setShowContactDetails(false);
      return;
    }
    console.log("-> async functions API call for ");
    if (!formData.firstName || !formData.firstName || !formData.mobile) {
      const msg = "Enter Both first name and Mobile number";
      showToast({ type: 'error', message: msg });
      return;
    }
    const urlCreate = REACT_APP_SERVER_URL + '/member/addContact';

    try {
      MyStore.setCallContactEditAPI(true);
      console.log("-> Fetch Creat URL details");
      console.log("==========Contact submit: " + JSON.stringify(formData));
      const body = {
        firstName: formData.firstName[0],
        lastName: formData.lastName[0],
        label: formData.label[0],
        mobile: formData.mobile[0],
        email: formData.email[0],
        address: formData.address[0],
        dob: formData.dob[0],
        note: formData.note[0],
      };
      // const body = {
      //   firstName: "Tamizhiniyan",
      //   lastName: "Vasanth",
      //   label: "Rock Star",
      //   mobile: "6393836421",
      //   email: "tamizhvaasigmail.com",
      //   address: "1252 North Galloway St Unit 206 REGINA SK",
      //   dob: "07-12-2017",
      //   note: "1. Tamizhiniyan details for testing UI"
      // }
      console.log("==========Contact submit body: " + JSON.stringify(body));
      const response = await fetch(urlCreate, {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });


      if (!response.ok) {
        console.log("Create contact - Network Fail");
        setAPICallError('Create contact request failed with status ' + response.status);
        showToast({ type: 'error', message: error })
        return;
      }

      // const jsonResult = await response.json();
      // console.log('---jsonResult=', jsonResult);
      // if (jsonResult.success && jsonResult.loginStatus.toLowerCase().includes("success")) {
      //   console.log("Login success from server");
      //   // setModalVisible(true);
      console.log('-------------------Contact saved');
      // setAPICallError("Contact saved");
      showToast({ type: "success", message: "Contact saved" });
      props.setShowContactDetails(false);
      props.setReloadContactPage(true);
      // } else {
      //   console.log("Creat contact failed from server");
      //   setAPICallError(jsonResult.loginStatus);
      // }
    } catch (error) {
      // setAPICallError('An error occurred during login.');
      showToast({ type: "error", message: 'An error occurred during save.' });
      console.error('ERROR====', urlCreate, error);
    } finally {
      MyStore.setCallContactEditAPI(false);
    }
  };

  const updateContactAPICall = async () => {
    console.log("-> async functions API call for ");
    if (!formData.firstName || !formData.firstName || !formData.mobile) {
      const msg = "Enter Both first name and Mobile number";
      showToast({ type: 'error', message: msg });
      return;
    }
    const urlUpdate = REACT_APP_SERVER_URL + '/member/editContact/' + props.editContact.id;

    try {
      MyStore.setCallContactEditAPI(true);
      console.log("-> Fetch Creat URL details");
      // console.log("==========Contact submit: " + JSON.stringify(formData));
      const body = {
        firstName: formData.firstName[0],
        lastName: formData.lastName[0],
        label: formData.label[0],
        mobile: formData.mobile[0],
        email: formData.email[0],
        address: formData.address[0],
        dob: formData.dob[0],
        note: formData.note[0],
      };
      // console.log("==========Contact submit body: " + JSON.stringify(body));
      console.log("==========Contact submit urlUpdate: " + urlUpdate);
      const response = await fetch(urlUpdate, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });


      if (!response.ok) {
        console.log("Create contact - Network Fail");
        setAPICallError('Create contact request failed with status ' + response.status);
        showToast({ type: 'error', message: error })
        return;
      }

      // const jsonResult = await response.json();
      // console.log('---jsonResult=', jsonResult);
      // if (jsonResult.success && jsonResult.loginStatus.toLowerCase().includes("success")) {
      //   console.log("Login success from server");
      //   // setModalVisible(true);
      console.log('-------------------Contact saved');
      // setAPICallError("Contact saved");
      showToast({ type: "success", message: "Contact saved" });
      props.setShowContactDetails(false);
      props.setReloadContactPage(true);
      // } else {
      //   console.log("Creat contact failed from server");
      //   setAPICallError(jsonResult.loginStatus);
      // }
    } catch (error) {
      // setAPICallError('An error occurred during login.');
      showToast({ type: "error", message: 'An error occurred during save.' });
      console.error('ERROR====', urlUpdate, error);
    } finally {
      MyStore.setCallContactEditAPI(false);
    }
  };

  console.log("=========Welcome Contact info Form=======3");

  // console.log("=========Welcome Contact info Form=======4 modalVisible=", modalVisible);

  // if (modalVisible) {
  //   return (
  //     // <View style={styles.container}>
  //       <Modal
  //         style={styles.modalView}
  //         animationType="slide" // Or "fade" or "none"
  //         transparent={true} // Allows background content to be visible
  //         visible={modalVisible}
  //         onRequestClose={() => {
  //           setModalVisible(!modalVisible);
  //           props.setRender(true);
  //         }}

  //       >
  //         <Text style={styles.modalText}>Contact Saved</Text>
  //       </Modal>
  //     // </View>
  //   );
  //   // send back to contact screen
  // }

  console.log('-------painting Contact info form screen');

  const windowHeight = Dimensions.get("window").height;
  const [maxHeight, setMaxHeight] = useState(windowHeight);
  console.log('windowHeight=', windowHeight);

  // const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       setKeyboardVisible(true);
  //     },
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setKeyboardVisible(false);
  //     },
  //   );

  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

  // console.log('isKeyboardVisible=', isKeyboardVisible);

  // const handleLayout = (event:any) => {
  //   if(isKeyboardVisible){
  //     const { width, height } = event.nativeEvent.layout;
  //     console.log('-- height=', height);
  //     setMaxHeight(height - 100);
  //   } else {
  //     setMaxHeight(windowHeight);
  //   }
  // };  
  console.log('maxHeight=', maxHeight);

  if (MyStore.callContactEditAPI) {
    RenderLoading();
  } else {
    return (
      // <KeyboardAvoidingView
      //               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      //               style={{ flex: 1,
      //                   backgroundColor:'green'
      //                }}>
      <View style={{
        // width: '100%',
        // backgroundColor: 'lightcoral',
        // height: windowHeight,
        margin:30,
      // height:isKeyboardVisible ? windowHeight - 400 : undefined
    }}
      // onLayout={handleLayout}
      >


      <View><Text style={{fontSize:25, textAlign:'center', color:'red', paddingTop:30, paddingBottom:30}}>Contact details</Text></View>


        <ScrollView style={{
          // maxHeight:windowHeight, 
          backgroundColor: '#faeef5ff'}}>


          <Input
          // style={{margin:10, borderColor:'black', borderWidth:10}}
            placeholder="First name"
            leftIcon={<Icon name="user" type="font-awesome" size={20} color={'pink'}/>}
            onChangeText={v => feedContactForm('firstName', v)}
            value={formData.firstName}
          />

          <Input
            placeholder="Last name"
            leftIcon={<Icon name="user" type="font-awesome" size={20}  color={'lightgreen'}/>}
            onChangeText={v => feedContactForm('lastName', v)}
            value={formData.lastName}
          />

          <Input
            placeholder="Dr Tr Nany Friend"
            leftIcon={<Icon name='users' type="font-awesome" size={20}  color={'powderblue'}/>}
            onChangeText={v => feedContactForm('label', v)}
            value={formData.label}
          />

          <Input
            placeholder="Mobile"
            keyboardType="numeric"
            maxLength={10}
            leftIcon={<Icon name="phone" type="font-awesome" size={20} color={'magenta'}/>}
            onChangeText={v => feedContactForm('mobile', v)}
            value={formData.mobile}
          />

          <Input
            placeholder="Email"
            leftIcon={<Icon name="envelope" type="font-awesome" size={20} color={'skyblue'} />}
            onChangeText={v => feedContactForm('email', v)}
            value={formData.email}
          />
          <Input
            placeholder="dob"
            leftIcon={<Icon name="birthday-cake" type="font-awesome" size={20} color={'orange'}/> }
            onChangeText={v => feedContactForm('dob', v)}
            value={formData.dob}
          />
          <Input
            placeholder="Address"
            leftIcon={<Icon name="address-card" type="font-awesome" size={20} color={'steelblue'}/>}
            onChangeText={v => feedContactForm('address', v)}
            value={formData.address}
          />
          <Input
            placeholder="Notes"
            multiline={true}
            numberOfLines={5}
            leftIcon={<Icon name="sticky-note" type="font-awesome" size={20} color={'lightcoral'}/>}
            onChangeText={v => feedContactForm('note', v)}
            value={formData.note}
          />
           {/* <Button
            title="Save"
            buttonStyle={styles.submitButton}
            onPress={() => createContactAPICall()}
            icon={<Icon name="check-circle" size={20} color="blue" />}
          /> */}

          {/* <Text style={{backgroundColor:'red', 
         height:50,
         color:'black'} }>{formValidation} {error}</Text> */}

          {/* <Modal
          style={styles.modalView}
          animationType="slide" // Or "fade" or "none"
          // transparent={true} // Allows background content to be visible
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            props.setRender(true);
          }}
          
         >
          <View style={styles.centeredView}>
          <Text style={styles.modalText}>Contact Saved</Text>
          <Button
            title="close"
            buttonStyle={styles.submitButton}
            onPress={() => setModalVisible(false)}
            icon={<Icon name="check-circle" size={20} color="blue" />}
          />
          </View>
         </Modal> */}
        </ScrollView>
          <View style={{
                  backgroundColor: '#faeef5ff',
                  padding: 0,
                  paddingBottom: 0,
                  marginBottom: 0,
                  // height: 50,
                  width: '100%',
                  alignItems: 'flex-start',
                  flexDirection: 'row'
            }}>
          <View style={{ width: '50%' }}>
            <TouchableOpacity onPress={() => { props.setShowContactDetails(false); }}>
              <Ionicons
                size={40}
                name={'arrow-back-circle-sharp'}
                color={'red'} />
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={props.editContact ? updateContactAPICall : createContactAPICall}>
              <Ionicons
                size={40}
                name={'save'}
                color={'red'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      // </KeyboardAvoidingView>
    );
  }

});
export default ContactInfoForm;


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    backgroundColor: 'red',
    // height: 200
  },
  container: {
    // flexGrow: 1,
    // padding: 20,
    // backgroundColor: '#F7F1ED',
    backgroundColor: '#E2D1F9',
    // justifyContent: 'center',
    // height:200
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  submitButton: {
    backgroundColor: 'steelblue',
    //'#4CAF50',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  thankYouText: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'powderblue',//'#2e7d32',
  },
  summaryText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 5,
    color: '#555',
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'green',
    width: 100,
    // borderRadius: 20,
    // padding: 35,
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

