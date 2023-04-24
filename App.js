import React, { Component, useEffect, useState } from 'react'
    import { Text, View,StyleSheet,FlatList,Dimensions,Image,TouchableHighlight } from 'react-native'

  
    export default function PullFun() {
        const [data,setData]=useState([]);
        const [gender,setGender]=useState('');
        const [isFetching,setIsfetching]=useState(false);
        useEffect(()=>{
          searchRandomUser()
        },[])
const onRefresh=()=>{
  setIsfetching(true);
  searchRandomUser();
}

    searchRandomUser = async () =>
    {
       const RandomAPI = await fetch('https://randomuser.me/api/?results=20')
       const APIValue = await RandomAPI.json();
        const APIResults = APIValue.results
          setData(APIResults);
          setIsfetching(false);

    }

    
        return (
          <View style = {styles.container}>
     <TouchableHighlight
     onPressOut = {()=>searchRandomUser()}
         style = {{width:deviceWidth - 32, height:45,backgroundColor: 'green',justifyContent:"center",alignContent:"center"}}>
              <Text style = {{fontSize:22,color: 'white',fontWeight: 'bold',textAlign:"center"}}>Reload Data</Text>
         </TouchableHighlight>
     <FlatList
            data={data}
            onRefresh={() => onRefresh()}
          refreshing={isFetching}
            keyExtractor = { (item, index) => index.toString() }
            renderItem={({item}) =>
            <View style = {styles.ContainerView}>
            <View>
    <Image
    source={{uri : item.picture.large}}
    style = {{height:100,width:100,borderRadius: 50,marginLeft: 4}}
    resizeMode='contain'
    />
    </View>

    <View style = {{flexDirection: 'column',marginLeft:16,marginRight: 16,flexWrap:'wrap',alignSelf:"center",width: deviceWidth-160}}>
    <Text>Email Id : {item.email}</Text>

    <Text>Full Name : {gender} {item.name.first} {item.name.last}</Text>
    <Text>Date of birth : {item.dob.age}</Text>
    <Text>Phone number : {item.phone}</Text>

    </View>

    </View>
            }
            />
          </View>
        )
      }
    
    const deviceWidth = Dimensions.get('window').width
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:22
        },
        ContainerView:
        {
            marginBottom:20,
            paddingVertical:10,
            backgroundColor: '#F5F5F5',
            borderBottomWidth:0.5,
            borderBottomColor:'grey',
            width: deviceWidth-40,
            marginLeft:20,
            marginRight:20,
            marginTop:20,
            flexDirection:'row'
        }
      });
