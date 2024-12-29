import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home');

  // Atualiza o estado da aba ativa quando a tela é focada
  useFocusEffect(
    React.useCallback(() => {
      const currentRoute = navigation.getState().routes[navigation.getState().index].name;
      setActiveTab(currentRoute); // Atualiza o estado com a rota atual
    }, [navigation])
  );

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    navigation.navigate(tabName); // Navega para a tela associada
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.ButtonLeft} onPress={() => handleTabPress('Home')}>
        {activeTab === 'Home' && <View style={styles.activeIndicator} />}
        <Image style={styles.img} source={require('./../../../assets/IconeHome.png')} />
        <Text style={styles.text}> Home </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ButtonLeft} onPress={() => handleTabPress('ProcurarPostos')}>
        {activeTab === 'ProcurarPostos' && <View style={styles.activeIndicator} />}
        <Image style={styles.img} source={require('./../../../assets/IconePesquisa.png')} />
        <Text style={styles.text1}> Buscar </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ButtonPrincipal} onPress={() => handleTabPress('BuscarRemedio')}>
        <Image style={styles.imgLogo} source={require('./../../../assets/iconeLogo.png')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.ButtonRight} onPress={() => handleTabPress('Dignidade')}>
        {activeTab === 'Dignidade' && <View style={styles.activeIndicator} />}
        <Image style={styles.img} source={require('./../../../assets/IconeDignidade.png')} />
        <Text style={styles.text2}> Dignidade Menstrual </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ButtonRight} onPress={() => handleTabPress('Perfil')}>
        {activeTab === 'Perfil' && <View style={styles.activeIndicator} />}
        <Image style={styles.img} source={require('./../../../assets/IconePerfil.png')} />
        <Text style={styles.text}> Perfil </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    shadowRadius: 5,
    width: '100%',
    height: '150%',
    shadowOpacity: 0.2,
    shadowColor: '#000',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    shadowOffset: { width: 0, height: 2 },
  },
  ButtonLeft: {
    flex: 5,
    padding: 1,
    marginRight: 7,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  ButtonRight: {
    flex: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 1,
  },
  ButtonPrincipal: {
    bottom: 28,
    padding: 38,
    width: '7%',
    height: '60%',
    marginLeft: 8,
    borderWidth: 7,
    borderRadius: 100,
    alignItems: 'center',
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    bottom: 0,
    padding: 15,
    marginBottom: 10,
    fontSize: 13,
    width: '100%',
    color: '#14213D',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
  },
  text1: {
    bottom: 13,
    padding: 4,
    marginBottom: 8,
    fontSize: 13,
    width: '100%',
    color: '#14213D',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
  },
  text2: {
    bottom: 0,
    padding: 10,
    top:50,
    fontSize: 10,
    width: '100%',
    color: '#14213D',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
  },
  img: {
    width: 90,
    height: 90,
    marginBottom: 42,
  },
  imgLogo: {
    width: 100,
    height: 150,
  },
  activeIndicator: {
    top: -5,
    width: 40,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    backgroundColor: '#14213D',
  },
});

export default Menu;
