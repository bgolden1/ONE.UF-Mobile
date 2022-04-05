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


        isLoading ? <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'blue'} /></View> :


            <ScrollView >

                <View style={{ alignItems: "center", flex: 1, paddingTop: 60, paddingBottom: 60 }}>

                    <View style={styles.separator} />

                    <View style={styles.personal_info}>
                        <Text style={styles.title}>USERNAME</Text>
                        <Text style={styles.title}></Text>
                        <Text style={styles.body}>Account Balance</Text>
                        <Text style={styles.title}></Text>
                        <Text style={styles.boldingprice}>${accountBalance}</Text>

                    </View>

                    <TouchableOpacity onPress={() => { WebBrowser.openBrowserAsync(paymentLink.url) }} style={styles.bluebutton}>
                        <View style={{ backgroundColor: '#285697' }}>
                            <Text style={styles.title}>{paymentLink.title}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <Charges now_name="Due Now" now_value={chargesDue.dueNowTotal} now_data={chargesDue.chargesDueNow}
                        later_name="Due Later" later_value={chargesDue.dueLaterTotal} later_data={chargesDue.chargesDueLater} />

                    <View style={styles.separator} />

                    <Refunds data={activities}/>


                    <View style={styles.separator} />

                    <PaymentHistory data={paymentHistory.paymentDetail}/>

                    <View style={styles.separator} />

                    <AccountActivity data={activities}/>




                </View>

            </ScrollView>


    );
}

function Charges(props: any) {
    const [pressed, press] = useState(false);
    const now_name = props.now_name;
    const now_value = props.now_value;
    const now_data = props.now_data;

    const later_name = props.later_name;
    const later_value = props.later_value;
    const later_data = props.later_data;
    return (
        <TouchableOpacity onPress={() => press(!pressed)} style={styles.section}>
            <Text style={styles.title}>Charges Due</Text>
            <Text style={{ textDecorationLine: "underline" }}>{now_name}: ${now_value}</Text>
            {now_value != 0 && pressed &&
                now_data.map((entry: any, key: any) => {
                    return (
                        <View style={styles.subsection} key={key}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{entry.term}</Text>
                            <Text style={{ textAlign: 'center' }}>{entry.description}: ${entry.amount}</Text>
                            <Text style={{ textAlign: 'center' }}>Due: {entry.dueDate}</Text>
                        </View>
                    )

                })
            }
            <Text style={{ textDecorationLine: "underline" }}>{later_name}: ${later_value}</Text>
            {later_value != 0 && pressed &&
                later_data.map((entry: any, key: any) => {
                    return (
                        <View style={styles.subsection} key={key}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{entry.term}</Text>
                            <Text style={{ textAlign: 'center' }}>{entry.description}: ${entry.amount}</Text>
                            <Text style={{ textAlign: 'center' }}>Due: {entry.dueDate}</Text>
                        </View>
                    )

                })
            }
        </TouchableOpacity>
    )
}

function Refunds(props: any) {
    const [pressed, press] = useState(false);
    const data = props.data;
    return (
        <TouchableOpacity onPress={() => press(!pressed)} style={styles.section}>
            <Text style={styles.title}>Refunds</Text>
            {pressed && 
            (data.length > 0 ? 
            data.map((entry: any, key: any) => {
                if (entry.transactionType == 'Refund') {
                    return(
                        <View style={styles.subsection} key={key}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{entry.termDescription}</Text>
                            <Text style={{ textAlign: 'center' }}>{entry.itemDescription}: ${entry.amount}</Text>
                            <Text style={{ textAlign: 'center' }}>Posted: {entry.postedDate}</Text>
                        </View>
                    )
                }
            }) :
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>No refunds found </Text>)
            } 
        </TouchableOpacity>
    )
}

function PaymentHistory(props: any) {
    const [pressed, press] = useState(false);
    const data = props.data;
    return (
        <TouchableOpacity onPress={() => press(!pressed)} style={styles.section}>
            <Text style={styles.title}>Payment History</Text>
            {pressed && 
            (data.length > 0 ? 
            data.map((entry: any, key: any) => {
                return(
                        <View style={styles.subsection} key={key}>
                            <Text style={{ textAlign: 'center' }}>{entry.itemDescription}: ${entry.amount}</Text>
                            <Text style={{ textAlign: 'center' }}>Posted: {entry.postedDate}</Text>
                        </View>
                    )
            }) :
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>No payments found </Text>)
            } 
        </TouchableOpacity>
    )
}

function AccountActivity(props: any) {
    const [pressed, press] = useState(false);
    const data = props.data;
    return (
        <TouchableOpacity onPress={() => press(!pressed)} style={styles.section}>
            <Text style={styles.title}>Account Activity</Text>
            {pressed && 
            (data.length > 0 ? 
            data.map((entry: any, key: any) => {
                    return(
                        <View style={styles.subsection} key={key}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{entry.termDescription}</Text>
                            <Text style={{ textAlign: 'center' }}>{entry.itemDescription}: ${entry.amount}</Text>
                            <Text style={{ textAlign: 'center' }}>Posted: {entry.postedDate}</Text>
                        </View>
                    )
            }) :
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>No refunds found </Text>)
            } 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    personal_info: {
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#285697",
        marginTop: 1,
        borderRadius: 15,
        paddingBottom: 1,
        paddingTop: 1,
        width: '90%'
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
        alignSelf: 'center'
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
        height: 50,
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

    subsection: {
        alignSelf: 'center',
        width: '90%',
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        paddingBottom: 15,
    },
    section: {
        alignSelf: 'center',
        width: '90%',
        borderColor: '#285697',
        borderWidth: 2,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        paddingBottom: 15,
        alignItems: 'center'
    }

});