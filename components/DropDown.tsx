import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {Text, View } from '../components/Themed';


export default function DropDown(props: any) {
    const selectedValue = props['selectedValue'];
    const setSelectedValue = props['setSelectedValue'];
    const items = props['items'];
    return (
    <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) =>
            setSelectedValue(itemValue)
        } style={{ height: 50, width: 150 }}>
            {items.map((item: any) => {
                return <Picker.Item label={item["DESC"]} value={item["CODE"]}/>
            })}
    </Picker>
    )
}