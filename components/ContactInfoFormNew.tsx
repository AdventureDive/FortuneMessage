import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Icon, Input } from '@rneui/base';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const ContactInfoFormNew = observer((props: Props) => {
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [label, setLabel] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [note, setNote] = useState('');
  
  useEffect(() => {
      console.log('--props.editContact=', props.editContact);
        if (props.editContact) {
            setFirstName(props.editContact.firstName);
            setLastName(props.editContact.lastName);
            setLabel(props.editContact.label);
            setMobile(props.editContact.mobile);
            setEmail(props.editContact.email);
            setAddress(props.editContact.address);
            setDob(props.editContact.dob);
            setNote(props.editContact.note);
        }
    }, [props.editContact]);

  const createContactAPICall = async () => {
    console.log('--------IN createContactAPICall..');
    if (!firstName || !lastName || !mobile) {
      const msg = "Enter Both first name and Mobile number";
      showToast({ type: 'error', message: msg });
      return;
    }
    const urlCreate = REACT_APP_SERVER_URL + '/member/addContact';

    try {
      MyStore.setCallContactEditAPI(true);
      const body = {
        firstName: firstName,
        lastName: lastName,
        label: label,
        mobile: mobile,
        email: email,
        address: address,
        dob: dob,
        note: note,
      };
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

      showToast({ type: "success", message: "Contact saved" });
      props.setShowContactDetails(false);
      props.setReloadContactPage(true);
    } catch (error) {
      showToast({ type: "error", message: 'An error occurred during save.' });
      console.error('ERROR====', urlCreate, error);
    } finally {
      MyStore.setCallContactEditAPI(false);
    }
  };

  const updateContactAPICall = async () => {
    console.log('--------IN updateContactAPICall..');
    if (!firstName || !lastName || !mobile) {
      const msg = "Enter Both first name and Mobile number";
      showToast({ type: 'error', message: msg });
      return;
    }
    const urlUpdate = REACT_APP_SERVER_URL + '/member/editContact/' + props.editContact.id;

    try {
      MyStore.setCallContactEditAPI(true);
      console.log('--->> urlUpdate=', urlUpdate);
      const body = {
        id: props.editContact.id,
        firstName: firstName,
        lastName: lastName,
        label: label,
        mobile: mobile,
        email: email,
        address: address,
        dob: dob,
        note: note,
      };
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

      showToast({ type: "success", message: "Contact saved" });
      props.setShowContactDetails(false);
      props.setReloadContactPage(true);
    } catch (error) {
      showToast({ type: "error", message: 'An error occurred during save.' });
      console.error('ERROR====', urlUpdate, error);
    } finally {
      MyStore.setCallContactEditAPI(false);
    }
  };

  if (MyStore.callContactEditAPI) {
    RenderLoading();
  } else {
    return (
      <View style={{margin:30}}>
      <View><Text style={{fontSize:25, textAlign:'center', color:'magenta', paddingTop:30, paddingBottom:30}}>Contact details</Text></View>
        <ScrollView style={{backgroundColor: '#faeef5ff'}}>

          <Input
          // style={{margin:10, borderColor:'black', borderWidth:10}}
            placeholder="First name"
            leftIcon={<Icon name="user" type="font-awesome" size={20} color={'pink'}/>}
            onChangeText={setFirstName}
            value={firstName}
          />

          <Input
            placeholder="Last name"
            leftIcon={<Icon name="user" type="font-awesome" size={20}  color={'lightgreen'}/>}
            onChangeText={setLastName}
            value={lastName}
          />

          <Input
            placeholder="Dr Tr Nany Friend"
            leftIcon={<Icon name='users' type="font-awesome" size={20}  color={'powderblue'}/>}
            onChangeText={setLabel}
            value={label}
          />

          <Input
            placeholder="Mobile"
            keyboardType="numeric"
            maxLength={10}
            leftIcon={<Icon name="phone" type="font-awesome" size={20} color={'magenta'}/>}
            onChangeText={setMobile}
            value={mobile}
          />

          <Input
            placeholder="Email"
            leftIcon={<Icon name="envelope" type="font-awesome" size={20} color={'skyblue'} />}
            onChangeText={setEmail}
            value={email}
          />
          <Input
            placeholder="dob"
            leftIcon={<Icon name="birthday-cake" type="font-awesome" size={20} color={'orange'}/> }
            onChangeText={setDob}
            value={dob}
          />
          <Input
            placeholder="Address"
            leftIcon={<Icon name="address-card" type="font-awesome" size={20} color={'steelblue'}/>}
            onChangeText={setAddress}
            value={address}
          />
          <Input
            placeholder="Notes"
            multiline={true}
            numberOfLines={5}
            leftIcon={<Icon name="sticky-note" type="font-awesome" size={20} color={'lightcoral'}/>}
            onChangeText={setNote}
            value={note}
          />

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
                color={'magenta'} />
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={props.editContact ? updateContactAPICall : createContactAPICall}>
              <Ionicons
                size={40}
                name={'save'}
                color={'magenta'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      // </KeyboardAvoidingView>
    );
  }

});
export default ContactInfoFormNew;


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    // backgroundColor: 'red',
    // height: 200
  },
  container: {
    backgroundColor: '#E2D1F9',
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
    backgroundColor: 'green',
    width: 100,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

