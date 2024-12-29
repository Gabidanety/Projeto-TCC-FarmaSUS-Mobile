import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import Menu from './../Menu/menu';
import { KeyboardAvoidingView } from 'react-native-web';

// Função para calcular a distância usando a fórmula de Haversine
const haversine = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return null; // Verificação para evitar NaN caso algum valor seja nulo ou indefinido
  }
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distância em km
  return distance;
};

export default function MedBusca({ route }) {
  const navigation = useNavigation();
  const [medicamentoDetalhado, setMedicamentoDetalhado] = useState(null);
  const [ubsDisponiveis, setUbsDisponiveis] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null }); // Inicializado como null para melhor verificação

  const nomeMedicamento = route.params?.nomeMedicamento;

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permissão para acessar a localização negada');
          return;
        }

        // Obtém a localização atual
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        console.log(`Localização do usuário: Latitude: ${latitude}, Longitude: ${longitude}`);
        setUserLocation({
          lat: latitude,
          lon: longitude,
        });
      } catch (error) {
        console.error('Erro ao obter a localização:', error);
      }
    };
  
    getLocation();
  }, []);

  async function fetchMedicamento() {
    try {
      if (nomeMedicamento) {
        const responseDetalhado = await fetch(`https://1cf2-2804-7f0-b900-986f-3522-7a-7a17-3c7d.ngrok-free.app/api/medicamentos/nome/${nomeMedicamento}`);
        if (!responseDetalhado.ok) {
          console.error("Erro ao buscar dados detalhados do medicamento:", responseDetalhado.status);
          return;
        }
        const dataDetalhada = await responseDetalhado.json();
        if (dataDetalhada && dataDetalhada.length > 0) {
          setMedicamentoDetalhado(dataDetalhada[0]);
        }

        const responseUbs = await fetch(`https://1cf2-2804-7f0-b900-986f-3522-7a-7a17-3c7d.ngrok-free.app/api/ubs/medicamento/nome/${nomeMedicamento}`);
        if (!responseUbs.ok) {
          console.error("Erro ao buscar UBSs:", responseUbs.status);
          return;
        }
        const dataUbs = await responseUbs.json();
        console.log('Dados das UBSs recebidos:', dataUbs);
        setUbsDisponiveis(dataUbs.ubs);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  useEffect(() => {
    fetchMedicamento();
  }, [nomeMedicamento]); 

  useEffect(() => {
    if (ubsDisponiveis.length > 0 && userLocation.lat !== null && userLocation.lon !== null) {
      // Ordenando as UBSs pela distância
      const ubsComDistancia = ubsDisponiveis.map(ubs => {
        const distance = haversine(userLocation.lat, userLocation.lon, ubs.latitudeUBS, ubs.longitudeUBS);
        return { ...ubs, distance };
      });

      ubsComDistancia.sort((a, b) => (a.distance || 0) - (b.distance || 0)); // Ordena as UBSs pela distância
      setUbsDisponiveis(ubsComDistancia);
    }
  }, [userLocation, ubsDisponiveis]);

  if (userLocation.lat === null || userLocation.lon === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.compositionText}>Carregando...</Text>
      </View>
    );
  }

  return (
   
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
        <Image source={
            medicamentoDetalhado?.fotoMedicamentoOriginal
              ? { uri: medicamentoDetalhado.fotoMedicamentoOriginal }
              : require('../../../assets/imgRemedio.png')
          }
          style={styles.headerImage}
        /> 
        <Text style={styles.title}>{medicamentoDetalhado?.nomeMedicamento || "Nome do Medicamento"}</Text>
          <Text style={styles.genericName}>{medicamentoDetalhado?.nomeGenericoMedicamento || "Nome Genérico"}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.subTitle}>Dosagem:</Text>
          <Text style={styles.compositionText}>{medicamentoDetalhado?.concentracaoMedicamento || "Não disponível"}</Text>

          <Text style={styles.subTitle}>Forma Farmacêutica:</Text>
          <Text style={styles.compositionText}>{medicamentoDetalhado?.formaFarmaceuticaMedicamento || "Não disponível"}</Text>

          <Text style={styles.subTitle}>Composição:</Text>
          <Text style={styles.compositionText}>{medicamentoDetalhado?.composicaoMedicamento || "Composição não disponível"}</Text>
        </View>

        <View style={styles.medicinesContainer}>
          <Text style={styles.sectionTitle}>UBS DISPONÍVEIS: </Text>
          {ubsDisponiveis.map((ubs, index) => {
            const distance = ubs.distance;
            return (
              <TouchableOpacity
                key={index}
                style={styles.medicineButton}
                onPress={() => navigation.navigate('FarmaPosto', { nomeUBS: ubs.nomeUBS })}
              >
                <View style={styles.medicineRow}>
                  <Text style={styles.medicineText}>
                    {ubs.nomeUBS} | {ubs.bairroUBS} - {ubs.cidadeUBS} |  
                     {distance !== null && distance !== undefined ? `${distance.toFixed(2)} km` : 'Distância não disponível'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
    backgroundColor: '#14213D',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#2C3E50',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
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
    elevation: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 5,
  },
  compositionText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
    top:1
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  medicinesContainer: {
    top:20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    paddingVertical: 10,
    // textAlign: 'center',
    paddingHorizontal:30,
  },
  medicineButton: {
    backgroundColor: '#1ABC9C', //#3dbdec
    padding: 10,
    marginBottom: 7,
    borderRadius: 10,
    marginHorizontal: 20,
    top:10,
    justifyContent: 'center',

    height:'22%',
  },
  medicineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medicineText: {
    fontSize: 12,
    color: '#FFF',
    paddingHorizontal:10,
    fontWeight: '500',

  },
  headerImage: {
    width: '80%',  // Tamanho menor para a imagem
    height: 250,  // Menor altura
    borderRadius: 15,
    marginTop: 30,

  },
});
