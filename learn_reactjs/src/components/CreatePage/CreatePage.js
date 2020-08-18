import React from 'react';
import { Link } from 'react-router-dom';

class CreatePage extends React.Component {
    constructor(props) {
        super(props);
        // question: is there alternative to not define the state.key ?
        if (this.props.request === "employees") {
            this.state = {
                name: '',
                email: '',
                nationalIDNumber: '',
                idValidityDate: '',
                taxpayerIDNumber: '',
                taxPeriod: '',
                birthDate: '',
                nationality: '',
                gender: '',
                religion: '',
                maritalStatus: '',
                education: ''
            };
        } else if (this.props.request === "departments") {
            this.state = {
                name: '',
                email: ''
            };
        }
    }

    runOnce() {
        if (localStorage.employee_primary === undefined) localStorage.employee_primary = JSON.stringify([]);
        if (localStorage.employee_info === undefined) localStorage.employee_info = JSON.stringify([]);
        if (localStorage.department_primary === undefined) localStorage.department_primary = JSON.stringify([]);
        if (localStorage.department_info === undefined) localStorage.department_info = JSON.stringify([]);
    }

    renderOption(request) {
        if (request === "employees") {
            return (
                <div>
                    <h3>Create Employee</h3>
                    <Link to="department">
                        <button className="btn btn-primary btn-sm mb-2 mr-2">Departments</button>
                    </Link>
                </div>
            );
        } else if (request === "departments") {
            return (
                <div>
                    <h3>Create Department</h3>
                    <Link to="employee">
                        <button className="btn btn-primary btn-sm mb-2 mr-2">Employees</button>
                    </Link>
                </div>
            );
        }
    }

    renderPrimary(request) {
        let data_primary;
        let data_info;
        if (request === "employees") {
            data_primary = JSON.parse(localStorage.employee_primary);
            data_info = JSON.parse(localStorage.employee_info);
        } else if (request === "departments") {
            data_primary = JSON.parse(localStorage.department_primary);
            data_info = JSON.parse(localStorage.department_info);
        }
        return (
            <form onSubmit={() => {this.submitToLocalStorage("" + request, data_primary, data_info)}}>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label htmlFor="inputID">ID</label>
                        <input type="text" className="form-control form-control-sm" id="inputID" value={data_primary.length} readOnly/>
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control form-control-sm" id="name" placeholder="Name" onChange={(event) => {this.handleChange(event)}} value={this.state.name} required/>
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control form-control-sm" id="email" placeholder="Email" onChange={(event) => {this.handleChange(event)}} value={this.state.email} required/>
                    </div>
                </div>
                {this.renderInfo("" + request)}
                <button type="submit" className="btn btn-primary btn-sm">Create</button>
            </form>
        );
    }

