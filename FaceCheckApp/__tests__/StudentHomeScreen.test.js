import React from 'react';
import StudentHomeScreen from '../src/screens/StudentHomeScreen/';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<StudentHomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
