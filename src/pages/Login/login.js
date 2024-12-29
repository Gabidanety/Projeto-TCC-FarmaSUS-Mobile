import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const backgroundImage = require('./../../../assets/bemVindo.png');

const Login = ({ navigation }) => {
  const [cns, setCns] = useState(''); 
  const [senha, setSenha] = useState(''); 

  const handleLogin = () => {
    // Função para verificar se um usuário corresponde ao CNS e senha fornecidos
    const verifyUsuario = (usuarios) => {
      // Verificando se 'usuarios' é um array antes de aplicar o método 'find'
      if (Array.isArray(usuarios)) {
        return usuarios.find(usuario => usuario.cnsUsuario === cns && usuario.senhaUsuario === senha);
      } else {
        console.error('A resposta não é um array válido:', usuarios);
        return null;
      }
    };

    // Requisição para buscar os dados do usuário com base no CNS
    fetch(`https://1cf2-2804-7f0-b900-986f-3522-7a-7a17-3c7d.ngrok-free.app/api/selectUser`)
      .then(response => response.json())
      .then(data => {
        // Agora estamos acessando a chave 'data' para pegar o array de usuários
        const usuarios = data.data; // A chave 'data' contém o array de usuários
        const usuario = verifyUsuario(usuarios);

        if (usuario) {
          // Passando o CNS para a tela Home
          navigation.navigate('Perfil', { cns: cns }); 
        } else {
          alert("Usuário não encontrado ou senha incorreta. Verifique o CNS e a senha.");
        }
      })
      .catch(error => {
        console.error("Erro ao buscar usuário: ", error.message);
        alert("Erro ao buscar usuário.");
      });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.headerContainer}>
            <View style={[styles.header, styles.topRounded]}>
              <Text style={styles.headerText2}>CNS </Text>
              <TextInput
                style={styles.input}
                placeholder="Insira o CNS ou CPF"
                keyboardType="numeric"
                value={cns}
                onChangeText={setCns}
              />
              <Text style={styles.headerText2}> SUA SENHA </Text>
              <TextInput
                style={styles.input}
                placeholder="Insira sua Senha"
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.linkText1}>Esqueceu a senha?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>ENTRAR</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.linkText}>Não tem conta? Cadastre-se!</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Gov')} style={styles.buttonGov}>
                <View style={styles.row}>
                  <Text style={styles.entrar}>Entrar com </Text>
                  <Image 
                    source={require('./../../../assets/gov.br.png')}  
                    style={styles.logo} 
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  header: {
    padding: 40,
    width: '100%',
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  topRounded: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerText2: {
    marginLeft: 25,
    marginBottom: 10,
    color: '#14213D',
    fontWeight: 'bold',
    fontSize: width * 0.04,
    alignSelf: 'flex-start',
  },
  linkText1: {
    marginTop: 1,
    marginBottom: 10,
    color: '#14213D',
    marginLeft: '56%',
    fontWeight: '500',
    alignSelf: 'flex-end',
    fontSize: width * 0.03,
  },
  linkText: {
    marginTop: 18,
    color: '#14213D',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: width * 0.03,
  },
  input: {
    width: '100%',
    height: height * 0.06,
    borderWidth: 2,
    borderColor: '#FEFFFF',
    borderRadius: 20,
    color: '#4D4C4C',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: width * 0.035,
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingLeft: 20,
    marginBottom: 10,
    marginLeft: 15,
    backgroundColor: '#ECECEC',
  },
  button: {
    width: '75%',
    marginTop: 18,
    borderRadius: 40,
    alignItems: 'center',
    height: height * 0.06,
    justifyContent: 'center',
    backgroundColor: '#14213D',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.048,
  },
  buttonGov: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entrar: {
    fontSize: 12,
    color: '#14213D',
    fontWeight: '600',
  },
  logo: {
    width: 40,
    height: 20,
    marginLeft: 1,
  },
});

export default Login;
