import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Ícone da seta

/* Páginas Importadas */
import Menu from './../Menu/menu';

export default function SobreSUS() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* ScrollView para permitir a rolagem da página */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        {/* Seta de Voltar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Imagem Ministério */}
        <View style={styles.imgContainer}>
          <Image style={styles.imagemMinisterio} source={require('./../../../assets/ministério.png')} />
        </View>

        {/* Imagem Sobre */}
        <View style={styles.imgSobre}>
          <Image style={styles.imagemSobre} source={require('./../../../assets/sobre.png')} />
        </View>

        {/* Espaço para texto */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            O Sistema Único de Saúde (SUS) é um sistema de saúde público que garante à população do país, brasileiros ou não, o acesso integral, universal e gratuito aos serviços de saúde. 
            O SUS, além de realizar diagnósticos e tratamento de doenças, também atua de forma multidisciplinar, impactando diretamente na qualidade de vida dos cidadãos.
          </Text>
        </View>

        {/* Espaço para texto */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            A sua rede abrange ações e serviços desde a atenção primária aos serviços de vigilância em saúde.
            Atua de forma multidisciplinar, impactando diretamente na qualidade de vida dos cidadãos. A sua rede abrange ações e serviços desde a atenção primária aos serviços de vigilância em saúde.
          </Text>
        </View>

        {/* Imagem Ouvidoria */}
        <View style={styles.imgOuvidoria}>
          <Image style={styles.imagemOuvidoria} source={require('./../../../assets/ouvidoria.png')} />
        </View>
      </ScrollView>

      {/* Menu */}
      <View style={styles.menu}>
        <Menu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 160,
    backgroundColor: '#1F2B5B',
    marginTop: 0,
  },
  imgOuvidoria: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    width: '90%',
    height: 90,
    marginVertical: 90,
  },
  imagemOuvidoria: {
    marginBottom: '40%',
    width: '90%', 
    height: undefined, 
    aspectRatio: 3, 
    resizeMode: 'contain', 
  },
  imgSobre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  imagemMinisterio: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  imagemSobre: {
    width: '80%',
    height: 100,
    marginTop: 16,
    resizeMode: 'contain',
  },
  textContainer: {
    marginTop: 4,
    padding: 10,
    marginHorizontal: 45, 
    backgroundColor: 'transparent',
    width: '80%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#014063',
    textAlign: 'justify',
    lineHeight: 24, 
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
