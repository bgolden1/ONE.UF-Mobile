import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

import React, { useEffect, useState } from 'react';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import axios from 'axios';
import { Agenda, AgendaEntry } from 'react-native-calendars'

export default function Calendar({ navigation }: RootTabScreenProps<'Home'>) {
  const [myEvents, setEvents] = useState();
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    let cancel = false;
    const url = "http://34.136.6.158:5000/api/";
    axios.get(url + "calendar_21_22")
    .then((res)=> {
      if (cancel) return;
      setEvents(res.data);
      setLoading(false)
      //console.log(res.data)
    })
    .catch((error) => {
      console.log(error)
    })

    return () => { 
      cancel = true;
    }
  }, [])

  let renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = 14; //isFirst ? 16 : 14;
    const color = 'black'; //isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        style={[styles.item, {height: reservation.height}]}
        onPress={() => console.log(reservation.name)}
      >
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  }

  let renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }


  return (
    isLoading ? <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'blue'} /></View> :
    <View style={{ alignItems: "center", flex: 1 }}>
      <Agenda
        items={myEvents}
        style={styles.calendar}
        renderItem={renderItem}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={renderEmptyDate}
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

  calendar:{
    width: "100%",
    height: "100%",

  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }

  

});
