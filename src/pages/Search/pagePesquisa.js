import React from 'react';
import { View, TextInput, StyleSheet,Text,TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Menu from './../Menu/menu';

export default function Search() {

    const navigation = useNavigation();

  return (
      <View style={styles.container}>

        {/* barra de pesquisa */}
        <View style={styles.searchBarContainer}>
            <TouchableOpacity 
                style={styles.logo} 
                onPress={() => navigation.navigate('Home')} 
            >
                <Image style={styles.img} source={require('./../../../assets/buscasus.png')} />
            </TouchableOpacity>  

            <TextInput
            style={styles.searchBar}
            placeholder="Pesquisar por remédio..."
            placeholderTextColor="#000"  
            autoFocus={true}           
            />
        </View>
        
        {/* conteudo */}
        <View style={styles.conteudo}>
            <View style={styles.vwSubTitle}>
              <Text style={styles.SubTitle}>DISPONÍVEL EM:</Text>
            </View>
            <View style={styles.vwLugares}>
              <Text>Ainda não há medicamentos disponíveis</Text>
            </View>        
          </View>

        {/* menu */}
        <View style={styles.menu}>
            <Menu />
        </View>

      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    
      },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 130, 
    backgroundColor: '#fff', 
    paddingHorizontal: 10,
    // position: 'absolute',
    elevation: 0, 
    zIndex: 10,
    // marginTop:60,
    padding: 20,
  },
  searchBar: {
    height: 90,
    width: '80%',  
    backgroundColor: 'transparent',
    left:25,
    marginTop:35,
  },
  logo:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '32%', 
    marginTop:45,
    left:5,

  },
  img: {
    width: '90%',
    height: '90%',
  },

  menu:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:'9%',
    marginTop: 3,
    marginBottom:5,
  },
  conteudo:{
    alignItems: 'center',
    width: '100%',
    height: '79%',

  },
  vwSubTitle:{
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent', 
    paddingHorizontal: 10,
    // position: 'absolute',
    elevation: 0, 
    zIndex: 10,
    Bottom:'100%',
    padding: 20,
  },
  SubTitle:{
    color: '#1F2B5B',
    fontWeight:'900',
    fontSize:18,
    paddingHorizontal:5
  },
  vwLugares:{
    width: '100%',
    height:200,
    alignItems: 'center',
    paddingHorizontal:10

  }
  
});
