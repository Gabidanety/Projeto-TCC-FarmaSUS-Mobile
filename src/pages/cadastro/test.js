import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Cadastro = ({ navigation }) => {

  const [nome, setNome] = useState("");
  const [user, setUser] = useState("");
  const [cpf, setCpf] = useState("");
  const [cns, setCns] = useState("");
  const [cep, setCep] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleCadastro = () => {
    if (senha !== confirmarSenha) {
      setAlertMessage("As senhas não coincidem. Por favor, verifique.");
      setTimeout(() => {
        setAlertMessage("");
      }, 3000); // Limpa a mensagem após 3 segundos
    } else {
      verificar();
      navigation.navigate('Home')
    }
  };

  const verificar = () => {
    console.log("Dados antes de enviar:");
    console.log("Nome:", nome);
    console.log("UserName:", user);
    console.log("CPF:", cpf);
    console.log("CNS:", cns);
    console.log("CEP:", cep);
    console.log("Senha:", senha);
   
    fetch('http://192.168.15.3:8000/api/cliente', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          nome: nome,
          user: user,
          cpf: cpf,
          cns:cns,
          cep:cep,
          senha: senha,
      })
  })
    .then(response => {
      console.log("Status da resposta:", response.status);
      console.log("Headers da resposta:", response.headers);
      return response.text(); // Use response.text() para obter a resposta como texto
    })
    .then(text => {
      console.log("Resposta em texto:", text); // Adiciona log para a resposta em texto
      if (text) {
        try {
          const data = JSON.parse(text); // Tente analisar a resposta como JSON
          console.log("Resposta da API:", data);
          if (data.success) {
            setAlertMessage("Cadastro bem-sucedido! Redirecionando para o login...");
            setTimeout(() => {
              navigation.navigate('Login', {
                nome,
                user,
                cpf,
                cns,
                cep,
              });
            }, 2000); // Navega para Login após 2 segundos
          } else {
            setAlertMessage("Erro no cadastro. Tente novamente.");
            setTimeout(() => {
              setAlertMessage("");
            }, 3000); // Limpa a mensagem após 3 segundos
          }
        } catch (error) {
          console.error('Erro ao analisar JSON:', error);
          
          setTimeout(() => {
            setAlertMessage("");
          }, 3000); // Limpa a mensagem após 3 segundos
        }
      } else {
       
        
        setTimeout(() => {
          setAlertMessage("");
        }, 3000); // Limpa a mensagem após 3 segundos
      }
    })
    .catch(error => {
      setAlertMessage("Erro no cadastro. Tente novamente.");
      console.error('Erro:', error);
      setTimeout(() => {
        setAlertMessage("");
      }, 3000); // Limpa a mensagem após 3 segundos
    });
  };



  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Cadastro</Text> */}
      <Image style={styles.img} source={require('./../../../assets/cadastro.png')} />

      <View style={[styles.header, styles.topRounded]}>
        <Text style={styles.headerText1}>Nome Completo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o Nome"
          keyboardType="default"
          onChangeText={(text) => setNome(text)}

        />

        <Text style={styles.headerText1}>Nome de Usuário:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o Nome de Usuário"
          keyboardType="default"
          onChangeText={(text) => setUser(text)}


        />

        <Text style={styles.headerText1}>CPF:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o CPF"
          keyboardType="numeric"
          onChangeText={(text) => setCpf(text)}

        />

        <Text style={styles.headerText1}>CNS:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o CNS"
          keyboardType="numeric"
          onChangeText={(text) => setCns(text)}

        />

        <Text style={styles.headerText1}>CEP:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o CEP"
          keyboardType="numeric"
          onChangeText={(text) => setCpf(text)}

        />

        <Text style={styles.headerText1}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira a Senha"
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text)}

        />

        <Text style={styles.headerText1}>Confirmar Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmarSenha(text)}

        />

          {alertMessage ? (
            <Text style={styles.alertMessage}>{alertMessage}</Text>
          ) : null}

        <TouchableOpacity onPress={handleCadastro} style={styles.button} >
          <Text style={styles.buttonText}>CADASTRAR</Text>
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
    backgroundColor: '#A6E4F6',
  },
  header: {
    width: '88%',
    // height:'70%',
    padding: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F2F4',
  },
  topRounded: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  headerText1: {
    color: '#014063',
    fontSize: width * 0.03, // Responsivo
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: height * 0.04, // Responsivo
    borderWidth: 2,
    borderColor: '#FEFFFF',
    borderRadius: 8,
    color: '#939292',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: width * 0.03, // Responsivo
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FEFFFF',
  },
  button: {
    width: '70%',
    height: height * 0.06, // Responsivo
    backgroundColor: '#1F2B5B',
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045, // Responsivo
    fontWeight: 'bold',
  },
  img: { //IMAGEM BUSCA SUS 
    width: '100%',
    height: '36%',
    top:'6%',
  },
});

export default Cadastro;
