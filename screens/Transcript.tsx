import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

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
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const url = "http://34.136.6.158:5000/api/unofficialtranscript"
        const headers = {
            'X-UF-Cookie': '_shibsession_68747470733a2f2f73712e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f68747470733a2f2f73702e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f=_SHAUN_',
            'X-Host-Choice': 'mock-host'
        }
        axios.get(url, { headers: headers }).then((res) => {
            setTranscript(res.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    });
    return (
        isLoading ? <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'blue'} /></View> :
            <ScrollView>
                <View style={{ alignItems: "center", flex: 1, backgroundColor: '#eaeaea'}}>
                    <View style={styles.personal_info}>
                        <Text style={styles.title}>Personal Info</Text>
                        <Text style={styles.body}>{transcript.personalInfo.name}</Text>
                        <Text style={styles.body}>{transcript.personalInfo.basisOfAdmissionDescription}</Text>
                        <Text style={styles.body}>{transcript.personalInfo.residencyDescription}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={{ alignItems: "center", backgroundColor: '#eaeaea'}}>
                        <Text style={styles.title}>{transcript.records.undergraduate.careerDescription} Record</Text>
                        {major_list(transcript.records.undergraduate.programs)}
                    </View>
                    <View style={styles.gpa}>
                        <View style={styles.columns}>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Cumulative GPA:</Text>
                            <Text>{transcript.records.undergraduate.ufGpa}{"\n"}</Text>

                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Total Hours:</Text>
                            <Text>{transcript.records.undergraduate.totalHoursEarned}{"\n"}</Text>

                            <Text style={{fontWeight: 'bold', fontSize: 15}}>UF Hours Carried:</Text>
                            <Text>{transcript.records.undergraduate.ufHoursCarried}</Text>
                        </View>
                        <View style={styles.columns}>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Cumulative Grade Pnts:</Text>
                            <Text>{transcript.records.undergraduate.gradePointsEarned}{"\n"}</Text>

                            <Text style={{fontWeight: 'bold', fontSize: 15}}>UF Cumulative Hours:</Text>
                            <Text>{transcript.records.undergraduate.ufHoursEarned}{"\n"}</Text>

                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Transfer Hours:</Text>
                            <Text>{transcript.records.undergraduate.transferHoursEarned}</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', alignItems: 'center', backgroundColor: '#eaeaea'}}>
                        {class_list(transcript.records.undergraduate.terms)}
                    </View>
                </View>
            </ScrollView>
    );
}

function major_list(programs: any) {
    return (
        programs.map((program: any, key: any) => {
            return (
                <View style= {{backgroundColor: '#eaeaea'}}>
                    <Text style={styles.body}>{program.college}</Text>
                    {program.plans.map((plan: any, key1: any) => {
                        return (
                            <Text style={styles.body}>{plan.planLongName}: {plan.descr}</Text>
                        )
                    })}
                </View>
            )
        })
    )
}

function class_list(terms: any) {
    return (
        terms.map((term: any, key: any) => {
            return (
                <Term term={term} key={key}/>
            )
        })
    )
}

function Term(props: any) {
    const [pressed, press] = useState(false);
    const term = props['term']
    const key = props['key']
    function onPress() {
        press(!pressed)
    }
    if (term.creditSources.length == 0) {
        return (
            <View/>
        )
    }
    return (
        <TouchableOpacity style={styles.classes} onPress={onPress}>
            <Text style={styles.class_text} key={key}>{term.termDescription}</Text>

            {term.creditSources.map((source: any, key1: any) => {
                return (
                    pressed ? 
                    //Expanded semester view
                    
                    <View style={{width: '100%', paddingTop: 8}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 3}}>
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>{source.sourceDescription}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 15}}>{source.totalHoursEarned}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: "space-between", paddingTop: 3}}>
                            <View style={{flex: 1}}>
                                <Text style={{fontWeight: 'bold', paddingLeft: 20}}>Course #</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{textAlign: 'right', fontWeight: 'bold'}}>Grade</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{textAlign: 'right', fontWeight: 'bold'}}>Hours</Text>
                            </View>
                        </View>

                        {source.sessions[0].courses.map((course: any, key2: any) => {
                            return(
                                <View style={{flexDirection: 'row',
                                              justifyContent: "space-between"}}>
                                    <Text style={{width: "40%", paddingLeft: 20}}>{course.subject}{course.catalogNumber}</Text>
                                    <Text style={{width: "40%", textAlign: 'center'}}>{course.grade == 0 ? "-" : course.grade}</Text>
                                    <Text style={{width: "27%", textAlign: 'center'}}>{course.hoursEarned}</Text>
                                </View>
                            )
                        })}

                    </View> 
                    : 
                    //Compressed semester view
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 3}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>{source.sourceDescription}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 15}}>{source.totalHoursEarned}</Text>
                        </View>
                    </View>
                    
                    
                )
            })}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    personal_info: {
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 15,
        padding: 15,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: '#a6a6a6',
        borderRadius: 6,
    },
    gpa: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 15,
        padding: 15,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: '#a6a6a6',
        borderRadius: 6
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
        width: '75%',
        justifyContent: "center",
        alignItems: "flex-start",
        borderWidth: 1,
        borderColor: '#a6a6a6',
        borderRadius: 6,
        marginTop: 15,
        padding: 15,
        paddingTop: 5,
        backgroundColor: '#fff'
    },
    class_text: {
        textAlign: 'left',
        fontSize: 20,
    },
    semesterSummary: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: '100%'
    },
    source:{
        
    },
    hours: {
        textAlign: 'right'
    }
});