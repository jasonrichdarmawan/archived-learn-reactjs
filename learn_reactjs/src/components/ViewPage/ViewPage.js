import React from 'react';
import { Link } from 'react-router-dom';

class ViewPage extends React.Component {
    renderPrimary(request, id) {
        let data_primary;
        if (request === "employee") {
            data_primary = JSON.parse(localStorage.employee_primary);
        }
        
        else if (request === "department") {
            data_primary = JSON.parse(localStorage.department_primary);
        }

        return (
            <form>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label htmlFor="inputID">ID</label>
                        <input type="text" className="form-control form-control-sm" id="inputID" value={data_primary[id].id} readOnly/>
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control form-control-sm" id="name" value={data_primary[id].name} readOnly/>
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control form-control-sm" id="email" value={data_primary[id].email} readOnly/>
                    </div>
                </div>
                {this.renderInfo("" + request, id)}
            </form>
        );
    }

    renderTableHead() {
        return (
            <tr>
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
                        <Link to={`/view/employee/${data.id}`}>
                            {data.id}
                        </Link>
                    </th>
                    <td>{data.name}</td>
                </tr>
            )
        });
    }

    renderInfo(request, id) {
        let data_info;
        if (request === "employee") {
            data_info = JSON.parse(localStorage.employee_info);
            delete data_info[id]["primary_id"];
            return (
                <div>
                    <div className="row">
                        <div className="form-group col-md-3">
                            <label htmlFor="nationalIDNumber">National Identification Number</label>
                            <input type="text" className="form-control form-control-sm" id="nationalIDNumber" value={data_info[id].nationalIDNumber} readOnly/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="idValidityDate">ID Card Validity</label>
                            <input type="date" className="form-control form-control-sm" id="idValidityDate" value={data_info[id].idValidityDate} readOnly/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="taxpayerIDNumber">Taxpayer Idenfication Number</label>
                            <input type="text" className="form-control form-control-sm" id="taxpayerIDNumber" value={data_info[id].taxpayerIDNumber} readOnly/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="taxPeriod">Tax Period</label>
                            <input type="date" className="form-control form-control-sm" id="taxPeriod" value={data_info[id].taxPeriod} readOnly/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-2">
                                <label htmlFor="birthDate">Birth Date</label>
                                <input type="date" className="form-control form-control-sm" id="birthDate" value={data_info[id].birthDate} readOnly/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="nationality">Nationality</label>
                            <input type="text" className="form-control form-control-sm" id="nationality" value={data_info[id].nationality} readOnly/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="gender">Gender</label>
                            <input type="text" className="form-control form-control-sm" id="gender" value={data_info[id].gender} readOnly/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="religion">Religion</label>
                            <input type="text" className="form-control form-control-sm" id="religion" value={data_info[id].religion} readOnly/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="maritalStatus">Marital Status</label>
                            <input type="text" className="form-control form-control-sm" id="maritalStatus" value={data_info[id].maritalStatus} readOnly/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="education">Education</label>
                            <input type="text" className="form-control form-control-sm" id="education" value={data_info[id].education} readOnly/>
                        </div>
                    </div>
                </div>
            );
        }
        
        else if (request === "department") {
            data_info = JSON.parse(localStorage.department_info);
            delete data_info[id]["primary_id"];
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

    render() {
        let request = this.props.match.params.request;
        let id = this.props.match.params.id;
        return (
            <div className="container mt-3">
                <h3>{request.charAt(0).toUpperCase() + request.slice(1)}</h3>
                {this.renderPrimary("" + request, id)}
            </div>
        );
    }
}

export default ViewPage;