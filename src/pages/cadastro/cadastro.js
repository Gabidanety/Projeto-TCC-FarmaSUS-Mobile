import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Cadastro = () => {
  const navigation = useNavigation();
  
  const [user, setUser] = useState("");
  const [cns, setCNS] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [situacao, setSituacao] = useState("0");

  // Validações em tempo real
  const [isUserValid, setIsUserValid] = useState(false);
  const [isCnsValid, setIsCnsValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const currentDate = new Date();
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = currentDate.toLocaleDateString('pt-BR', options).replace(/\//g, '-');

  const verificar = async () => {
    fetch('https://1cf2-2804-7f0-b900-986f-3522-7a-7a17-3c7d.ngrok-free.app/api/UsuarioInserirAPP', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: user,
        foto: imageUrl,
        cns: cns,
        situacao: situacao,
        senha: senha,
        dataCadastro: formattedDate,
      })
    })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro na resposta da API: ${errorText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Sucesso:', data);
      // Navega para a tela de Perfil passando cns e imageUrl
      navigation.navigate('Login', { cns: cns, imageUrl: imageUrl });
    })
    .catch((error) => {
      console.error('Erro:', error.message);
    });
  };
  
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissões para acessar a galeria de fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImageUrl(result.assets[0].uri);
      console.log("URL da imagem selecionada:", result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImageUri(null);
    setImageUrl("");
  };

  // Funções de validação em tempo real
  const validateUser = (text) => {
    setUser(text);
    setIsUserValid(text.length > 0); // Verifica se o nome foi preenchido
  };

  const validateCns = (text) => {
    setCNS(text);
    setIsCnsValid(text.length === 15); // Verifica se o CNS tem 15 dígitos
  };

  const validatePassword = (text) => {
    setSenha(text);
    setIsPasswordMatch(text === confirma); // Verifica se as senhas coincidem
  };

  const validateConfirmPassword = (text) => {
    setConfirma(text);
    setIsPasswordMatch(text === senha); // Verifica se as senhas coincidem
  };

  return (
    <ImageBackground source={require('./../../../assets/FacaCadastro.png')} style={styles.background}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {imageUri ? (
                <>
                  <Image source={{ uri: imageUri }} style={styles.image} />
                  <TouchableOpacity onPress={removeImage} style={styles.closeButton}>
                    <Ionicons name="close" size={20} color="white" />
                  </TouchableOpacity>
                </>
              ) : (
                <Ionicons name="camera" size={40} color="#14213D" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText1}> POR FAVOR SEU NOME DE USUÁRIO</Text>
            <TextInput
              style={[styles.input, isUserValid ? styles.validInput : styles.invalidInput]}
              onChangeText={validateUser}
              placeholder="Insira seu nome de usuário"
              value={user}
            />

            <Text style={styles.headerText1}> POR FAVOR SEU CNS </Text>
            <TextInput
              style={[styles.input, isCnsValid ? styles.validInput : styles.invalidInput]}
              onChangeText={validateCns}
              placeholder="Insira o CNS"
              keyboardType="numeric"
              value={cns}
            />
           
            <Text style={styles.headerText1}> CRIE UMA SENHA </Text>
            <TextInput
              style={[styles.input, isPasswordMatch ? styles.validInput : styles.invalidInput]}
              placeholder="Insira a Senha"
              onChangeText={validatePassword}
              secureTextEntry
              value={senha}
            />
            <Text style={styles.headerText1}> REPITA A SENHA </Text>
            <TextInput
              style={[styles.input, isPasswordMatch ? styles.validInput : styles.invalidInput]}
              placeholder="Confirmar Senha"
              onChangeText={validateConfirmPassword}
              secureTextEntry
              value={confirma}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={verificar} disabled={!isUserValid || !isCnsValid || !isPasswordMatch}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: '29%',
  },
  imagePicker: {
    width: 110,
    height: 110,
    borderWidth: 6,
    borderRadius: 70,
    alignItems: 'center',
    borderColor: '#14213D',
    justifyContent: 'center',
    backgroundColor: '#A0ACC6',
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B1B7D4',
    borderRadius: 20,
  },
  header: {
    marginTop: '30%',
  },
  headerText1: {
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 60,
    marginBottom: 5,
    letterSpacing: 2,
    marginTop: 5,
    color: '#333',
  },
  input: {
    width: '80%',
    height: height * 0.06,
    borderRadius: 20,
    color: '#4D4C4C',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: width * 0.035,
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingLeft: 20,
    marginBottom: 10,
    marginLeft: 40,
    backgroundColor: '#EBEBEB',
  },
  validInput: {
    borderColor: 'green',
    borderWidth: 2,
  },
  invalidInput: {
    borderColor: 'red',
    borderWidth: 2,
  },
  button: {
    width: '75%',
    marginTop: 18,
    marginLeft: 50,
    marginBottom: 10,
    backgroundColor: '#14213D',
    borderRadius: 23,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Cadastro;
