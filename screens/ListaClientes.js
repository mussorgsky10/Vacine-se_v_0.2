import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BarCodeReader from './BarCodeReader';
import PerfilScreen from './PerfilScreen'

const { width } = Dimensions.get('window')

function ClientesScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState(null);

  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/1rgobXKBO9wuqz3PbmnDC8oKSe5DCwiz2RtARnqWWKck/gviz/tq?tqx=out:json')
      .then((response) => response.text())
      .then(text => JSON.parse(text.substr(47).slice(0, -2)))
      .then(({table})=>table.rows
      .map(row => [ ...table.cols.map((col, index) => ({[col.label]: row.c[index].v,}))])
      .map(data => data.reduce((acc, value) =>  ({...acc, ...value}), {})))
      .then((json) => {setData(json), setList(json)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [])
  ;
  
  const handleOrderClick = () => {
    let newList = [...data];

    newList.sort((a, b) => (a.nomeCompleto > b.nomeCompleto ? 1 : b.nomeCompleto > a.nomeCompleto ? -1 : 0));

    setList(newList);
  };

  useEffect(() => {
    let newList = [...data];

    if (searchText === '') {
      setList(newList) ;
    } else {
      setList(
        newList.filter(
          (item) =>
            item.nomeCompleto.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [data, searchText]);

  const ListItem = ({ data }) => {
  return (
    <TouchableOpacity  onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Perfil', {
            imagem: data.urlToImage,
            nome: data.nomeCompleto,
            id: data.fotoId,
          });
        }} style={styles.card}>
      <Image source={{ uri: data.urlToImage }} style={styles.itemPhoto} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemP1}>{data.nomeCompleto}</Text>
        <Text style={styles.itemP2}>{data.celular}</Text>
        <Text style={{paddingTop: 1, fontSize: 1, color: '#F9F9F9', paddingBottom: 1, alignSelf:'center' }}>{data.fotoId}</Text>
      </View>
    </TouchableOpacity>
  );
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          style={styles.input}
          placeholder="Pesquise uma pessoa"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
        />
        <TouchableOpacity onPress={handleOrderClick} style={styles.orderButton}>
          <MaterialCommunityIcons
            name="order-alphabetical-ascending"
            size={32}
            color="#888"
          />
        </TouchableOpacity>
      </View>


      <FlatList
        data={list}
        style={styles.list}
        renderItem={({ item }) => <ListItem data={item} />}
        keyExtractor={(item) => item.fotoId}
      />

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#E7E7E7',
    margin: 30,
    borderRadius: 5,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 15,
    color: 'black',
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderButton: {
    width: 32,
    marginRight: 30,
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: '#F9F9F9',
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    width: width / 1.1,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    borderRadius: 8,
    flexDirection: 'row',
  },
  itemPhoto: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignSelf: 'center',
    marginLeft: 5,
  },
  itemInfo: {
    marginLeft: 20,
  },
  itemP1: {
    fontSize: 22,
    color: 'black',
    marginBottom: 5
  },
  itemP2: {
    fontSize: 18,
    color: 'black',
  },
});

const Stack = createNativeStackNavigator();

export default function Clientes() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Cliente" component={ClientesScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="QR Code" component={BarCodeReader} />
      </Stack.Navigator>

  );
}

