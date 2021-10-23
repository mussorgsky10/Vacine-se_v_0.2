import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

//import BarCodeReader from './screens/BarCodeReader'
import Clientes from './screens/ListaClientes'
import Sorteio from './screens/SorteiosScreen'
import CadastroClientes from './screens/CadastroClientes'
import QrCodesGenerator from './screens/QrCodeGenerator'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Esta é a página principal.
      </Text>
      <Button onPress={() => navigation.navigate('Clientes')} title="ir para a página clientes" />
    </View>
  );
}

function RecompensasScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{padding: 20}}>
        Gerenciamento de recompensas.
      </Text>
      <Button onPress={() => navigation.goBack()} title="Voltar para a página principal" />
    </View>
  );
}

function CadastroRecompensasScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{padding: 20}}>
        Cadastro de recompensas.
      </Text>
      <Button onPress={() => navigation.goBack()} title="Voltar para a página principal" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Vacine-se">
        <Drawer.Screen name="Vacine-se" component={HomeScreen} />
        <Drawer.Screen name="Crachás" component={QrCodesGenerator} />
        <Drawer.Screen name="Cadastro de Clientes" component={CadastroClientes} />
        <Drawer.Screen name="Clientes" component={Clientes} />
        <Drawer.Screen name="Sorteios" component={Sorteio} />
        <Drawer.Screen name="Cadastro de Recompensas" component={CadastroRecompensasScreen} />
        <Drawer.Screen name="Recompensas" component={RecompensasScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}