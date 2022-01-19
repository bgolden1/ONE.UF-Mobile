import { StyleSheet, TouchableOpacity, Linking, Button, Alert, Platform } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React, { useCallback } from "react";
import LoginComponent from '../components/Login';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
const useWebKit = true;

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ONE.UF</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.body}>Here you will find all the functionality you like and maybe someday it'll even be complete</Text>
      <LoginComponent/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  body: {
    textAlign: 'center',
    fontSize: 17,
  }
});

async function Login() {
  const useProxy = true;
  const returnUrl = AuthSession.makeRedirectUri({useProxy});
  const authUrl = 'https://login.ufl.edu/idp/profile/SAML2/Redirect/SSO';
  const response = await WebBrowser.openAuthSessionAsync(authUrl, returnUrl);
  console.log(response)
}
