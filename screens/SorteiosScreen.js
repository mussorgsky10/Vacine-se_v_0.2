import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window')



export default function Sorteio() {

  const [text, setText] = useState();
  const [number, setNumber] = useState();

  const geraNumeroAleatorio = (min, max) => {
    var numero_aleatorio = Math.random();
    min = Math.ceil(1);
    max = Math.floor(number);
    numero_aleatorio = Math.floor(numero_aleatorio * (max - min + 1)) + min;
    //alert(numero_aleatorio);
    setText(numero_aleatorio);
  }
  //console.log(text)

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}> Sorteador de número</Text>
        <View style={styles.Card}>
          <Image source={require("../assets/QRCode_example.png")} style={styles.logo}></Image>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={number => setNumber(number)}
          placeholder="Insira aqui o nº do último crachá entregue!"
          keyboardType="numeric" />
        <TouchableOpacity
          style={styles.button}
          onPress={geraNumeroAleatorio}>
          <Text style={styles.buttonText}>Sortear número</Text>
        </TouchableOpacity>
        <Text style={styles.text1}>Último número sorteado:</Text>
        <View style={styles.Card1}>
          <Text style={styles.text2}>
            {"\n"}
            {(text)}
            {"\n"}
          </Text>
        </View>
        <Text style={styles.text1}>Histórico de números sorteados:</Text>
        <View style={styles.Card1}>
          <Text>
            {"\n"}
            {"\n"}
            {"\n"}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: '#FFF07C',
  },
  text: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text1: {
    marginTop: 30,
    fontSize: 16,
    //fontWeight: 'bold',
    textAlign: 'left',
  },
  text2: {
    //marginLeft: 10,
    fontSize: 16,
    //fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#990000",
    padding: 10,
    borderRadius: 10,
    //marginTop: 50,
  },
  Card: {
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 30,
    alignSelf: 'center',
    width: width / 2.2,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    borderRadius: 8
  },
  Card1: {
    backgroundColor: 'white',
    marginTop: 10,
    //marginBottom: 110,
    alignSelf: 'center',
    width: width / 1.1,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    borderRadius: 8
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
});
