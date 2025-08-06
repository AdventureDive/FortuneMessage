import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from "react-native";
import Index from ".";

const explore = () => {
  const HEADING = 'Family Task Manager';
  const TITLE = 'Manage To-Do List';
  const ADD = 'Add';
  const UPDATE = 'Update';
  const EDIT = 'Edit';
  const DELETE = 'Delete'
  const [getTask, setTask] = useState('');
  const [getTaskList, setTaskList] = useState([]);
  const [getTaskIndex, setTaskIndex] = useState(-1);

  const addTask = () => {
    if (getTask) {
      if (getTaskIndex !== -1) {
        const editTaskList = [...getTaskList];
        editTaskList[getTaskIndex] = getTask;
        setTaskList(editTaskList);
        setTaskIndex(-1);
      } else {
        setTaskList([...getTaskList, getTask]);
      }
      // const emptyTask = '';  setTask((prevTask) => prevTask = emptyTask);//working 
      setTask('');
      //  setTask((prevTask) => prevTask='');//working
      // alert(getTask);
    }
  };
  const editTask = (index) => {
    // const toEdit = getTaskList[index];
    // setTask(toEdit);
    setTask(getTaskList[index]);
    setTaskIndex(index);
  };
  const deleteTask = (index) => {
    //react Native splice and java script splice output differs 
    //First two line are like rect native output , splice() method called on react componenets       
    // setTaskList(getTaskList.splice(index, 2));//@returns An array containing the elements that were deleted.
    // setTaskList(([...getTaskList]) => {return getTaskList.splice(index, 2);});//@returns An array containing the elements that were deleted.
    // Below from JavaScript (splice() method called on array): The splice() method of Array instances changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
    const newList = [...getTaskList];
    newList.splice(index, 1)
    setTaskList(newList);
  }

  const renderFlatList = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemList}>{item + " "}</Text>
      <View style={styles.itemDirection}>
        <TouchableOpacity onPress={() => editTask(index)}>
          <Text style={styles.editButton}>{EDIT}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(index)}>
          <Text style={styles.deleteButton}>{DELETE}</Text>
        </TouchableOpacity>
      </View>
    </View>

  );

  // Blue Print of the app
  return (
   
    <View style={styles.container}>
      <Text style={styles.headingText}>{HEADING}</Text>
      <Text style={styles.titleText}>{TITLE}</Text>
      {/* use onSubmitEditing={addTask} add when keyboard enter and if you not have defaultValue then it will not displayed*/}
      <TextInput style={styles.inputText} placeholder="Enter task" defaultValue="dfv" value={getTask}
        onChangeText={newTask => setTask(newTask)} onSubmitEditing={addTask}/>
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>{getTaskIndex !== -1 ? 'Update' : 'Add'}</Text>
      </TouchableOpacity>
      <FlatList data={getTaskList} renderItem={renderFlatList} keyExtractor={(_item, index) => index.toString()}></FlatList>

    </View>

  );
};
export default explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
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
  inputText: {
    borderWidth: 3,
    borderColor: "grey",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontSize: 18,
  },
  itemList: {
    fontSize: 19,
  },
  itemDirection: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
});