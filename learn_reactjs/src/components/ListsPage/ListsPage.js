import React from 'react';

class ListsPage extends React.Component {
    render() {
        function selectAll() {
            let data = document.querySelectorAll('[id^="checkbox"]');
            // bug: onClick={selectAll} executes after render, resulting .checked return true instead of false.
            if (document.getElementById('selectAll').checked === true) {
                for (let i = 0; i < data.length; i++) {
                    data[i].checked = true;
                }
                showAction("true");
            } else {
                for (let i = 0; i < data.length; i++) {
                    data[i].checked = false;
                }
                showAction("false");
            }
        }
        function showAction(request) {
            if (request === "true") {
                document.getElementById('delete').classList.remove('d-none');
            } else if (request === "false") {
                document.getElementById('delete').classList.add('d-none');
            }

            if (request === "check") {
                let data = document.querySelectorAll('[id^="checkbox"]');
                // bug: onClick={selectAll} executes after render, resulting .checked return true instead of false.
                for (let i = 0; i < data.length; i++) {
                    if (data[i].checked === true) {
                        showAction("true");
                        return;
                    } else {
                        showAction("false");
                    }
                }
            }
        }
        function actionDelete() {
            let data = document.querySelectorAll('[id^="checkbox"]');
            for (let i = 0; i < data.length; i++) {
                if (data[i].checked === true) {
                    document.getElementById(`id${data[i].value}`).innerHTML = '';
                }
            }
        }
        return (
            <div className="container table-responsive mt-3">
                <div className="row">
                    <div className="col-sm">
                        <h3>Lists</h3>
                        <button className="btn btn-primary btn-sm mb-3 mr-3">Create</button>
                        <button className="btn btn-danger btn-sm mb-3 d-none" id="delete" onClick={actionDelete}>Delete</button>
                    </div>
                    <div className="col-sm">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                        <select className="form-control form-control-sm mb-3 w-50" id="exampleFormControlSelect1">
                            <option>Employees</option>
                            <option>Departments</option>
                        </select>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" id="selectAll" onClick={selectAll}/>
                                <label htmlFor="selectAll"></label>
                            </th>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="id1">
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
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListsPage;