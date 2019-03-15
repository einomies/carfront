import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddCar from './AddCar.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Carlist extends Component {

    constructor(props) {
        super(props);
        this.state = { cars: [] };
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

    fetchCars = () => {
        fetch(SERVER_URL + 'api/cars')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    cars: responseData._embedded.cars,
                });
            })
            .catch(err => console.error(err));
    }

    // Implement the addCar function to the Carlist.js file that will send the POST
    // request to the backend api/cars endpoint. The request will include the new car
    // object inside the body and the 'Content-Type': 'application/json'
    // header. The header is needed because the car object is converted to JSON format
    // using the JSON.stringify() method.
    addCar(car) {
        fetch(SERVER_URL + 'api/cars',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(car)
            })
            .then(res => this.fetchCars())
            .catch(err => console.error(err))
    }

    // Update car
    updateCar(car, link) {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(car)
            })
            .then(res =>
                toast.success("Changes saved", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
            .catch(err =>
                toast.error("Error when saving", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
    }

    // We send the DELETE request to a car link, and when the delete succeeds,
    // we refresh the list page by calling the fetchCars() function.
    onDelClick = (link) => {
        console.log('delete car: ' + link)
        fetch(link, { method: 'DELETE' })
            .then(res => {
                toast.success("Car deleted", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchCars();
            })
            .catch(err => {
                toast.error("Error when deleting", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
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
                    (<button onClick={() => { this.updateCar(row, value) }}>
                        Save</button>)
            },
            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: (
                    { value }) =>
                    (<button onClick={() => { this.confirmDelete(value) }}>Delete</button>)
            }
        ]
        // Add the AddCar component to the render() method and pass the addCar and
        // fetchCars functions as props to the AddCar component that allows us to call
        // these functions from the AddCar component.
        // ToastContainer is the container component for showing toast messages, and it should be
        // inside the render() method. In ToastContainer, you can define the duration of the toast
        // message in milliseconds using the autoClose prop.
        return (
            <div className="App">
                <AddCar addCar={this.addCar} fetchCars={this.fetchCars} />
                <ReactTable data={this.state.cars} columns={columns}
                    filterable={true} pageSize={10} />
                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}

export default Carlist;