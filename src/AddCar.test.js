import React from 'react';
import AddCar from './components/AddCar';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

console.log('React.version: ' +React.version)

// We are going to create an Enzyme shallow-rendering test for our AddCar
// component. The first test case renders the component and checks that there are
// five TextInput components, as there should be. wrapper.find finds every
// node in the render tree that matches TextInput. With Enzyme tests, we can use
// Jest for assertions and here we are using toHaveLength to check that the found
// node count equals five. Shallow rendering tests the component as a unit and does
// not render any child components. For this case, shallow rendering is enough.
// Otherwise you can also use the full DOM rendering by using mount.

Enzyme.configure({ adapter: new Adapter() });

describe('<AddCar />', () => {
    it('renders five <TextInput /> components', () => {
        const wrapper = shallow(<AddCar />);
        expect(wrapper.find('TextField')).toHaveLength(5);
    });
});

// You can also test events with Enzyme using the simulate method. The following example
// shows how to test the onChange event of the TextField brand in the AddCar component.
// This example also shows how to access the state of the component. We first use
// wrapper.find to find the first TextField, which is used for the car brand. Then, we set
// the value of TextField and use the simulate method to simulate the change event.
// Finally, we check the value of the brand state that should now contain Ford:
describe('<AddCar />', () => {
    it('test onChange', () => {
        const wrapper = shallow(<AddCar />);
        const brandInput = wrapper.find('TextField').get(0);
        // brandInput.instance().value = 'Ford';
        // usernameInput.simulate('change');
        // expect(wrapper.state('brand')).toEqual('Ford');
    });
});
