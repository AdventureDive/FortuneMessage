import { MaterialCommunityIcons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Contacts from './Contacts';

interface homeComProb {
  item: {
    screen: string,
    title: string,
    icon: string,
    color: string,
  }
  index: number
}

interface navigationProps {
  selectedScreen: string;
  setSelectedScreen: (value: string) => void;
  setShowHomeButton: (value: boolean) => void;
  setShowHeader: (value: boolean) => void;
}

const components = [{
  screen: "ToDolist",
  title: "To-Do",
  icon: "format-list-bulleted",
  color: "coral"
}, {
  screen: "ShoppingList",
  title: "Shopping",
  icon: "shopping",
  color: "blue"
}, {
  screen: "ActivityList",
  title: "Activity",
  icon: "abacus",
  color: "lightcoral"
}, {
  screen: "CalendarList",
  title: "Calendar",
  icon: "calendar",
  color: "brown"
}, {
  screen: "ContactInfoForm",
  title: "Contact",
  icon: "contacts",
  color: "#9d8bd7ff"
}, {
  screen: "SendMessage",
  title: "Message",
  icon: "message",
  color: "#489938ff"
}, {
  screen: "SaveNotes",
  title: "Notes",
  icon: "notebook",
  color: "#88860aff"
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

const HomeComponenets = (naviProps: navigationProps) => {
  const { width, height } = Dimensions.get('window');
  const windowWidth = Math.round(width);
  const windowHeight = Math.round(height);

  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  //  useEffect(() => {
  //   console.log('------------111');
  //     async function loadFonts() {
  //       console.log('------------222');
  //       await Font.loadAsync({
  //         'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  //       });
  //       console.log('------------333');
  //       //  setFontsLoaded(true);
  //     }


  //     loadFonts();
  //     console.log('------------444');
  //   }, []);



  const renderItem = ((props: homeComProb) => {
    return (
      <TouchableOpacity style={{
        ...styles.itemContainer,
        maxWidth: (windowWidth - 50) / 2
      }} onPress={() => {
        naviProps.setSelectedScreen(props.item.screen);
      }}>
        <LinearGradient
          // colors={['white', '#f5faf6']}
          colors={['white', '#faf5f9ff']}
          style={styles.gradContainer} // Apply styles to control the gradient's size and positioning
          start={{ x: 0, y: 1 }} // Starting point of the gradient (top-left)
          end={{ x: 0, y: 0 }}   // Ending point of the gradient (bottom-right)
        >
          <View style={{
            flexDirection: 'column',
            // backgroundColor: 'yellow'
          }}>
            <View style={{
              alignItems: 'flex-start',
              paddingLeft: 10,
              paddingTop: 5,
            }}>
              <Text style={{
                ...styles.eventListenerText,
                // color:props.item.color
                // color: '#8c63deff'
                color: '#7f0aecff'
              }}>{props.item.title}</Text>
            </View>

            {/* <IconButton
              icon='folder'
              size={24}
              iconColor='steelblue'
          /> */}
            {/* <Ionicons name={props.item.icon} color={'steelblue'} size={24} /> */}

            {/* <View style={{ padding:10, alignItems:'flex-end'}}>
            <MaterialCommunityIcons name={props.item.icon} color={props.item.color} size={40}/>
          </View> */}
            <View style={{ alignSelf: 'flex-end', width: 50 }}>
              <MaskedView
                style={{ height: 50 }} // Adjust height as needed
                maskElement={
                  <MaterialCommunityIcons name={props.item.icon} color={props.item.color} size={40} />
                }
              >
                <LinearGradient
                  // colors={['#7bdfe8ff', '#2ab9c6ff']}
                  // colors={['#f10909ff', '#ed3dc1ff']}
                  colors={['#f109b7ff', '#7f0aecff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 0.5 }}
                  style={{ flex: 1 }}
                />
              </MaskedView>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );

  });

  const renderHomeComponent = () => {
    return (
      <View style={styles.container}>
        <View style={{
          height: windowHeight * 0.2,
          backgroundColor: '#f5e6f2ff',
          // borderColor:'lightgrey',
          // borderWidth:2,
          borderRadius: 10,
          // padding: 20,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 6,
        }}>

          {/* <ImageInfoSlider /> */}

          {/* <Text style={{fontSize:24, color:'#1a0449ff'}}>Welcome....</Text> */}
          <MaskedView
            style={{ flex: 1, flexDirection: 'row', width: 175 }} // Adjust height as needed
            maskElement={
              <Text style={{ fontFamily: 'Space Mono', fontSize: 30, fontWeight: 'bold' }}>
                Welcome...
              </Text>
            }
          >
            <LinearGradient
              colors={['#ffffff', '#da080cff']} // Your desired gradient colors
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.5 }}
              style={{ flex: 1 }}
            />
          </MaskedView>

        </View>
        <View style={{
          marginLeft: 5,
          marginRight: 5,
          height: windowHeight * 0.6,
          // backgroundColor: 'green'
        }}
        >
          <FlatList data={components} renderItem={renderItem}
            keyExtractor={(_item, index) => index.toString()} numColumns={2}
            contentContainerStyle={styles.flatList}>
          </FlatList>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (naviProps.selectedScreen === '') {
      naviProps.setShowHomeButton(false);
    } else {
      naviProps.setShowHomeButton(true);
    }

    if (naviProps.selectedScreen === 'ContactInfoForm') {
      return <Contacts setShowHeader={naviProps.setShowHeader} />;
    } else if (naviProps.selectedScreen === 'SavePictures'){
      // return <ImageShare setShowHeader={naviProps.setShowHeader}/>
    }
      else {
      return renderHomeComponent();
    }
  }


  return renderContent();
};
export default HomeComponenets;

const styles = StyleSheet.create({
  container: {
    // maxHeight:'100%',
    width: '100%',
    // borderRadius:10,
    flex: 1,
    minHeight: '100%',
    top: 60,
    // flexDirection:'row'
    backgroundColor: '#f5e6f2ff',//'red'
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
    // borderRadius: 5,
    // marginBottom: 10,
    fontSize: 18,
    // fontStyle:'italic',
    fontWeight: 'bold',
    // color: 'steelblue'
    fontFamily: 'SpaceMono-Regular',
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
    backgroundColor: '#f5e6f2ff', //skyblue, powderblue, steelblue
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
  gradContainer: {
    borderRadius: 10
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

});