import { StyleSheet, ScrollView, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RootTabScreenProps } from '../types';

import { Text, View, useThemeColor } from '../components/Themed';

export default function Schedule({ navigation }: RootTabScreenProps<'Home'>) {
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    legalName: "",
    ufid: "",
    apps: [],
    email: "",
    switchUser: false
  });

  useEffect(() => {
    const url = "http://34.136.6.158:5000/api/";
    const headers = {
      'X-UF-Cookie': '_shibsession_68747470733a2f2f73712e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f68747470733a2f2f73702e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f=_CHARLES_',
      'X-Host-Choice': 'mock-host'
    }
    axios.get(url + "user", { headers: headers }).then((res) => {
      setUser(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
    
  }, [])
  return (
    isLoading ? <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'blue'} /></View> :
      <ScrollView >
        <View style={{ alignItems: "center", flex: 1, paddingTop: 60, paddingBottom: 60 }}>
          <Button title="Go to schedule of courses >" onPress={() => {
            navigation.navigate("SOC")
          }} />
          <View style={styles.separator} />

          <View style={styles.personal_info}>
            <Text style={styles.title}>{user.name}</Text>
          </View>

        </View>

      </ScrollView>

  )
}

const styles = StyleSheet.create({
  personal_info: {
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#285697",
    marginTop: 1,
    borderRadius: 15,
    paddingBottom: 1,
    paddingTop: 1,
    width: '90%'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
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

  subsection: {
    alignSelf: 'center',
    width: '90%',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    paddingBottom: 15,
  },
  section: {
    alignSelf: 'center',
    width: '90%',
    borderColor: '#285697',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    paddingBottom: 15,
    alignItems: 'center'
  }

});
