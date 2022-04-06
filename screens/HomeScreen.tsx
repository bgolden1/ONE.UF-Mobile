import { StyleSheet, TouchableOpacity } from 'react-native';

import React, { useEffect, useState } from 'react';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import axios from 'axios';
import { Agenda } from 'react-native-calendars'

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const [myEvents, setEvents] = useState();


  useEffect(() => {
    const url = "http://34.136.6.158:5000/api/";
    axios.get(url + "calendar_21_22")
    .then((res)=> {
      setEvents(res.data)
      //console.log(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <View style={styles.container}>
      
        <TouchableOpacity onPress={() => navigation.navigate("ActionItems")} style={styles.holds}>
        <View style={{backgroundColor:'#d18c8c'}}>
          <Text style={styles.title}>Your Holds</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("Transcript")} style={styles.unofficial_transcript}>
        <View style={{backgroundColor:'#ced4f2'}}>
          <Text style={styles.title}>Unofficial Transcript</Text>
        </View>
      </TouchableOpacity>

    
      <Agenda
        items={myEvents}
        style={{width: "80%", height: "80%"}}
        // Specify how to render a date with content
        renderDay={(day, item) => {
          return <View><Text>{day?.toString() + " | " + item?.name}</Text></View>;
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View><Text>Nothing to see here...</Text></View>;
        }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <View><Text>Nothing to see here...</Text></View>;
        }}
      />

    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  body: {
    textAlign: 'center',
    fontSize: 17,
  },
  unofficial_transcript: {
    top: 100,
    backgroundColor: '#ced4f2',
    width: "95%",
    height: "20%",
    borderColor: '#003Dff',
    borderWidth: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 15
  },

  holds: {
    top: 100,
        backgroundColor: '#d18c8c',
        width: "95%",
        height: "20%",
        borderColor: '#FF3D00',
        borderWidth: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 15
  }

});
