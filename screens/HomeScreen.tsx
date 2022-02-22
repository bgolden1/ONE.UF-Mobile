import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <View style={{
        top: 100,
        backgroundColor: '#d18c8c',
        width: "95%",
        height: "20%",
        borderColor: '#FF3D00',
        borderWidth: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 15
      }}>
        <Text style={styles.title}>Holds</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Transcript")} style={styles.unofficial_transcript}>
        <View style={{backgroundColor:'#ced4f2'}}>
          <Text style={styles.title}>Unofficial Transcript</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
  body: {
    textAlign: 'center',
    fontSize: 17,
  },
  unofficial_transcript: {
    top: 100,
    backgroundColor: '#ced4f2',
    width: "95%",
    height: "20%",
    borderColor: '#003Dff',
    borderWidth: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 15
  }
});
