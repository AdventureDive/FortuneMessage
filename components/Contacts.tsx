import ContactInfoForm from "@/components/ContactInfoForm";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ContactData } from "./APITypes";

interface ContactProps {
    item: ContactData
    index: number
}

const Contacts = () => {
    const [reloadData, setReloadData] = useState(true);
    const [showContactDetails, setShowContactDetails] = useState(false);
    const [contactList, setContactList] = useState<[ContactData]>();
    const [editContact, setEditContact] = useState<ContactData>(undefined);

    


    useEffect(() => {
        console.log("===========Call Api method if " + reloadData);
        if (reloadData) {
            console.log("===========Call Api method calling---");
            setReloadData(false);
        }
    }, [reloadData]);

    console.log("===========inside contact Page *** showContactDetails " + showContactDetails);
    const renderFlatList = (props: ContactProps) => (
        <View >
            <TouchableOpacity onPress={() => setEditContact(props.item)
            }>
                <Text>{props.item.firstName}</Text>
            </TouchableOpacity>
        </View>


    );

    const renderContactPage = () => {
        console.log("==========Welcome to COntacts Page");
        return (

            <View style={{
                backgroundColor: 'Black',
                flex: 1,
                justifyContent: 'flex-end',
            }}>
                <View style={{
                    backgroundColor: 'white',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text>"Welcome To Contacts Page"</Text>
                    <FlatList data={contactList}
                        renderItem={renderFlatList}
                        keyExtractor={(_item, index) => index.toString()}>
                    </FlatList>
                </View>

                <View style={{
                    backgroundColor: 'red',
                    padding: 0,
                    paddingBottom: 0,
                    marginBottom: 0,
                    height: 50,
                    width: '100%', // Ensures the bottom component spans the full width
                    alignItems: 'flex-end'
                }}>
                    <TouchableOpacity onPress={() => {
                        setShowContactDetails(true);
                    }}>
                        <Ionicons
                            size={40}
                            name={'add-circle'}
                            color={'pink'} />
                    </TouchableOpacity></View>
            </View >
        );

    }
    const renderContent = () => {
        if (showContactDetails) {
            return (
                <ContactInfoForm
                    setShowContactDetails={setShowContactDetails}
                    setReloadContactPage={setReloadData}
                />
            )
        } else {
            return renderContactPage();
        }
    };
    return renderContent();

};
export default Contacts;