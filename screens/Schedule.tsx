import { StyleSheet, ScrollView, Button, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Text, View } from '../components/Themed';
import DropDown from '../components/DropDown';
import { Courses } from '../components/Course';

export default function Schedule() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({
    'categories': [],
    'departments': [],
    'progLevels': [],
    'terms': []
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

  useEffect(() => {
    axios.get("https://one.uf.edu/apix/soc/filters").then((res) => {
      console.log(res);
      setData(res.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  function search() {
    var url = "https://one.uf.edu/apix/soc/schedule?"
    url = url + "ai=false&auf=false&category=" + category + "&class-num=&course-code=&course-title=&cred-srch=&credits=&day-f=&day-m=&day-r=&day-s=&day-t=&day-w=&dept=" + department;
    url = url + "&eep=&fitsSchedule=false&ge=&ge-b=&ge-c=&ge-d=&ge-h=&ge-m=&ge-n=&ge-p=&ge-s=&instructor=&last-control-number=0&level-max=&level-min=&no-open-seats=false&online-a=&online-c=&online-h=&online-p=&period-b=&period-e=&prog-level=" + progLevel;
    url = url + "&qst-1=&qst-2=&qst-3=&quest=false&term=" + term + "&wr-2000=&wr-4000=&wr-6000=&writing=false&var-cred=&hons=false";
    setLoading(true);
    axios.get(url).then((res) => {
      console.log(res);
      setResults(res.data[0]);
      setSearching(false);
      setLoading(false);
    }).catch((error) => {
      console.log(error);

    });
  }

  function returnToSearch() {
    setSearching(true);
  }
  return (
    <View style={styles.container}>
      {isLoading ? <View style={{alignSelf: 'center', alignContent: 'center', alignItems: 'center'}}><ActivityIndicator size={'large'} color={'blue'}/></View> :
        <View style={styles.container}>
          {isSearching ?
            <ScrollView style={{ flexDirection: "column", paddingBottom: 50, paddingTop: 100 }}>
              <View style={styles.container}>
                <Text style={styles.title}>Categories:</Text>
                <DropDown selectedValue={category} setSelectedValue={setCategory} items={data['categories']} />
              </View>
              <View style={styles.container}>
                <Text style={styles.title}>Departments:</Text>
                <DropDown selectedValue={department} setSelectedValue={setDepartment} items={data['departments']} />
              </View>


              <View style={styles.container}>
                <Text style={styles.title}>Program Levels:</Text>
                <DropDown selectedValue={progLevel} setSelectedValue={setProgLevel} items={data['progLevels']} />
              </View>
              <View style={styles.container}>
                <Text style={styles.title}>Terms:</Text>
                <DropDown selectedValue={term} setSelectedValue={setTerm} items={data['terms']} />
              </View>
              <Button title='Search' onPress={search} />
              
            </ScrollView> :
            <View style={styles.container}>
              <Courses courses={results['COURSES']} />
              <View style={{position: 'absolute',left: '0%', top: '10%'}}>
              <Button title="<Return to Search" onPress={returnToSearch}/>
              </View>
            </View>
          }
        </View>

      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 120
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
