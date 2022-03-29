import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ScrollView, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';

export default function Finances({ navigation }: RootTabScreenProps<'Home'>) {
    const [accountBalance, setAccountBalance] = useState(8.31);
    const [chargesDue, setChargesDue] = useState({
        chargesDueLater: [],
        chargesDueNow: [],
        dueLaterTotal: 0,
        dueNowTotal: 0,
        totalAmountDue: 0,
    })
    const [paymentLink, setPaymentLink] = useState({
        title: "",
        url: "",
        isExternal: true
    })
    const [activities, setActivities] = useState([]);
    const [paymentHistory, setHistory] = useState({
        totalPaymentCount: 0,
        totalPaymentAmount: 0,
        minDate: "",
        maxDate: "",
        paymentDetail: []
    });
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const url = "http://34.136.6.158:5000/api/";
        const headers = {
            'X-UF-Cookie': '_shibsession_68747470733a2f2f73712e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f68747470733a2f2f73702e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f=_CHARLES_',
            'X-Host-Choice': 'mock-host'
        }
        axios.get(url + "accountbalance", { headers: headers }).then((res) => {
            setAccountBalance(res.data.accountBalance);
        }).catch((err) => {
            console.log(err);
        })
        axios.get(url + "chargesdue", { headers: headers }).then((res) => {
            setChargesDue(res.data);
        }).catch((err) => {
            console.log(err)
        })
        axios.get(url + "paymentlink", { headers: headers }).then((res) => {
            setPaymentLink(res.data);
        }).catch((err) => {
            console.log(err)
        })
        axios.get(url + "accountactivities", { headers: headers }).then((res) => {
            setActivities(res.data.activities);
        }).catch((err) => {
            console.log(err)
        })
        axios.get(url + "paymenthistory", { headers: headers }).then((res) => {
            setHistory(res.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err)
        })
    })
    return (


        isLoading ? <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center'}}><ActivityIndicator size={'large'} color={'blue'} /></View> :


            <ScrollView >

                <View style={{ alignItems: "center", flex: 1, paddingTop: 60, paddingBottom: 60}}>

                    <View style={styles.separator} />

                    <View style={styles.personal_info}>
                        <Text style={styles.title}>USERNAME</Text>
                        <Text style={styles.title}></Text>
                        <Text style={styles.body}>Account Balance</Text>
                        <Text style={styles.title}></Text>
                        <Text style={styles.boldingprice}>${accountBalance}</Text>

                    </View>

                    <TouchableOpacity onPress={() => {WebBrowser.openBrowserAsync(paymentLink.url)}} style={styles.bluebutton}>
                        <View style={{ backgroundColor: '#285697' }}>
                            <Text style={styles.title}>{paymentLink.title}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Transcript")} style={styles.bluebutton}>
                        <View style={{ backgroundColor: '#285697' }}>
                            <Text style={styles.title}>Direct Deposit Funds</Text>
                        </View>
                    </TouchableOpacity>



                    <View style={styles.separator} />
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>Charges Due</Text>
                        <Charges name="Due Now" value={chargesDue.dueNowTotal} data={chargesDue.chargesDueNow}/>
                        <Charges name="Due Later" value={chargesDue.dueLaterTotal} data={chargesDue.chargesDueLater}/>
                    </View>


                    <View>
                        { }
                    </View>



                    <View style={styles.separator} />
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>Refunds</Text>
                    </View>

                    <View>
                        { }
                    </View>


                    <View style={styles.separator} />
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>Payment History</Text>
                    </View>

                    <View>
                        { }
                    </View>


                    <View style={styles.separator} />
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>Account Activity</Text>
                    </View>

                    <View>
                        { }
                    </View>




                </View>

            </ScrollView>


    );
}

function Charges(props: any) {
    const [pressed, press] = useState(false);
    const name = props.name;
    const value = props.value;
    const data = props.data;
    return (
        <TouchableOpacity onPress={() => press(!pressed)}>
            <Text>{name}: {value}</Text>

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
        width: "70%",
        height: "5%",
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

});