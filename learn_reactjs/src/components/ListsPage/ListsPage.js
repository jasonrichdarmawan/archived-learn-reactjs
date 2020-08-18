import React from 'react';
import { Link } from 'react-router-dom';

class ListsPage extends React.Component {
    // question: is there a way to export runOnce() to different class, different file?
    runOnce() {
        if (localStorage.employee_primary === undefined) localStorage.employee_primary = JSON.stringify([]);
        if (localStorage.employee_info === undefined) localStorage.employee_info = JSON.stringify([]);
        if (localStorage.department_primary === undefined) localStorage.department_primary = JSON.stringify([]);
        if (localStorage.department_info === undefined) localStorage.department_info = JSON.stringify([]);

        // debug only: dummy data
        // let employee_primary = [
        //     {},
        //     {},
        //     {
        //         id: "2",
        //         name: "Jeff Bezos Long Name",
        //         email: "jeff_bezos_long_name@gmail.com"
        //     },
        //     {},
        //     {
        //         id: "4",
        //         name: "Jeff Bezos Long Name",
        //         email: "jeff_bezos_long_name@gmail.com"
        //     },
        //     {},
        //     {
        //         id: "6",
        //         name: "Jeff Bezos Long Name",
        //         email: "jeff_bezos_long_name@gmail.com"
        //     },
        //     {},
        //     {
        //         id: "8",
        //         name: "Jeff Bezos Long Name",
        //         email: "jeff_bezos_long_name@gmail.com"
        //     },
        // ];
        // localStorage.employee_primary = JSON.stringify(employee_primary);
        // let employee_info = [
        //     {},
        //     {},
        //     {
        //         primary_id: "2",
        //         nationalIDNumber: "2222",
        //         idValidityDate: "2020-20-20",
        //         taxpayerIDNumber: "2222",
        //         taxPeriod: "2020-20-20",
        //         birthDate: "2020-20-20",
        //         nationality: "ID",
        //         gender: "Male",
        //         religion: "Islam",
        //         maritalStatus: "Not married",
        //         education: "Postgraduate"
        //     },
        //     {},
        //     {
        //         primary_id: "4",
        //         nationalIDNumber: "5555",
        //         idValidityDate: "2020-20-20",
        //         taxpayerIDNumber: "5555",
        //         taxPeriod: "2020-20-20",
        //         birthDate: "2020-20-20",
        //         nationality: "ID",
        //         gender: "Male",
        //         religion: "Islam",
        //         maritalStatus: "Not married",
        //         education: "Postgraduate"
        //     },
        //     {},
        //     {
        //         primary_id: "6",
        //         nationalIDNumber: "6666",
        //         idValidityDate: "2020-20-20",
        //         taxpayerIDNumber: "6666",
        //         taxPeriod: "2020-20-20",
        //         birthDate: "2020-20-20",
        //         nationality: "ID",
        //         gender: "Male",
        //         religion: "Islam",
        //         maritalStatus: "Not married",
        //         education: "Postgraduate"
        //     },
        //     {},
        //     {
        //         primary_id: "8",
        //         nationalIDNumber: "8888",
        //         idValidityDate: "2020-20-20",
        //         taxpayerIDNumber: "8888",
        //         taxPeriod: "2020-20-20",
        //         birthDate: "2020-20-20",
        //         nationality: "ID",
        //         gender: "Male",
        //         religion: "Islam",
        //         maritalStatus: "Not married",
        //         education: "Postgraduate"
        //     },
        // ];
        // localStorage.employee_info = JSON.stringify(employee_info);
        // let department_primary = [
        //     {},
        //     {},
        //     {
        //         id: "2",
        //         name: "Board of Directors",
        //         email: "bod@gmail.com"
        //     },
        //     {},
        //     {
        //         id: "4",
        //         name: "C-Level Executives",
        //         email: "c-level@gmail.com"
        //     },
        //     {},
        //     {
        //         id: "6",
        //         name: "Operation",
        //         email: "operation@gmail.com"
        //     },
        //     {},
        //     {
        //         id: "8",
        //         name: "Marketing",
        //         email: "marketing@gmail.com"
        //     },
        // ];
        // localStorage.department_primary = JSON.stringify(department_primary);
        // let department_info = [
        //     {},
        //     {},
        //     {
        //         primary_id: "2",
        //         employeeList: "[2]"
        //     },
        //     {},
        //     {
        //         primary_id: "4",
        //         employeeList: "[4]"
        //     },
        //     {},
        //     {
        //         primary_id: "6",
        //         employeeList: "[6]"
        //     },
        //     {},
        //     {
        //         primary_id: "8",
        //         employeeList: "[8]"
        //     }
        // ];
        // localStorage.department_info = JSON.stringify(department_info);
    }

