/*PÁGINA ARRUMADA*/

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
/*import {useHistory} from 'react-router-dom';*/

export default function SearchScreen() {

  const navigation = useNavigation();

  return (
    <View style={styles.searchBarContainer}>
      <TextInput style={styles.searchBar} placeholder="Pesquisar..." placeholderTextColor="#707070" onFocus={() => navigation.navigate('BuscarRemedio')}/>
    </View>
  );
}

const styles = StyleSheet.create({
   
  container: { /*JÁ ARRUMADO*/

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

  searchBarContainer: { /*JÁ ARRUMADO*/

    top: 0, 
    zIndex: 15,
    height: 80,
    padding: 25,
    elevation: 0,
    width: '100%',
    marginTop:100,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',  

  },

  searchBar: { /*JÁ ARRUMADO*/

    height: 45,
    width: '100%',  
    borderWidth: 2, 
    paddingLeft: 18,
    borderRadius: 100,
    borderColor: '#14213D', 
    backgroundColor: '#F4F4F4',

  },
  
});
