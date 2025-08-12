import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Icon, Input } from '@rneui/base';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Dimensions, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { REACT_APP_SERVER_URL } from '../assets/constants';
import { ContactData } from './APITypes';
import { showToast } from './ShowProgess';
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
  console.log("=========Welcome Contact info Form=======1");
  const contactInfo = {
    firstName: '',
    lastName: '',
    label: '',
    mobile: '',
    email: '',
    address: '',
    dob: '',
    note: '',
  };

  const [formValidation, setFormValidation] = useState('');
  const [save, setSave] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setAPICallError] = useState('');
  const [contactFormData, setcontactFormData] = useState([ContactInfoForm]);
  const [formData, setFormData] = useState(contactInfo);

  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   label: '',
  //   mobile: '',
  //   email: '',
  //   address: '',
  //   dob: '',
  //   note: '',
  // });

  const feedContactForm = (f: string, v: string) => {
    setFormData(data => ({ ...data, [f]: [v] }))
  };

  console.log("=========Welcome Contact info Form=======2");

  const offline = true;
  const createContactAPICall = async () => {
    if (offline) {
      console.log('-----------CALL showToast');

      showToast();
      props.setReloadContactPage(true);
      props.setShowContactDetails(false);
      MyStore.setLoginUserId(152);
      return;
    }
    console.log("-> Login async functions");
    if (!formData.firstName || !formData.mobile) {
      setFormValidation("Enter Both first name and Mobile number");
      return;
    }
    const url = REACT_APP_SERVER_URL + '/users/login';

    const contactDetails: ContactData = {
      id: 0,
      firstName: formData.firstName,
      lastName: formData.lastName,
      label: formData.label,
      mobile: formData.mobile,
      email: formData.email,
      address: formData.address,
      dob: formData.dob,
      note: formData.note,
    };

    try {
      MyStore.setCallContactAPI(true);
      console.log("-> Fetch login details");
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactDetails),
      });


      if (!response.ok) {
        console.log("Login failed - Network Fail");
        setAPICallError('Login request failed with status ' + response.status);
        return;
      }

      const jsonResult = await response.json();
      console.log(jsonResult);
      if (jsonResult.success && jsonResult.loginStatus.toLowerCase().includes("success")) {
        console.log("Login success from server");
        // setModalVisible(true);
        showToast();
        props.setShowContactDetails(false);
        props.setReloadContactPage(true);
        // set pop screen to say contact saved and go back to contack screen
      } else {
        console.log("Creat contact failed from server");
        setAPICallError(jsonResult.loginStatus);
      }
    } catch (error) {
      setAPICallError('An error occurred during login.');
      console.error('ERROR====', url, error);
    } finally {
      console.log("Flag to render the page");
      MyStore.setCallContactAPI(false);
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

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  console.log('isKeyboardVisible=', isKeyboardVisible);

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

  return (
    // <KeyboardAvoidingView
    //               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //               style={{ flex: 1,
    //                   backgroundColor:'green'
    //                }}>
    <View style={{width: '100%', backgroundColor:'red', height:isKeyboardVisible ? windowHeight - 400 : undefined}}
    // onLayout={handleLayout}
    >
      
      <View style={{
        backgroundColor: 'red',
        padding: 0,
        paddingBottom: 0,
        marginBottom: 0,
        // height: 50,
        width: '100%', // Ensures the bottom component spans the full width
        alignItems: 'flex-start',
        flexDirection: 'row'
      }}>
        <View style={{width:'50%'}}>
          <TouchableOpacity onPress={() => {props.setShowContactDetails(false);}}>
            <Ionicons
              size={40}
              name={'arrow-back-circle-sharp'}
              color={'pink'} />
          </TouchableOpacity>
        </View>
        <View style={{width:'50%', alignItems:'flex-end'}}>
          <TouchableOpacity onPress={createContactAPICall}>
            <Ionicons
              size={40}
              name={'save'}
              color={'pink'} />
          </TouchableOpacity>
        </View>
      </View>


    <ScrollView contentContainerStyle={styles.container}>
      

      <Input
        placeholder="First name"
        leftIcon={<Icon name="user" type="font-awesome" size={20} />}
        onChangeText={v => feedContactForm('firstName', v)}
        value={formData.firstName}
      />

      <Input
        placeholder="Last name"
        leftIcon={<Icon name="user" type="font-awesome" size={20} />}
        onChangeText={v => feedContactForm('lastName', v)}
        value={formData.lastName}
      />

      <Input
        placeholder="Doctor Teacher Nany 
        Friend"
        leftIcon={<Icon name='users' type="font-awesome" size={20} />}
        onChangeText={v => feedContactForm('relation', v)}
        value={formData.label}
      />

      <Input
        placeholder="Mobile"
        keyboardType="numeric"
        leftIcon={<Icon name="phone" type="font-awesome" size={20} />}
        onChangeText={v => feedContactForm('mobile', v)}
        value={formData.mobile}
      />

      <Input
        placeholder="Email"
        leftIcon={<Icon name="envelope" type="font-awesome" size={20} />}
        onChangeText={v => feedContactForm('email', v)}
        value={formData.email}
      />
      <Input
        placeholder="dob"
        leftIcon={<Icon name="birthday-cake" type="font-awesome" size={20} />}
        onChangeText={v => feedContactForm('dob', v)}
        value={formData.dob}
      />
      <Input
        placeholder="Address"
        leftIcon={<Icon name="address-card" type="font-awesome" size={20} />}
        onChangeText={v => feedContactForm('address', v)}
        value={formData.address}
      />
      <Input
        placeholder="Notes"
        multiline={true}
        numberOfLines={5}
        leftIcon={<Icon name="sticky-note" type="font-awesome" size={20} />}
        onChangeText={v => feedContactForm('note', v)}
        value={formData.note}
      />
      {/* <Button
        title="Save"
        buttonStyle={styles.submitButton}
        onPress={() => createContactAPICall()}
        icon={<Icon name="check-circle" size={20} color="blue" />}
      /> */}
      <Text style={styles.thankYouText}>{error}</Text>

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
    
        </View>
        // </KeyboardAvoidingView>
  );

});
export default ContactInfoForm;


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    backgroundColor: 'red',
    height: 200
  },
  container: {
    flexGrow: 1,
    // padding: 20,
    // backgroundColor: '#F7F1ED',
    backgroundColor: '#E2D1F9',
    // justifyContent: 'center',
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

