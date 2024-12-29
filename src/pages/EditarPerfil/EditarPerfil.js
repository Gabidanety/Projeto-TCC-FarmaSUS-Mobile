import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Importando o ícone

const EditarPerfil = () => {
  const navigation = useNavigation();

  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    nomeCivil: 'Vinicius da Silva Augusto',
    nomeSocial: 'Não informado',
    cpf: '54785499911',
    email: 'vini@gmail.com',
    rg: '555555555',
    endereco: 'R. Mãe D’Agua,3 - JD Aurora, São Paulo, SP - 08032200 - BRASIL',
    telefone: '(11) 949964859',
    cartaoSUS: '700406792263150', // Adicionando campo para o cartão do SUS
  });

  const handleBack = () => {
    navigation.goBack(); // Volta para a página anterior
  };

  const handleEditField = (field) => {
    setEditingField(field === editingField ? null : field); // Alterna o estado de edição
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleBack} style={styles.iconContainer}>
          {/* Substituindo a imagem por um ícone de seta */}
          <MaterialIcons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}> Editar Perfil </Text>
      </View>

      {/* Seção de Dados Pessoais */}
      <View style={styles.vwDados}>
        <Text style={styles.txDados}> DADOS PESSOAIS </Text>
      </View>

      {/* Conteúdo da página */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Seção da imagem e nome */}
        <View style={styles.fotoENome}>
          <View style={styles.foto}>
            <Image
              source={require('./../../../assets/eu.jpg')}
              style={styles.image}
            />
          </View>
          <Text style={styles.userName}> NOME USUÁRIO </Text>
          <View style={styles.vwInfValues}>
            <Text style={styles.txUser}> Vini123 </Text>
            <TouchableOpacity>
              <MaterialIcons name="edit" size={24} color="#14213D" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Campos editáveis com ícones */}
        {renderEditableField("NOME CIVIL", "nomeCivil", formData.nomeCivil, editingField, handleEditField, handleInputChange)}
        {renderEditableField("NOME SOCIAL", "nomeSocial", formData.nomeSocial, editingField, handleEditField, handleInputChange)}
        {renderEditableField("CPF", "cpf", formData.cpf, editingField, handleEditField, handleInputChange)}
        {renderEditableField("EMAIL", "email", formData.email, editingField, handleEditField, handleInputChange)}
        {renderEditableField("RG", "rg", formData.rg, editingField, handleEditField, handleInputChange)}

        {/* Seção para Endereço e Telefone */}
        <View style={styles.vwDados}>
          <Text style={styles.txDados}> DADOS GOV.BR </Text>
        </View>

        {renderEditableField("CARTÃO NACIONAL DO SUS - CNS ", "cartaoSUS", formData.cartaoSUS, editingField, handleEditField, handleInputChange)}
        {renderEditableField("ENDEREÇO", "endereco", formData.endereco, editingField, handleEditField, handleInputChange)}
        {renderEditableField("TELEFONE", "telefone", formData.telefone, editingField, handleEditField, handleInputChange)}


        {/* Botão de Salvar */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}> Salvar </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Função para renderizar campos editáveis
const renderEditableField = (label, fieldKey, value, editingField, handleEditField, handleInputChange) => {
  const isEditing = editingField === fieldKey;

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        {isEditing ? (
          <TextInput
            style={styles.inputField}
            value={value}
            onChangeText={(text) => handleInputChange(fieldKey, text)}
            onBlur={() => handleEditField(fieldKey)} // Sai do modo de edição ao clicar fora
            placeholder={`Digite seu ${label.toLowerCase()}`} // Placeholder para o input
            placeholderTextColor="#aaa" // Cor do placeholder suavizada
          />
        ) : (
          <Text style={styles.txNumero}>{value}</Text>
        )}
        <TouchableOpacity onPress={() => handleEditField(fieldKey)} style={styles.iconButton}>
          <MaterialIcons name="edit" size={24} color="#14213D" />
        </TouchableOpacity>
      </View>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  navbar: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#14213D',
    borderBottomWidth: 3,
    borderBottomColor: '#707070',
    paddingVertical: 19,
    paddingHorizontal: 10,
  },
  iconContainer: {
    width: 70,
    marginTop: 20,
    paddingRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 23,
    marginLeft: 55,
    marginTop: 20,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  vwDados: {
    marginBottom: 1,
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
  content: {
    padding: 2,

  },
  fotoENome: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  foto: {
    width: 100,
    height: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#014063',
    flex: 1,
    letterSpacing: 1,
  },
  vwInfValues: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txNumero: {
    fontSize: 18,
    color: '#546772',
    marginRight: 20,
  },
  txUser: {
    fontSize: 18,
    color: '#546772',
    marginRight: 50,
  },
  label: {
    fontSize: 15,
    marginBottom: 2,
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#014063',
    letterSpacing: 1.5,
  },
  inputContainer: {
    marginBottom: 10, // Espaço entre os campos
  },
  inputWrapper: {
    marginLeft: 20,
    width: '90%',
    height: 45, // Altura aumentada para mais conforto
    flexDirection: 'row',
    alignItems: 'center', // Alinha verticalmente
    justifyContent: 'space-between', // Espaço uniforme entre os elementos
  },
  inputField: {
    flex: 1,
    height: '100%', // Usa a altura total do wrapper
    padding: 10,
    marginRight: 10, // Espaço entre o input e o ícone de edição
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  saveButton: {
    width: '60%',
    backgroundColor: '#14213D',
    paddingVertical: 11,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 2,
    marginLeft: 85,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EditarPerfil;
