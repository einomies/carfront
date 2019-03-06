import React, { Component } from 'react';

class Carlist extends Component {

    constructor(props) {
        super(props);
        this.state = { cars: [] };
    }

// Execute fetch in the componentDidMount() life cycle method. The cars from
// the JSON response data will be saved to the state, called cars.

    render() {
        return (
            <div></div>
        );
    }
}

export default Carlist;