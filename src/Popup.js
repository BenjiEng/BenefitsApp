import React, {Component} from 'react';

class Popup extends React.Component {
    state = {
        dependents: []
    }

    //add a new dependent
    addDependent = (e) => {
        this.setState((prevState) => ({
            dependents: [...prevState.dependents, {dfirst: "", dlast: ""}]
        }));
    }

    handleChange = (e) => {
        if (["dfirst", "dlast"].includes(e.target.className) ) {
            let dependents = [...this.state.dependents];
            dependents[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState({ dependents })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    };

    cancelPopup = (e) => {
        this.setState({
            dependents: []
        });
        this.props.addDependents(this.state.dependents);
    }

    //caller to send data to App
    submitDependents = (e) => {
        this.props.addDependents(this.state.dependents);
        this.setState({   
            dependents: []
        });
    };

    //prevent submit of all buttons
    handleSubmit = (e) => {
        e.preventDefault();
    };  

    render() {
      return (
        <div className='popup' onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div class="popup-inner">
            <button onClick={this.addDependent}>New Dependent</button>
                {
                    this.state.dependents.map((val, idx) => {
                        let firstId = `first-${idx}`;
                        let lastId=`last-${idx}`;
                        return (
                            <section key={idx}>
                                <div>
                                    <input name={firstId} data-id={idx} id={firstId} className="dfirst" placeholder='First Name'/>
                                    <input name={lastId} data-id={idx} id={lastId} className="dlast" placeholder='Last Name'/>
                                </div>
                            </section>
                        )
                    })
                }
            <br></br>
            <button onClick={this.submitDependents}>Save Dependents</button>
            <button onClick={this.cancelPopup}>Cancel Popup</button>
            </div>
        </div>
      );
    }
}

export default Popup;