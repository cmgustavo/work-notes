import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  globalContainer: {
    flex: 1,
  },
  notesContainer: {
    flex: 1,
    padding: 20,
  },
  noteContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  noteDate: {
    fontSize: 12,
    fontWeight: '100',
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  highlight: {
    fontStyle: 'italic',
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
  textArea: {
    height: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  bottom: {
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: 10,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
  },
});
