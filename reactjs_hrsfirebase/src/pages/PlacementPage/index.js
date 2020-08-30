import React, { useState, useEffect } from "react";
import { TopNavbarMiddleContent } from "../../components";
import { displayRouteMenu, routes } from "../../routes";
import { Container, Alert, Table, Row, Col, Button } from "react-bootstrap";
import { firebase } from "../../providers";
import { Link } from "react-router-dom";

const useContentJSX = (props) => {
  const [listData, setListData] = useState();
  const [userList, setUserList] = useState();

  const [errorMessage, setErrorMessage] = useState();

  const [checkedRows, setCheckedRows] = useState(new Map());

  const [canEdit, setCanEdit] = useState();

  const [res, setRes] = useState();

  useEffect(() => {
    if (!props.match.params.id) {
      setListData();

      firebase
        .firestore()
        .collection("departments")
        .get()
        .then((snapshot) => {
          !snapshot.empty
            ? setListData(
                snapshot.docs.map((doc) => {
                  const id = doc.id;
                  const data = doc.data();
                  return { id, ...data };
                })
              )
            : setListData();
        })
        .catch((error) => setErrorMessage(error.message));
    } else if (props.match.params.id) {
      setListData();

      firebase
        .firestore()
        .collection("departments")
        .doc(props.match.params.id)
        .get()
        .then((doc) => {
          doc.exists
            ? setListData(() => {
                const id = doc.id;
                const data = doc.data();

                const members = data.members;
                setCheckedRows(
                  members.reduce((acc, cur) => {
                    acc[cur.id] = true;
                    return acc;
                  }, {})
                );

                return { id, ...data };
              })
            : setListData();
        });

      firebase
        .firestore()
        .collection("users")
        .get()
        .then((snapshot) => {
          !snapshot.empty
            ? setUserList(
                snapshot.docs.map((doc) => {
                  const id = doc.id;
                  const data = doc.data();
                  return { id, ...data };
                })
              )
            : setUserList();
        })
        .catch((error) => setErrorMessage(error.message));
    }
  }, [props.match.params]);

  const handleCheckbox = (event) => {
    // question: how to refactor this messy code?
    const target =
      event.target.parentElement.parentElement.children[1].innerHTML;
    checkedRows[target]
      ? setCheckedRows({ ...checkedRows, [target]: false })
      : setCheckedRows({ ...checkedRows, [target]: true });

    setCanEdit(true);
  };

  const handleSubmit = () => {
    setCanEdit(false);

    const checkedEmployeeID = Object.keys(checkedRows).filter(
      (key) => checkedRows[key]
    );
    const checkedEmployeeData = userList.filter((item) => {
      return checkedEmployeeID.includes("" + item.id);
    });

    firebase
      .firestore()
      .collection("departments")
      .doc(listData.id)
      .set({ members: checkedEmployeeData }, { merge: true })
      .then(() => {
        setRes(true);
        setCanEdit(true);
      })
      .catch((error) => {
        setRes(false);
        setCanEdit(true);
        setErrorMessage(error.message);
      });
  };

  if (!props.match.params.id) {
    return (
      <Container className="mt-3">
        {errorMessage ? (
          <Alert className="mt-3" variant="warning">
            {errorMessage}
          </Alert>
        ) : null}
        <p className="font-weight-bold">Work Placement</p>
        {listData ? (
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <Link to={"/app/placement/" + doc.id}>{doc.id}</Link>
                  </td>
                  <td>{doc.displayName}</td>
                  <td>{doc.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </Container>
    );
  } else if (props.match.params.id) {
    return (
      <Container className="mt-3">
        {listData ? (
          <React.Fragment>
            <Row>
              <Col sm="6">
                <p className="font-weight-bold">{listData.displayName}</p>
              </Col>
              <Col sm="6">
                <Button
                  className="float-right"
                  size="sm"
                  disabled={canEdit ? false : true}
                  onClick={handleSubmit}
                  variant={
                    res
                      ? "success"
                      : errorMessage
                      ? "warning"
                      : "outline-primary"
                  }
                >
                  {res ? "Success" : errorMessage ? "Error" : "Save"}
                </Button>
              </Col>
            </Row>
            <Table responsive id="table-target">
              <thead>
                <tr>
                  <th></th>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {userList
                  ? userList.map((doc) => (
                      <tr key={doc.id}>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={
                              checkedRows[doc.id] ? checkedRows[doc.id] : false
                            }
                            onChange={handleCheckbox}
                          />
                        </td>
                        <td>{doc.id}</td>
                        <td>{doc.displayName}</td>
                        <td>{doc.email}</td>
                        <td>{doc.phoneNumber}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </React.Fragment>
        ) : null}
      </Container>
    );
  }
};

export const PlacementPage = (props) => {
  return (
    <TopNavbarMiddleContent
      routesJSX={displayRouteMenu(routes)}
      contentJSX={useContentJSX(props)}
    />
  );
};
