import 'react-native'
import React from 'react';
import App from '../src/App';
import renderer from 'react-test-renderer';

import {shallow} from 'enzyme';

describe('App component', () => {
  it('Shallow rendering', () => {
    const wrapper = shallow(<App />);
    const componentInstance = wrapper.instance();
    //Accessing react lifecyle methods
    componentInstance.componentDidMount();
    componentInstance.componentWillMount();
    //Accessing component state
    // expect(wrapper.state('someStateKey')).toBe(true);
    //Accessing component props
    // expect(wrapper.props.someProp).toEqual(1);
    //Accessing class methods
    // expect(componentInstance.counter(1)).toEqual(2);
  });
});


// test('Loading Snapshot ', () => {
//   const snap = renderer.create(
//     <Loading />
//   ).toJSON();
//   expect(snap).toMatchSnapshot();
// });
