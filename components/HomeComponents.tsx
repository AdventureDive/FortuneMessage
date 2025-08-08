import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface homeComProb {
  item: {
    screen: string,
    title: string,
    icon: string,
    color: string,
  }
  index: number
}
const components = [{
  screen: "ToDolist",
  title: "To-Do",
  icon: "format-list-bulleted",
  color: "red"
}, {
  screen: "ShoppingList",
  title: "Shopping",
  icon: "shopping",
  color: "blue"
}, {
  screen: "ActivityList",
  title: "Activity",
  icon: "abacus",
  color: "yellow"
}, {
  screen: "CalendarList",
  title: "Calendar",
  icon: "calendar",
  color: "brown"
}, {
  screen: "ContactInfoForm",
  title: "Contact",
  icon: "contacts",
  color: "steelblue"
}, {
  screen: "SendMessage",
  title: "Message",
  icon: "message",
  color: "steelblue"
}, {
  screen: "SaveNotes",
  title: "Notes",
  icon: "notebook",
  color: "steelblue"
}, {
  screen: "SaveDocuments",
  title: "Documents",
  icon: "file-document-multiple",
  color: "steelblue"
}, {
  screen: "BudgetPlanning",
  title: "Budget",
  icon: "cash-100",
  color: "green"
}, {
  screen: "PremiumAccount",
  title: "Premium",
  icon: "alpha-p-circle-outline", //workspace-premium
  color: "steelblue"
}, {
  screen: "MealPlanning",
  title: "Meals",
  icon: "food",
  color: "steelblue"
}, {
  screen: "SaveRecipes",
  title: "Recipes",
  icon: "note",
  color: "steelblue"
}, {
  screen: "SavePictures",
  title: "Gallery",
  icon: "view-gallery",
  color: "steelblue"
}
];



const HomeComponenets = () => {
  const {width, height} = Dimensions.get('window');
  const windowWidth = Math.round(width);
  const windowHeight = Math.round(height);
  console.log('windowWidth=', windowWidth, ',windowHeight', windowHeight);

  const renderItem = ((props: homeComProb) => {
    return (
      <TouchableOpacity style={{...styles.itemContainer, maxWidth:(windowWidth-50)/2}} onPress={() => alert(`Navigate to` + props.item.screen)}>
      <View style={{flexDirection:'column'}}>
        <View style={{alignItems:'flex-start',
          paddingLeft:10,
          paddingTop:5,
          
          }}>
          <Text style={{...styles.eventListenerText, 
            // color:props.item.color
            color:'steelblue'
            }}>{props.item.title}</Text>
        </View>
        <View style={{alignItems:'flex-end', padding:10}}>
          {/* <IconButton
              icon='folder'
              size={24}
              iconColor='steelblue'
          /> */}
          {/* <Ionicons name={props.item.icon} color={'steelblue'} size={24} /> */}
          <MaterialCommunityIcons name={props.item.icon} color={props.item.color} size={40}/>
          </View>
      </View>
      </TouchableOpacity>
    );

  });

  console.log("Inside Home Componenets");
  return (
    <View style={styles.container}>
      <View style={{height:windowHeight * 0.2, 
        // backgroundColor:'lightcoral', 
        // borderColor:'lightgrey',
        // borderWidth:2,
        borderRadius:20, 
        padding:20, 
        marginLeft:20, 
        marginRight:20, 
        marginBottom:10, 
        alignItems:'center', 
        justifyContent:'center',
        // elevation: 6, 
        }}>
        <Text style={{fontSize:24, color:'red'}}>In homeCompo....</Text>
      </View>
      <View style={{marginLeft:5, marginRight:5, height:windowHeight * 0.5}}>
      <FlatList data={components} renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()} numColumns={2}
        contentContainerStyle={styles.flatList}>          
      </FlatList>
      </View>
    </View>
  );
};
export default HomeComponenets;

const styles = StyleSheet.create({
  container: {
    // maxHeight:'90%',
    width:'100%',
    // borderRadius:10,
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
    // backgroundColor: "blue",
    // padding: 10,
    borderRadius: 5,
    // marginBottom: 10,
    fontSize:18,
    // fontStyle:'italic',
    fontWeight:'bold',
    // color: 'steelblue'
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
    backgroundColor:'white', //skyblue, powderblue, steelblue
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
  flatList: {
    // maxHeight:300,
    // borderWidth:1,
    // borderColor:'skyblue',
    paddingHorizontal: 10, // Add padding around the list
  },
  itemList: {
    fontSize: 19,
  },
  itemDirection: {
    flexDirection: "row",
  },

});