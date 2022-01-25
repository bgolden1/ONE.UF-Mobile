import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import React from 'react';
import { StyleSheet, TouchableOpacity, Button, Alert, Platform, Text} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { View } from './Themed';
import * as Linking from 'expo-linking';
import WebView from 'react-native-webview';

export default class LoginComponent extends React.Component {
        state = {
          redirectData: null,
        };

        
      
        render() {
          const useProxy = true;
          const returnUrl = AuthSession.makeRedirectUri({useProxy});
          return (
            <WebView
              source={{
                uri: 'https://login.ufl.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s1',
                headers: {
                  'Referer': {returnUrl},
                },
              }}
            />
          );
        }
      
        _handleRedirect = (event: any) => {
          if (Platform.OS === 'ios') {
            WebBrowser.dismissBrowser();
          } else {
            this._removeLinkingListener();
          }
      
          let data = Linking.parse(event.url);
      
          this.setState({ redirectData: data });
        };
        
        _openAuthSessionAsync = async () => {
          const useProxy = true;
          const returnUrl = AuthSession.makeRedirectUri({useProxy});
          return (
            <WebView
              source={{
                uri: 'https://login.ufl.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s1',
                headers: {
                  'Referer': {returnUrl},
                },
              }}
            />
          );
        }
      /*
        // openAuthSessionAsync doesn't require that you add Linking listeners, it
        // returns the redirect URL in the resulting Promise
        _openAuthSessionAsync = async () => {
          try {
            const useProxy = true;
            const returnUrl = AuthSession.makeRedirectUri({useProxy});
            const authUrl = `https://login.ufl.edu/idp/profile/SAML2/Redirect/SSO?redirect=${returnUrl}`;
            let result = await WebBrowser.openAuthSessionAsync(authUrl, returnUrl);
            let redirectData;
            if (result.type == 'success') {
              redirectData = Linking.parse(result.url)
            }
            this.setState({ result, redirectData });
          } catch (error) {
            alert(error);
            console.log(error);
          }
        };
        */
      
        _addLinkingListener = () => {
          Linking.addEventListener("url", this._handleRedirect);
        };
      
        _removeLinkingListener = () => {
          Linking.removeEventListener("url", this._handleRedirect);
        };
      
        _maybeRenderRedirectData = () => {
          if (!this.state.redirectData) {
            return;
          }
      
          return (
            <Text>
              {JSON.stringify(this.state.redirectData)}
            </Text>
          );
        };
        
      }