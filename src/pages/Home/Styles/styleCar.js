import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

    container: { /*JÁ ARRUMADO*/

      flex: 30,
      width: 200,
      height: 170,
      padding: 10,
      marginTop: 0,
      marginLeft: 20,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#14213D',
      
    },
    nomeTx:{

      top: 7,
      fontSize:19,
      width: '100%',
      height: '70%',
      color: 'white',
      fontWeight: 'bold',
      paddingHorizontal: 10,

    },
    EndText: { /*JÁ ARRUMADO*/

      top: 4,
      fontSize: 11,
      width: '100%',
      height: '40%',
      color: 'white',
      fontWeight: 'bold',
      paddingHorizontal: 5,

    },
    img: { /*JÁ ARRUMADO*/

      top: 12,
      width: 150,
      height: 85,
      borderWidth: 2,
      borderRadius: 20,
      position: 'absolute',
      borderColor: '#1F2B5B',
      backgroundColor: 'black',
      bottom:10,

    },

    image: { /*JÁ ARRUMADO*/

      width: '100%',
      height: '100%',
      borderRadius: 20,

    },

    Text: { /*JÁ ARRUMADO*/

      top: 80,
      fontSize: 18,
      width: '100%',
      height: '35%',
      color: 'white',
      fontWeight: 'bold',
      paddingHorizontal: 5,

    },

    Button: { /*JÁ ARRUMADO*/

      top: 25,
      left: 40,
      width: '23%',
      height: '23%',
      borderRadius: 100,
      backgroundColor: '#14213D',

    },

    TextPlus: {

      width: 40,
      fontSize: 30,
      paddingHorizontal: 8,
      color: 'white',
      fontWeight: '800',
      bottom: 2,

    },

    Carrosselcontainer: {
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 45,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
      opacity: 0.8,
    },
    dot: {
      height: 3,
      width: 4,
      borderRadius: 5,
      marginHorizontal: 8,
    },
  
    //COMEÇA O ESTILO DO MODAL

     modalContainer: { /*JÁ ARRUMADO*/

      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo escuro semi-transparente

    },

    modalView: { /*JÁ ARRUMADO*/

      padding: 20,
      width: '90%',
      height: '70%',
      marginTop:'105%',
      borderRadius: 20,
      backgroundColor: '#14213D',

    },

    modalImage: { /*JÁ ARRUMADO*/

      height: 170,
      width: '100%',
      borderWidth: 3,
      borderRadius: 10,
      borderColor: '#1F2B5B',

    },

    modalTitle: { /*JÁ ARRUMADO*/

      fontSize:28,
      color: '#fff',
      fontWeight: 'bold',
      marginVertical: 25,
      textAlign: 'center',

    },

    modalAddress: {

      top: 0,
      fontSize: 15,
      color: '#fff',

    },

    modalStatus: {

      top: 6,
      fontSize: 20,
      color: 'lightgreen',
      marginVertical: 10,
      paddingHorizontal: 100,

    },

    modalSubtitle: { /*JÁ ARRUMADO*/

      fontSize: 20,
      marginTop: 13,
      color: '#fff',
      fontWeight: 'bold',
 
    },

    medicineList: { /*MEIO PRONTO*/

      marginVertical: 10,
      width: '100%',

    },

    medicineItem: { /*JÁ ARRUMADO\MEIO*/

      fontSize: 16,
      color: '#fff',
      marginVertical: 2,
      textAlign: 'left',
      fontWeight: 'bold',

    },

    buttons:{ /*NÃO SEI O QUE É AINDA*/

      width:'100%',
      alignItems:'center',
      justifyContent: 'center',

    },

    closeButton:{ /*JÁ ARRUMADO*/

      padding:5,
      height: 50,
      width: '100%',
      marginTop: 20,
      borderRadius: 6,
      marginLeft:'0%',
      alignItems:'flex-end',
      // position:'absolute',
      // justifyContent:'center',
      backgroundColor: '#055988',

    },

    plusButton: { /*JÁ ARRUMADO*/

      height: 50,
      padding: 10,
      marginTop: 18,
      width: '100%',
      borderRadius: 10,
      alignItems:'center',
      justifyContent:'center',
    
    },

    closeButtonText: { /*JÁ ARRUMADO*/

      fontSize: 32,
      color: '#fff',
      fontWeight: 'bold',
      paddingRight:15,

    },

    PlusButtonText:{ /*JÁ ARRUMADO*/

      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
    
    },
    
  });
  

export default styles;
