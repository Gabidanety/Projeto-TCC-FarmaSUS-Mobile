import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, Text, Modal, Dimensions, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Menu from '../Menu/menu';

const { width } = Dimensions.get('window');

// Função para buscar dados da API
const fetchDataFromAPI = async () => {
  try {
    const response = await fetch('https://1cf2-2804-7f0-b900-986f-3522-7a-7a17-3c7d.ngrok-free.app/api/selectUbsApi');
    const data = await response.json();
    return data.data;  // Certifique-se de que está retornando o campo "data" correto
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return [];  // Retorna um array vazio em caso de erro
  }
};

export default function BuscarRemedio() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [dados, setDados] = useState([]);
  const [busca, setBusca] = useState('');
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const obterDados = async () => {
      const dadosRecebidos = await fetchDataFromAPI();
      console.log(dadosRecebidos); // Verifique a estrutura dos dados
      setDados(dadosRecebidos);
      setDadosFiltrados(dadosRecebidos);
    };
    obterDados();
  }, []);

  // Função para filtrar os dados com base no texto da busca
  const filtrarDados = (texto) => {
    setBusca(texto);
    if (texto === '') {
      setDadosFiltrados(dados);
    } else {
      const filtrados = dados.filter(item =>
        item.nomeUBS.toLowerCase().includes(texto.toLowerCase()) ||
        item.logradouroUBS.toLowerCase().includes(texto.toLowerCase())
      );
      setDadosFiltrados(filtrados);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Barra de pesquisa */}
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          style={styles.logo}
          onPress={() => navigation.navigate('Home')}
        >
          <Image style={styles.img} source={require('./../../../assets/2.png')} />
        </TouchableOpacity>

        <TextInput
          style={styles.searchBar}
          placeholder={`Pesquisar por Posto...`}
          placeholderTextColor="#888"
          value={busca}
          onChangeText={filtrarDados}
        />
      </View>

      {/* Conteúdo */}
      <View style={styles.conteudo}>
        {dadosFiltrados.length > 0 ? (
          <FlatList
            data={dadosFiltrados}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FarmaPosto', { nomeUBS: item.nomeUBS })}
              >
                {/* Aqui substituímos a imagem fixa pelo link da imagem do JSON */}
                <Image source={{ uri: item.fotoUBS }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.postoNome}>{item.nomeUBS}</Text>
                  <Text> {item.logradouroUBS}, {item.numeroUBS}</Text>
                </View>
              </TouchableOpacity>
            )}
            numColumns={1} // Alterado para 1 coluna para exibir os cards em uma única coluna
          />
        ) : (
          <Text style={styles.loadingText}>Nenhum Remédio encontrado.</Text>
        )}
      </View>

      {/* Menu - Ocultar quando o teclado está visível */}
      {!isKeyboardVisible && (
        <View style={styles.menu}>
          <Menu />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E9F2F4',
  },

  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: 130,
    backgroundColor: '#14213D',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  searchBar: {
    height: 48,
    width: '66%',
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    paddingHorizontal: 16,
    marginTop: 40,
    marginLeft: 16,
  },

  logo: {
    justifyContent: 'center',
    marginTop: 40,
  },

  img: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  
  conteudo: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 18,
    top:15,
  },

  card: {
    backgroundColor: '#FEFEFF',
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1, // Adiciona a largura da borda
    borderColor: '#D3D8D1', // Define a cor da borda
  },

  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 2, // Adiciona a largura da borda
    borderColor: '#14213D', // Define a cor da borda
  },

  cardContent: {
    justifyContent: 'center',
  },

  postoNome: {
    fontSize: 18,
    color: '#14213D',
    fontWeight: 'bold',
  },

  subtitle: {
    top:15,
    fontSize: 18,
    color: '#14213D',
    fontWeight: 'bold',
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
