
// export default Perfil;
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

/*Importação de Páginas*/
import Menu from './../Menu/menu';
import Cartao from '../cartaoSUS/cartao';


const Perfil = ({ navigation, route }) => {
  const [cnsStored, setCnsStored] = useState('');
  const [userData, setUserData] = useState({
    nome_usuario: '',
    foto: '',
  });

  useEffect(() => {
    const loadCns = async () => {
      const storedCns = await AsyncStorage.getItem('cns');
      if (storedCns) {
        setCnsStored(storedCns);
      }
    };

    loadCns();
  }, []); // Carrega o CNS armazenado ao iniciar a tela de perfil

  // Função para buscar os dados do usuário com base no CNS
  const fetchUserData = async (cns) => {
    try {
      const response = await fetch(`https://1cf2-2804-7f0-b900-986f-3522-7a-7a17-3c7d.ngrok-free.app/api/usuario/cns/${cns}`);
      const data = await response.json();

      if (data) {
        setUserData({
          nome_usuario: data.nome_usuario,
          foto: data.foto,
        });
        // Armazenando as informações no AsyncStorage
        await AsyncStorage.setItem('nome_usuario', data.nome_usuario);
        await AsyncStorage.setItem('foto', data.foto);
      } else {
        console.log("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  // Atualizando o CNS a partir dos parâmetros passados na navegação
  useEffect(() => {
    if (route.params?.cns) {
      setCnsStored(route.params.cns); // Atualiza o estado se o CNS mudar ao voltar para a tela
    }
  }, [route.params?.cns]);

  const { cns } = route.params || {};  // Acessando o CNS passado como parâmetro
  const displayedCns = cns || cnsStored || 'CNS não informado';

  // Carregar dados do usuário quando o CNS for atualizado
  useEffect(() => {
    if (cns || cnsStored) {
      fetchUserData(cns || cnsStored); // Passa o CNS atualizado para a função fetch
    }
  }, [cns, cnsStored]);

  // Função para carregar os dados armazenados quando a página é recarregada
  useEffect(() => {
    const loadUserData = async () => {
      const nome_usuario = await AsyncStorage.getItem('nome_usuario');
      const foto = await AsyncStorage.getItem('foto');
      
      if (nome_usuario && foto) {
        setUserData({
          nome_usuario: nome_usuario,
          foto: foto,
        });
      }
    };

    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}> Meu Perfil </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.perfil}>
          <View style={styles.vwFoto}>
            <View style={styles.foto}>
             {/* Exibindo a foto do usuário */}
             {userData.foto ? (
                <Image source={{ uri: userData.foto }} style={styles.image} />
              ) : (
                <Image source={require('./../../../assets/eu.jpg')} style={styles.image} />
              )}
            </View>

            {/* Texto: Nome e Informações */}
            <View style={styles.vwTexto}>

              {/* Informações: CPF e CNS */}
              <View style={styles.vwInfUser}>
                <Text style={styles.txNumber}> CNS: </Text>
                 <Text style={styles.txNumber}> Nome de Usuario: </Text>

              </View>

              <View style={styles.vwInfValues}>
                <Text style={styles.txNumero}>{displayedCns}</Text>
                <Text style={styles.txNome}>{userData.nome_usuario || 'Nome não disponível'}</Text>

              </View>
            </View>
          </View>
        </View>

        {/* Botão do Cartão */}
        <View style={styles.vwCartao}>
          <TouchableOpacity style={styles.btCartao} onPress={Cartao}>
            <Image style={styles.iconImage} source={require('./../../../assets/iconeCartaoSus.png')} />
            <Text style={styles.txCartao}> CARTÃO NACIONAL DA SAÚDE </Text>
          </TouchableOpacity>
        </View>

        {/* Conta */}
        {/* <View style={styles.vwConta}>
          <Text style={styles.txConta}> CONTA </Text>
        </View> */}

        {/* Seção Editar Perfil */}
        {/* <View style={styles.vwSecao}>
          <TouchableOpacity style={styles.btSecao} onPress={() => navigation.navigate('EditarPerfil')}>
            <Text style={styles.btText}> EDITAR PERFIL </Text>
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View> */}

        {/* Seção Favoritos */}
        {/* <View style={styles.vwSecao}>
          <TouchableOpacity style={styles.btSecao} onPress={() => navigation.navigate('Favoritos')}>
            <Text style={styles.btText}> FAVORITOS </Text>
            <MaterialIcons name="star" size={24} color="black" />
          </TouchableOpacity>
        </View> */}

        {/* Conta */}
        <View style={styles.vwInformacao}>
          <Text style={styles.txInformacao}> INFORMAÇÕES </Text>
        </View>

        {/* Seção Sobre SUS */}
        <View style={styles.vwSecao}>
          <TouchableOpacity style={styles.btSecao} onPress={() => navigation.navigate('SobreSUS')}>
            <Text style={styles.btText}> SOBRE O SUS </Text>
            <MaterialIcons name="info" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Seção Suporte */}
        <View style={styles.vwSecao}>
          <TouchableOpacity style={styles.btSecao} onPress={() => navigation.navigate('Suporte')}>
            <Text style={styles.btText}> SUPORTE </Text>
            <MaterialIcons name="support" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Seção Sair */}
        <View style={styles.vwSecao}>
          <TouchableOpacity style={styles.btSecao} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btText}> SAIR </Text>
            <MaterialIcons name="exit-to-app" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.menu}><Menu /></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  navbar: {
    height: 110,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#707070',
    backgroundColor: '#14213D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: '900',
    marginTop: 26,
    fontSize: 30,
    letterSpacing: 4,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  perfil: {
    width: '100%',
    padding: '3%',
    backgroundColor: 'transparent',
  },
  vwFoto: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 9,
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 79,
    backgroundColor: '#14213D',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  vwTexto: {
    marginTop: 18,
    marginLeft: 10,
    flex: 1,
  },
  txNome: {
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
    marginRight: 100,
    top:6
  },
  vwInfValues: {
    flexDirection: 'row',
    marginTop: 0,
    marginRight: 1,
    justifyContent: 'space-between',
    marginLeft: 40,

  },
  vwInfUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,

  },
  txNumber: {
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 40,
    marginRight: 30,
    color: '#014063',
  },
  txNumero: {
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
    top:6

  },
  vwCartao: {
    borderTopColor: '#D3D8D1',
    borderTopWidth: 1,
    height: '11%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btCartao: {
    width: '80%',
    height: '60%',
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#14213D',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImage: {
    width: 40,
    height: 40,
    marginLeft: -10,
  },
  txCartao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 4,
  },
  vwConta: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1E1E1',
    paddingVertical: 9,
  },
  txConta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#14213D',
  },
  vwInformacao: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1E1E1',
    paddingVertical: 9,
  },
  txInformacao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#14213D',
  },

  vwSecao: {
    width: '90%',
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 20,
    marginVertical: 1,
    marginTop: 12,
  },
  
  btSecao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  btText: {
    color: '#14213D',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },


});

export default Perfil;
