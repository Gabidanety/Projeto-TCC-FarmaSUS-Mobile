import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Menu from './../Menu/menu';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Medicamento({ route }) {
  const navigation = useNavigation();
  const [medicamento, setMedicamento] = useState(null);
  const [medicamentoDetalhado, setMedicamentoDetalhado] = useState(null);
  const medicamentoId = route.params?.medicamentoId;

  useEffect(() => {
    console.log("Parametro ID recebido:", medicamentoId);

    async function fetchMedicamento() {
      try {
        if (medicamentoId) {
          const response = await fetch(`https://1cf2-2804-7f0-b900-986f-3522-7a-7a17-3c7d.ngrok-free.app/api/selectMedApi/${medicamentoId}`);

          if (!response.ok) {
            console.error("Erro ao buscar dados:", response.status);
            return;
          }

          const data = await response.json();
          console.log("Dados do medicamento:", data);
          setMedicamento(data);

          // Fetch detalhado com o nome do medicamento
          const nomeMedicamento = data?.nomeMedicamento;
          if (nomeMedicamento) {
            const responseDetalhado = await fetch(`https://1cf2-2804-7f0-b900-986f-3522-7a-7a17-3c7d.ngrok-free.app/api/medicamentos/nome/${nomeMedicamento}`);
            if (responseDetalhado.ok) {
              const dataDetalhada = await responseDetalhado.json();
              setMedicamentoDetalhado(dataDetalhada[0]);
            }
          }
        } else {
          console.error("ID do medicamento não está definido.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do medicamento:", error);
      }
    }

    fetchMedicamento();
  }, [medicamentoId]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          {/* Atualiza a imagem com a foto do medicamento original */}
          {/* <Image style={styles.headerImage} source={{ uri: medicamentoDetalhado?.fotoMedicamentoOriginal || require('./../../../assets/imgRemedio.png') }} /> */}

           <Image source={
            medicamentoDetalhado?.fotoMedicamentoOriginal
              ? { uri: medicamentoDetalhado.fotoMedicamentoOriginal }
              : require('../../../assets/imgRemedio.png')
          }
          style={styles.headerImage}
        /> 
          <Text style={styles.title}>{medicamento?.nomeMedicamento || "Nome do Medicamento"}</Text>
          <Text style={styles.genericName}>{medicamento?.nomeGenericoMedicamento || "Nome Genérico"}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.subTitle}>Dosagem:</Text>
          <Text style={styles.compositionText}>{medicamento?.dosagemMedicamento || "Não disponível"}</Text>

          <Text style={styles.subTitle}>Forma Farmacêutica:</Text>
          <Text style={styles.compositionText}>{medicamento?.formaFarmaceuticaMedicamento || "Não disponível"}</Text>

          <Text style={styles.subTitle}>Composição:</Text>
          <Text style={styles.compositionText}>{medicamento?.composicaoMedicamento || "Composição não disponível"}</Text>
        </View>
      </ScrollView>

      <View style={styles.menu}>
        <Menu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14213D', // Cor de fundo azul escuro
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#2C3E50', // Cor escura para o cabeçalho
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  headerImage: {
    width: '80%',  // Tamanho menor para a imagem
    height: 250,  // Menor altura
    borderRadius: 15,
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  genericName: {
    fontSize: 20,
    fontWeight: '400',
    color: '#BDC3C7',
    marginTop: 5,
  },
  infoContainer: {
    padding: 25,
    backgroundColor: '#ECF0F1',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: -40,
    elevation: 10, // Sombra mais sutil para efeito de flutuação
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 15,
  },
  compositionText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#34495E',
    marginBottom: 20,
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
