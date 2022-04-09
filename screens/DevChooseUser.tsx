import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, View } from '../components/Themed';

export default function ChooseUser() {
    return(
        <View style={styles.container}>
            <Person name='CHARLES'/>
            <Person name='BEN'/>
            <Person name='BRODY'/>
            <Person name='SHAUN'/>
            <Person name='GREG'/>
        </View>
    )
}

function Person(props: any) {
    const name = props.name;
    return (
        <TouchableOpacity style={styles.box} onPress={() => {globalThis.person = name}}>
            <Text style={styles.title}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eaeaea',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      marginTop: 5,
      fontSize: 25,
      fontWeight: '200',
    },
    box: {
      backgroundColor: '#ffffff',
      width: "95%",
      height: "15%",
      borderColor: '#a6a6a6',
      borderWidth: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 15,
      borderRadius: 6
    },
  
  });