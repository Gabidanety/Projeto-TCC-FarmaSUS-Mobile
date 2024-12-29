import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

const Contato = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      {/* Imagem no topo */}
      <Image style={styles.img} source={require('./../../../assets/contato.png')} />
        <Text style={styles.title}>SUPORTE</Text>

      <View style={[styles.header, styles.topRounded]}>
        
        <Text style={styles.label}>NOME</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o seu nome"
        />

        <Text style={styles.label}>E-MAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu E-mail"
          keyboardType="email-address"
        />

        <Text style={styles.label}>MENSSAGEM</Text>
        <TextInput
          style={styles.inputMensagem}
          placeholder="Insira sua mensagem"
          multiline
          maxLength={1000}
        />
        {/* <Text style={styles.charCount}>0/1000</Text> */}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')} >
          <Text style={styles.buttonText}> ENVIAR </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#055988', // Cor do fundo mais clara
  },
  header: {
    flex: 1,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F2F4', 
    padding:'6%',
  },
  topRounded: {
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#014063',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#C1D7E0',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
  },
  inputMensagem: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#C1D7E0',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },
  charCount: {
    alignSelf: 'flex-end',
    color: '#C1D7E0',
    fontSize: 12,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#014063', // Cor do botão
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  img: {
    width: '100%',
    height: '35%',
    // resizeMode: 'contain',
  },
});

export default Contato;