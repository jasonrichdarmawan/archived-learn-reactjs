import React, { useState, useEffect } from "react";
import {
  NavbarOrganism,
  EmployeeInformationOrganism,
} from "../../components/Organisms";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectUserDatabase, selectDepartmentDatabase } from "../../providers";
import { useParams, Link } from "react-router-dom";
import { updateDepartmentWithUID } from "../../providers/departmentDatabaseSlice";
import { updateUserWithUID } from "../../providers/userDatabaseSlice";

export const ListTemplate = ({ authData }) => {
  const userDatabase = useSelector(selectUserDatabase);
  const departmentDatabase = useSelector(selectDepartmentDatabase);
  const { request, id } = useParams();

  // console.log("request", request, "id", id);

  const [readOnly, setReadOnly] = useState(true);
  const handleButton = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setRes();
    readOnly ? setReadOnly(false) : setReadOnly(true);
  };

  const [inputs, setInputs] = useState({
    uid: "",
    email: "",
    password: "",
    displayName: "",
    phoneNumber: "",
  });

  const { uid, email, password, displayName, phoneNumber } = inputs;
  // console.log(inputs);

  useEffect(() => {
    if (id !== undefined && request === "employee") {
      setInputs((inputs) => {
        return {
          ...inputs,
          uid: userDatabase[id].uid,
          email: userDatabase[id].email,
          displayName: userDatabase[id].displayName,
          phoneNumber: userDatabase[id].phoneNumber,
        };
      });
    } else if (id !== undefined && request === "department") {
      setCheckedUID(
        departmentDatabase[id].users_uid.reduce((acc, cur) => {
          acc[cur] = true;
          return acc;
        }, {})
      );
    }
  }, [request, id, userDatabase, departmentDatabase]);

  const formsMap = [
    {
      controlId: "uid",
      label: "uid",
      type: "text",
      value: uid,
      readOnly: true,
    },
    {
      controlId: "email",
      label: "email",
      type: "email",
      value: email,
      readOnly: true,
    },
    {
      controlId: "password",
      label: "password",
      type: "password",
    },
    {
      controlId: "displayName",
      label: "name",
      type: "text",
      value: displayName,
    },
    {
      controlId: "phoneNumber",
      label: "phone number",
      type: "text",
      value: phoneNumber,
    },
  ];
  const handleChange = (event) => {
    const { id, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  };

  const [checkedUID, setCheckedUID] = useState({});
  const handleCheckbox = (event) => {
    setReadOnly(false);

    checkedUID[event.target.value]
      ? setCheckedUID({ ...checkedUID, [event.target.value]: false })
      : setCheckedUID({ ...checkedUID, [event.target.value]: true });
  };

  const dispatch = useDispatch();
  const [res, setRes] = useState();
  const error = undefined; // not used.
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (id !== undefined) {
      setRes("await");

      if (request === "employee") {
        dispatch(
          updateUserWithUID({ uid, email, password, displayName, phoneNumber })
        );
      } else if (request === "department") {
        dispatch(
          updateDepartmentWithUID({
            ...departmentDatabase[id],
            users_uid: Object.keys(checkedUID).map((uid) => parseInt(uid)),
          })
        );
      }
    }
  };

  return (
    <div className="container w-auto mt-3">
      {id === undefined ? (
        <>
          <div className="row">
            <div className="col">
              <Link
                to={
                  request === "employee"
                    ? "/app/list/department"
                    : request === "department" && "/app/list/employee"
                }
              >
                <Button
                  className="float-right"
                  size="sm"
                  variant="outline-primary"
                >
                  {request === "employee"
                    ? "department"
                    : request === "department" && "employee"}
                </Button>
              </Link>
            </div>
          </div>
          <Table responsive className="mt-3">
            <thead>
              {request === "employee" ? (
                <tr>
                  <th>uid</th>
                  <th>email</th>
                  <th>name</th>
                  <th>phone number</th>
                </tr>
              ) : (
                request === "department" && (
                  <tr>
                    <th>uid</th>
                    <th>handler</th>
                  </tr>
                )
              )}
            </thead>
            <tbody>
              {request === "employee"
                ? userDatabase.map((user) => (
                    <tr key={user.email}>
                      <td>
                        <Link to={"/app/list/employee/" + user.uid}>
                          {user.uid}
                        </Link>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.displayName}</td>
                      <td>{user.phoneNumber}</td>
                    </tr>
                  ))
                : request === "department" &&
                  departmentDatabase.map((department) => (
                    <tr key={department.handler}>
                      <td>
                        <Link to={"/app/list/department/" + department.uid}>
                          {department.uid}
                        </Link>
                      </td>
                      <td>{department.handler}</td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </>
      ) : id !== undefined && request === "employee" ? (
        <EmployeeInformationOrganism
          authData={authData}
          formsMap={formsMap}
          readOnly={readOnly}
          handleButton={handleButton}
          handleChange={handleChange}
          res={res}
          error={error}
          handleSubmit={handleSubmit}
        />
      ) : (
        request === "department" && (
          <>
            {authData.access === 0 && (
              <div className="row">
                <div className="col">
                  <Button
                    type="button"
                    className="float-right"
                    size="sm"
                    variant="outline-primary"
                    disabled={readOnly ? true : res === "await" ? true : false}
                    onClick={readOnly ? handleButton : handleSubmit}
                  >
                    {readOnly ? "Edit" : "Save"}
                  </Button>
                </div>
              </div>
            )}
            <Table responsive className="mt-3">
              <thead>
                <tr>
                  <th>select</th>
                  <th>uid</th>
                  <th>email</th>
                  <th>name</th>
                  <th>phone number</th>
                </tr>
              </thead>
              <tbody>
                {userDatabase
                  // .filter((user) => {
                  //   return (
                  //     departmentDatabase[id].users_uid.find(
                  //       (member) => member === user.uid
                  //     ) !== undefined && true
                  //   );
                  // })
                  .map((user, i) => (
                    <tr key={user.email}>
                      <td>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id={"checkbox" + i}
                            value={user.uid}
                            checked={checkedUID[user.uid]}
                            onChange={handleCheckbox}
                          />
                          <label
                            class="form-check-label"
                            for={"checkbox" + i}
                          ></label>
                        </div>
                      </td>
                      <td>
                        <Link to={"/app/list/employee/" + user.uid}>
                          {user.uid}
                        </Link>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.displayName}</td>
                      <td>{user.phoneNumber}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </>
        )
      )}
    </div>
  );
};

export const ListPage = ({ authData, routesConfig }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavbarOrganism authData={authData} routesConfig={routesConfig} />
      <ListTemplate authData={authData} />
    </div>
  );
};
