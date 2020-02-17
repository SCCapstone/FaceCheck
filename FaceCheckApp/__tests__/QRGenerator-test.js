import 'react-native';
import React from 'react';
import QRGenerator from '../src/screens/QRGeneratorScreen';
import RNFirebase from 'react-native-firebase';
import renderer from 'react-test-renderer';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QRCode from 'react-native-qrcode-svg';

configure({ adapter: new Adapter() });

test('Test QR snapshot',()=>{
  let QRGeneratorData = renderer.create(<QRGenerator/>).toJSON;
  expect(QRGeneratorData).toMatchSnapshot();
})

test('Renders QR code', () => {
  const qrData = JSON.stringify({
    uid: 123,
    totpCode: Math.floor(Math.random() * Math.floor(999999)),
  });
  const wrapper = shallow(<QRCode value={qrData}/>);
  
  expect(wrapper.find('.value')).toBeDefined();
})

test('asymmetric matcher', () => {
  const expected = {a: expect.any(Function)};
  const received = {a: _in => _in};
  expect(received).toEqual(expected);
})
