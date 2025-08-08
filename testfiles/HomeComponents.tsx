import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface homeComProb {
  item: {
    screen: String,
    title: String
  }
  index: Number
}
const components = [{
  screen: "ToDolist",
  title: "To-Do"
}, {
  screen: "ShoppingList",
  title: "Shopping"
}, {
  screen: "ActivityList",
  title: "Activity"
}, {
  screen: "CalendarList",
  title: "Calendar"
}, {
  screen: "ContactInfoForm",
  title: "Contact"
}, {
  screen: "SendMessage",
  title: "Message"
}, {
  screen: "SaveNotes",
  title: "Notes"
}, {
  screen: "SaveDocuments",
  title: "Documents"
}, {
  screen: "SavePictures",
  title: "Gallery"
}, {
  screen: "MealPlanning",
  title: "Meals"
}, {
  screen: "SaveRecipes",
  title: "Recipes"
}
];

const renterItem = ((props: homeComProb) => {

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => alert(`Navigate to ` + props.item.screen)}>
        <Text style={styles.eventListenerText}>{props.item.title}</Text>
      </TouchableOpacity>
    </View>
  );

});

const HomeComponenets = () => {
  return (
    <View style={styles.container}>
      <FlatList data={components} renderItem={renterItem}
        keyExtractor={(_item, index) => index.toString()} numColumns={2} contentContainerStyle={styles.flatList}></FlatList>
    </View>
  );
};
export default HomeComponenets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
    backgroundColor:'lightgreen'
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "blue",
  },
  eventListenerText: {
    textAlign:"left",
    backgroundColor: "powderblue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputText: {
    borderWidth: 3,
    borderColor: "grey",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },

  itemContainer: {
    flex: 1, // Allows items to share space equally
    margin: 5, // Add margin around each item
    backgroundColor: 'skyblue', //powderblue, steelblue
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  flatList: {
    paddingHorizontal: 10, // Add padding around the list
  },
  itemList: {
    fontSize: 19,
  },
  itemDirection: {
    flexDirection: "row",
  },

});