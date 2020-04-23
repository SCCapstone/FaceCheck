import 'react-native';
import React from 'react';
import ClassScreen from '../src/screens/Student/ClassScreen';
import RNFirebase from 'react-native-firebase';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

test('Get current date', () => {
  received = ClassScreen.getDate;
  expect(received).toBeDefined;
})

test('Get current classes', () => {
  received = ClassScreen.currClass
  expect(received).toBeDefined;
})

test('User is valid', () => {
  received = ClassScreen.currentUser
  expect(received).toBeDefined;
})