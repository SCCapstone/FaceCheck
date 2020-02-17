import 'react-native';
import React from 'react';
import QRGenerator from '../src/screens/QRGeneratorScreen';
import RNFirebase from 'react-native-firebase';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('Testing navigation', () => {

  let wrapper = null
  const spyNavigate = jest.fn()
  const props = {
    navigation: {
      navigate: spyNavigate,
      state: {}
    }
  }
  const params = {
    token: 'randomToken'
  }

  beforeEach(() => {
    wrapper = shallow(<QRGenerator {...props} />)
    wrapper.setState({ params: params })
  })

  test('Navigation Test', async () => {
    await wrapper.instance()._goBack(params)
    expect(spyNavigate).toHaveBeenCalled()
  })
})

test('Test QR snapshot',()=>{
  let QRGeneratorData = renderer.create(<QRGenerator/>).toJSON;
  expect(QRGeneratorData).toMatchSnapshot();
})