    renderOption(request) {
        if (request === "employees") {
            return (
                <Link to="departments">
                    <button className="btn btn-primary btn-sm mb-2 mr-2">Departments</button>
                </Link>
            );
        } else if (request === "departments") {
            return (
                <Link to="employees">
                    <button className="btn btn-primary btn-sm mb-2 mr-2">Employees</button>
                </Link>
            );
        }
    }

    // question: Why binding `onClick={this.selectAll}` does not work? while arrow function `onClick={() => {this.selectAll()}} works?
    renderTableHead() {
        return (
            <tr>
                <th>
                    <input type="checkbox" id="selectAll" onClick={() => {this.selectAll()}}/>
                    <label htmlFor="selectAll"></label>
                </th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
            </tr>
        );
    }

    renderTableBody(request) {
        let data;

        if (request === "employees") {
            data = JSON.parse(localStorage.employee_primary);
        } else if (request === "departments") {
            data = JSON.parse(localStorage.department_primary);
        }

        return data.filter((data) => {
            if (data.id === undefined) return false;
            else return true;
        }).map(data => {
            return (
                <tr id={"id" + data.id} key={"id" + data.id}>
                        <th>
                            <input type="checkbox" id="list" value={data.id} onClick={() => {this.showAction("check")}}/>
                        </th>
                        <th>
                            <Link to={`/view/${request.slice(0, request.length - 1)}/${data.id}`}>
                                {data.id}
                            </Link>
                        </th>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                </tr>
            )
        })
    }

    selectAll() {
        let data = document.querySelectorAll('[id="list"]');
        // bug: onClick={selectAll} executes after render, resulting .checked return true instead of false.
        if (document.getElementById('selectAll').checked === true) {
            for (let i = 0; i < data.length; i++) {
                data[i].checked = true;
            }
            this.showAction("true");
        } else {
            for (let i = 0; i < data.length; i++) {
                data[i].checked = false;
            }
            this.showAction("false");
        }
    }

    showAction(request) {
        if (request === "true") {
            document.getElementById('delete').classList.remove('d-none');
        } else if (request === "false") {
            document.getElementById('delete').classList.add('d-none');
        }

        if (request === "check") {
            let data = document.querySelectorAll('[id="list"]');
            // bug: onClick={selectAll} executes after render, resulting .checked return true instead of false.
            for (let i = 0; i < data.length; i++) {
                if (data[i].checked === true) {
                    this.showAction("true");
                    return;
                } else {
                    this.showAction("false");
                }
            }
        }
    }

    // TODO: refactor the code to be more dynamic.
    actionDelete(request) {
        let list = document.querySelectorAll('[id="list"]');
        let data;

        if (request === "employees") {
            data = JSON.parse(localStorage.employee_primary);
        } else if (request === "departments") {
            data = JSON.parse(localStorage.department_primary);
        }

        for (let i = 0; i < list.length; i++) {
            if (list[i].checked === true) {
                // delete in localStorage and innerHTML
                data[list[i].value] = {};
                document.getElementById(`id${list[i].value}`).innerHTML = '';
            }
        }

        // store the updated data to localStorage
        if (request === "employees") {
            localStorage.employee_primary = JSON.stringify(data);
        } else if (request === "departments") {
            localStorage.department_primary = JSON.stringify(data);
        }
    }

    render() {
        this.runOnce();
        let request = this.props.request;
        return (
            <div className="container table-responsive mt-3">
                <div className="row">
                    <div className="col-sm">
                        <h3>{"Lists " + request.charAt(0).toUpperCase() + request.slice(1)}</h3>
                        <Link to={"/create/" + request.slice(0,request.length - 1)}>
                            <button className="btn btn-primary btn-sm mb-2 mr-2">Create</button>
                        </Link>
                        <button className="btn btn-danger btn-sm mb-2 d-none" id="delete" onClick={() => {this.actionDelete("" + request)}}>Delete</button>
                    </div>
                    <div className="col-sm">
                        {/* TODO: search function */}
                        <input className="form-control form-control-sm mb-2" type="search" placeholder="Search" aria-label="Search"/>
                        {/* TODO: refactor the code and use dropdown checkbox */}
                        {this.renderOption("" + request)}
                    </div>
                </div>
                <table className="table table-hover" id="listsTable">
                    <thead id="listsHead">
                        {this.renderTableHead()}
                    </thead>
                    <tbody id="listsBody">
                        {this.renderTableBody("" + request)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListsPage;