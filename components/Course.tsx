import { Text, useThemeColor, View } from '../components/Themed';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

export function Courses(props: any) {
    const courses = props['courses'];

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
            {courses.map((course: any, key: any) => {
                return (
                    <Course course={course} key={key} />
                );
            })}
        </ScrollView>
    );
}

function Course(props: any) {
    const [isPressed, press] = useState(false);
    const course = props['course'];
    const key = props['key'];

    function onPress(key: any) {
        press(!isPressed);
    }
    return (
        <TouchableOpacity onPress={() => onPress(key)} key={key}>
            <View key={key} style={styles.course}>
                <Text style={styles.title}>{course.code}: {course.name}</Text>
                <Text style={styles.body}>{course.description}</Text>
                {course.prerequisites != '' && 
                <Text style={styles.body}>{"\n"}{course.prerequisites}</Text>}
                {isPressed &&
                    course.sections.map((section: any, newKey: any) => {
                        return (
                        <View style={styles.section} key={newKey}>
                            <Text style={styles.title}> Class # {section.classNumber}</Text>
                        </View>
                        );
                    })
                }
            </View>
        </TouchableOpacity>);
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
    section: {
        alignSelf: 'flex-start',
        width: '95%',
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 15,
        marginTop: 10,
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