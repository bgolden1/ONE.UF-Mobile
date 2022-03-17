import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

export default function Transcript() {
    const [transcript, setTranscript] = useState([])
    useEffect(() => {
        const url = "google.com"
        axios.get(url).then((res) => {

        }).catch((err)=> {
            
        });
    });
    return (
        <ScrollView>
            <View style={{ alignItems: "center", flex: 1 }}>
                <View style={styles.personal_info}>
                    <Text style={styles.title}>Personal Info</Text>
                    <Text style={styles.body}>(Name)</Text>
                    <Text style={styles.body}>(Basis of admission)</Text>
                    <Text style={styles.body}>(Residency)</Text>
                </View>
                <View style={styles.separator} />
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>(careerDescription) Record</Text>
                    <Text style={styles.body}>Major (n): (Major)</Text>
                </View>
                <View style={styles.gpa}>
                    <View style={styles.columns}>
                        <Text>Cumulative GPA:</Text>
                        <Text>(gpa){"\n"}</Text>

                        <Text>Total Hours:</Text>
                        <Text>(hours){"\n"}</Text>

                        <Text>UF Hours Carried:</Text>
                        <Text>(hours_c)</Text>
                    </View>
                    <View style={styles.columns}>
                        <Text>Cumulative Grade Points:</Text>
                        <Text>(gradePoints){"\n"}</Text>

                        <Text>UF Cumulative Hours:</Text>
                        <Text>(cumulative_hours){"\n"}</Text>

                        <Text>Transfer Hours:</Text>
                        <Text>(t_hours)</Text>
                    </View>
                </View>
                <View style={styles.classes}>

                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    personal_info: {
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#285697",
        marginTop: 15,
        borderRadius: 15,
        padding: 15,
        paddingTop: 5,
    },
    gpa: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "#285697",
        marginTop: 15,
        borderRadius: 15,
        padding: 15,
        paddingTop: 5,
    },
    columns: {
        alignItems: 'center',
        margin: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        width: '80%',
        color: '#285697',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    body: {
        textAlign: 'center',
        fontSize: 17,
    },
    classes: {
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#285697",
        marginTop: 15,
        borderRadius: 15,
        padding: 15,
        paddingTop: 5,
    },
});