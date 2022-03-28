import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

export default function Transcript() {
    const [transcript, setTranscript] = useState({
        personalInfo: {
            name: "",
            ufid: 0,
            residency: "",
            residencyDescription: "",
            basisOfAdmissionCode: "",
            basisOfAdmissionDescription: "",
            ssn: "",
            dob: ""
        },
        records: {
            undergraduate: {
                comments: {
                    before: {
                        2: {
                            1: ""
                        },
                        3: {
                            1: ""
                        }
                    }
                },
                ufGpa: "",
                totalHoursEarned: "",
                gradePointsEarned: "",
                ufHoursEarned: "",
                ufHoursCarried: "",
                transferHoursEarned: "",
                terms: [{
                    
                }],
                concentrations: "",
                programs: [],
                careerDescription: ""
            }
        }
    })
    useEffect(() => {
        const url = "http://34.136.6.158:5000/api/unofficialtranscript"
        const headers = { 
            'X-UF-Cookie': '_shibsession_68747470733a2f2f73712e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f68747470733a2f2f73702e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f=_CHARLES_',
            'X-Host-Choice': 'mock-host'
        }
        axios.get(url, { headers: headers }).then((res) => {
            console.log(res.status);
            setTranscript(res.data);
        }).catch((err) => {
            console.log(err);
        });
    });
    return (
        <ScrollView>
            <View style={{ alignItems: "center", flex: 1 }}>
                <View style={styles.personal_info}>
                    <Text style={styles.title}>Personal Info</Text>
                    <Text style={styles.body}>{transcript.personalInfo.name}</Text>
                    <Text style={styles.body}>{transcript.personalInfo.basisOfAdmissionDescription}</Text>
                    <Text style={styles.body}>{transcript.personalInfo.residencyDescription}</Text>
                </View>
                <View style={styles.separator} />
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>{transcript.records.undergraduate.careerDescription} Record</Text>
                    {major_list(transcript.records.undergraduate.programs)}
                </View>
                <View style={styles.gpa}>
                    <View style={styles.columns}>
                        <Text>Cumulative GPA:</Text>
                        <Text>{transcript.records.undergraduate.ufGpa}{"\n"}</Text>

                        <Text>Total Hours:</Text>
                        <Text>{transcript.records.undergraduate.totalHoursEarned}{"\n"}</Text>

                        <Text>UF Hours Carried:</Text>
                        <Text>{transcript.records.undergraduate.ufHoursCarried}</Text>
                    </View>
                    <View style={styles.columns}>
                        <Text>Cumulative Grade Points:</Text>
                        <Text>{transcript.records.undergraduate.gradePointsEarned}{"\n"}</Text>

                        <Text>UF Cumulative Hours:</Text>
                        <Text>{transcript.records.undergraduate.ufHoursEarned}{"\n"}</Text>

                        <Text>Transfer Hours:</Text>
                        <Text>{transcript.records.undergraduate.transferHoursEarned}</Text>
                    </View>
                </View>
                <View style={styles.classes}>
                    {}
                </View>
            </View>
        </ScrollView>
    );
}

function major_list (programs: any) {
    return (
        programs.map((program: any, key: any) => {
            return(
                <View>
                    <Text style={styles.body}>{program.college}</Text>
                    {program.plans.map((plan: any, key1: any) => {
                        return(
                            <Text style={styles.body}>{plan.planLongName}: {plan.descr}</Text>
                        )
                    })}
                </View>
            )
        })
    )
}

function class_list (terms: any) {
    
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
        textAlign: 'center'
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