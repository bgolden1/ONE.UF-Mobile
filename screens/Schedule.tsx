import { StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {Text, View } from '../components/Themed';

export default function Schedule() {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("https://one.uf.edu/apix/soc/filters").then((res) => {
      console.log(res);
      setCategories(res.data['categories']);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }, []);
  return (
    <View style={styles.container}>
      {isLoading?<Text style={styles.title}>Loading</Text> : <Text>Category 1: {categories[0]["DESC"]}</Text>}
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
