import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const gov = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Identifique-se no gov.br com:</Text>
      
      <Text style={styles.label}>Número do CPF</Text>
      <Text style={styles.subLabel}>Digite seu CPF para criar ou acessar sua conta gov.br</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite seu CPF"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="account-balance" size={24} color="green" />
          <Text style={styles.optionText}>Login com seu banco</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="smartphone" size={24} color="blue" />
          <Text style={styles.optionText}>Seu aplicativo gov.br</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="cloud" size={24} color="gray" />
          <Text style={styles.optionText}>Seu certificado digital em nuvem</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a73e8',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#1a73e8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginTop: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default gov;
