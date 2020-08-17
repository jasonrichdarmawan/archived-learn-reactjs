import React from 'react';
import { Link } from 'react-router-dom';

class ListsPage extends React.Component {
    runOnce() {
        if (localStorage.employee_primary === undefined) localStorage.employee_primary = JSON.stringify([]);
        if (localStorage.department_primary === undefined) localStorage.department_primary = JSON.stringify([]);

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
    renderTableHead(request) {
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
                    <th>{data.id}</th>
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
                        {this.renderTableHead("" + request)}
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