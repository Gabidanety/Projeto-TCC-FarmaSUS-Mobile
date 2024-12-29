import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useHistory} from 'react-router-dom';

export default function SearchScreen() {

    const navigation = useNavigation();

  return (
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Pesquisar por remédio..."
          placeholderTextColor="#000"  
          onFocus={() => navigation.navigate('Search')}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    width: '100%',  
    backgroundColor: 'transparent',  
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 80, 
    position: 'absolute',
    top: 0, 
    elevation: 0, 
    zIndex: 15,
    marginTop:100,
    alignItems: 'center',


  },
  searchBar: {
    height: 45,
    width: '100%',  
    borderColor: '#C3CDF2',  
    borderWidth: 1, 
    paddingLeft: 10,
    borderRadius: 100,
    backgroundColor: '#F4F4F4',
  },
  
});
