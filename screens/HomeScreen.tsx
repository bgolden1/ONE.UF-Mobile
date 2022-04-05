import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Action Items</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Transcript")} style={styles.box}>
        <View>
          <Text style={styles.title}>Unofficial Transcript</Text>
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
  }
});
