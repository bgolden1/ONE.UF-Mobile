import { Text, useThemeColor, View } from '../components/Themed';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export function Courses(props: any) {
    const courses = props['courses'];


    function onPress(course: any) {
        
    }

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
            {courses.map((course: any, key: any) => {
                return (
                    <TouchableOpacity onPress={() => onPress(course)} key={key}>
                        <View key={key} style={styles.course}>
                            <Text style={styles.title}>{course.code}: {course.name}</Text>
                            <Text style={styles.body}>{course.description}</Text>
                        </View>
                    </TouchableOpacity>);
            })}
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 12,
    },
    course: {
        alignSelf: 'flex-start',
        width: '95%',
        borderColor: '#285697',
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 10,
        padding: 5
    },
    scrollView: {
        alignSelf: 'center',
    },
    contentContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingBottom: 300,
        paddingTop: 100
    }
});