import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Cartao = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.text}>Frente do Cartão</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Cartao;
