import React, {Component} from 'react';

class Form extends Component {
    state = {
        firstName: '',
        lastName: '',
        dependents: []
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    addDependent = (e) => {
        this.setState((prevState) => ({
            dependents: [...prevState.dependents, {first: "", last: ""}]
        }));
    }

    // removeDependent = (e) => {
    //     this.state.dependents.splice(-1, 1);
    // }

    onCalculate = (e) => {
        e.preventDefault(); 
        this.props.onCalculate(this.state);
        this.setState({   
            firstName: '',
            lastName: '',
            dependents: []
        });
    };

    handleChange = (e) => {
        if (["first", "last"].includes(e.target.className) ) {
          let dependents = [...this.state.dependents]   
          dependents[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ dependents }, () => console.log(this.state.dependents))
        } else {
          this.setState({ [e.target.name]: e.target.value })
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
    };  

    render() {
        const { firstName, lastName } = this.state;
        const isEnabled = firstName.length > 0 && lastName.length > 0;
        return (
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <input name='firstName' placeholder='First Name' value={this.state.firstName}
                    onKeyPress={event => (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)} 
                    onChange={e => this.change(e)} />
                <input name='lastName' placeholder='Last Name' value={this.state.lastName} 
                    onKeyPress={event => (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)}
                    onChange={e => this.change(e)} />
                
                <h4>Dependents</h4>
                <button onClick={this.addDependent}>Add New Dependent (Optional)</button>
                {
                    this.state.dependents.map((val, idx) => {
                        let dependentId = `dependent-${idx}`, lastId=`last-${idx}`
                        return (
                            <div key={idx}>
                                <label htmlFor={dependentId} placeholder='Dependent First Name'></label>
                                <input name={dependentId} data-id={idx} id={dependentId} className="first"/>

                                <label htmlFor={lastId} placeholder='Dependent Last Name'></label>
                                <input name={lastId} data-id={idx} id={lastId} className="last"/>
                            </div>
                        )
                    })
                }
                <br></br>
                <button disabled={!isEnabled} onClick={e => this.onCalculate(e)}>Calculate</button>
            </form>
        );
    }
}

export default Form;