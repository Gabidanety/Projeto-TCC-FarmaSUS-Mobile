import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#14213D',
  },

  conteudo: {
    width: '100%',
    flex: 1,
    padding: '4%',
    backgroundColor: '#14213D',
  },

  // Estilo do mapa
  map: {
    left: 50,
    backgroundColor: 'white',
    width: '80%',
    height: '32%', 
    marginTop: '8%',
    borderWidth: 7,
    borderColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    padding: '4%',
  },

  // Link para rota
  link: {
    width: '100%',
    height: '3%',
    marginTop: '4%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  txLink: {
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
  },

  // View do título e barra de pesquisa
  vwtitle: {
    width: '100%',
    marginTop: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 26,
    letterSpacing: 1,
    fontWeight: '600',
    color: 'white',
  },

  searchBarContainer: {
    width: '100%',
  },

  searchBar: {
    left: 20,
    height: 40,
    width: '90%',
    borderColor: '#1F2B5B',
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },

  // View dos remédios disponíveis
  inf: {
    width: '100%',
    marginTop: '5%',
    padding: 2,
  },

  subTitle: {
    marginLeft: 15,
    fontSize: 21,
    fontWeight: '800',
    color: 'white',
  },

  list: {
  
    right: 12,
    width: '100%',
    alignItems: 'flex-start',
    padding: 20,
  },

  btlist: {
    width: '100%',
    justifyContent: 'center',
    marginTop: '1%',
  },

  txlist: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },

  // Adicionando a nova linha
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Alinha verticalmente ao centro
  },

  // View contato
  vwctt: {
    width: '100%',
    marginTop: '2%',
    padding: 3,
  },

  ctt: {
    left: 20,
    width: '100%',
    justifyContent: 'center',
  },

  txCtt: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginTop: 10,
  },
  txEnd: {
    fontSize: 16,
    fontWeight: '300',
    color: 'white',
    marginTop: 10,
    paddingHorizontal:10,
  },

  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
