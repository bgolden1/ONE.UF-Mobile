import { StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Text, View } from '../components/Themed';
import DropDown from '../components/DropDown';

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

  useEffect(() => {
    axios.get("https://one.uf.edu/apix/soc/filters").then((res) => {
      console.log(res);
      setData(res.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }, []);
  return (
    <View style={styles.container}>
      {isLoading ? <View style={styles.container}><Text style={styles.title}>Loading</Text></View> :
      <View style={styles.container}>
       <View style={{flexDirection: "row", padding: 50}}>
          <View style={styles.container}>
            <Text style={styles.title}>Categories:</Text>
            <DropDown selectedValue={category} setSelectedValue={setCategory} items={data['categories']} />
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Departments:</Text>
            <DropDown selectedValue={department} setSelectedValue={setDepartment} items={data['departments']} />
          </View>

        </View>
        <View style={{flexDirection: "row", padding: 50}}>
          <View style={styles.container}>
            <Text style={styles.title}>Program Levels:</Text>
            <DropDown selectedValue={progLevel} setSelectedValue={setProgLevel} items={data['progLevels']} />
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Terms:</Text>
            <DropDown selectedValue={term} setSelectedValue={setTerm} items={data['terms']} />
          </View>

        </View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
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
});
