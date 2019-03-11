import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

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

    fetchCars() {
        fetch(SERVER_URL + 'api/cars')
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
        fetch(link, { method: 'DELETE' })
            .then(res => this.fetchCars())
            .catch(err => console.error(err))
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

    render() {
        // The data prop of React Table is this.state.cars, which contains fetched cars.
        // We also have to define the columns of the table, where accessor is the field
        // of the car object and header is the text of the header. To enable filtering,
        // we set the filterable prop of the table to true.
        const columns = [
            {
                Header: 'Brand',
                accessor: 'brand'
            },
            {
                Header: 'Model',
                accessor: 'model'
            },
            {
                Header: 'Color',
                accessor: 'color'
            },
            {
                Header: 'Year',
                accessor: 'year'
            },
            {
                Header: 'Price €',
                accessor: 'price'
            },
            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: (
                    { value }) => (<button onClick={() => { this.confirmDelete(value) }}>Delete</button>
                    )
            }
        ]
        return (
            <div className="App">
                <ReactTable data={this.state.cars} columns={columns} filterable={true} />
            </div>
        );
    }
}

export default Carlist;