import 'react-native'
import React from 'react';
import ClassScreen from '../src/screens/ClassScreen/';
import renderer from 'react-test-renderer';


test('ClassScreen Snapshots', () => {
  const testProps = props => ({
    navigation: {
      navigate: jest.fn(),
      getParam : jest.fn()
    },
    ...props
  });
  const snap = renderer.create(
    <ClassScreen/>
  ).toJSON();
  expect(snap).toMatchSnapshot();
});