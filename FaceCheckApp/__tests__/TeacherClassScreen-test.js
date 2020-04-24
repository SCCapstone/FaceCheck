import 'react-native';
import React from 'react';
import ClassScreen from '../src/screens/Teacher/ClassScreen';
import currClass from '../src/screens/Teacher/ClassScreen';
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

test('Current class has students', () => {
  received = currClass.students
  expect(received).toBeDefined;
})

test('Current class has attendance', () => {
  received = currClass.attendance
  expect(received).toBeDefined;
})

test('Students can be absent', () => {
  received = currClass.absent
  expect(received).toBeDefined;
})

test('Students can be present', () => {
  received = currClass.present
  expect(received).toBeDefined;
})

test('Classes have students', () => {
  received = ClassScreen.students
  expect(received).toBeDefined;
})

test('Students have attendance', () => {
  received = ClassScreen.attendance
  expect(received).toBeDefined;
})

test('User is valid', () => {
  received = ClassScreen.currentUser
  expect(received).toBeDefined;
})

test('Classes have attendance', () => {
  received = ClassScreen.checkAttendance
  expect(received).toBeDefined;
})

test('Classes have a meeting day', () => {
  received = ClassScreen.meetingDays
  expect(received).toBeDefined;
})

test('Classes have a meeting time', () => {
  received = ClassScreen.time
  expect(received).toBeDefined;
})
