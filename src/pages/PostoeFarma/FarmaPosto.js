import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import MapStyle from './../Home/Maps/MapStyle.json';

import Menu from './../Menu/menu';

export default function FarmaPosto({ route }) {  
  const navigation = useNavigation();
  const { nomeUBS } = route.params;
  const [ubsData, setUbsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUbsData = async () => {
    try {
      const response = await axios.get(`https://1cf2-2804-7f0-b900-986f-3522-7a-7a17-3c7d.ngrok-free.app/api/medicamentos/ubs/nome/${nomeUBS}`);
      setUbsData(response.data);
    } catch (error) {
      console.error('Erro ao buscar os dados da UBS:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUbsData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!ubsData) {
    return <Text style={styles.errorText}>Erro ao carregar dados da UBS.</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              customMapStyle={MapStyle}
              showsUserLocation
              initialRegion={{
                latitude: parseFloat(ubsData.ubs.latitudeUBS),
                longitude: parseFloat(ubsData.ubs.longitudeUBS),
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(ubsData.ubs.latitudeUBS),
                  longitude: parseFloat(ubsData.ubs.longitudeUBS),
                }}
                title={ubsData.ubs.nomeUBS}
                description={ubsData.ubs.logradouroUBS}
              />
            </MapView>
          </View>

          {/* <TouchableOpacity style={styles.routeButton}>
            <Text style={styles.routeButtonText}>Adicionar Rota</Text>
          </TouchableOpacity> */}

          <View style={styles.infoContainer}>
            <Text style={styles.title}>{nomeUBS}</Text>
            {ubsData.ubs.fotoUBS && (
              <Image
                source={{ uri: ubsData.ubs.fotoUBS }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
            <Text style={styles.address}>
              {ubsData.ubs.logradouroUBS}, {ubsData.ubs.numeroUBS} - {ubsData.ubs.bairroUBS} - {ubsData.ubs.cepUBS}, {ubsData.ubs.estadoUBS}
            </Text>
          </View>

          <View style={styles.medicinesContainer}>
            <Text style={styles.sectionTitle}>MEDICAMENTOS DISPONÍVEIS</Text>
            {ubsData.medicamentos.map((medicamento) => (
              <TouchableOpacity 
                key={medicamento.idMedicamento} 
                style={styles.medicineButton} 
                onPress={() => navigation.navigate('Medicamento', { medicamentoId: medicamento.idMedicamento })}
              >
                <View style={styles.medicineRow}>
                  <MaterialIcons name="add" size={20} color="#fff" />
                  <Text style={styles.medicineText}>
                    {medicamento.nomeMedicamento} | {medicamento.dosagemMedicamento}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
{/* 
          <View style={styles.contactContainer}>
            <Text style={styles.sectionTitle}>CONTATO</Text>
            <Text style={styles.contactText}>Email: {ubsData.ubs.emailUBS}</Text>
          </View> */}
        </View>
      </ScrollView>

      <View style={styles.menu}>
        <Menu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14213D',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorText: {
    color: '#ff4d4d',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  mapContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 50,
  },
  map: {
    width: '100%',
    height: 250,
  },
  routeButton: {
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4A90E2',
    borderRadius: 20,
  },
  routeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  address: {
    color: '#B0B0B0',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 8,
  },
  medicinesContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 10,
  },
  medicineButton: {
    backgroundColor: '#2D2D2D',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 5,
  },
  medicineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicineText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  contactContainer: {
    marginTop: 20,
  },
  contactText: {
    color: '#B0B0B0',
    fontSize: 16,
    textAlign: 'center',
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: '92%',
    height: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
