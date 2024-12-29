import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, Dimensions, FlatList, Animated } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Importando o Picker
import { useNavigation } from '@react-navigation/native';
import styles from './Styles/styleCar';

const { width } = Dimensions.get('window');

const Carrossel = () => {
  const [conteudo, setConteudo] = useState([]); // Estado para armazenar os dados do banco
  const [selectedItem, setSelectedItem] = useState(null); // Item selecionado
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = new Animated.Value(0);
  const navigation = useNavigation();

  // Função para buscar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://1cf2-2804-7f0-b900-986f-3522-7a-7a17-3c7d.ngrok-free.app/api/selectUbsApi');
        const data = await response.json();
        setConteudo(data.data); // Ajuste: 'data.data' é a chave correta para acessar os dados
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  // Função para navegar quando o usuário seleciona uma UBS
  const handleSelectChange = (value) => {
    const selected = conteudo.find(item => item.idUBS === value);
    setSelectedItem(selected);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    return (
      // <TouchableOpacity style={styles.container} onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
      <View style={styles.container} > 
        <TouchableOpacity style={styles.img} onPress={() => navigation.navigate('FarmaPosto', { nomeUBS: item.nomeUBS })}>
          {/* Usando a foto da UBS, assumindo que a URL está em 'fotoUBS'  */}
           <Image source={{ uri: item.fotoUBS }} style={styles.image} />
           <Text style={styles.nomeTx}>{item.nomeUBS}</Text>
        {/* <Text style={styles.EndText}>{item.logradouroUBS}, {item.numeroUBS} - {item.bairroUBS}</Text> */}

        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.Carrosselcontainer}>
      <FlatList
        data={conteudo}
        renderItem={renderItem}
        keyExtractor={(item) => item.idUBS.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={20}
      />
      <Pagination data={conteudo} scrollX={scrollX} />

      {/* Componente Picker para selecionar UBS */}
      {/* <RNPickerSelect
        onValueChange={handleSelectChange}
        items={conteudo.map(item => ({
          label: item.nomeUBS, // Agora usamos 'nomeUBS' como label
          value: item.idUBS,  // 'idUBS' como valor
        }))}
      /> */}

      {selectedItem && (
        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          item={selectedItem}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const Pagination = ({ data, scrollX }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotScale = scrollX.interpolate({
          inputRange,
          outputRange: [1.4, 3.0, 1.2],
          extrapolate: 'clamp',
        });

        const dotColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#546772', '#014063', '#546772'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i.toString()}
            style={[styles.dot, { transform: [{ scale: dotScale }], backgroundColor: dotColor }]}
          />
        );
      })}
    </View>
  );
};

const CustomModal = ({ visible, onClose, item, navigation }) => {

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          {/* <Image source={{ uri: item.fotoUBS }} style={styles.modalImage} /> */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>{item.nomeUBS}</Text>
          <Text style={styles.modalAddress}>{item.logradouroUBS}, {item.numeroUBS} - {item.bairroUBS}, {item.estadoUBS} - {item.cepUBS}</Text>
          <Text style={styles.modalSubtitle}>Remédios Disponíveis</Text>
          <View style={styles.medicineList}>
            <Text style={styles.medicineItem}>+ Buscopan </Text>
            <Text style={styles.medicineItem}>+ Dipirona </Text>
            <Text style={styles.medicineItem}>+ Sertralina </Text>
            <Text style={styles.medicineItem}>+ AS </Text>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate('FarmaPosto', { nomeUBS: item.nomeUBS })}>
              <Text style={styles.PlusButtonText}> Ver mais +</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default Carrossel;
