import React from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        var newCar = {
            brand: this.state.brand, model: this.state.model,
            color: this.state.color, year: this.state.year,
            price: this.state.price
        };
        this.props.addCar(newCar);
        this.refs.addDialog.hide();
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
                        <TextField label="Brand" placeholder="Brand"
                            name="brand" onChange={this.handleChange} /><br />
                        <TextField label="Model" placeholder="Model"
                            name="model" onChange={this.handleChange} /><br />
                        <TextField label="Color" placeholder="Color"
                            name="color" onChange={this.handleChange} /><br />
                        <TextField label="Year" placeholder="Year"
                            name="year" onChange={this.handleChange} /><br />
                        <TextField label="Price" placeholder="Price"
                            name="price" onChange={this.handleChange} /><br />
                        <Button variant="outlined" color="primary"
                            onClick={this.handleSubmit}>Save</Button>
                        <Button variant="outlined" color="secondary"
                            onClick={this.cancelSubmit}>Cancel</Button>
                    </form>
                </SkyLight>
                <div>
                    <Button variant="raised" color="primary"
                        style={{ 'margin': '10px' }}
                        onClick={() => this.refs.addDialog.show()}>
                        New Car</Button>
                </div>
            </div>
        );
    }
}

export default AddCar;