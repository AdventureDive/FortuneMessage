import { REACT_APP_SERVER_URL } from "@/assets/constants";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ContactData } from "./APITypes";
import ContactInfoFormNew from "./ContactInfoFormNew";
import { RenderLoading, showToast } from "./ShowProgess";
import MyStore from "./stores/MyStore";

interface ContactProps {
    item: ContactData
    index: number
}

interface Props {
    setShowHeader: (value: boolean) => void;
}
// const drawer = createDrawerNavigator();

const Contacts = (props: Props) => {
    const { width, height } = Dimensions.get('window');
    const windowWidth = Math.round(width);
    const windowHeight = Math.round(height);
    const [reloadData, setReloadData] = useState(true);
    const [showContactDetails, setShowContactDetails] = useState(false);
    const [contactList, setContactList] = useState<[ContactData]>();
    const [editContact, setEditContact] = useState<ContactData>(undefined);
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setDeleteAPICallError] = useState('');
    const [deletedContact, setDeletedContact] = useState<ContactProps>(undefined);
    // const [deletedContact, setDeletedContact] = useState<ContactProps>({item:{
    //     id:0,
    //     firstName: '',
    //     lastName: '',
    //     label: '',
    //     mobile: '',
    //     email: '',
    //     address: '',
    //     dob: '',
    //     note: '',
    // }, index:0});

    const urlGet = REACT_APP_SERVER_URL + '/member/contactlist';

    useEffect(() => {
        if (reloadData) {
            getContactsRes();
            setReloadData(false);
        }
    }, [reloadData]);

    useEffect(() => {
        if (showContactDetails) {
            props.setShowHeader(false);
        } else {
            props.setShowHeader(true);
        }
    }, [showContactDetails]);

    const getContactsRes = async () => {
        const response = await callGetContactAPI(urlGet);
        setContactList(response);
    };

    const callGetContactAPI = async (url: string) => {
        try {
            MyStore.setCallContactAPI(true);
            console.log('IN callGetContactAPI...', url, MyStore.callContactAPI);
            // const ip = "http://172.16.1.72:8080/";
            const response = await fetch(urlGet, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });
            if (!response.ok) {
                console.log('Get users request failed with status ' + response.status);
                return null;
            }

            return await response.json();
        } catch (error) {
            console.log('An error occurred while getting contacts.');
            console.error('ERROR====', url, error);
            console.log('IN callGetAPIAsync...setCallAPI FALSE 222');

            return null;
        } finally {
            MyStore.setCallContactAPI(false);
        }
    }
    const deleteContactRes = async (props: ContactProps) => {
        const urlDelete = REACT_APP_SERVER_URL + '/member/deleteContact/' + props.item.id;
        await deleteContactAPICall(urlDelete);
        setReloadData(true);
    };
    const deleteContactAPICall = async (url: string) => {
        console.log("-> async functions API call for delete contact");
        try {
            MyStore.setCallContactEditAPI(true);
            console.log("-> Fetch delete URL details" + url);
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });


            if (!response.ok) {
                console.log("Delete contact - Network Fail");
                showToast({ type: "error", message: "Delete contact request failed with status ' + response.status" })
                return;
            }
            showToast({ type: "info", message: "Contact deleted" });
        } catch (error) {
            showToast({ type: "error", message: 'An error occurred while deleting contact.' });
            console.error('ERROR====', url, error);
        } finally {
            MyStore.setCallDeleteContactAPI(false);
        }
    };

    const callContact = (props: ContactProps) => {
        console.log("=========Calling contact============");
        const phoneNumber = props.item.mobile;
        Linking.openURL(`tel:${phoneNumber}`);
    }
    const updateContact = (props: ContactProps) => {
        console.log("=========call contact info edit screen");
        setEditContact(props.item)
        setShowContactDetails(true);
    }
    const deleteContact = (props: ContactProps) => {
        console.log("=========Delete Contact============");
        setDeletedContact(props);
        setModalVisible(true);
    }


    const renderFlatList = (props: ContactProps) => {
        return (
            <View style={{
                ...styles.itemContainer,
                maxWidth: (windowWidth - 25),
                // padding:10
            }}
            // onPress={() => {
            //      console.log("=========call contact info edit screen");
            //     setEditContact(props.item)
            //     setShowContactDetails(true);
            // }}
            >
                <LinearGradient
                    // colors={['white', '#f5faf6']}
                    colors={['white', '#faf5f9ff']}
                    style={styles.gradContainer} // Apply styles to control the gradient's size and positioning
                    start={{ x: 0, y: 1 }} // Starting point of the gradient (top-left)
                    end={{ x: 0, y: 0 }}   // Ending point of the gradient (bottom-right)
                >
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        // backgroundColor:'red' 
                    }}
                    >
                        <View style={{ width: '20%' }}>
                            <View style={{ alignSelf: 'flex-start', width: 75, margin: 10 }}>
                                <MaskedView
                                    style={{ height: 75 }} // Adjust height as needed
                                    maskElement={
                                        <MaterialIcons name={'quick-contacts-dialer'} color={'steelblue'} size={75} />
                                        // <MaterialCommunityIcons name={props.item.icon} color={props.item.color} size={40} />
                                    }
                                >
                                    <LinearGradient
                                        // colors={['#7bdfe8ff', '#2ab9c6ff']}
                                        // colors={['#f10909ff', '#ed3dc1ff']}
                                        colors={['#ad29caff', '#e4b3efff']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 0.5 }}
                                        style={{ flex: 1 }}
                                    />
                                </MaskedView>
                            </View>
                        </View>
                        {/* <View style={{
                        flexDirection: 'column',
                        width: 200,
                        margin: 10,
                        backgroundColor: 'black'

                    }}
                    > */}
                        <View style={{
                            // alignItems: 'flex-end',
                            flexDirection: 'column',
                            width: 150,
                            marginLeft: 30,
                            marginTop: 10,
                            marginBottom: 20,
                            marginRight: 10,
                            // backgroundColor: 'black',
                            paddingLeft: 0,
                            paddingTop: 0,
                            // borderWidth: 1,
                            // borderColor: 'red',

                        }}>
                            <Text style={{
                                ...styles.eventListenerText,
                                // color:props.item.color
                                color: '#871993ff'
                            }}>{props.item.firstName}</Text>
                            <Text style={{
                                ...styles.eventListenerText,
                                // color:props.item.color
                                color: '#871993ff'
                            }}>{props.item.lastName}</Text>
                            <Text style={{
                                ...styles.eventListenerText,
                                // color:props.item.color
                                color: '#8c63deff'
                            }}>{props.item.mobile}</Text>

                        </View>
                        {/* </View> */}

                        {/* Event text display - Call Edit Delete */}

                        <View style={{
                            // flex: 1,
                            flexDirection: 'column',
                            alignContent: 'flex-end',
                            // width:1,
                            // borderWidth: 1,
                            // borderColor: 'red',

                            // backgroundColor: 'red'
                        }}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    callContact(props)}>
                                <View style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    // borderWidth: 1,
                                    // borderColor: 'red',
                                    // backgroundColor: 'red'
                                    marginTop: 5,
                                    marginBottom: 5
                                }}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 4,
                                        marginRight: 3,
                                        // borderWidth: 1,
                                        // borderColor: 'red',
                                        // backgroundColor: 'red'
                                    }}>
                                        <Ionicons
                                            name="call"
                                            size={18}
                                            color='#ed3dc1ff' //'#f10909ff' //"purple" 
                                        />
                                    </View>
                                    {/* <View style={{ width: '5%' }}>
                                    <View style={{ alignSelf: 'flex-start', width: 10, margin: 5 }}>
                                        <MaskedView
                                            style={{ height: 20 }} // Adjust height as needed
                                            maskElement={
                                                <MaterialIcons name={'quick-contacts-dialer'} color={'steelblue'} size={75} />
                                                // <MaterialCommunityIcons name={props.item.icon} color={props.item.color} size={40} />
                                            }
                                        >
                                            <LinearGradient
                                                // colors={['#7bdfe8ff', '#2ab9c6ff']}
                                                colors={['#f10909ff', '#ed3dc1ff']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0, y: 0.5 }}
                                                style={{ flex: 1 }}
                                            />
                                        </MaskedView>
                                    </View>
                                </View> */}
                                    <Text style={{
                                        ...styles.eventListenerText,
                                        // textAlign:"auto",
                                        // paddingRight:0,
                                        // color:props.item.color
                                        color: '#8c63deff'
                                    }}>Call
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    updateContact(props)}>
                                <View style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    // borderWidth: 1,
                                    // borderColor: 'red',
                                    // backgroundColor: 'red'
                                    marginBottom: 5
                                }}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 4,
                                        marginRight: 3,
                                        // borderWidth: 1,
                                        // borderColor: 'red',
                                        // backgroundColor: 'red'
                                    }}>
                                        {/* <MaterialCommunityIcons name="account-edit-outline"
                                        size={15}
                                        color="blue" /> */}
                                        <FontAwesome5
                                            name="user-edit"
                                            size={18}
                                            color='#ed3dc1ff' //"purple" 
                                        />

                                    </View>
                                    <Text style={{
                                        ...styles.eventListenerText,
                                        // color:props.item.color
                                        color: '#8c63deff'
                                    }}>Edit
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    deleteContact(props)}>
                                <View style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    // borderWidth: 1,
                                    // borderColor: 'red',
                                    // backgroundColor: 'red'
                                    // marginTop:5
                                }}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 4,
                                        marginRight: 3,
                                        // borderWidth: 1,
                                        // borderColor: 'red',
                                        // backgroundColor: 'red'
                                    }}>
                                        {/* <AntDesign name="deleteuser" size={18} color="blue" /> */}
                                        {/* <MaterialIcons name="delete" size={18} color="blue" /> */}
                                        <FontAwesome
                                            name="user-times"
                                            size={18}
                                            color="#ed3dc1ff" //"purple" 
                                        />
                                    </View>
                                    <Text style={{
                                        ...styles.eventListenerText,
                                        // color:props.item.color
                                        color: '#8c63deff'
                                    }}>Delete
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </LinearGradient >
            </View >


        );
    };

    const renderContactPage = () => {
        return (
            <View style={{
                backgroundColor: '#f5e6f2ff',
                flex: 1,
                // justifyContent: 'flex-end',
                margin: 10,
                top: 50,
                minHeight: '95%',
                borderRadius: 10,
                borderWidth: 5,
                borderColor: '#f5e6f2ff',

            }}>

                <View style={{
                    margin: 5,
                    height: windowHeight * 0.8,
                    borderRadius: 10,
                    backgroundColor: '#f5e6f2ff'
                }}>
                    {/* <Text>"Welcome To Contacts Page"</Text> */}
                    <FlatList data={contactList}
                        renderItem={renderFlatList}
                        keyExtractor={(_item, index) => index.toString()}>
                    </FlatList>
                </View>

                <View style={{
                    // backgroundColor: 'black',
                    padding: 0,
                    paddingBottom: 0,
                    marginTop: 10,
                    marginRight: 10,
                    height: 50,
                    // width: '100%', // Ensures the bottom component spans the full width
                    alignItems: 'flex-end'
                }}>
                    <TouchableOpacity onPress={() => {
                        setShowContactDetails(true);
                        setEditContact(undefined);
                    }}>
                        <Ionicons
                            size={50}
                            name={'add-circle'}
                            // color={'#f20bb0ff'}
                            color={'#f109b7ff'}
                        />
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide" // or "fade", "none"
                    transparent={true} // allows the background to be visible
                    visible={modalVisible}
                // style={{ minHeight: 400, backgroundColor: 'red', margin:40, padding:40 }}
                // onRequestClose={ } // for Android back button
                >
                    <LinearGradient
                        // colors={['white', '#f5faf6']}
                        colors={['white', '#ba74acff']}
                        style={{
                            minHeight: 200,
                            // backgroundColor: '#f0d0f0ff',
                            width: '90%',
                            // alignContent: 'center',
                            // alignSelf: 'center',
                            // justifyContent: 'center',
                            top: 200,
                            marginLeft: 20,
                            borderRadius: 20,
                            // padding: 40,
                            // borderWidth:1,
                            // borderColor:'green'
                        }}
                        start={{ x: 0, y: 1 }} // Starting point of the gradient (top-left)
                        end={{ x: 0, y: 0 }}   // Ending point of the gradient (bottom-right)
                    >
                        <View style={{
                            minHeight: 200,
                            // backgroundColor: '#f0d0f0ff',
                            // width: '90%',
                            alignContent: 'center',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            // top: 200,
                            borderRadius: 20,
                            // padding: 40,
                            // borderWidth:1,
                            // borderColor:'green'
                        }}
                        >

                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ fontSize: 20, textAlign: 'center', paddingBottom: 5, color: '#871993ff' }}>Do you want to delete</Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingBottom: 20, color: '#871993ff' }}>{deletedContact ? deletedContact.item.firstName : ''} {deletedContact ? deletedContact.item.lastName : ''}?</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'space-evenly', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity style={{ backgroundColor: '#f9cdcdff', elevation: 10, borderColor: 'lightcoral', borderWidth: 2, borderRadius: 20, padding: 10, height: 50 }}
                                    onPress={() => {
                                        deleteContactRes(deletedContact);
                                        setModalVisible(false);
                                    }
                                    }>
                                    <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center', color: '#a619b6ff' }}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#bdeacdff', elevation: 10, borderColor: 'lightgreen', borderWidth: 2, borderRadius: 20, padding: 10, height: 50 }}
                                    onPress={() => {
                                        showToast({ type: "info", message: "Contact not deleted" })
                                        setModalVisible(false);
                                    }
                                    }>
                                    <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center', color: '#871993ff' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </LinearGradient>
                </Modal>
            </View >
        );

    }
    const renderContent = () => {
        if (MyStore.callContactAPI) {
            RenderLoading();
        } else {
            if (showContactDetails) {
                return (
                    // <ContactInfoForm
                    //     editContact={editContact}
                    //     setShowContactDetails={setShowContactDetails}
                    //     setReloadContactPage={setReloadData}
                    // />
                    <ContactInfoFormNew
                        editContact={editContact}
                        setShowContactDetails={setShowContactDetails}
                        setReloadContactPage={setReloadData}
                    />
                )
            } else {
                return renderContactPage();
            }
        }
    }
    return renderContent();

};
export default Contacts;


const styles = StyleSheet.create({
    itemContainer: {
        flex: 1, // Allows items to share space equally
        margin: 5, // Add margin around each item
        backgroundColor: 'white', //skyblue, powderblue, steelblue
        // padding: 20,
        // alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 8,
        // alignContent: 'center'
        // borderColor:'lightgrey',
        // borderWidth:2,
        // maxWidth:175,
        elevation: 5
    },
    gradContainer: {
        borderRadius: 10
    },
    eventListenerText: {
        // backgroundColor: "blue",
        // padding: 10,
        // borderRadius: 5,
        // marginBottom: 10,
        fontSize: 18,
        // fontStyle:'italic',
        fontWeight: 'bold',
        // color: 'steelblue'        
        fontFamily: 'SpaceMono-Regular',
    },
});