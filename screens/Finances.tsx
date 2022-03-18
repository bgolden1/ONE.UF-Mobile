import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ScrollView, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Finances({ navigation }: RootTabScreenProps<'Home'>) {
    return (

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>

        <View style={{ alignItems: "center", flex: 1 }}>

            <View style={styles.separator} />
            <View style={styles.separator} />

            <View style={styles.personal_info}>
                <Text style={styles.title}>USERNAME</Text>
                <Text style={styles.title}></Text>
                <Text style={styles.body}>Account Balance</Text>
                <Text style={styles.title}></Text>
                <Text style={styles.boldingprice}>- $8.10 due</Text>
                
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Transcript")} style={styles.bluebutton}>
                <View style={{backgroundColor:'#ced4f2'}}>
                <Text style={styles.title}>Make a Payment</Text>
                </View>
                </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Transcript")} style={styles.bluebutton}>
                <View style={{backgroundColor:'#ced4f2'}}>
                <Text style={styles.title}>Direct Deposit Funds</Text>
                </View>
                </TouchableOpacity>

            

            <View style={styles.separator} />
            <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>Charges Due</Text>
                <Text style={styles.body}>Due Now:</Text>
            </View>
            <View style={styles.gpa}>
                <View style={styles.columns}>
                    <Text style={styles.boldingprice}>Due Date:</Text>
                    <Text>3/1/2022{"\n"}</Text>

                    <Text style={styles.boldingprice}>Description:</Text>
                    <Text>UFIT laser Printing{"\n"}</Text>

                    <Text style={styles.boldingprice}>Running Total:</Text>
                    <Text>$5.57</Text>
                </View>
                <View style={styles.columns}>
                    <Text style={styles.boldingprice}>Term:</Text>
                    <Text>Spring 2022{"\n"}</Text>

                    <Text style={styles.boldingprice}>Amount:</Text>
                    <Text>$0.37{"\n"}</Text>
                </View>
            </View>



            <View style={styles.separator} />
            <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>Charges Due</Text>
                <Text style={styles.body}>Due Now:</Text>
            </View>
            <View style={styles.gpa}>
                <View style={styles.columns}>
                    <Text style={styles.boldingprice}>Due Date:</Text>
                    <Text>3/1/2022{"\n"}</Text>

                    <Text style={styles.boldingprice}>Description:</Text>
                    <Text>UFIT laser Printing{"\n"}</Text>

                    <Text style={styles.boldingprice}>Running Total:</Text>
                    <Text>$5.57</Text>
                </View>
                <View style={styles.columns}>
                    <Text style={styles.boldingprice}>Term:</Text>
                    <Text>Spring 2022{"\n"}</Text>

                    <Text style={styles.boldingprice}>Amount:</Text>
                    <Text>$0.37{"\n"}</Text>
                </View>
            </View>






        </View>

        </ScrollView> 


    );
}
//
const styles = StyleSheet.create({
    personal_info: {
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#285697",
        marginTop: 1,
        borderRadius: 15,
        paddingLeft: 110,
        paddingRight: 110,
        paddingBottom: 25,
        //padding: 85,
        paddingTop: 15,
    },
    gpa: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 3,
        borderColor: "#285697",
        marginTop: 15,
        borderRadius: 15,
        padding: 22,
        paddingTop: 50,
    },
    columns: {
        alignItems: 'center',
        margin: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        width: '80%',
        color: '#285697',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    body: {
        textAlign: 'center',
        fontSize: 17,
    },

    bluebutton: {
      top: 10,
      backgroundColor: '#285697',
      width: "95%",
      height: "10%",
      borderColor: '#285697',
      borderWidth: 3,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 15,
      borderRadius: 5
    },

    boldingprice: {
      fontSize: 15,
      fontWeight: 'bold',
    },

    scrollView: {
      //empty might delete later
    },

    contentContainer: {
      paddingTop: 1,
      paddingBottom: 200
    }

});