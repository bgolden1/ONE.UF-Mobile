import { Text, useThemeColor, View } from '../components/Themed';
import { StyleSheet, FlatList, Button } from 'react-native';


export function Course(course: any) {
    return (
        <View style={styles.container}>
            <Text>Code: {course.code}, Name: {course.name}</Text>
            <Text>Description: {course.description}</Text>
        </View>
    );
} 

export function Courses(props: any) {
    const courses = props['courses']
    return (
        <View style={styles.container}>
            {courses.map((course: any, id: any) => {
                <Course course={course}/>
            })}
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