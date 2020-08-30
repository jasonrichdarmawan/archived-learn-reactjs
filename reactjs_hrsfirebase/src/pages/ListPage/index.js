import React, { useState, useEffect } from "react";
import { displayRouteMenu, routes } from "../../routes";
import { TopNavbarMiddleContent } from "../../components";
import { Route, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Table,
  Image,
} from "react-bootstrap";
import { firebase } from "../../providers";

const useContentJSX = (props) => {
  const [errorMessage, setErrorMessage] = useState();

  const [listData, setListData] = useState();

  const [cvData, setCVData] = useState();

  const [file, setFile] = useState();

  useEffect(() => {
    if (props.match.params.request === "employee") {
      setListData();

      if (!props.match.params.id) {
        firebase
          .firestore()
          .collection("users")
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
        firebase
          .firestore()
          .collection("cv")
          .doc(props.match.params.id)
          .get()
          .then((doc) =>
            doc.exists
              ? setCVData(doc.data())
              : firebase
                  .firestore()
                  .collection("users")
                  .doc(props.match.params.id)
                  .get()
                  .then((doc) => {
                    doc.exists
                      ? setListData(() => {
                          const id = doc.id;
                          const data = doc.data();
                          return { id, ...data };
                        })
                      : setListData();
                  })
          );

        firebase
          .storage()
          .ref(`/users/${props.match.params.id}/0.jpg`)
          .getDownloadURL()
          .then((url) => setFile(url))
          .catch((error) => setErrorMessage(error.message));
      }
    } else if (props.match.params.request === "department") {
      setListData();
      if (!props.match.params.id) {
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
        firebase
          .firestore()
          .collection("departments")
          .doc(props.match.params.id)
          .get()
          .then((doc) => {
            doc.exists ? setListData(doc.data()) : setListData();
          });
      }
    }
    return () => {};
  }, [props.match.params.request]);

  if (props.match.params.request === "employee") {
    if (!props.match.params.id)
      return (
        <Container className="mt-3">
          {errorMessage ? (
            <Alert className="mt-3" variant="warning">
              {errorMessage}
            </Alert>
          ) : null}
          <Row>
            <Col sm="6">
              <p className="font-weight-bold">List Employee</p>
            </Col>
            <Col sm="6">
              <Button
                className="float-right"
                size="sm"
                variant="outline-primary"
              >
                <Link to="/app/list/department">Department</Link>
              </Button>
            </Col>
          </Row>
          {listData ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {listData.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <Link to={"/app/list/employee/" + doc.id}>{doc.id}</Link>
                    </td>
                    <td>{doc.displayName}</td>
                    <td>{doc.email}</td>
                    <td>{doc.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : null}
        </Container>
      );
    else if (props.match.params.id) {
      return (
        <Container className="mt-3">
          {cvData ? (
            <React.Fragment>
              <Image
                className="mb-3 mx-auto d-block"
                src={file}
                roundedCircle
              />
              <p className="text-center">{cvData.name}</p>
              <p className="text-center">{cvData.majors}</p>
              <div className="d-flex flex-wrap">
                {cvData.content.map((cur) => (
                  <div className="w-50" key={cur.title}>
                    <h5 className="text-center">{cur.title}</h5>
                    <br />
                    {cur.content.map((cur) => (
                      <React.Fragment
                        key={
                          cur.title
                            ? cur.title
                            : cur.subtitle
                            ? cur.subtitle
                            : cur.ul
                            ? cur.ul[0]
                            : null
                        }
                      >
                        {cur.title ? (
                          <React.Fragment>
                            <strong>{cur.title}</strong>
                            <br />
                          </React.Fragment>
                        ) : null}
                        {cur.subtitle ? (
                          <React.Fragment>
                            <i>{cur.subtitle}</i>
                            <br />
                          </React.Fragment>
                        ) : null}
                        {cur.ul ? (
                          <ul>
                            {cur.ul.map((cur) => (
                              <li key={cur}>{cur}</li>
                            ))}
                          </ul>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </React.Fragment>
          ) : listData ? (
            <React.Fragment>
              <p className="font-weight-bold text-center">
                Employee's Curriculum Vitae
              </p>
              <Image
                className="mb-3 mx-auto d-block"
                src={file}
                roundedCircle
              />
              <p className="text-center">{"Name: " + listData.displayName}</p>
              <p className="text-center">{"Email: " + listData.email}</p>
              <p className="text-center">
                {"Phone Number: " + listData.phoneNumber}
              </p>
            </React.Fragment>
          ) : // (
          //   <React.Fragment>
          //     <p className="font-weight-bold text-center">
          //       Employee's Curriculum Vitae
          //     </p>
          //     <Image
          //       className="mb-3 mx-auto d-block"
          //       src={file}
          //       roundedCircle
          //     />
          //     <p className="text-center">{"Name: " + userData.displayName}</p>
          //     <p className="text-center">{"Email: " + userData.email}</p>
          //     <p className="text-center">
          //       {"Phone Number: " + userData.phoneNumber}
          //     </p>
          //   </React.Fragment>
          // )
          null}
        </Container>
      );
    }
  } else if (props.match.params.request === "department") {
    if (!props.match.params.id)
      return (
        <Container className="mt-3">
          {errorMessage ? (
            <Alert className="mt-3" variant="warning">
              {errorMessage}
            </Alert>
          ) : null}
          <Row>
            <Col sm="6">
              <p className="font-weight-bold">List Department</p>
            </Col>
            <Col sm="6">
              <Button
                className="float-right"
                size="sm"
                variant="outline-primary"
              >
                <Link to="/app/list/employee">Employee</Link>
              </Button>
            </Col>
          </Row>
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
                      <Link to={"/app/list/department/" + doc.id}>
                        {doc.id}
                      </Link>
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
    else if (props.match.params.id) {
      return (
        <Container className="mt-3">
          {errorMessage ? (
            <Alert className="mt-3" variant="warning">
              {errorMessage}
            </Alert>
          ) : null}
          <Row>
            <Col sm="6">
              <p className="font-weight-bold">List Department</p>
            </Col>
            <Col sm="6">
              <Button
                className="float-right"
                size="sm"
                variant="outline-primary"
              >
                <Link to="/app/list/employee">Employee</Link>
              </Button>
            </Col>
          </Row>
          {listData ? (
            <React.Fragment>
              <p className="font-weight-bold">{listData.displayName}</p>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.members.map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <Link to={"/app/list/employee/" + doc.id}>
                          {doc.id}
                        </Link>
                      </td>
                      <td>{doc.displayName}</td>
                      <td>{doc.email}</td>
                      <td>{doc.phoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </React.Fragment>
          ) : null}
        </Container>
      );
    }
  } else return <Route component={() => <h1>Not Found!</h1>} />;
};

export const ListPage = (props) => {
  return (
    <TopNavbarMiddleContent
      routesJSX={displayRouteMenu(routes)}
      contentJSX={useContentJSX(props)}
    />
  );
};
