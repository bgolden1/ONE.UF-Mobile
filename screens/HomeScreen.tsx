import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import axios from 'axios';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  // Copied from transcripts page (alternative is to make smaller, more specified API calls)
  const [transcript, setTranscript] = useState({
    personalInfo: {
        name: "",
        ufid: 0,
        residency: "",
        residencyDescription: "",
        basisOfAdmissionCode: "",
        basisOfAdmissionDescription: "",
        ssn: "",
        dob: ""
    },
    records: {
        undergraduate: {
            comments: {
                before: {
                    2: {
                        1: ""
                    },
                    3: {
                        1: ""
                    }
                }
            },
            ufGpa: "",
            totalHoursEarned: "",
            gradePointsEarned: "",
            ufHoursEarned: "",
            ufHoursCarried: "",
            transferHoursEarned: "",
            terms: [{

            }],
            concentrations: "",
            programs: [],
            careerDescription: ""
        }
    }
  })

  // Copied from transcripts page
  const [isLoading, setLoading] = useState(true);

  // Copied from transcripts page
  useEffect(() => {
    const url = "http://34.136.6.158:5000/api/unofficialtranscript"
    const headers = {
        'X-UF-Cookie': '_shibsession_68747470733a2f2f73712e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f68747470733a2f2f73702e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f=_CHARLES_',
        'X-Host-Choice': 'mock-host'
    }
    axios.get(url, { headers: headers }).then((res) => {
        setTranscript(res.data);
        setLoading(false);
    }).catch((err) => {
        console.log(err);
    });
  });

  return (
    isLoading ? <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'blue'} /></View> :
      
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("ActionItems")} style={styles.box}>
            <Text style={styles.title}>Action Items</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Transcript")} style={styles.box}>
            <View>
              <Text style={styles.title}>Unofficial Transcript</Text>
              <Text> {transcript.personalInfo.name} </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Calendar")} style={styles.box}>
            <View>
              <Text style={styles.title}>Academic Calendar</Text>
            </View>
          </TouchableOpacity>
        </View>
      
  );
  
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
    height: "20%",
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
  }

});
