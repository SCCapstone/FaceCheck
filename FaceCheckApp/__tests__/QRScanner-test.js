import 'react-native';
import React from 'react';
import QRScanner from '../src/screens/Teacher/QRScannerScreen';
import RNFirebase from 'react-native-firebase';
import renderer from 'react-test-renderer';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QRCode from 'react-native-qrcode-svg';

configure({ adapter: new Adapter() });

test('QR Scanner has current date', () => {
  const qrData = JSON.stringify({
    uid: 123,
    totpCode: Math.floor(Math.random() * Math.floor(999999)),
  });
  const wrapper = shallow(<QRCode value={qrData}/>);
  
  expect(wrapper.find('.currDate')).toBeDefined();
})

test('Get current date', () => {
  received = QRScanner.getDate;
  expect(received).toBeDefined;
})

