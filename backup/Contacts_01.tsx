import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Contacts = () => {
    const [addNew, setAddNew] = useState(false);
    const [render, setRender] = useState(false);

    useEffect(() => {
        if (render) {
            setAddNew(false);
        }
    }, [render]);

    // if (addNew) {
    //     return (
    //         <ContactInfoForm setRender={setRender} />
    //     )
    // }

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
                <Text>"Welcome To Contacts Page"</Text></View>

            <View style={{
                backgroundColor: 'red',
                padding: 0,
                paddingBottom:0,
                marginBottom:0,
                height:50,
                width: '100%', // Ensures the bottom component spans the full width
                alignItems: 'flex-end'
            }}>
                <TouchableOpacity onPress={() => { 
                    setAddNew(true) }}>
                        <Ionicons                        
                        size={40}                          
                        name={'add-circle'} 
                        color={'pink'}/>
                </TouchableOpacity></View>
        </View >
    );
};
export default Contacts;