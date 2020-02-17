import 'react-native';
import React from 'react';
import QRGenerator from '../src/screens/QRGeneratorScreen';
import RNFirebase from 'react-native-firebase';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

beforeEach(() => {
  wrapper = shallow(<QRGenerator />)
})
test('check qr screen',()=>{
  let QRGeneratorData = renderer.create(<QRGenerator/>).toJSON;
  expect(QRGeneratorData).toMatchSnapshot();
})
