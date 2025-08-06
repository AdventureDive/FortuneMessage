import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { User } from './APITypes';
import MyStore from "./stores/MyStore";

interface Props {
    setLoginResult: (value:boolean) => void
}

const renderHome = ()=>(
    

            <View>
        <Text>To-Do List</Text>
        
        </View>
        
);

  const callGetAPIAsync = async (url: string) => {
    console.log('IN callGetAPIAsync...', url, MyStore.callAPI);
    try {
        console.log('IN callGetAPIAsync...setCallAPI TRUE');
        MyStore.setCallAPI(true);
        const ip = "http://172.16.1.72:8080/";
        const response = await fetch(ip + url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        console.log('Get users request failed with status ' + response.status);
        return null;
      }
      console.log('IN callGetAPIAsync...setCallAPI FALSE 111');
      MyStore.setCallAPI(false);
      return await response.json();
    } catch (error) {
      console.log('An error occurred while getting users.');
      console.error('ERROR====', url, error);
      console.log('IN callGetAPIAsync...setCallAPI FALSE 222');
      MyStore.setCallAPI(false);
      return null;
    }
  }

//   const callGetAPISync = (url: string) => {
//     console.log('IN callGetAPISync...', url);
//     return fetch(url, {
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//         },
//     }).then(response => {
//         const resp = response.clone();
//         return response.json();
//     })
//     .then(jsonResult => {
//         console.log('IN callGetAPISync...jsonResult=', jsonResult);
//         return JSON.parse(JSON.stringify(jsonResult));
//     })
//     .catch(error => console.error('ERROR====', url, error));
//   }

const HomeScreen = observer((props: Props) => {
    const[data, setData] =useState('');
    const [allUsers, setAllUsers] = useState<[User]>();

    useEffect(() => {
        getAllUsersAsync();
    }, []);

    const getAllUsersAsync = async () => {
        const url = 'users/api/getAllUsers';
        const response = await callGetAPIAsync(url);
        setAllUsers(response);
    };

    // const getAllUsersSync = () => {
    //     const url = 'http://172.16.1.72:8080/users/api/getAllUsers';
    //     const response = callGetAPISync(url);
    //     console.log('IN getAllUsersSync...response=', response);
    //     setAllUsers(JSON.stringify(response));
    // };


    const renderLoading = () => {
        console.log('In renderLoading...');
        return (<View>
            <Text>Loading...</Text>
            <Text style={{color:'red'}}>{MyStore.loginUserId}</Text>
            <View style={{display:'flex', flex:1, alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator animating color='red'/>
            </View>
        </View>);
    }

    const renderUserRow = (user:User) => {
        return (
            <View style={{width:'100%', backgroundColor:'lightblue', padding:10, alignItems:'center', flexDirection:'row', justifyContent:'space-evenly'}}>
                <View style={{width:'20%', alignItems:'center'}}>
                    <Text>{user.id}</Text>
                </View>
                <View style={{width:'40%', alignItems:'center'}}>
                    <Text>{user.firstName}</Text>
                </View>
                <View style={{width:'40%', alignItems:'center'}}>
                    <Text>{user.lastName}</Text>
                </View>
            </View>
        );
    };

    const renderUserList = () => {
        return allUsers ? (
            allUsers.map((user) => (
                renderUserRow(user)
            ))
        ) : (
            <View style={{width:'100%', backgroundColor:'lightcoral',padding:10, alignItems:'center', flexDirection:'row', justifyContent:'space-evenly'}}>
                <Text>No data to display</Text>
            </View>
        );
    }

    const renderUserTable = () => {
        return (
            <View style={{width:'100%', flexDirection:'column'}}>
            <View style={{width:'100%', backgroundColor:'lightgreen', padding:10, alignItems:'center', flexDirection:'row', justifyContent:'space-evenly'}}>
                <View style={{width:'20%', alignItems:'center'}}>
                    <Text>ID</Text>
                </View>
                <View style={{width:'40%', alignItems:'center'}}>
                    <Text>First name</Text>
                </View>
                <View style={{width:'40%', alignItems:'center'}}>
                    <Text>Last name</Text>
                </View>
            </View>
            {renderUserList()}
            </View>
        );
    }

    const renderContent = () => {
        console.log('In renderContent...');
        if(MyStore.callAPI){
            return renderLoading();
        } else {
        
        return MyStore.loginUserId > 0 ? (
            // <FlatList renderItem={renderHome} data={data}>
            <View>
            <Text>To-Do List : {MyStore.loginUserId}</Text>
            {/* <TouchableOpacity style={styles.addButton} onPress={() => props.setLoginResult(false)}>
                <Text style={styles.addButtonText}>Logout</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => props.setLoginResult(false)}>
                <IconButton
                    icon={'logout'}
                    size={24}
                    iconColor='red'
                />
                </TouchableOpacity>
            
            {/* <TouchableOpacity style={styles.addButton} onPress={getAllUsersAsync}>
                <Text style={styles.addButtonText}>Get data Async</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.addButton} onPress={getAllUsersSync}>
                <Text style={styles.addButtonText}>Get data Sync</Text>
            </TouchableOpacity>              */}
            {renderUserTable()}
            </View>
            // </FlatList>
        ) : (
            <View>
            <Text>Invalid user : {MyStore.loginUserId}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => props.setLoginResult(false)}>
                <Text style={styles.addButtonText}>Logout</Text>
            </TouchableOpacity>
            </View>
        );
        }
    }


    return renderContent();

});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
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
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default HomeScreen;