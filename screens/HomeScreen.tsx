import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Button, LogBox } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useIsFocused } from '@react-navigation/native'

import axios from 'axios';

LogBox.ignoreAllLogs();

declare global {
  var person: string;
}
globalThis.person = 'CHARLES'

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const isFocused = useIsFocused();
  
  const [grades, setGrades] = useState(
    {
      termCode: "",
      termDesc: "",
      currentTerm: true,
      holdFlag: false,
      cumGpa: "",
      termGpa: "",
      comments: "",
      classes: [],
      transcriptTextAfter: []
    }
  )

  const [user, setUser] = useState({
    name: "",
    legalName: "",
    ufid: "",
    apps: [],
    email: "",
    switchUser: false
})


  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    const url = "http://34.136.6.158:5000/api/"
    const headers = {
      'X-UF-Cookie': '_shibsession_68747470733a2f2f73712e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f68747470733a2f2f73702e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f=_' + globalThis.person + "_",
      'X-Host-Choice': 'mock-host'
    }
    axios.get(url + "grades", { headers: headers }).then((res) => {
      setGrades(res.data.terms[0]);

      axios.get(url + "user", { headers: headers }).then((res) => {
        setUser(res.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });

  }, [isFocused]);

  return (
      <View style={styles.container}>
        <Text style={{fontSize: 30, top: 100, textAlign: 'center', fontFamily: "Times New Roman", marginBottom: 30}}>Welcome, {"\n"}{isLoading ?  <ActivityIndicator size={'large'} color={'blue'} /> : user.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ActionItems")} style={styles.box}>
          <Text style={styles.title}>Action Items</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Transcript")} style={styles.box}>
          <View>
            <Text style={styles.title}>Unofficial Transcript</Text>
          </View>
          {isLoading ? <ActivityIndicator size={'large'} color={'blue'} /> :
          <View style={styles.preview}>
            <Text> {grades.termDesc} </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 3 }}> Cumulative UF GPA: </Text>
              <Text style={{ flex: 1 }}>{grades.cumGpa} </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 3 }}> Term GPA: </Text>
              <Text style={{ flex: 1 }}>{grades.termGpa} </Text>
            </View>

          </View>
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Calendar")} style={styles.box}>
          <View>
            <Text style={styles.title}>Academic Calendar</Text>

          </View>
        </TouchableOpacity>
      </View>

  );

}

function MakeGrades(props: any) {
  const classes = props.classes;
  return (
    <View style={styles.classes}>
      {classes.map((class1: any, key: any) => {
        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
          <Text style={{ width: "40%", paddingLeft: 20 }}>{class1.course}{class1.title}</Text>
          <Text style={{ width: "40%", textAlign: 'center' }}>{class1.grade == 0 ? "-" : class1.grade}</Text>
        </View>
      })}
    </View>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  body: {
    textAlign: 'center',
    fontSize: 17,
  },
  box: {
    top: 100,
    backgroundColor: '#ffffff',
    width: "95%",
    minHeight: "20%",
    borderColor: '#a6a6a6',
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 6
  },
  scrollView: {
    height: '100%',
    width: '100%',
    alignSelf: 'center'
  },
  preview: {
    marginTop: 10,
    borderWidth: 2,
    width: '70%',
    borderRadius: 6,
    borderColor: 'grey',
    padding: 5,
    backgroundColor: '#f0f0f0'
  },
  class_text: {
    textAlign: 'left',
    fontSize: 20,
  },
  classes: {
    width: '75%',
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: '#a6a6a6',
    borderRadius: 6,
    marginTop: 15,
    padding: 15,
    paddingTop: 5,
    backgroundColor: '#fff'
  },
  previewText: {
    flex: 3,
    fontSize: 16,
    fontWeight: '200',
    backgroundColor: '#f0f0f0'
  }

});

/*

*/