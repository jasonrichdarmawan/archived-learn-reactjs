import React from 'react';

class ListsPage extends React.Component {
    view() {
        if (localStorage.employee_primary === undefined) localStorage.employee_primary = JSON.stringify([]);

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

    renderTableBody() {
        let data = JSON.parse(localStorage.employee_primary);
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

    actionDelete() {
        let list = document.querySelectorAll('[id="list"]');
        let data = JSON.parse(localStorage.employee_primary);

        for (let i = 0; i < list.length; i++) {
            if (list[i].checked === true) {
                // delete in localStorage and innerHTML
                data[list[i].value] = {};
                document.getElementById(`id${list[i].value}`).innerHTML = '';
            }
        }

        // store the updated data to localStorage
        localStorage.employee_primary = JSON.stringify(data);
    }

    render() {
        this.view();
        return (
            <div className="container table-responsive mt-3">
                <div className="row">
                    <div className="col-sm">
                        <h3>Lists</h3>
                        <button className="btn btn-primary btn-sm mb-3 mr-3">Create</button>
                        <button className="btn btn-danger btn-sm mb-3 d-none" id="delete" onClick={() => {this.actionDelete()}}>Delete</button>
                    </div>
                    <div className="col-sm">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                        <select className="form-control form-control-sm mb-3 w-50" id="exampleFormControlSelect1">
                            <option>Employees</option>
                            <option>Departments</option>
                        </select>
                    </div>
                </div>
                <table className="table table-hover" id="listsTable">
                    <thead>
                        {this.renderTableHead()}
                    </thead>
                    <tbody id="lists">
                        {this.renderTableBody()}
                        {/* <tr id="id1">
                            <th>
                                <input type="checkbox" id="checkbox1" value="1" onClick={() => {showAction('check')}}/>
                            </th>
                            <th scope="row">1</th>
                            <td>Jeff Bezos Long Name</td>
                            <td>jeff_bezos_long_email@gmail.com</td>
                        </tr>
                        <tr id="id2">
                            <th>
                                <input type="checkbox" id="checkbox2" value="2" onClick={() => {showAction('check')}}/>
                            </th>
                            <th scope="row">2</th>
                            <td>Jeff Bezos Long Name</td>
                            <td>jeff_bezos_long_email@gmail.com</td>
                        </tr>
                        <tr id="id3">
                            <th>
                                <input type="checkbox" id="checkbox3" value="3" onClick={() => {showAction('check')}}/>
                            </th>
                            <th scope="row">3</th>
                            <td>Jeff Bezos Long Name</td>
                            <td>jeff_bezos_long_email@gmail.com</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListsPage;