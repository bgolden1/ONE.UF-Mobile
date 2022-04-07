import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import { Text, View } from '../components/Themed';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

export default function ActionItems() {

    const [holds, setHolds] = useState({
        groups: [],
        info: []
    })

    const [todos, setTodos] = useState({
        groups: [],
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
        axios.get(url + "todo", { headers: headers }).then((res) => {
            setTodos(res.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        isLoading ? <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'blue'} /></View> :
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>{"\n"}Holds:</Text>
                    {holds.groups.length > 0 ? holds.groups.map((hold_type: any, key: any) => {
                        return (

                            <View style={styles.section}>

                                <Text style={styles.body}>{hold_type.label}</Text>

                                {hold_type.holds.map((hold: any, key2: any) => {
                                    return (
                                        <DisplayData data={hold} />
                                    );
                                })}

                            </View>

                        );
                    }) :
                    <Text style={styles.body}>You currently do not have any holds</Text>}

                    <Text style={styles.title}>{"\n"}Info:</Text>

                    <View style={styles.section}>
                        {holds.info.length > 0 ? holds.info.map((info: any, key: any) => {
                            return (
                                <DisplayData data={info} />
                            );
                        }):
                        <Text style={styles.body}>You currently do not have any info items</Text>}
                    </View>

                    <Text style={styles.title}>{"\n"}Todo:</Text>
                    {todos.groups.length > 0 ? todos.groups.map((todo_type: any, key: any) => {
                        return (

                            <View style={styles.section}>

                                <Text style={styles.body}>{todo_type.label}</Text>

                                {todo_type.todos.map((hold: any, key2: any) => {
                                    return (
                                        <DisplayData data={hold} />
                                    );
                                })}

                            </View>

                        );
                    }) :
                    <Text style={styles.body}>You currently do not have any todo items</Text>}

                </View>




            </ScrollView>
    );


}

function DisplayData(props: any) {
    const [pressed, press] = useState(false);
    const data = props.data;
    const { width } = useWindowDimensions()
    const details = {
        html: data.details
    }
    return (
        <TouchableOpacity onPress={() => press(!pressed)} style={styles.subsection}>
            <Text style={[styles.body]}>{data.label}</Text>
            {pressed &&
                <View>
                    <RenderHtml contentWidth={width} source={details} />
                </View>
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