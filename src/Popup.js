class Popup extends React.Component {
    state = {
        dependents: []
    }

    //add a new dependent
    addDependent = (e) => {
        this.setState((prevState) => ({
            dependents: [...prevState.employee, {first: "", last: ""}]
        }));
    }
    render() {
      return (
        <div className='popup'>
            <h4>Dependents</h4>
            <button onClick={this.addEmployee}>Add New Employee</button>
                {
                    this.state.employee.map((val, idx) => {
                        let firstId = `first-${idx}`;
                        let lastId=`last-${idx}`;
                        let isDependentId=`isDependent-${idx}`;
                        return (
                            <section key={idx}>
                                <div>
                                    <input name={firstId} data-id={idx} id={firstId} className="first" placeholder='First Name'/>
                                    <input name={lastId} data-id={idx} id={lastId} className="last" placeholder='Last Name'/>

                                    <label htmlFor={isDependentId} >Dependent</label>
                                    <input name={isDependentId} data-id={idx} id={isDependentId} className="isDependent" type="checkbox" />
                                    <Popup></Popup>
                                </div>
                            </section>
                        )
                    })
                }
            <button onClick={this.props.closePopup}>Add Dependents</button>
        </div>
      );
    }
  }