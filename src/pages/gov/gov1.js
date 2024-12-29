import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  return (
    // Envolvendo toda a tela com TouchableWithoutFeedback para fechar o teclado ao clicar fora
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* gov.br logo */}
        <Text style={styles.logo}>
          <Text style={styles.govGreen}>g</Text>
          <Text style={styles.govBlue}>o</Text>
          <Text style={styles.govYellow}>v</Text>
          <Text style={styles.govBlack}>.br</Text>
        </Text>

        {/* Container com fundo branco diferenciado */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Número do CPF</Text>
          <Text style={styles.subLabel}>Digite seu CPF para criar ou acessar sua conta gov.br</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            placeholderTextColor="#000"
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>

          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="account-balance" size={24} color="green" style={styles.icon} />
              <Text style={styles.optionText}>Login com seu banco</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="smartphone" size={24} color="blue" style={styles.icon} />
              <Text style={styles.optionText}>Seu aplicativo gov.br</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="cloud" size={24} color="gray" style={styles.icon} />
              <Text style={styles.optionText}>Seu certificado digital em nuvem</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center', // Centraliza o conteúdo na tela
  },
  // Estilos do logo gov.br
  logo: {
    fontSize: 32, // Tamanho maior para parecer mais robusto
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  govGreen: {
    color: '#34A853',
  },
  govBlue: {
    color: '#4285F4',
  },
  govYellow: {
    color: '#FBBC05',
  },
  govBlack: {
    color: '#000000',
  },
  // Form container com fundo branco diferente
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20, // Bordas mais arredondadas para suavizar o layout
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, // Sombra mais intensa
    shadowRadius: 10,
    elevation: 8, // Aumenta a profundidade da sombra
    width: width * 0.9, // Ajusta o tamanho do container para 90% da largura da tela
  },
  label: {
    fontSize: 18, // Tamanho maior para parecer mais importante
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12, // Bordas mais arredondadas
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff9c4', // Fundo amarelo claro
  },
  button: {
    backgroundColor: '#1a73e8',
    paddingVertical: 14, // Botão mais "alto"
    borderRadius: 25, // Bordas bem arredondadas
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, // Texto do botão maior para ficar mais evidente
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default LoginScreen;
