import 'react-native';
import React from 'react';
import ClassScreen from '../src/screens/Student/ClassScreen';
import RNFirebase from 'react-native-firebase';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

let findUser = function(ClassData, element) {
  console.warn(ClassData);
  return true;
  let result = undefined;
};
describe('Testing navigation', () => {
  let wrapper = null;
  const spyNavigate = jest.fn();
  const props = {
    navigation: {
      navigate: spyNavigate,
      state: {},
    },
  };
  const params = {
    token: 'randomToken',
  };

  beforeEach(() => {
    wrapper = shallow(<ClassScreen {...props} />);
    wrapper.setState({params: params});
  });

  test('should test navigation', async () => {
    await wrapper.instance()._goBack(params);
    expect(spyNavigate).toHaveBeenCalled();
  });
});

test('check class screen', () => {
  let ClassData = renderer.create(<ClassScreen />).toJSON;
  expect(findUser(ClassData, 'username')).toBeDefined;
});
