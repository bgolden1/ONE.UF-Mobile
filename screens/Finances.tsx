import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ScrollView, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Finances({ navigation }: RootTabScreenProps<'Home'>) {
    
    





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
            'X-UF-Cookie': '_shibsession_68747470733a2f2f73712e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f68747470733a2f2f73702e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f=_CHARLES_',
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


      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>

        <View style={{ alignItems: "center", flex: 1 }}>

            <View style={styles.separator} />
            <View style={styles.separator} />

            <View style={styles.personal_info}>
                <Text style={styles.title}>USERNAME</Text>
                <Text style={styles.title}></Text>
                <Text style={styles.body}>Account Balance</Text>
                <Text style={styles.title}></Text>
                <Text style={styles.boldingprice}>- $8.10 due</Text>
                
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Transcript")} style={styles.bluebutton}>
                <View style={{backgroundColor:'#ced4f2'}}>
                <Text style={styles.title}>Make a Payment</Text>
                </View>
                </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Transcript")} style={styles.bluebutton}>
                <View style={{backgroundColor:'#ced4f2'}}>
                <Text style={styles.title}>Direct Deposit Funds</Text>
                </View>
                </TouchableOpacity>

            

            <View style={styles.separator} />
            <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>Charges Due</Text>
                <Text style={styles.body}>Due Now:</Text>
            </View>
            

                    <View>
                        {class_list(transcript.records.undergraduate.terms)}
                    </View>



            <View style={styles.separator} />
            <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>Refunds</Text>
            </View>
            
                    <View>
                        {class_list(transcript.records.undergraduate.terms)}
                    </View>


            <View style={styles.separator} />
            <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>Payment History</Text>
            </View>
            
                    <View>
                        {class_list(transcript.records.undergraduate.terms)}
                    </View>


            <View style={styles.separator} />
            <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>Account Activity</Text>
            </View>
            
                    <View>
                        {class_list(transcript.records.undergraduate.terms)}
                    </View>




        </View>

        </ScrollView> 


    );
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
            <Text style={styles.class_text} key={key}>Term: {term.termDescription}</Text>
            {term.creditSources.map((source: any, key1: any) => {
                return (
                    pressed ? 
                    <View>
                        
                        <Text style={{ paddingLeft: "5%" }}>Due Date: {source.currentGpa}{"\t"}Amount: {source.totalHoursEarned}</Text>
                        <Text style={{ paddingLeft: "5%" }}>Description: {source.currentGpa}{"\t"}Running total: {source.totalHoursEarned}</Text>

                        
                    </View> 
                    : 
                    <Text ></Text>                )
            })}
        </TouchableOpacity>
    )
}






//
const styles = StyleSheet.create({
    personal_info: {
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#285697",
        marginTop: 1,
        borderRadius: 15,
        paddingLeft: 120,
        paddingRight: 120,
        paddingBottom: 1,
        //padding: 85,
        paddingTop: 1,
    },


    try_this: {
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 1,
        paddingLeft: 110,
        paddingRight: 110,
        paddingBottom: 25,
        paddingTop: 15,

    },

    gpa: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 3,
        borderColor: "#285697",
        marginTop: 15,
        borderRadius: 15,
        padding: 22,
        paddingTop: 50,
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

    bluebutton: {
      top: 10,
      backgroundColor: '#285697',
      width: "95%",
      height: "10%",
      borderColor: '#285697',
      borderWidth: 3,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 15,
      borderRadius: 5
    },

    boldingprice: {
      fontSize: 15,
      fontWeight: 'bold',
    },

    scrollView: {
      //empty might delete later
    },

    contentContainer: {
      paddingTop: 1,
      paddingBottom: 200
    },

    classes: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderWidth: 2,
        borderColor: "#285697",
        marginTop: 15,
        borderRadius: 15,
        padding: 15,
        paddingTop: 5,
    },

    class_text: {
        textAlign: 'left',
        fontSize: 17,
        paddingLeft: 90,
        paddingRight: 90,
    }

});