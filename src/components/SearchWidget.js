import React from 'react'

export default class SearchWidget extends React.Component {
    constructor(props) {
        super(props);
        this.reset();

        // This binding is necessary to make `this` work in the callback
        this.generateName = this.generateName.bind(this);
        this.updateInputTypeValue = this.updateInputTypeValue.bind(this);
        this.updateInputKindValue = this.updateInputKindValue.bind(this);
    }

    reset() {
        // Always set the initial state in its own function, so that
        // you can trivially reset your components at any point.
        this.state = {
            name: '',
            inputKindValue: '',
            inputTypeValue: ''
        };
    }

    render() {
        return (
            <div className="App">
                <h1>Generated name: {this.state.name}</h1>
                <label>
                    Порода:
                    <input
                        value={this.state.inputTypeValue} onChange={evt => this.updateInputTypeValue(evt)}
                        type="text" name="type" />
                </label>
                <label>
                    Вид:
                    <input
                        value={this.state.inputKindValue} onChange={evt => this.updateInputKindValue(evt)}
                        type="text" name="kind" />
                </label>
                <button onClick={this.generateName}>Generate pet name</button>
            </div>
        )
    }

    generateName(e) {
        e.preventDefault();
        console.log('Генерация имени питомца');
        if (this.state.inputKindValue == null && this.state.inputTypeValue == null) {
            // Simple GET request using fetch
            fetch('http://localhost:8080/api/generate')
                .then(response => response.json())
                .then(data => this.setState({ name: data }));
        } else {
            let filters = [];
            if (this.state.inputKindValue != null) {
                filters.push({
                    "key": "kind",
                    "op": "LIKE",
                    "value": this.state.inputKindValue
                })
            }
            if (this.state.inputTypeValue != null) {
                filters.push({
                    "key": "type",
                    "op": "LIKE",
                    "value": this.state.inputTypeValue
                })
            }
            let json = JSON.stringify(filters);
            console.log(json);
            fetch('http://localhost:8080/api/generate?filters=' + json)
                .then(response => response.json())
                .then(data => this.setState({ name: data }));
        }
    }

    updateInputKindValue(evt) {
        const val = evt.target.value;
        this.setState({
            inputKindValue: val
        });
        console.log(this.state.inputKindValue);
    }

    updateInputTypeValue(evt) {
        const val = evt.target.value;
        this.setState({
            inputTypeValue: val
        });
        console.log(this.state.inputTypeValue);
    }
}
