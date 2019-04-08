import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddCar from './AddCar.js';
import { CSVLink } from 'react-csv';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

class Carlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            open: false,
            message: ''
        };
    }

    // We take the fetchCars function out from the componentDidMount() method. That
    // is needed because we want to call the fetchCars function also after the car 
    // has been deleted to show an updated list of the cars to the user. Create a 
    // new function, called fetchCars(), and copy the code from the componentDidMount()
    // method into a new function. Then call the fetchCars() function from the
    // componentDidMount() function to fetch cars initially.
    componentDidMount() {
        this.fetchCars();
    }

    // To fetch the cars, we first have to read the token from the session storage and 
    // then add the Authorization header with the token value to the request.
    fetchCars = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/cars',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    cars: responseData._embedded.cars,
                });
            })
            .catch(err => console.error(err));
    }

    // We send the DELETE request to a car link, and when the delete succeeds,
    // we refresh the list page by calling the fetchCars() function.
    onDelClick = (link) => {
        console.log('delete car: ' + link)
        const token = sessionStorage.getItem("jwt");
        fetch(link,
            {
                method: 'DELETE',
                headers: { 'Authorization': token }
            }
        )
            .then(res => {
                this.setState({ open: true, message: 'Car deleted' });
                this.fetchCars();
            })
            .catch(err => {
                this.setState({ open: true, message: 'Error when deleting' });
                console.error(err)
            })
    }

    confirmDelete = (link) => {
        confirmAlert(
            {
                message: 'Are you sure to delete?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => this.onDelClick(link)
                    },
                    {
                        label: 'No',
                    }
                ]
            }
        )
    }

    // Implement the addCar function to the Carlist.js file that will send the POST
    // request to the backend api/cars endpoint. The request will include the new car
    // object inside the body and the 'Content-Type': 'application/json'
    // header. The header is needed because the car object is converted to JSON format
    // using the JSON.stringify() method.
    addCar(car) {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/cars',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(car)
            })
            .then(res => this.fetchCars())
            // .then(res => {
            //     this.setState({ open: true, message: 'Car added' });
            //     this.fetchCars();
            // })
            .catch(err => console.error(err))
    }

    // Update car
    updateCar(car, link) {
        const token = sessionStorage.getItem("jwt");
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(car)
            })
            .then(res =>
                this.setState({ open: true, message: 'Changes saved' })
            )
            .catch(err =>
                this.setState({ open: true, message: 'Error when saving' })
            )
    }

    // The cell will be the div element and the contentEditable attribute
    // makes it editable. suppressContentEditableWarning suppresses the warning
    // that comes when the element with the child is marked to be editable. 
    // The function in onBlur is  executed when the user leaves the table cell, 
    // and this is where we will update the state.
    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.cars];
                    data[cellInfo.index][cellInfo.column.id] =
                        e.target.innerHTML;
                    this.setState({ cars: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.cars[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    handleClose = (event, reason) => {
        this.setState({ open: false });
    };

    render() {
        // The data prop of React Table is this.state.cars, which contains fetched cars.
        // We also have to define the columns of the table, where accessor is the field
        // of the car object and header is the text of the header. To enable filtering,
        // we set the filterable prop of the table to true.
        const columns = [
            {
                Header: 'Brand',
                accessor: 'brand',
                Cell: this.renderEditable
            },
            {
                Header: 'Model',
                accessor: 'model',
                Cell: this.renderEditable
            },
            {
                Header: 'Color',
                accessor: 'color',
                Cell: this.renderEditable
            },
            {
                Header: 'Year',
                accessor: 'year',
                Cell: this.renderEditable
            },
            {
                Header: 'Price €',
                accessor: 'price',
                Cell: this.renderEditable
            },
            // Save button: When the user presses the button, it calls the updateCar
            // function and passes two arguments. The first argument is row, which is
            // all values in the row as an object (=car object). The second argument
            // is value, which is set to be _links.href.self, which will be the URL
            // of the car that we need in the request.
            {
                id: 'savebutton',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: ({ value, row }) =>
                    (<Button size="small" variant="flat" color="primary"
                        onClick={() => { this.updateCar(row, value) }}>
                        Save</Button>)
            },
            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: (
                    { value }) =>
                    (<Button size="small" variant="flat" color="secondary"
                        onClick={() => { this.confirmDelete(value) }}>Delete</Button>)
            }
        ]
        // Add the AddCar component to the render() method and pass the addCar and
        // fetchCars functions as props to the AddCar component that allows us to call
        // these functions from the AddCar component.

        // ToastContainer is the container component for showing toast messages, and it should be
        // inside the render() method. In ToastContainer, you can define the duration of the toast
        // message in milliseconds using the autoClose prop.

        // The CSVLink component takes the data prop, which contains the data array that will be
        // exported to the CSV file. You can also define the data separator using the separator prop
        // (the default separator is a comma). Add the CSVLink component inside the return
        // statement in the render() method. The value of the data prop will now be
        // this.state.cars.

        // We wrap AddCar and CSVLink inside the Grid components. There are two types of
        // Grid components—a container and an item. Both components are wrapped inside the
        // item's Grid components. Then both items' Grid components are wrapped inside the
        // container's Grid component.
        return (
            <div className="App">
                <Grid container>
                    <Grid item>
                        <AddCar addCar={this.addCar} fetchCars={this.fetchCars} />
                    </Grid>
                    <Grid item style={{ padding: 20 }}>
                        <CSVLink data={this.state.cars} separator=";">Export CSV</CSVLink>
                    </Grid>
                </Grid>
                <ReactTable data={this.state.cars} columns={columns}
                    filterable={true} pageSize={10} />
                <Snackbar
                    style={{ width: 300, color: 'green' }}
                    open={this.state.open} onClose={this.handleClose}
                    autoHideDuration={2000} message={this.state.message} />
            </div>
        );
    }
}

export default Carlist;