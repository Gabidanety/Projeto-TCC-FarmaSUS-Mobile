import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; // Importa ícones
import MapStyle from './MapStyle.json';


// URL da API para buscar as UBS
const apiUrl = 'https://1cf2-2804-7f0-b900-986f-3522-7a-7a17-3c7d.ngrok-free.app/api/selectUbsApi';

// Função para obter a localização
const getMyLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return;

  const { coords } = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = coords;

  // Retorna o objeto 'Region'
  return {
    latitude,
    longitude,
  };
};

// Função para calcular a distância entre dois pontos (em metros) usando a fórmula de Haversine
const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Raio da Terra em quilômetros
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // Retorna a distância em metros
};

export default function App() {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // Função para animar o mapa até a localização do usuário
  const goToMyLocation = async () => {
    const location = await getMyLocation();
    if (location && mapRef.current) {
      setUserLocation(location);
      mapRef.current.animateToRegion(
        {
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  };

  // Função para buscar as UBS próximas
  const fetchUbsData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        const ubs = data.data;
        const markers = ubs.map((ubs) => {
          const distance = haversine(
            userLocation.latitude,
            userLocation.longitude,
            parseFloat(ubs.latitudeUBS),
            parseFloat(ubs.longitudeUBS)
          );
          
          return {
            ...ubs,
            distance, // Adiciona a distância calculada
            coordinate: {
              latitude: parseFloat(ubs.latitudeUBS),
              longitude: parseFloat(ubs.longitudeUBS),
            },
          };
        });

        setMarkers(markers); // Atualiza os marcadores
      }
    } catch (error) {
      console.error('Erro ao buscar UBS:', error);
    }
  };

  // Efeito para buscar os dados assim que a localização do usuário for obtida
  useEffect(() => {
    if (userLocation) {
      fetchUbsData();
    }
  }, [userLocation]);

  // Inicializa a localização do usuário ao carregar a página
  useEffect(() => {
    goToMyLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        customMapStyle={MapStyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.nomeUBS}
            description={`Distância: ${marker.distance.toFixed(2)} metros`}
          />
        ))}
      </MapView>
      <TouchableOpacity style={styles.buttonContainer} onPress={goToMyLocation}>
        <MaterialIcons name="my-location" size={28} color="blue" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1,
  },
});
