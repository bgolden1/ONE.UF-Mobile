import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import { Text, View } from '../components/Themed';

export default function ActionItems() {
    const [pressed, press] = useState(false);

    function onPress() {
        press(!pressed)
    }

    const [holds, setHolds] = useState({
    groups:[

        {
            label: "Holds Diploma &/or Graduation",
            holds: [
              {
                label: "Graduation/Diploma Hold (UFIC)",
                details: "<p>Please request your host school to send your transcript to UF International Center, Coordinator, Study Abroad Services, 170 HUB, P O Box 113225, Gainesville, FL 36211-3225. Once grades have been posted for your study abroad semester, this hold will be removed.</p><p>Contact: UF International Center</p><p>170 HUB</p><p><a href=\"tel:352.273.1539\">352.273.1539</a></p>",
                term: "Fall 2021",
                startTermCode: 2218,
                endTermCode: "",
                contactPhone: "",
                contactEmail: "",
                startDate: "1902-01-01",
                holdCode: "/UFLOR/4IN/STUDY",
                sourceName: "OFFICE ENROLLMENT MANAGEMENT",
                timeStamp: "2021-09-16-15.36.46.833994"
              }
            ]
          }



    ],
    info: [

        {
            label: "Don't Get Phished",
            details: "<p><font color=\"#000000\"><font face=\"Calibri\"><font size=\"3\">Please click the below link for a quick ~10 minute review regarding protecting your UF account from phishing attempts.</font></font></font></p><p><font color=\"#000000\"><font face=\"Calibri\"><font size=\"3\">Upon completing the course, this Informational Notice will disappear from your OneUF account.&#xA0; The phishing review</font></font></font></p><p><font color=\"#000000\"><font face=\"Calibri\"><font size=\"3\">will appear on your account once every 365 days.</font></font></font></p><div class=\"WordSection1\"><p><a href=\"https://ufl.instructure.com/courses/417403\" target=\"_blank\"><span><span><span><font color=\"#0066cc\">https://ufl.instructure.com/courses/417403</font></span></span></span></a></p></div>",
            term: "",
            startTermCode: "",
            endTermCode: "",
            contactPhone: "",
            contactEmail: "",
            startDate: "",
            holdCode: "/UFLOR/R12/CYBER",
            sourceName: "INFORMATION TECHNOLOGY",
            timeStamp: "2021-01-26-03.54.23.441617"
          },
          {
            label: "Information from Registrar",
            details: "<p><span>You are eligible for a transcript fee waiver due to your military-affiliated status.&#xA0;</span></p><p>When you need a transcript, c<span>ontact UF Student Veteran Services at&#xA0;</span><a href=\"mailto:vacounselor@ufl.edu\" target=\"_blank\"><span>vacounselor@ufl.edu</span></a><span>&#xA0;to initiate your transcript request and have the fee waived.</span></p><p><em><span>Do <strong>NOT </strong>submit any transcript orders through ONE.UF.</span></em><br><em><span>Orders placed via ONE.UF or payments submitted are&#xA0;<strong>NOT</strong>&#xA0;refundable.&#xA0;</span></em></p>",
            term: "",
            startTermCode: "",
            endTermCode: "",
            contactPhone: "",
            contactEmail: "",
            startDate: "",
            holdCode: "/UFLOR/R02/TRNFW",
            sourceName: "OFFICE ENROLLMENT MANAGEMENT",
            timeStamp: "2021-01-27-09.15.24.864265"
          },
          {
            label: "Health Insurance Proof",
            details: "<p><!--StartFragment--></p><p>If you have not done so already, please provide proof of your health insurance for the <strong>Summer/Fall</strong>&#xA0;<b>terms</b>&#xA0;or you will be charged on your student account. <a href=\"https://healthcompliance.shcc.ufl.edu/insurance/comparable-coverage/\" target=\"_blank\">For more information, please visit the Health Compliance Office.</a></p><p><!--StartFragment--><em>To acknowledge that you understand the requirement and clear the action item from your list, </em>click button below.</p><p><!--EndFragment--></p><p>&#xA0;</p><p>&#xA0;</p>",
            term: "",
            startTermCode: "",
            endTermCode: "",
            contactPhone: "",
            contactEmail: "",
            startDate: "",
            holdCode: "/UFLOR/H02/PROSF",
            sourceName: "OFFICE ENROLLMENT MANAGEMENT",
            timeStamp: "2021-06-07-19.25.52.725270"
          }
          
          



    ]
    })

    const [todos, setTodos] = useState({
    groups:[],
    info: []
    })

    const [isLoading, setLoading] = useState(true);



    useEffect(() => {
        const url = "http://34.136.6.158:5000/api/"
        const headers = {
            'X-UF-Cookie': '_shibsession_68747470733a2f2f73712e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f68747470733a2f2f73702e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f=_CHARLES_',
            'X-Host-Choice': 'mock-host'
        }
        axios.get(url + "holds", { headers: headers }).then((res) => {
            setHolds(res.data);
        }).catch((err) => {
            console.log(err);
        });
        setLoading(false);
    });





    return (
        isLoading ? <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'blue'} /></View> :
            <ScrollView>






                <Text style={styles.title}> Holds </Text>
                


                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>{"\n"}Meet time(s):</Text>
                    {holds.groups.map((object: any, key: any) => {
                    return (

                        <View style={styles.personal_info}>
                            

                            <TouchableOpacity style={styles.classes} onPress={onPress} key = {'key'}>

                            <Text style={styles.body}>{object.label}</Text>

                            {object.holds.map((object2: any, key2: any) => {
                            return (
                                
                                pressed ? 

                                <Text style={styles.body}>{"\n"}Label:{"\n"}{object2.label }{"\n"}{"\n"}Details:{"\n"}{object2.details}{"\n"}{"\n"}
                                Term:{"\n"}{object2.term}{"\n"}{"\n"}Start Term Code:{"\n"}{object2.startTermCode}{"\n"}{"\n"}End Term Code:{"\n"}{object2.endTermCode}{"\n"}{"\n"}
                                Contact Phone:{"\n"}{object2.contactPhone}{"\n"}{"\n"}Contact Email:{"\n"}{object2.contactEmail}{"\n"}{"\n"}
                                Start Date:{"\n"}{object2.startDate}{"\n"}{"\n"}Hold Code:{"\n"}{object2.holdCode}{"\n"}{"\n"}Source Name:{"\n"}{object2.sourceName}{"\n"}{"\n"}
                                Time Stamp:{"\n"}{object2.timeStamp}</Text>

                                :
                                <Text style={styles.body}>{"\n"}Label:{"\n"}{object2.label }</Text>

                                );
                            })}

                            </TouchableOpacity>

                        </View>

                        );
                    })}

                    <Text style={styles.title}>{"\n"}Personal Info:</Text>

                    <TouchableOpacity style={styles.classes2} onPress={onPress} key = {'key2'}>

                    {holds.info.map((object2: any, key: any) => {
                    return (

                        pressed ?
                        <View style={styles.personal_info}>
                            

                            <Text style={styles.body}>{"\n"}Label:{"\n"}{object2.label }{"\n"}{"\n"}Details:{"\n"}{object2.details}{"\n"}{"\n"}
                                Term:{"\n"}{object2.term}{"\n"}{"\n"}Start Term Code:{"\n"}{object2.startTermCode}{"\n"}{"\n"}End Term Code:{"\n"}{object2.endTermCode}{"\n"}{"\n"}
                                Contact Phone:{"\n"}{object2.contactPhone}{"\n"}{"\n"}Contact Email:{"\n"}{object2.contactEmail}{"\n"}{"\n"}
                                Start Date:{"\n"}{object2.startDate}{"\n"}{"\n"}Hold Code:{"\n"}{object2.holdCode}{"\n"}{"\n"}Source Name:{"\n"}{object2.sourceName}{"\n"}{"\n"}
                                Time Stamp:{"\n"}{object2.timeStamp}</Text>

                        </View>

                        :
                        <View style={styles.personal_info}>
                            

                            <Text style={styles.body}>{"\n"}Label:{"\n"}{object2.label }</Text>
                        </View>


                        );
                    })}

                    </TouchableOpacity>


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
    },
    classes2: {
    },
    class_text: {
        textAlign: 'left',
        fontSize: 17,
    }
});