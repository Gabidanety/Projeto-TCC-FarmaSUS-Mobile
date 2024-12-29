/*PÁGINA ARRUMADA*/

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function header() {

  const navigation = useNavigation();

  return ( 
    <View style={styles.container}>
      <TouchableOpacity style={styles.logo} onPress={() => navigation.navigate('Home')}>
        <Image style={styles.img} source={require('./../../../assets/4.png')} />
      </TouchableOpacity>

      <View style={styles.nome}>
        <Text style={styles.text}> Bem vindo! </Text>
      </View>

      <TouchableOpacity style={styles.notific} onPress={() => navigation.navigate('Notificacao')}>
        <Image style={styles.imgNotificacao} source={require('./../../../assets/IconeNotificacoes.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: { /*JÁ ARRUMADO*/

    top: 0, 
    height: 60, 
    zIndex: 10,
    elevation: 0, 
    marginTop:40,
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: 'transparent', 

  },

  logo:{ /*JÁ ARRUMADO*/

    justifyContent: 'center',
    alignItems: 'center',
    width: 140, 
    
  },

  nome:{ /*JÁ ARRUMADO*/

    justifyContent: 'center',
    alignItems: 'center',
    width: '50%', 
    left: 40,
    right:0,

  },

  text:{ /*JÁ ARRUMADO*/

    fontSize:17,
    width: '100%',
    marginTop:12,
    textAlign: 'center',
    fontWeight:'bold',
    color:'#14213D', 

  },


  notific:{ /*JÁ ARRUMADO*/

    width: '20%', 
    marginLeft: -50,
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',

  },

  img: { /*JÁ ARRUMADO*/

    width: '100%',
    height: '100%',

  },

  imgNotificacao: { /*JÁ ARRUMADO*/

    width: '90%',
    height: '90%',

  },
 
});

