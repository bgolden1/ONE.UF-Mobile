import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ScrollView, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native'

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';

export default function Finances({ navigation }: RootTabScreenProps<'Home'>) {
    const isFocused = useIsFocused();
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
    const [user, setUser] = useState({
        name: "",
        legalName: "",
        ufid: "",
        apps: [],
        email: "",
        switchUser: false
    })
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        let cancel = false;
        setLoading(true);
        const url = "http://34.136.6.158:5000/api/";
        const headers = {
            'X-UF-Cookie': '_shibsession_68747470733a2f2f73712e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f68747470733a2f2f73702e6c6f67696e2e75666c2e6564752f75726e3a6564753a75666c3a70726f643a30303734312f=_' + globalThis.person + '_',
            'X-Host-Choice': 'mock-host'
        }
        let accountBalanceReq = axios.get(url + "accountbalance", { headers: headers });
        let chargesDueReq = axios.get(url + "chargesdue", { headers: headers });
        let paymentLinkReq = axios.get(url + "paymentlink", { headers: headers });
        let accountActivitiesReq = axios.get(url + "accountactivities", { headers: headers });
        let paymentHistoryReq = axios.get(url + "paymenthistory", { headers: headers });
        let userReq = axios.get(url + "user", {headers: headers});

        axios.all([accountBalanceReq, chargesDueReq, paymentLinkReq, accountActivitiesReq, paymentHistoryReq, userReq])
        .then(axios.spread((...responses) => {
            let accountBalanceRes = responses[0];
            if (cancel) return;
            setAccountBalance(accountBalanceRes.data.accountBalance);

            let chargesDueRes = responses[1];
            if (cancel) return;
            setChargesDue(chargesDueRes.data);

            let paymentLinkRes = responses[2];
            if (cancel) return;
            setPaymentLink(paymentLinkRes.data);

            let accountActivitiesRes = responses[3];
            if (cancel) return;
            setActivities(accountActivitiesRes.data.activities);

            let paymentHistoryRes = responses[4];
            if (cancel) return;
            setHistory(paymentHistoryRes.data);

            let userRes = responses[5];
            if (cancel) return;
            setUser(userRes.data);

            setLoading(false);
        }))
        .catch((err) => {
            console.log(err)
        })

        return () => { 
            cancel = true;
        }
    }, [isFocused])
    return (


        isLoading ? <View style={{ marginTop: "80%", alignSelf: 'center', alignContent: 'center', alignItems: 'center'}}><ActivityIndicator size={'large'} color={'blue'} style={{backgroundColor: '#f2f2f2'}} /></View> :


            <ScrollView >

                <View style={{ alignItems: "center", flex: 1, paddingTop: 60, paddingBottom: 60, backgroundColor: '#eaeaea'}}>

                    <View style={styles.personal_info}>
                        <Text style={styles.title}>{user.name}</Text>
                        <Text style={{fontSize: 17}}>Account Balance</Text>
                        <Text style={{fontSize: 14, fontWeight: 'bold', margin: 10}}>${accountBalance}</Text>
                    </View>

                    <TouchableOpacity onPress={() => { WebBrowser.openBrowserAsync(paymentLink.url) }} style={styles.bluebutton}>
                        <View style={{backgroundColor: '#aaa'}}>
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
            <Text style={{fontSize: 18}}>{now_name}: ${now_value}</Text>
            {now_value != 0 && pressed &&
                now_data.map((entry: any, key: any) => {
                    return (
                        <View style={styles.subsection} key={key}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>{entry.term}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15 }}>{entry.description}: ${entry.amount}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15  }}>Due: {entry.dueDate}</Text>
                        </View>
                    )
                })
            }
            <Text style={{fontSize: 18}}>{later_name}: ${later_value}</Text>
            {later_value != 0 && pressed &&
                later_data.map((entry: any, key: any) => {
                    return (
                        <View style={styles.subsection} key={key}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15  }}>{entry.term}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15  }}>{entry.description}: ${entry.amount}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15  }}>Due: {entry.dueDate}</Text>
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
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15  }}>{entry.termDescription}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15  }}>{entry.itemDescription}: ${entry.amount}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15  }}>Posted: {entry.postedDate}</Text>
                        </View>
                    )
                }
            }) :
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15  }}>No refunds found </Text>)
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
                            <Text style={{ textAlign: 'center', fontSize: 15  }}>{entry.itemDescription}: ${entry.amount}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15  }}>Posted: {entry.postedDate}</Text>
                        </View>
                    )
            }) :
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15  }}>No payments found </Text>)
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
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15  }}>{entry.termDescription}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15  }}>{entry.itemDescription}: ${entry.amount}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15  }}>Posted: {entry.postedDate}</Text>
                        </View>
                    )
            }) :
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15  }}>No refunds found </Text>)
            } 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    personal_info: {
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 10,
        paddingBottom: 1,
        width: '90%',
        borderWidth: 1,
        borderColor: '#a6a6a6',
        borderRadius: 6
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
        fontSize: 25,
        fontWeight: 'bold',
        margin: 10
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
        backgroundColor: '#aaa',
        width: "70%",
        borderColor: '#555',
        borderWidth: 2,
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
        padding: 5,
        paddingBottom: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#a6a6a6',
        borderRadius: 6,
        backgroundColor: '#fff'
    }

});