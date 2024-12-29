import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Cadastro from './src/pages/cadastro/cadastro';
import Login from './src/pages/Login/login';
import Car from './src/pages/Home/carrossel';
import Splash from './src/pages/splash/splash';
import Contato from './src/pages/Contato/contato';
import Perfil from './src/pages/Perfil/perfil';
import Home from './src/pages/Home/home';
import Dignidade from './src/pages/DignidadeMenstrual/dignidade';
import EditarPerfil from './src/pages/EditarPerfil/EditarPerfil';
import Favoritos from './src/pages/Favoritos/Favoritos';
import Search from './src/pages/Search/buscarRemedio';
import SobreSUS from './src/pages/SobreSUS/SobreSUS';
import Suporte from './src/pages/Suporte/Suporte';
import procurarPosto from './src/pages/Search/procurarPostos';
import buscarRemedio from './src/pages/Search/buscarRemedio';

import FarmaPosto from './src/pages/PostoeFarma/FarmaPosto';
import med from './src/pages/Medicamento/medicamento';
import med2 from './src/pages/Medicamento/medBuscado';

import gov from './src/pages/gov/gov1';

import cartao from './src/pages/cartaoSUS/cartao';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }} />
        <Stack.Screen name="Car" component={Car} />
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Dignidade" component={Dignidade} options={{ headerShown: false }} />
        <Stack.Screen name="Contato" component={Contato} options={{ headerShown: false }}/>
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}/>
        <Stack.Screen name="ProcurarPostos" component={procurarPosto} options={{ headerShown: false }}/>
        <Stack.Screen name="BuscarRemedio" component={buscarRemedio} options={{ headerShown: false }}/>

        <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false }}/>
        <Stack.Screen name="Favoritos" component={Favoritos} options={{ headerShown: false }}/>
        <Stack.Screen name="SobreSUS" component={SobreSUS} options={{ headerShown: false }}/>
        <Stack.Screen name="Suporte" component={Suporte} options={{ headerShown: false }}/>
        <Stack.Screen name="Cartao" component={cartao} options={{ headerShown: false }}/>

        <Stack.Screen name="FarmaPosto" component={FarmaPosto} options={{ headerShown: false }}/>
        <Stack.Screen name="Medicamento" component={med} options={{ headerShown: false }}/>
        <Stack.Screen name="MedBusca" component={med2} options={{ headerShown: false }}/>

        <Stack.Screen name="Gov" component={gov} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
