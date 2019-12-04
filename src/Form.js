import React, {Component} from 'react';

class Form extends Component {
    state = {
        people: []
    }

    //add anew person to state
    addPerson = (e) => {
        this.setState((prevState) => ({
            people: [...prevState.people, {first: "", last: "", isDependent: false}]
        }));
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleChange = (e) => {
        if (["first", "last", "isDependent"].includes(e.target.className) ) {
            let people = [...this.state.people];
            people[e.target.dataset.id][e.target.className] = e.target.value;
            if(e.target.className === "isDependent") {
                if (e.target.value === "on") {
                    people[e.target.dataset.id][e.target.className] = true;
                } else {
                    people[e.target.dataset.id][e.target.className] = false;
                }
            }
            this.setState({ people })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    };

    //caller to send data to App
    onCalculate = (e) => {
        this.props.onCalculate(this.state);
        this.setState({   
            people: []
        });
    };

    //prevent submit of all buttons
    handleSubmit = (e) => {
        e.preventDefault();
    };  

    render() {
        return (
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <h4>People</h4>
                <button onClick={this.addPerson}>Add New Person</button>
                {
                    this.state.people.map((val, idx) => {
                        let dependentId = `dependent-${idx}`;
                        let lastId=`last-${idx}`;
                        let isDependentId=`isDependent-${idx}`;
                        return (
                            <section key={idx}>
                                <div>
                                    {/* <label htmlFor={dependentId}></label> */}
                                    <input name={dependentId} data-id={idx} id={dependentId} className="first" placeholder='First Name'/>

                                    {/* <label htmlFor={lastId} ></label> */}
                                    <input name={lastId} data-id={idx} id={lastId} className="last" placeholder='Last Name'/>
                                    <label htmlFor={isDependentId} >Dependent?</label>
                                    <input name={isDependentId} data-id={idx} id={isDependentId} className="isDependent" type="checkbox" />
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