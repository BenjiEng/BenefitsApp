import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import Table from 'react-bootstrap/Table';
import { thisExpression } from '@babel/types';



//find the total cost to the EMPLOYER for each employee and their dependents
//$2000 + ($1000 or $900)/26 + dependents cost/26
//cost per year
class App extends Component {
  amounts = {
    checks_per_year: 26,
    monthly_pay: 2000,
    yearly_deduction: 1000,
    beneficiary_yearly_deduction: 500,
    discount: .1
  }
 
  state = {
    input: {},
    yearlyCost: 0,
    monthlyDeduction: 0,
    remainder: this.amounts.monthly_pay
  }

  //when onSubmit is called from the component
  onSubmit = (input) => {
    this.setState({input});
    this.state.remainder = this.amounts.monthly_pay;
    //update calculations
    this._calculate(input.people);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Welcome to the Monthly Benefits Calculator</h3>
          <Form onCalculate={fields => this.onSubmit(fields)}/>
          <h4>Calculations for {this.state.firstName} {this.state.lastName}</h4>
          <Table striped bordered hover>
            <thead>
              
            </thead>
            <tbody align="left">
              <tr>
                <td>
                  Base Pay
                </td>
                <td>
                  ${JSON.stringify(this.amounts.monthly_pay, null, 2)}
                </td>
              </tr>
              <tr>
                <td>
                  {this.state.firstName} {this.state.lastName} <small>{this.state.discount === true ? '(-10%)' : ''}</small>
                </td>
                <td>
                  -${this.state.monthlyDeduction}
                </td>
              </tr>
              {
                this.state.dependentsDeduction.map((d) => {
                  return (
                    <tr>
                      <td>
                        {d.name} <small>{d.discount === true ? '(-10%)' : ''}</small>
                      </td>
                      <td>
                        -${d.amount}
                      </td>
                    </tr> 
                  )
                })
              }
              <tr>
                <td>
                  Remainder
                </td>
                <td>
                  ${this.state.remainder} 
                </td>
              </tr>
              
            </tbody>
          </Table>
        </header>
      </div>
    );
  }
  
  _calculateDeductions(people) {
    //for each person determine if they are an employee or dependent
    people.forEach((person) => {
      if(person.isDependent == true) {
        this._calculateEmployee(person);
      } else {

      }
    });
   
  }

  _calculateEmployee(firstName) {
    if(firstName[0].toUpperCase() === 'A') {
      this.state.monthlyDeduction = ((this.amounts.yearly_deduction * (1-this.amounts.discount)/this.amounts.checks_per_year)).toFixed(2);
      this.state.discount = true;
    } else {
      this.state.monthlyDeduction = (this.amounts.yearly_deduction/this.amounts.checks_per_year).toFixed(2);
    }
    this.state.remainder -= this.state.monthlyDeduction;
  }

  _calculateDependent(dependents) {
    var deduction = 0;
    dependents.forEach(e => {
      if (e.first[0].toUpperCase() === 'A') {
        deduction = ((this.amounts.beneficiary_yearly_deduction * (1-this.amounts.discount)/this.amounts.checks_per_year)).toFixed(2);
        this.state.remainder -= deduction;
        this.state.remainder.toFixed(2);
        this.state.dependentsDeduction.push(
          { 
            name: e.first + e.last,
            amount: deduction,
            discount: true
          }
        );
      } else {
        deduction = (this.amounts.beneficiary_yearly_deduction/this.amounts.checks_per_year).toFixed(2);
        this.state.remainder -= deduction;
        this.state.remainder.toFixed(2);
        this.state.dependentsDeduction.push(
          { 
            name: e.first + e.last,
            amount: deduction,
            discount: false
          }
        );
      }
    });

  }

}

export default App;
