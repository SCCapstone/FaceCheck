import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
  button: {
    marginHorizontal: 60,
    marginVertical: 5,
    alignSelf: 'center',
  },
  centerScreen: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center',
  },
  centerScreenJust: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerItem: {
    alignItems: 'center',
  },
  datePicker: {
    alignSelf: 'center',
  },
  surface: {
    padding: 8,
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  textInput: {
    margin: 4,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 40,
  },
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 45,
    bottom: 110,
    width: 250,
    height: 250,
    position: 'absolute',
    zIndex: -1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default styles;
