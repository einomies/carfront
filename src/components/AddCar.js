import React from 'react';
import SkyLight from 'react-skylight';

class AddCar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brand: '',
            model: '',
            year: '',
            color: '',
            price: ''
        }
    }
    // Add a form inside the render() method. The form contains the
    // ReactSkylight modal form component with buttons and the input fields that
    // are needed to collect the car data. The button that opens the modal window, and
    // will be shown in the carlist page, must be outside ReactSkylight. All input
    // fields should have the name attribute with a value that is the same as the name of
    // the state the value will be saved to. Input fields also have the onChange handler,
    // which saves the value to state by invoking the handleChange function.
    render() {
        return (
            <div>
            </div>
        );
    }
}

export default AddCar;