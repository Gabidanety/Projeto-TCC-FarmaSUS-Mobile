import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Ícones para FAQ e seta de voltar
import { useNavigation } from '@react-navigation/native'; // Para navegação

const Suporte = () => {
  const navigation = useNavigation(); // Ganhar acesso à navegação

  // Estados para controlar a visibilidade das respostas do FAQ
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const [isExpanded3, setIsExpanded3] = useState(false);

  // Função para abrir o aplicativo de email
  const enviarEmail = () => {
    const email = 'glow.etec@gmail.com';
    const subject = 'Ajuda com o aplicativo';
    const body = 'Olá, preciso de ajuda com...';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url)
      .catch(() => {
        alert('Não foi possível abrir o aplicativo de email');
      });
  };

  return (
    <View style={styles.container}>
      {/* Seta de voltar e título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>SUPORTE</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Imagem Ouvidoria */}
        <View style={styles.imgOuvidoria}>
          <Image style={styles.imagemOuvidoria} source={require('./../../../assets/suporte.png')} />
        </View>
        {/* Seção de contato */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTATO</Text>
          <Text style={styles.text}>Se você precisa de ajuda, entre em contato conosco:</Text>
          <Text style={styles.email}>glow.etec@gmail.com</Text>
          <TouchableOpacity style={styles.emailButton} onPress={enviarEmail}>
            <Text style={styles.emailButtonText}>Enviar Email</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Perguntas Frequentes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perguntas Frequentes (FAQ)</Text>

          {/* Pergunta 1 */}
          <View style={styles.faqItem}>
            <TouchableOpacity style={styles.faqHeader} onPress={() => setIsExpanded1(!isExpanded1)}>
              <Text style={styles.faqQuestion}>Como posso recuperar minha senha?</Text>
              <MaterialIcons name={isExpanded1 ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#14213D" />
            </TouchableOpacity>
            {isExpanded1 && (
              <Text style={styles.faqAnswer}>
                Para recuperar sua senha, vá até a tela de login e clique em "Esqueci minha senha". Um email será enviado para o endereço cadastrado com as instruções.
              </Text>
            )}
          </View>

          {/* Pergunta 2 */}
          <View style={styles.faqItem}>
            <TouchableOpacity style={styles.faqHeader} onPress={() => setIsExpanded2(!isExpanded2)}>
              <Text style={styles.faqQuestion}>Como atualizar meus dados pessoais?</Text>
              <MaterialIcons name={isExpanded2 ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#14213D" />
            </TouchableOpacity>
            {isExpanded2 && (
              <Text style={styles.faqAnswer}>
                Vá até o menu "Editar Perfil" para atualizar seu nome, endereço, telefone, e outros dados pessoais.
              </Text>
            )}
          </View>

          {/* Pergunta 3 */}
          <View style={styles.faqItem}>
            <TouchableOpacity style={styles.faqHeader} onPress={() => setIsExpanded3(!isExpanded3)}>
              <Text style={styles.faqQuestion}>O que fazer se encontrar um erro no app?</Text>
              <MaterialIcons name={isExpanded3 ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#14213D" />
            </TouchableOpacity>
            {isExpanded3 && (
              <Text style={styles.faqAnswer}>
                Se você encontrar um erro, envie um email para suporte@app.com descrevendo o problema. Vamos trabalhar para resolvê-lo o mais rápido possível.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14213D',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    paddingLeft: 90,
    fontSize: 29,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 4,
  },
  imgOuvidoria: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: '100%',
    height: 40,
    marginTop: '40%',
    marginVertical: 10,
  },
  imagemOuvidoria: {
    marginBottom: '40%',
    width: '90%', 
    height: undefined, 
    aspectRatio: 3, 
    resizeMode: 'contain', 
  },
  content: {
    paddingBottom: 20,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#14213D',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#014063',
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#546772',
    marginBottom: 10,
  },
  email: {
    fontSize: 14,
    color: '#014063',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emailButton: {
    backgroundColor: '#14213D',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  emailButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  faqItem: {
    marginBottom: 15,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E1E1E1',
    padding: 10,
    borderRadius: 8,
  },
  faqQuestion: {
    fontSize: 16,
    color: '#014063',
    fontWeight: 'bold',
  },
  faqAnswer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4D4C4C',
    marginTop: 5,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
});

export default Suporte;
