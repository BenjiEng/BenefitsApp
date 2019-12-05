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
  setV = {
    checksPerYear: 26,
    monthlyPay: 2000,
    yearlyBenefit: 1000,
    dependentYearlyBenefit: 500,
    discount: .1,
    employeeContribution: .7
  }
 
  state = {
    input: {},
    totalCost: 0,
    employees: []
  }

  //when onSubmit is called from the component
  onSubmit = (input) => {
    var calculated = this._calculateCost(input);
    this.setState(this.state);
    this.setState({employees: calculated});
  }


  render() {
    return (
      <div className="App">
          <h3>Welcome to the Employer Benefits Calculator</h3>
          <Form onCalculate={fields => this.onSubmit(fields)}/>

          <h4>Total Cost Per Year: ${this.state.totalCost.toLocaleString()}</h4>
            {this.state.employees.map((emp) => {
                return (
                  <table>
                    <th>{emp.first} {emp.last}</th>
                    <tbody align="left">
                    <tr>
                      <td></td>
                      <td>
                        Yearly Cost
                      </td>
                      <td>
                        ${emp.costToEmployer}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        Salary
                      </td>
                      <td>
                        ${emp.yearlySalary}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        Benefits Cost <small>{emp.hasDiscount === true ? '(-10%)' : ''}</small>
                      </td>
                      <td>
                        ${emp.benefitsCost}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><h3>Dependents:</h3></td>
                      <td></td>
                    </tr>
                    {emp.dependents.map((d) => {
                      return (
                        <tr>
                          <td></td>
                          <td>{d.first} {d.last} <small>{d.hasDiscount === true ? '(-10%)' : ''}</small></td>
                          <td>${d.benefitsCost}</td>
                        </tr> 
                      );
                    })}
                    </tbody>
                  </table>
                )
              })
            }
      </div>
    );
  }
  
  //Calculate the cost for the employer
  _calculateCost(employees) {
    var calculatedEmployees = [];
    employees.forEach((employee) => {
      var employeeObj = {
        first: employee.first,
        last: employee.last,
        costToEmployer: 0,
        yearlySalary: this.setV.monthlyPay * this.setV.checksPerYear,
        benefitsCost: 0,
        hasDiscount: false,
        dependents: employee.dependents
      }
      var benefitCost = this._calculateEmployee(employeeObj);
      var dependentCost = this._calculateDependents(employeeObj);
      employeeObj.costToEmployer = employeeObj.yearlySalary + benefitCost + dependentCost; 
      this.state.totalCost += employeeObj.costToEmployer;
      calculatedEmployees.push(employeeObj);
    });
    return calculatedEmployees;
  }

  //how much the company has to pay in benefits for employee
  _calculateEmployee(employee) {
    var costToEmployer = 0;
    if(employee.first[0].toUpperCase() === 'A') {
                  ///   1000 - (1000 * .6)  usually employee pays 600 employer pays 400
                  ///   1000 - (1000 * .6) * .9 discount employee pays 540 employer pays 460
      costToEmployer = parseFloat((this.setV.yearlyBenefit - ((this.setV.yearlyBenefit * this.setV.employeeContribution) * (1-this.setV.discount))).toFixed(2));             
      employee.benefitsCost = costToEmployer;
      employee.hasDiscount = true;
    } else {
      costToEmployer = parseFloat((this.setV.yearlyBenefit - (this.setV.yearlyBenefit * this.setV.employeeContribution)).toFixed(2));
      employee.benefitsCost = costToEmployer;
    }
    return costToEmployer;
  }

  //how much the company has to pay in benefits for dependents
  _calculateDependents(employee) {
    var cost = 0;
    var newDeps = [];
    employee.dependents.forEach(d => {
      if (d.dfirst[0].toUpperCase() === 'A') {
        var dependentCost = parseFloat((this.setV.dependentYearlyBenefit - ((this.setV.dependentYearlyBenefit * this.setV.employeeContribution) * (1-this.setV.discount))).toFixed(2));
        cost += dependentCost;
        var newDep = {
          first: d.dfirst,
          last: d.dlast,
          benefitsCost: dependentCost,
          hasDiscount: true
        }
        newDeps.push(newDep);
      } else {
        var dependentCost = parseFloat(((this.setV.dependentYearlyBenefit - this.setV.dependentYearlyBenefit * this.setV.employeeContribution)).toFixed(2));
        cost += dependentCost;
        var newDep = {
          first: d.dfirst,
          last: d.dlast,
          benefitsCost: dependentCost,
          hasDiscount: false
        }
        newDeps.push(newDep)
      }
    });
    employee.dependents = newDeps;
    return cost;
  }

}

export default App;
