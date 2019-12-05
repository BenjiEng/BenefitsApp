import React, {Component} from 'react';
import Popup from './Popup';

class Form extends Component {
    state = {
        employees: [],
        showPopup: false,
    }

    //add a new person to state
    addEmployee = (e) => {
        this.setState((prevState) => ({
            employees: [...prevState.employees, {first: "", last: "", dependents: []}]
        }));
    }

    //opens Dependent popup
    openPopup = () => {
        this.setState({
          showPopup: !this.state.showPopup
        })
    }

    //save dependents to an employee
    saveDependents = (d, idx) => {
        this.setState({
            showPopup: !this.state.showPopup
        });
        this.state.employees[idx].dependents = d;
    }

    //change on input
    handleChange = (e) => {
        if (["first", "last"].includes(e.target.className) ) {
            let employees = [...this.state.employees];
            employees[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState({ employees })
        }
    };

    //caller to send data to App
    onCalculate = (e) => {
        this.props.onCalculate(this.state.employees);
        this.setState({   
            employees: []
        });
    };

    //prevent submit of all buttons
    handleSubmit = (e) => {
        e.preventDefault();
    };  

    render() {
        return (
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <button onClick={this.addEmployee}>Add New Employee</button>
                {
                    this.state.employees.map((val, idx) => {
                        let firstId=`first-${idx}`;
                        let lastId=`last-${idx}`;
                        let dependentId = `dependent-${idx}`;
                        return (
                            <section key={idx}>
                                <div>
                                    <input name={firstId} data-id={idx} id={firstId} className="first" placeholder='First Name'/>
                                    <input name={lastId} data-id={idx} id={lastId} className="last" placeholder='Last Name'/>
                                    <button onClick={this.openPopup.bind(this)}>Add Dependents</button>
                                    {/* {this.state.showPopup ? <Popup closePopup={this.togglePopup.bind(this)}></Popup>: null} */}
                                    {this.state.showPopup ? <Popup addDependents={d => this.saveDependents(d, idx)} name={dependentId} data-id={idx} id={dependentId} className="dependents"></Popup>: null}
                                </div>
                            </section>
                        )
                    })
                }
                <br></br>
                <button onClick={e => this.onCalculate(e)}>Calculate</button>
            </form>
        );
    }
}

export default Form;