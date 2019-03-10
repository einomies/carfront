import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js'
import ReactTable from "react-table";
import 'react-table/react-table.css';

class Carlist extends Component {

    constructor(props) {
        super(props);
        this.state = { cars: [] };
    }

    componentDidMount() {
        fetch(SERVER_URL + 'api/cars')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    cars: responseData._embedded.cars,
                });
            })
            .catch(err => console.error(err));
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
        ]
        return (
            <div className="App">
                <ReactTable data={this.state.cars} columns={columns} filterable={true} />
            </div>
        );
    }
}

export default Carlist;