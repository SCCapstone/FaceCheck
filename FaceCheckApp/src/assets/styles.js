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
    marginLeft: 60,
    marginRight: 60,
    marginTop: 10,
    alignSelf: "center"
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
    backgroundColor: "#00000000",
    justifyContent: 'center',
    left: 70,
    bottom: 0,
    width: 250,
    height: 250,
    position: 'absolute'
         
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

export default styles;
