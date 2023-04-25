import React, { Component } from 'react';
import { Button, View } from 'react-native';

import WebView from 'react-native-webview';

export const NativeWebpage = () => {
  const [canGoBack, setCanGoBack] = React.useState(false);
  const [canGoForward, setCanGoForward] = React.useState(false);

  return (
    <View style={{ height: 800 }}>
      <Button title="back" disabled={!canGoBack} />
      <Button title="forward" disabled={!canGoForward} />
      <WebView
        scrollEnabled
        source={{ uri: 'https://pogcoin.gg' }}
        style={{ width: '100%', height: '100%' }}
        onShouldStartLoadWithRequest={(event) => {
          // console.log('onShouldStartLoadWithRequest', event);
          return true;
        }}
        onLoadStart={(event) => {
          // console.log('onLoadStart', event.nativeEvent);
        }}
        onUriChange={(e) => console.log(e.nativeEvent)}
        onCanGoBackChange={(e) => {
          console.log('onCanGoBack: ', e.nativeEvent);
          setCanGoBack(e.nativeEvent.canGoBack);
        }}
        onCanGoForwardChange={(e) => {
          console.log('onCanGoForward: ', e.nativeEvent);
          setCanGoForward(e.nativeEvent.canGoForward);
        }}
        onLoadEnd={(event) => {
          console.log('onLoadEnd', event.nativeEvent);
        }}
        onBackgroundChange={(e) => console.log('background: ', e.nativeEvent)}
        onNewWindow={(e) => console.log('new window: ', e.nativeEvent)}
      />
    </View>
  );
};

export default NativeWebpage;
