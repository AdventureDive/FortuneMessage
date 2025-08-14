import { REACT_APP_SERVER_URL } from "@/assets/constants";
import ContactInfoForm from "@/components/ContactInfoForm";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ContactData } from "./APITypes";
import { RenderLoading } from "./ShowProgess";
import MyStore from "./stores/MyStore";

interface ContactProps {
    item: ContactData
    index: number
}

interface Props {
    setShowHeader: (value: boolean) => void;
}

const Contacts = (props: Props) => {
    const { width, height } = Dimensions.get('window');
    const windowWidth = Math.round(width);
    const windowHeight = Math.round(height);
    const [reloadData, setReloadData] = useState(true);
    const [showContactDetails, setShowContactDetails] = useState(false);
    const [contactList, setContactList] = useState<[ContactData]>();
    const [editContact, setEditContact] = useState<ContactData>(undefined);

    const urlGet = REACT_APP_SERVER_URL + '/member/contactlist';

    useEffect(() => {
        console.log("===========Call contacts page Api method if " + reloadData);
        if (reloadData) {
            console.log("===========Call contact Api method calling---");
            {
                getContacts();
            }
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

    const getContacts = async () => {
        const response = await callGetContactAPI(urlGet);
        setContactList(response);
    };

    const callGetContactAPI = async (url: string) => {
        try {
            console.log('IN callGetContactAPI...');
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
            console.log('After callGetContactAPI...' + response.status);

            return await response.json();
        } catch (error) {
            console.log('An error occurred while getting contacts.');
            console.error('ERROR====', url, error);
            console.log('IN callGetAPIAsync...setCallAPI FALSE 222');

            return null;
        } finally {
            console.log("Flag to render the page");
            MyStore.setCallContactAPI(false);
        }
    }

    console.log("===========inside contact Page *** showContactDetails " + showContactDetails);
    const renderFlatList = (props: ContactProps) => (

        <TouchableOpacity style={{
            ...styles.itemContainer,
            maxWidth: (windowWidth - 25),
        }} onPress={() => {
            console.log("=========call contact info edit screen");
            setEditContact(props.item)
            setShowContactDetails(true);
        }}>
            <LinearGradient
                // colors={['white', '#f5faf6']}
                colors={['white', '#faf5f9ff']}
                style={styles.gradContainer} // Apply styles to control the gradient's size and positioning
                start={{ x: 0, y: 1 }} // Starting point of the gradient (top-left)
                end={{ x: 0, y: 0 }}   // Ending point of the gradient (bottom-right)
            >
                <View style={{flex:1, flexDirection:'row'}}>
                <View style={{width:'20%'}}>
                <View style={{ alignSelf: 'flex-start', width: 75, margin:10 }}>
                    <MaskedView
                        style={{ height: 75 }} // Adjust height as needed
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
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{
                        // alignItems: 'flex-end',
                        paddingLeft: 10,
                        paddingTop: 10,
                        margin:10

                    }}>
                        <Text style={{
                            ...styles.eventListenerText,
                            // color:props.item.color
                            color: '#8c63deff'
                        }}>{props.item.firstName} {props.item.lastName}</Text>
                        <Text style={{
                            ...styles.eventListenerText,
                            // color:props.item.color
                            color: '#8c63deff'
                        }}>{props.item.mobile}</Text>

                    </View>
                </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>


    );

    const renderContactPage = () => {
        console.log("==========Welcome to Contacts Page:renderContactPage");
        return (
            <View style={{
                // backgroundColor: 'black',
                flex: 1,
                // justifyContent: 'flex-end',
                margin:10,
            }}>

                <View style={{ margin: 5, height: windowHeight * 0.8 }}>
                    {/* <Text>"Welcome To Contacts Page"</Text> */}
                    <FlatList data={contactList}
                        renderItem={renderFlatList}
                        keyExtractor={(_item, index) => index.toString()}>
                    </FlatList>
                </View>

                <View style={{
                    // backgroundColor: 'red',
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
                    }}>
                        <Ionicons
                            size={40}
                            name={'add-circle'}
                            color={'red'} />
                    </TouchableOpacity></View>
            </View >
        );

    }
    const renderContent = () => {
        if (MyStore.callContactAPI) {
            console.log("-----------showing splach screen-------")
            RenderLoading();
        } else {
            if (showContactDetails) {
                return (
                    <ContactInfoForm
                        editContact={editContact}
                        setShowContactDetails={setShowContactDetails}
                        setReloadContactPage={setReloadData}
                    />
                )
            } else {
                console.log("-----------paint contact page-------")
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