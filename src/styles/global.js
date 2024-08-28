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
    padding: 15,
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
});
