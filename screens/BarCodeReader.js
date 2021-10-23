import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BarCodeReader({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { imagem } = route.params;
  const { nome } = route.params;
  const { id } = route.params;

  const storeData = async (key, value) => {
        await AsyncStorage.setItem(key, value)
      }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`O código do tipo ${type} com os seguintes dados: ${data} foi escaneado!`);
    storeData(id, data);
    navigation.navigate('Perfil', {cracha: data, nome: nome, imagem: imagem, id: id})
  };

  if (hasPermission === null) {
    return <Text style={styles.text}>Solicitando permissão para usar a câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>Sem acesso a câmera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject} />
      <Text style={styles.text}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text:{
    textAlign: "center",   
    top: 280,
    fontSize: 18,
    fontWeight: "400",
  },
});