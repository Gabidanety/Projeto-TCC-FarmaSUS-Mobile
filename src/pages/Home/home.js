import React from 'react';
import { View, StyleSheet } from 'react-native';

//outras paginas
import Maps from './Maps/map';
import Car from './carrossel';
import Menu from './../Menu/menu';
import NavBar from './../Menu/header';
import BarraPesquisa from './barraPesquisa';

export default function Home() {
  return ( 
    <View style={styles.container}>
      <NavBar />
      <BarraPesquisa />
      <View style={styles.map}><Maps /></View>
      <View style={styles.carro}><Car /></View> 
      <View style={styles.menu}><Menu /></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  carro: {
    width: '100%',
    height: '28%',
    backgroundColor: 'transparent',
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: '92%',
    height: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
