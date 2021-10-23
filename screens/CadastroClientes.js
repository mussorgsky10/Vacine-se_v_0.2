import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class CadastroClientes extends Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://docs.google.com/forms/d/e/1FAIpQLSeVa3zLtTfKCMp1solowipJka9LSyd_EnEhMPrJHgS-npAZlA/viewform' }}
        style={{ marginTop: 20 }}
      />
    );
  }
}