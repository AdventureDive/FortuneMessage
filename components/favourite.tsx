import { StyleSheet, Text, View } from "react-native";


function Favourite() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Display Favourite messages</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: '#fff',
    }
});
export default Favourite;