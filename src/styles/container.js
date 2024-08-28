import {StyleSheet} from 'react-native';

export const ContainerStyles = StyleSheet.create({
  globalContainer: {
    flex: 1,
  },
  notesContainer: {
    flex: 1,
    paddingVertical: 20,
    marginBottom: 20,
  },
  noteContainer: {
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  noteMainContent: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 20,
    marginTop: 20,
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    marginVertical: 25,
    borderRadius: 5,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
});
