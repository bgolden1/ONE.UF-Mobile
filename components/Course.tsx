import { Text, useThemeColor, View } from '../components/Themed';
import { StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

export function Courses(props: any) {
    const courses = props['courses']
    return (
        <ScrollView style={{ flexDirection: "column", paddingBottom: 0, paddingTop: 100 }}>
            {courses.map((course: any, key: any) => {
                return (
                    <TouchableOpacity>
                    <View key={key} style={styles.course}>
                        <Text>Code: {course.code}</Text>
                        <Text>Name: {course.name}</Text>
                        <Text>
                            Description:{'\n\t'}{course.description}
                        </Text>
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
    course: {
        alignSelf: 'flex-start',
        width: '100%',
        borderColor: '#285697',
        borderWidth: 2,
    },
});