    renderInfo(request) {
        if (request === "employees") {
            return (
                // question: is there alternative to return multiple div?
                <div>
                    <div className="row">
                        <div className="form-group col-md-3">
                            <label htmlFor="nationalIDNumber">National Identification Number</label>
                            <input type="text" className="form-control form-control-sm" id="nationalIDNumber" placeholder="National Identification Number" onChange={(event) => {this.handleChange(event)}} value={this.state.nationalIDNumber}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="idValidityDate">ID Card Validity</label>
                            <input type="date" className="form-control form-control-sm" id="idValidityDate" onChange={(event) => {this.handleChange(event)}} value={this.state.idValidityDate}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="taxpayerIDNumber">Taxpayer Idenfication Number</label>
                            <input type="text" className="form-control form-control-sm" id="taxpayerIDNumber" placeholder="Taxpayer Idenfication Number" onChange={(event) => {this.handleChange(event)}} value={this.state.taxpayerIDNumber}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="taxPeriod">Tax Period</label>
                            <input type="date" className="form-control form-control-sm" id="taxPeriod" onChange={(event) => {this.handleChange(event)}} value={this.state.taxPeriod}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-2">
                                <label htmlFor="birthDate">Birth Date</label>
                                <input type="date" className="form-control form-control-sm" id="birthDate" onChange={(event) => {this.handleChange(event)}} value={this.state.birthDate}/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="nationality">Nationality</label>
                            <input type="text" className="form-control form-control-sm" id="nationality" placeholder="Nationality" onChange={(event) => {this.handleChange(event)}} value={this.state.nationality}/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="gender">Gender</label>
                            <input type="text" className="form-control form-control-sm" id="gender" placeholder="Gender" onChange={(event) => {this.handleChange(event)}} value={this.state.gender}/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="religion">Religion</label>
                            <input type="text" className="form-control form-control-sm" id="religion" placeholder="Religion" onChange={(event) => {this.handleChange(event)}} value={this.state.religion}/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="maritalStatus">Marital Status</label>
                            <input type="text" className="form-control form-control-sm" id="maritalStatus" placeholder="Marital Status" onChange={(event) => {this.handleChange(event)}} value={this.state.maritalStatus}/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="education">Education</label>
                            <input type="text" className="form-control form-control-sm" id="education" placeholder="Education" onChange={(event) => {this.handleChange(event)}} value={this.state.education}/>
                        </div>
                    </div>
                </div>
            );
        } else if (request === "departments") {
            return (
                <div>
                    <p>Team Members</p>
                    <table className="table table-hover" id="listsTable">
                        <thead id="listsHead">
                            {this.renderTableHead()}
                        </thead>
                        <tbody id="listsBody">
                            {this.renderTableBody()}
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    selectAll() {
        let data = document.querySelectorAll('[id="list"]');
        // bug: onClick={selectAll} executes after render, resulting .checked return true instead of false.
        if (document.getElementById('selectAll').checked === true) {
            for (let i = 0; i < data.length; i++) {
                data[i].checked = true;
            }
        } else {
            for (let i = 0; i < data.length; i++) {
                data[i].checked = false;
            }
        }
    }

    renderTableHead() {
        return (
            <tr>
                <th>
                    <input type="checkbox" id="selectAll" onClick={() => {this.selectAll()}}/>
                    <label htmlFor="selectAll"></label>
                </th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
            </tr>
        );
    }

    renderTableBody() {
        let data = JSON.parse(localStorage.employee_primary);

        return data.filter((data) => {
            if (data.id === undefined) return false;
            else return true;
        }).map(data => {
            return (
                <tr id={"id" + data.id} key={"id" + data.id}>
                    <th>
                        <input type="checkbox" id="list" value={data.id}/>
                    </th>
                    <th>{data.id}</th>
                    <td>{data.name}</td>
                </tr>
            )
        });
    }

    handleChange(event) {
        let key = event.target.id;
        let value = event.target.value;

        this.setState({
            [key]: value
        });

        // question: why can't access this.state.key?
    }

    employeeList() {
        let employeeList = [];
        let list = document.querySelectorAll('[id="list"]');

        for (let i = 0; i < list.length; i++) {
            if (list[i].checked === true) {
                employeeList.push(JSON.parse(list[i].value))
            }
        }

        return employeeList;
    }

    submitToLocalStorage(request, data_primary, data_info) {
        let tempPrimary = {
            id: JSON.stringify(data_primary.length),
            name: this.state.name,
            email: this.state.email
        }

        // delete key from object to prevent double key in _info
        delete this.state.name;
        delete this.state.email;

        let tempInfo = {
            primary_id: JSON.stringify(data_primary.length)
        }

        if (request === "employees") {
            // push the key and value to a temp object.
            for (let i = 0; i < Object.keys(this.state).length; i++) {
                tempInfo[
                    Object.keys(this.state)[i]
                ] = Object.values(this.state)[i];
            }

            data_primary.push(tempPrimary);
            data_info.push(tempInfo);

            // store the data to localStorage
            localStorage.employee_primary = JSON.stringify(data_primary);
            localStorage.employee_info = JSON.stringify(data_info);
        }
        
        else if (request === "departments") {
            tempInfo["employeeList"] = JSON.stringify(this.employeeList());

            data_primary.push(tempPrimary);
            data_info.push(tempInfo);

            // store the data to localStorage
            localStorage.department_primary = JSON.stringify(data_primary);
            localStorage.department_info = JSON.stringify(data_info);
        }
    }

    render() {
        this.runOnce();
        let request = this.props.request;
        return (
            <div className="container mt-3">
                {this.renderOption("" + request)}
                {this.renderPrimary("" + request)}
            </div>
        );
    }
}

export default CreatePage;