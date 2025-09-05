import MaterialIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { Button } from "@rn-vui/base";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
    getDatabase,
    onValue,
    push,
    ref,
    remove,
    update,
} from "firebase/database";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View
} from "react-native";

interface Props {
    setShowHeader: (value: boolean) => void;
    familyId: number,
}

const firebaseConfig = {
    apiKey: "AIzaSyC2fjsCbX_Rf8GnBzRNJc_cq7MWQSXiqA4",
    authDomain: "my-firebase-project-5a551.firebaseapp.com",
    databaseURL: "https://my-firebase-project-5a551-default-rtdb.firebaseio.com",
    projectId: "my-firebase-project-5a551",
    storageBucket: "my-firebase-project-5a551.firebasestorage.app",
    messagingSenderId: "990934430605",
    appId: "1:990934430605:web:632e2999eb1a80a3a583c4",
    measurementId: "G-P7VBMT2ZY4",
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const rtdb = getDatabase(app);

const NotePad = observer((props: Props) => {
    const [text, setText] = useState("");
    const [items, setItems] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    useEffect(() => {
        const itemsRef = ref(rtdb, "items");
        const unsubscribe = onValue(itemsRef, (snapshot) => {
            const data = snapshot.val() || {};
            const list = Object.entries(data).map(([id, value]) => ({
                id,
                ...(typeof value === "object" && value !== null ? value : {}),
            }));
            list.reverse();
            console.log("onValue -> items:", list);
            setItems(list);
        });
        return unsubscribe;
    }, []);

    const addItem = async () => {
        if (!text.trim()) {
            Alert.alert("Error", "Text cannot be empty!");
            return;
        }
        try {
            await push(ref(rtdb, "items"), { text });
            setText("");
        } catch (err) {
            console.error("Error adding item:", err?.message || err);
            Alert.alert("Error", "Failed to add item.");
        }
    };

    const updateItem = async () => {
        if (!text.trim()) {
            Alert.alert("Error", "Text cannot be empty!");
            return;
        }
        try {
            await update(ref(rtdb, `items/${editingId}`), { text });
            setText("");
            setEditingId(null);
        } catch (err) {
            console.error("Error updating item:", err?.message || err);
            Alert.alert("Error", "Failed to update item.");
        }
    };

    const deleteItem = async (id) => {
        try {
            await remove(ref(rtdb, `items/${id}`));
        } catch (err) {
            console.error("Error deleting item:", err?.message || err);
            Alert.alert("Error", "Failed to delete item.");
        }
    };

    const startEditing = (item) => {
        setText(item.text || "");
        setEditingId(item.id);
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.header}>Realtime DB CRUD Example</Text> */}
            {/* <Text style={styles.sub}>Items: {items.length}</Text> */}
            <View style={{
                backgroundColor: '#f5e6f2ff',
                // backgroundColor: 'red',
                flex: 1,
                height: windowHeight * .6,
                borderRadius: 10,
                borderWidth: 5,
                borderColor: '#f5e6f2ff',
            }}>
                <View>
                    <Text style={{
                        fontSize: 30,
                        textAlign: 'center',
                        color: 'magenta',
                        top: 10,
                        marginVertical: 10,
                        marginHorizontal: 10,
                        paddingTop: 20,
                        paddingBottom: 30,
                        backgroundColor: '#f5e6f2ff',
                    }}>
                        Notes
                    </Text>
                </View>
                <TextInput
                    style={{

                        height: 150,
                        textAlignVertical: 'top',
                        marginTop: 5,
                        backgroundColor: 'white',
                        borderColor: '#f3a6e3ff',
                        borderWidth: 5,
                        borderRadius: 10,
                        marginHorizontal: 10,
                    }}
                    placeholder="Save your notes here..."
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={setText}
                    value={text}


                />
                {editingId ? (
                    <Button
                        titleStyle={{ fontSize: 20 }}
                        buttonStyle=
                        {{
                            marginTop: 20,
                            borderRadius: 15,
                            alignSelf: 'center',
                            borderWidth: 5,
                            width: windowWidth * 1.0 - 80,
                            marginHorizontal: 15,
                            borderColor: '#f5e6f2ff',
                        }}
                        color='magenta'
                        title="Update Item" onPress={updateItem} />
                ) : (
                    <Button
                        titleStyle={{ fontSize: 20 }}
                        buttonStyle=
                        {{
                            marginTop: 20,
                            borderRadius: 15,
                            alignSelf: 'center',
                            borderWidth: 5,
                            width: windowWidth * 1.0 - 80,
                            marginHorizontal: 15,
                            borderColor: '#f5e6f2ff',
                        }}
                        color='magenta'
                        title="Add Item" onPress={addItem} />
                )}

                <FlatList
                    style={{ flex: 1, marginTop: 12 }}
                    data={items}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Text style={{ textAlign: "center", marginTop: 20 }}>
                            No items yet. Add one ↑
                        </Text>
                    }
                    renderItem={({ item }) => (

                        <View style={{
                            height: windowHeight * 0.1,
                            borderBottomWidth: 5,
                            borderColor: '#f3a6e3ff',
                            borderWidth: 3,
                            borderBottomColor: '#f40bc5ff',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#f5e6f2ff',
                            borderRadius: 10,
                            marginHorizontal: 10,
                            marginVertical: 5, padding: 5,
                            //  backgroundColor: 'yellow'
                        }}>

                            <Text
                                style={{
                                    width: 250,
                                    // height:250,
                                    fontSize: 16,
                                    margin: 10,
                                    color: '#530af1ff',
                                    fontFamily: 'Space Mono',

                                }}
                            >{item.text}</Text>

                            <View style={styles.buttons}>
                                <MaterialIcons name='circle-edit-outline' type="font-awesome" size={25} color={'#f6750cff'} onPress={() => startEditing(item)} />
                                <MaterialIcons name='delete-circle' type="MaterialCommunityIcons" size={25} color={'#f5077eff'} onPress={() => deleteItem(item.id)} />
                                {/* <Button title="Edit" onPress={() => startEditing(item)} /> */}
                                {/* <Button title="Delete" onPress={() => deleteItem(item.id)} /> */}
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // backgroundColor: 'red',
        backgroundColor: '#f5e6f2ff'
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 4,
    },
    sub: { textAlign: "center", marginBottom: 16, color: "#555" },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 4,
        backgroundColor: "white",
    },
    item: {
        padding: 16,
        borderBottomWidth: 10,
        borderBottomColor: '#f5e6f2ff',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "'#f5e6f2ff'",
    },
    buttons: { flexDirection: "row", gap: 8 },
});

export default NotePad;
