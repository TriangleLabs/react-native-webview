import React, { Component, useRef } from 'react';
import { Button, Text, View, TextInput } from 'react-native';

import WebView from 'react-native-webview';

export const NativeWebpage = () => {
  const ref = useRef<WebView>(null);
  const [uri, setUri] = React.useState('https://medium.com');
  const [canGoBack, setCanGoBack] = React.useState(false);
  const [canGoForward, setCanGoForward] = React.useState(false);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [history, setHistory] = React.useState({
    history: ['https://medium.com'],
    currentHistoryIndex: 0,
    historyLength: 1,
  });

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

      {/* <Text>Loading: {loadingProgress}</Text> */}
      <Text>History: {history.historyLength}</Text>
      <Text>Index: {history.currentHistoryIndex}</Text>
      <Text>
        Current site: {history.history[history.currentHistoryIndex].uri}
      </Text>
      <TextInput
        onChangeText={setUri}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        style={{
          padding: 16,
          backgroundColor: '#f4f4f4',
        }}
        onSubmitEditing={() =>
          ref.current?.loadSource({
            uri,
          })
        }
      />
      <Button
        title="load"
        onPress={() =>
          ref.current?.loadSource({
            uri,
          })
        }
      />
      <WebView
        allowsInlineMediaPlayback
        ref={ref}
        scrollEnabled
        initialSource={{ uri }}
        source={{ uri: 'not-being-used' }}
        style={{ width: '100%', height: '100%' }}
        onUriChange={(e) => {
          const { currentHistoryIndex, history } = e.nativeEvent;
          console.log({ currentHistoryIndex, history: history.length });
          setHistory({
            currentHistoryIndex,
            history,
            historyLength: history.length,
          });
        }}
        onCanGoBackChange={(e) => {
          console.log('onCanGoBack: ', e.nativeEvent);
          setCanGoBack(e.nativeEvent.canGoBack);
        }}
        onCanGoForwardChange={(e) => {
          // console.log('onCanGoForward: ', e.nativeEvent);
          setCanGoForward(e.nativeEvent.canGoForward);
        }}
        onLoadEnd={(event) => {
          // console.log('onLoadEnd', event.nativeEvent);
        }}
        // onBackgroundChange={(e) => console.log('background: ', e.nativeEvent)}
        // onNewWindow={(e) => console.log('new window: ', e.nativeEvent)}
        onLoadProgress={(e) => {
          // console.log('here');
          setLoadingProgress(e.nativeEvent.progress);
        }}
        onError={(e) => {
          console.log(e.nativeEvent);
          ref.current?.loadSource({
            uri: 'https://google.com?q=' + uri.replace('https://', ''),
          });
        }}
      />
    </View>
  );
};

export default NativeWebpage;
