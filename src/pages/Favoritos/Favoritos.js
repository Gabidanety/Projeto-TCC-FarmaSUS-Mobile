import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Favoritos = () => {
  const navigation = useNavigation();

  const [favoritosUBS, setFavoritosUBS] = useState([
    { id: '1', nome: 'UBS Vila Mariana', endereco: 'Av. Lins de Vasconcelos, 123', cidade: 'São Paulo' },
    { id: '2', nome: 'UBS Pinheiros', endereco: 'Rua dos Pinheiros, 456', cidade: 'São Paulo' },
  ]);

  const [favoritosFarmacias, setFavoritosFarmacias] = useState([
    { id: '1', nome: 'Farmácia São João', endereco: 'Av. Brasil, 1000', cidade: 'São Paulo' },
  ]);

  const [favoritosMedicamentos, setFavoritosMedicamentos] = useState([
    { id: '1', nome: 'Dipirona Monoidratada', dosagem: '500mg', descricao: 'Analgésico e antipirético' },
  ]);

  const removerFavorito = (id, tipo) => {
    if (tipo === 'UBS') {
      setFavoritosUBS(favoritosUBS.filter(item => item.id !== id));
    } else if (tipo === 'Farmácia') {
      setFavoritosFarmacias(favoritosFarmacias.filter(item => item.id !== id));
    } else {
      setFavoritosMedicamentos(favoritosMedicamentos.filter(item => item.id !== id));
    }
  };

  const renderFavorito = ({ item, tipo }) => {
    // Define a imagem de acordo com o tipo
    let imageSource;
    if (tipo === 'UBS') {
      imageSource = require('./../../../assets/ubs.png');
    } else if (tipo === 'Farmácia') {
      imageSource = require('./../../../assets/farmaPop.jpg'); // Substitua pelo caminho da imagem da farmácia
    } else if (tipo === 'Medicamento') {
      imageSource = require('./../../../assets/remedio.png'); // Substitua pelo caminho da imagem do medicamento
    }

    return (
      <View style={styles.itemContainer}>
        <Image source={imageSource} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemNome}>{item.nome}</Text>
          {tipo === 'Medicamento' ? (
            <>
              <Text style={styles.itemDosagem}>{item.dosagem}</Text>
              <Text style={styles.itemDescricao}>{item.descricao}</Text>
            </>
          ) : (
            <>
              <Text style={styles.itemEndereco}>{item.endereco}</Text>
              <Text style={styles.itemCidade}>{item.cidade}</Text>
            </>
          )}
        </View>
        <TouchableOpacity onPress={() => removerFavorito(item.id, tipo)} style={styles.iconButton}>
          <MaterialIcons name="delete" size={24} color="#E63946" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> FAVORITOS </Text>
      </View>

       <View style={styles.vwDados}>
        <Text style={styles.txDados}> UNIDADES BÁSICAS DE SAÚDE (UBS) </Text>
      </View> 

      {favoritosUBS.length > 0 ? (
        <FlatList
          data={favoritosUBS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderFavorito({ item, tipo: 'UBS' })}
          style={styles.flatList}
        />
      ) : (
        <Text style={styles.emptyMessage}>Nenhuma UBS adicionada aos favoritos.</Text>
      )}

      <View style={styles.vwDados}>
        <Text style={styles.txDados}> FARMÁCIAS </Text>
      </View> 

      {favoritosFarmacias.length > 0 ? (
        <FlatList
          data={favoritosFarmacias}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderFavorito({ item, tipo: 'Farmácia' })}
          style={styles.flatList}
        />
      ) : (
        <Text style={styles.emptyMessage}>Nenhuma farmácia adicionada aos favoritos.</Text>
      )}

      <View style={styles.vwDados}>
        <Text style={styles.txDados}> MEDICAMENTOS </Text>
      </View> 

      {favoritosMedicamentos.length > 0 ? (
        <FlatList
          data={favoritosMedicamentos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderFavorito({ item, tipo: 'Medicamento' })}
          style={styles.flatList}
        />
      ) : (
        <Text style={styles.emptyMessage}>Nenhum medicamento adicionado aos favoritos.</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#14213D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#707070',
  },

  backButton: {
    padding: 11,
    marginLeft: 4,
    marginTop: 30,
  },

  headerTitle: {

    marginLeft: '15%',
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
    textAlign: 'center',
  }, 
  itemContainer: {
    margin: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 23,
    borderRadius: 17,
    marginBottom: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: {
    width: 70,
    height: 70,
    marginRight: 15,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2B5B',
  },
  itemEndereco: {
    fontSize: 15,
    color: '#546772',
    marginTop: 5,
  },
  itemCidade: {
    fontSize: 15,
    color: '#546772',
  },
  itemDosagem: {
    fontSize: 15,
    color: '#546772',
    marginTop: 5,
  },
  itemDescricao: {
    fontSize: 15,
    color: '#546772',
  },
  iconButton: {
    padding: 5,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    marginTop: 20,
  },
  vwDados: {
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1E1E1',
    paddingVertical: 9,
  },
  txDados: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#14213D',
  },

});

export default Favoritos;