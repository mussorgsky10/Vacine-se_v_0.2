import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, Button } from 'react-native'; 
import QRCode from 'react-native-qrcode-svg';

export default function QrCodesGenerator() {
  const [inputText, setInputText] = useState('');
  const [qrValue, setQrValue] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.containerQr}>
        <QRCode
          value={qrValue ? qrValue : 'NA'}
          size={250}
          color="black"
          backgroundColor="white"
          logoSize={30}
          logoMargin={2}
          logoBorderRadius={15}
          logoBackgroundColor="yellow"
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          Insira qualquer valor para gerar o QR Code
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(inputText) => setInputText(inputText)}
          value={inputText}
        />
        <View style={{margin:5}}>
          <Button
            onPress={() => setQrValue(inputText)}
            title="Gerar QR Code"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerQr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  textInput: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    margin: 10,
    borderWidth: 1,
  },
});

   // "react-native-safe-area-context": "^3.2.0",