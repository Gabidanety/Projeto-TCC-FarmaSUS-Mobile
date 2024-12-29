/*JÁ ESTÁ ARRUMADA*/

import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

const Splash = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;  // Animação de opacidade
  const scaleAnim = useRef(new Animated.Value(1)).current;  // Animação de escala

  useEffect(() => {
    // Sequência de animação
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navegação para Login após 3 segundos
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <Image
          style={styles.img}
          source={require('./../../../assets/Splash-Logo.gif')}
          onError={(error) => Alert.alert('Erro ao carregar a imagem', error.nativeEvent.error)}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14213D',

  },

  img: {

    width: width,   // A largura ocupa 100% da tela
    height: height, // A altura ocupa 100% da tela
    resizeMode: 'cover',  // A imagem preenche a tela mantendo a proporção

  },
  
});

export default Splash;
