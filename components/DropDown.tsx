import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {Text, useThemeColor, View } from '../components/Themed';


export default function DropDown(props: any) {
    const selectedValue = props['selectedValue'];
    const setSelectedValue = props['setSelectedValue'];
    const items = props['items'];
    const open = props['open'];
    const setOpen = props['setOpen'];
    const z = props['zIndex']
    const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
    return (
    <DropDownPicker items={items.map((item: any) => {
        return {
            label: item["DESC"],
            value: item["CODE"]
        }
    })} multiple={false} value={selectedValue} setValue={setSelectedValue} open={open} setOpen={setOpen} style={{maxWidth: '100%', maxHeight: '100%'}} 
    zIndex={z} zIndexInverse={5000-z}/>
    )
}