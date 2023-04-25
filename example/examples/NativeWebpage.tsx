import React, { Component } from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

interface Props {}
interface State {}

export default class NativeWebpage extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={{ height: 400 }}>
        <WebView
          source={{ uri: 'https://d3ward.github.io/toolz/adblock.html' }}
          style={{ width: '100%', height: '100%' }}
          onShouldStartLoadWithRequest={(event) => {
            // console.log('onShouldStartLoadWithRequest', event);
            return true;
          }}
          onLoadStart={(event) => {
            // console.log('onLoadStart', event.nativeEvent);
          }}
          onUriChange={(e) => console.log(e.nativeEvent)}
          onCanGoBackChange={(e) => console.log('onCanGoBack: ', e.nativeEvent)}
          onCanGoForwardChange={(e) =>
            console.log('onCanGoForward: ', e.nativeEvent)
          }
          onBackgroundChange={(e) => console.log('background: ', e.nativeEvent)}
        />
      </View>
    );
  }
}
