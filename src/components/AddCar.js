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
        };
    }
    // Add a form inside the render() method. The form contains the
    // ReactSkylight modal form component with buttons and the input fields that
    // are needed to collect the car data. The button that opens the modal window, and
    // will be shown in the carlist page, must be outside ReactSkylight. All input
    // fields should have the name attribute with a value that is the same as the name of
    // the state the value will be saved to. Input fields also have the onChange handler,
    // which saves the value to state by invoking the handleChange function.
    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Implement the handleSubmit and cancelSubmit functions to the AddCar.js
    // file. The handleSubmit function creates a new car object and calls the addCar
    // function, which can be accessed using props. The cancelSubmit function just
    // closes the modal form.

    // Save car and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var newCar =
        {
            brand: this.state.brand,
            model: this.state.model,
            color: this.state.color,
            year: this.state.year,
            price: this.state.price
        }
    }

    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3>New car</h3>
                    <form>
                        <input type="text" placeholder="Brand" name="brand"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Model" name="model"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Color" name="color"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Year" name="year"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Price" name="price"
                            onChange={this.handleChange} /><br />
                        <button onClick={this.handleSubmit}>Save</button>
                        <button onClick={this.cancelSubmit}>Cancel</button>
                    </form>
                </SkyLight>
                <div>
                    <button style={{ 'margin': '10px' }} onClick={() => this.refs.addDialog.show()}>New car</button>
                </div>
            </div>
        );
    }
}

export default AddCar;