import React from 'react'

export default class SearchWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};

        // This binding is necessary to make `this` work in the callback
        this.generateName = this.generateName.bind(this);
    }

    render() {
        return (
            <div className="App">
                <h1>Generated name: {this.state.name}</h1>
                <button onClick={this.generateName}>Generate pet name</button>
            </div>
        )
    }

    generateName(e) {
        e.preventDefault();
        // Simple GET request using fetch
        fetch('http://localhost:8080/api/generate')
            .then(response => response.json())
            .then(data => this.setState({ name: 'test' }));
        console.log('Генерация имени питомца');
    }
}
