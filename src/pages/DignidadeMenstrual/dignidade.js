import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import Menu from './../Menu/menu';

export default function Dignidade() {
  const navigation = useNavigation();

  // Funções para abrir os links do youtube e PDF
  const openLink1 = () => {
    Linking.openURL('https://youtu.be/YwdVlXr-8T0');
  };

  const openLink2 = () => {
    Linking.openURL('https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/cartilhas/2024/dignidademenstrual');
  };

  return (
    <View style={styles.container}>
      {/* ScrollView para permitir a rolagem da página */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        {/* Imagem Dignidade */}
        <View style={styles.imgContainer}>
          <Image style={styles.imagemDignidade} source={require('./../../../assets/o.png')} />
        </View>

        {/* Imagem Programa */}
        <View style={styles.imgPrograma}>
          <Image style={styles.imagemPrograma} source={require('./../../../assets/ConheçaPrograma.png')} />
        </View>

        {/* Espaço para texto */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Para promover a saúde das pessoas, o Governo Federal criou o Programa Dignidade Menstrual, uma iniciativa para promover a conscientização sobre a naturalidade do ciclo menstrual e a oferta gratuita de absorventes higiênicos.
          </Text>
        </View>

        {/* Espaço para texto */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            O programa garante a distribuição gratuita e continuada de absorventes higiênicos para cerca de 24 milhões de pessoas beneficiadas, que estão entre 10 e 49 anos, e que não têm acesso a esse item fundamental durante o ciclo menstrual.
          </Text>
        </View>

        {/* Botões lado a lado */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={openLink1}>
            <Text style={styles.buttonText}>Passo a passo - Como ter acesso a absorventes gratuitos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={openLink2}>
            <Text style={styles.buttonText}>Acesse a Cartilha do Dignidade Menstrual</Text>
          </TouchableOpacity>
        </View>

        
        {/* Imagem Programa */}
        <View style={styles.imgAgora}>
          <Image style={styles.imagemAgora} source={require('./../../../assets/AgoraTem.png')} />
        </View>

        {/* Cards com informações */}
        <View style={styles.cardContainer}>
          {/* Card 1: Quem tem acesso ao benefício */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}> Quem tem  {'\n'} acesso ao benefício ? </Text>
            </View>
            <Text style={styles.cardText}>
              - Pessoa com idade entre 10 e 49 anos{'\n'}
              - Inscrita no CadÚnico que:{'\n'}
              • Tenha renda mensal até R$ 218; ou{'\n'}
              • Seja estudante de baixa renda da rede pública; ou{'\n'}
              • Esteja em situação de rua.
            </Text>
          </TouchableOpacity>

          {/* Card 2: Como retirar os absorventes gratuitos */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}> Como retirar  {'\n'} os absorventes gratuitos </Text>
            </View>
            <Text style={styles.cardText}>
              - Basta procurar uma farmácia credenciada e apresentar:{'\n'}
              • CPF{'\n'}
              • Documento de identidade com foto{'\n'}
              • Autorização emitida no Meu SUS Digital
            </Text>
          </TouchableOpacity>
        </View>
        {/* Imagem Programa */}
        <View style={styles.imgConfira}>
          <Image style={styles.imagemConfira} source={require('./../../../assets/Confira.png')} />
        </View>
      </ScrollView>
      <View style={styles.menu}><Menu /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: 'white',

  },

  // Estilo do conteúdo dentro do ScrollView
  scrollViewContent: {

    paddingBottom: 100, // Adiciona espaçamento para evitar que o conteúdo fique coberto pelo menu

  },

  imgContainer: {

    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 160,
    backgroundColor: '#1F2B5B',
    marginTop: 0,

  },

  imgConfira: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 20,
    backgroundColor: '#1F2B5B',
    marginVertical: 60, // Espaço superior e inferior para não encostar em outros componentes

  },

  imagemConfira: {

    
    width: '100%', // Reduz a largura da imagem para 80% da tela
    height: undefined, // Mantém a proporção da altura automaticamente
    aspectRatio: 3, // Define a proporção largura/altura
    resizeMode: 'contain', // Contém a imagem sem cortar ou distorcer

  },

  imgPrograma: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',

  },

  imagemDignidade: {

    width: '100%',
    height: 200,
    resizeMode: 'contain',

  },

  imgAgora: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 1, // Espaço superior e inferior para não encostar em outros componentes

  },

  imagemAgora: {

    width: '100%', // Reduz a largura da imagem para 80% da tela
    height: undefined, // Mantém a proporção da altura automaticamente
    aspectRatio: 3, // Define a proporção largura/altura
    resizeMode: 'contain', // Contém a imagem sem cortar ou distorcer

  },

  imagemPrograma: {

    width: '100%',
    height: 100,
    marginTop: 16,
    resizeMode: 'contain',

  },

  textContainer: {

    padding: 10,
    marginHorizontal: 45, // Adiciona mais espaçamento nas laterais para afastar o texto das bordas
    backgroundColor: '#fff',
    width: '80%',
    justifyContent: 'center', // Centraliza o texto verticalmente

  },

  text: {

    fontSize: 13, // Ajuste o tamanho da fonte conforme necessário
    fontWeight: '500',
    color: '#014063',
    textAlign: 'justify', // Justifica o texto para alinhar nas duas extremidades
    lineHeight: 24, // Ajusta a altura da linha para melhor legibilidade

  },

  buttonRow: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,

  },

  button: {

    backgroundColor: '#1F2B5B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: '45%', // Ajusta a largura dos botões para ficarem lado a lado

  },

  buttonText: {

    color: 'white',
    fontSize: 10.5,
    fontWeight: 'bold',
    textAlign: 'center',

  },

  cardContainer: {

    flexDirection: 'row', // Coloca os cards lado a lado
    justifyContent: 'space-between', // Espaçamento entre os cards
    paddingHorizontal: 2, // Espaço nas laterais
    marginTop: 1, // Espaçamento superior

  },

  card: {
    
    flex: 2, // Os cards ocupam o mesmo espaço
    backgroundColor: '#1F2B5B',
    padding: 10,
    marginHorizontal: 10, // Espaçamento entre os cards
    borderRadius: 20, // Bordas arredondadas para o card
    borderWidth: 1, // Define a borda do card
    borderColor: '#000', // Cor da borda
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Offset da sombra
    shadowOpacity: 0.5, // Opacidade da sombra
    shadowRadius: 3, // Raio da sombra
    elevation: 3, // Sombra no Android

  },

  // Estilo para o contêiner de título com borda
  cardTitleContainer: {

    marginBottom: 10, // Espaçamento entre o título e o texto
    paddingBottom: 5, // Espaço interno do título

  },

  cardTitle: {

    fontSize: 12,
    padding: 5,
    fontWeight: 'bold',
    color: '#fff',
    width:'100%',
    height: 40,
    borderRadius: 15,
    textAlign: 'center',
    backgroundColor: '#4390CC',
    borderWidth: 3, // Adiciona a borda na parte inferior do título
    borderColor: '#14213D', // Cor da borda do título

  },

  cardText: {

    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'justify',
    lineHeight: 23, // Para espaçamento entre as linhas do texto

  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
