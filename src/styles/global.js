import {StyleSheet} from 'react-native';

export const GlobalStyles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: 10,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  subheader: {
    padding: 10,
    color: '#6e6e6e',
    fontSize: 18,
  },
});
