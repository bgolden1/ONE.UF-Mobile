import { StyleSheet, ScrollView, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Text, View, useThemeColor} from '../components/Themed';
import DropDown from '../components/DropDown';
import { Courses } from '../components/Course';

export default function SOC() {
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({
    'categories': [''],
    'departments': [''],
    'progLevels': [''],
    'terms': ['']
  });
  const [category, setCategory] = useState([]);
  const [department, setDepartment] = useState([]);
  const [term, setTerm] = useState([]);
  const [progLevel, setProgLevel] = useState([]);
  const [isSearching, setSearching] = useState(true)
  const [results, setResults] = useState({
    'COURSES': [],
    'LASTCONTROLNUMBER': 0,
    "RETRIEVEDROWS": 0,
    "TOTALROWS": 0,
  })
  const [failed, setFailed] = useState(false)
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [instructor, setInstructor] = useState('');
  const [isTermsOpen, setTOpen] = useState(false);
  const [isCatOpen, setCOpen] = useState(false);
  const [isProgOpen, setPOpen] = useState(false);
  const [isDepOpen, setDOpen] = useState(false);

  useEffect(() => {
    let cancel = false;
    axios.get("https://one.uf.edu/apix/soc/filters").then((res) => {
      if (cancel) return;
      console.log(res);
      setData(res.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    })

    return () => { 
      cancel = true;
    }
  }, []);

  function search() {
    var url = "https://one.uf.edu/apix/soc/schedule?"
    url = url + "ai=false&auf=false&category=" + category + "&class-num=&course-code=" + code + "&course-title=" + title + "&cred-srch=&credits=&day-f=&day-m=&day-r=&day-s=&day-t=&day-w=&dept=" + department;
    url = url + "&eep=&fitsSchedule=false&ge=&ge-b=&ge-c=&ge-d=&ge-h=&ge-m=&ge-n=&ge-p=&ge-s=&instructor=" + instructor + "&last-control-number=0&level-max=&level-min=&no-open-seats=false&online-a=&online-c=&online-h=&online-p=&period-b=&period-e=&prog-level=" + progLevel;
    url = url + "&qst-1=&qst-2=&qst-3=&quest=false&term=" + term + "&wr-2000=&wr-4000=&wr-6000=&writing=false&var-cred=&hons=false";
    setLoading(true);
    axios.get(url).then((res) => {
      console.log(res);
      setResults(res.data[0]);
      setSearching(false);
      setLoading(false);
    }).catch((error) => {
      setFailed(true);
      setLoading(false);
      console.log(error);

    });
  }

  function returnToSearch() {
    setSearching(true);
    setFailed(false);
  }
  return (
    <View style={styles.container}>
      {failed ? <View style={{ position: 'absolute', left: 0, top: 0 }}>
        <Button title="<Return to Search" onPress={returnToSearch} />
        <Text style={[styles.title, { alignSelf: 'center' }]}>No results found</Text>
      </View> :
        isLoading ? <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'blue'} /></View> :
          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {isSearching ?
              <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={[styles.container, {height: 120, marginBottom: isTermsOpen ? 200 : 0}]}>
                  <Text style={styles.title}>Terms:</Text>
                  <DropDown selectedValue={term} setSelectedValue={setTerm} items={data['terms']} open={isTermsOpen} setOpen={setTOpen} zIndex={1000}/>
                </View>
                <View style={[styles.container, {height: 120, marginBottom: isCatOpen ? 200 : 0}]}>
                  <Text style={styles.title}>Categories:</Text>
                  <DropDown selectedValue={category} setSelectedValue={setCategory} items={data['categories']} open={isCatOpen} setOpen={setCOpen}zIndex={2000}/>
                </View>

                <View style={[styles.container, {height: 120, marginBottom: isProgOpen ? 200 : 0}]}>
                  <Text style={styles.title}>Program Levels:</Text>
                  <DropDown selectedValue={progLevel} setSelectedValue={setProgLevel} items={['', ...data['progLevels']]} open={isProgOpen} setOpen={setPOpen} zIndex={3000}/>
                </View>
                <View style={[styles.container, {height: 120, marginBottom: isDepOpen ? 200 : 0}]}>
                  <Text style={styles.title}>Departments:</Text>
                  <DropDown selectedValue={department} setSelectedValue={setDepartment} items={['', ...data['departments']]} open={isDepOpen} setOpen={setDOpen} zIndex={4000}/>
                </View>
                <View style={[styles.container, {padding: '5%'}]}>
                  <Text style={styles.title}>Course Title:</Text>
                  <TextInput style={[styles.input, {color}]} onChangeText={setTitle} value={title} />
                </View>
                <View style={[styles.container, {padding: '5%'}]}>
                  <Text style={styles.title}>Course Code:</Text>
                  <TextInput style={[styles.input, {color}]} onChangeText={setCode} value={code} />
                </View>
                <View style={[styles.container, {padding: '5%'}]}>
                  <Text style={styles.title}>Instructor Last Name:</Text>
                  <TextInput style={[styles.input, {color}]} onChangeText={setInstructor} value={instructor} />
                </View>
                <Button title='Search' onPress={search} />

              </ScrollView> :
              <View style={styles.container}>
                <Courses courses={results['COURSES']} />
                <View style={{ position: 'absolute', left: '0%', top: 0 }}>
                  <Button title="<Return to Search" onPress={returnToSearch} />
                </View>
              </View>
            }
          </KeyboardAvoidingView>

      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    minWidth: '90%'
  },
  scrollView: {
    alignSelf: 'center',
    alignContent: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});