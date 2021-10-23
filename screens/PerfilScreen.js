import * as React from 'react';
import { View, Image, Text, Button } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen({ route, navigation }) {
    /* 2. Get the param */
    const { imagem } = route.params;
    const { nome } = route.params;
    const { cracha } = route.params;
    const { id } = route.params;

    const [cracha1, setCracha] = useState('');    

    const getData = async (key) => {
    const cracha2 = await AsyncStorage.getItem(key)
    setCracha(cracha2);
  }    
  
    getData(id) 

    return (
      <View style={{ flex: 1, paddingTop: 50 }}>
        <Image
            source={{ uri: imagem }}
            style={{ width: 130, height: 130, borderRadius: 100, alignSelf:'center' }}
          />
         <Text style={{paddingTop: 80, fontSize: 18, paddingBottom: 30, alignSelf:'center' }}>Nome: {nome} </Text>
         <Text style={{paddingTop: 1, fontSize: 1, color: '#F9F9F9', paddingBottom: 1, alignSelf:'center' }}>Id: {id} </Text>
         <Text style={{paddingTop: 1, fontSize: 18, paddingBottom: 1, alignSelf:'center' }}>Crachá: {(cracha1 != null ? cracha1 : cracha)} </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <Button title="Voltar" onPress={() => navigation.navigate('Cliente')} />
          <Button title="Atribuir Crachá" onPress={() => navigation.navigate('QR Code', {
              imagem: imagem,
              nome: nome,
              id: id,
            } )} />
        </View>
      </View>
    );
  }