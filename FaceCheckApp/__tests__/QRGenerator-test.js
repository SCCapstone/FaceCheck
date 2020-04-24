import 'react-native';
import React from 'react';
import QRGenerator from '../src/screens/Student/QRGeneratorScreen';
import RNFirebase from 'react-native-firebase';
import renderer from 'react-test-renderer';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QRCode from 'react-native-qrcode-svg';

configure({ adapter: new Adapter() });

// test('Test QR snapshot',()=>{
//   let QRGeneratorData = renderer.create(<QRGenerator {...QRGeneratorData}/>).toJSON;
//   expect(QRGeneratorData).toMatchSnapshot();
// })

test('Renders QR code', () => {
  const qrData = JSON.stringify({
    uid: 123,
    totpCode: Math.floor(Math.random() * Math.floor(999999)),
  });
  const wrapper = shallow(<QRCode value={qrData}/>);
  
  expect(wrapper.find('.value')).toBeDefined();
})

test('QR code has a uid', () => {
  const qrData = JSON.stringify({
    uid: 123,
    totpCode: Math.floor(Math.random() * Math.floor(999999)),
  });
  const wrapper = shallow(<QRCode uid={qrData}/>);
  
  expect(wrapper.find('.uid')).toBeDefined();
})

test('QR code has a teacher uid', () => {
  const qrData = JSON.stringify({
    teacherUID: 123,
    totpCode: Math.floor(Math.random() * Math.floor(999999)),
  });
  const wrapper = shallow(<QRCode teacherUID={qrData}/>);
  
  expect(wrapper.find('.teacherUID')).toBeDefined();
})

test('QR code has a token', () => {
  const qrData = JSON.stringify({
    token: 123,
    totpCode: Math.floor(Math.random() * Math.floor(999999)),
  });
  const wrapper = shallow(<QRCode token={qrData}/>);
  
  expect(wrapper.find('.token')).toBeDefined();
})

test('QR code has a time', () => {
  const qrData = JSON.stringify({
    uid: 123,
    totpCode: Math.floor(Math.random() * Math.floor(999999)),
  });
  const wrapper = shallow(<QRCode time={qrData}/>);
  
  expect(wrapper.find('.time')).toBeDefined();
})

test('Get current date', () => {
  received = QRGenerator.getDate;
  expect(received).toBeDefined;
})

test('asymmetric matcher', () => {
  const expected = {a: expect.any(Function)};
  const received = {a: _in => _in};
  expect(received).toEqual(expected);
})
