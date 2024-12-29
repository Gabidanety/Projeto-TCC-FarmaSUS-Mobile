import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; // Pega a localização
import MapStyle from './../../Home/Maps/MapStyle.json';
import { MaterialIcons } from '@expo/vector-icons'; // Importa ícones

// Lista de marcadores
const markers = [
  {
    latitude: -23.5511947,
    longitude: -46.4144475,
  },
];

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
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
};

// Componente principal
export default function App() {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Função para animar o mapa até a localização
  const goToMyLocation = async () => {
    const region = await getMyLocation();
    if (region && mapRef.current) {
      mapRef.current.animateToRegion(region, 4000);
    }
  };

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      customMapStyle={MapStyle}
      showsUserLocation
      onMapReady={() => goToMyLocation()}
      initialRegion={region} // Usando o estado para o valor inicial
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          pinColor="#14213D" // Define a cor do marcador
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
