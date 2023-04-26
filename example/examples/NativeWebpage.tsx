import React, { Component, useRef } from 'react';
import { Button, Text, View } from 'react-native';

import WebView from 'react-native-webview';

export const NativeWebpage = () => {
  const ref = useRef<WebView>(null);
  const [uri, setUri] = React.useState('https://medium.com');
  const [canGoBack, setCanGoBack] = React.useState(false);
  const [canGoForward, setCanGoForward] = React.useState(false);
  const [loadingProgress, setLoadingProgress] = React.useState(0);

  return (
    <View style={{ height: 800 }}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          title="back"
          disabled={!canGoBack}
          onPress={ref.current?.goBack}
        />
        <Button
          title="forward"
          disabled={!canGoForward}
          onPress={ref.current?.goForward}
        />
      </View>

      <Text>Loading: {loadingProgress}</Text>
      <Text>{uri}</Text>
      <WebView
        ref={ref}
        scrollEnabled
        initialSource={{ uri }}
        source={{ uri }}
        style={{ width: '100%', height: '100%' }}
        onShouldStartLoadWithRequest={(event) => {
          // console.log('onShouldStartLoadWithRequest', event);
          return true;
        }}
        onLoadStart={(event) => {
          // console.log('onLoadStart', event.nativeEvent);
        }}
        onUriChange={(e) => {
          console.log(e.nativeEvent);
          setUri(e.nativeEvent.uri);
        }}
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
        onLoadProgress={(e) => {
          console.log('here');
          setLoadingProgress(e.nativeEvent.progress);
        }}
      />
    </View>
  );
};

export default NativeWebpage;
