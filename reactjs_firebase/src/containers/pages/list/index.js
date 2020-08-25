import React, { useContext, useEffect, useState } from "react";
import { Container, Alert, Table, Form, Button } from "react-bootstrap";
import { AuthDataContext } from "../../../providers/authdata";
import firebase from "../../../providers/firebase";
import { Loading } from "../../../components/loading";

export function List(props) {
  const auth = useContext(AuthDataContext);

  const [error, setError] = useState();
  const [data, setData] = useState();

  const [inputs, setInputs] = useState({
    token: "",
    type: "",
    registration: "",
  });
  const { token, type, registration } = inputs;

  const [validated, setValidated] = useState();

  const [view, setView] = useState();

  useEffect(() => {
    if (props.match.params.request === "ticket") {
      firebase
        .firestore()
        .collection("tickets")
        .where("handler", "==", auth.uid)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            setData(
              snapshot.docs.map((doc) => {
                const id = doc.id;
                const data = doc.data();

                const iat = data.iat ? data.iat.seconds : null;
                const exp = data.exp ? data.exp.seconds : null;

                return { id, ...data, iat, exp };
              })
            );
          } else if (snapshot.empty) setData();
        })
        .catch((error) => setError(error.message));
    } else if (props.match.params.request === "operator") {
      firebase
        .firestore()
        .collection("users")
        .where("type", "==", "1")
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            setData(
              snapshot.docs.map((doc) => {
                const id = doc.id;

                return { id };
              })
            );
          } else if (snapshot.empty) {
          }
        })
        .catch((error) => setError(error.message));
    }
  }, [props.match.params.request, auth.uid]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      if (props.match.params.request === "ticket") {
        firebase
          .firestore()
          .collection("tickets")
          .doc(token)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const id = doc.id;
              const data = doc.data();

              const iat = data.iat ? data.iat.seconds : null;
              const exp = data.exp ? data.exp.seconds : null;

              setView({ id, ...data, iat, exp });
              setData();
            } else {
              setInputs((inputs) => ({ ...inputs, type: "" }));
              setView();
              setError("Please provide a valid ticker number");
            }
          })
          .catch((error) => setError(error.message));
      } else if (props.match.params.request === "operator") {
        firebase
          .firestore()
          .collection("tickets")
          .where("handler", "==", token)
          .get()
          .then((snapshot) => {
            if (!snapshot.empty) {
              setData(
                snapshot.docs.map((doc) => {
                  const id = doc.id;
                  const data = doc.data();

                  const iat = data.iat ? data.iat.seconds : null;
                  const exp = data.exp ? data.exp.seconds : null;

                  return { id, ...data, iat, exp };
                })
              );
            } else if (snapshot.empty) {
              setData();
              setError(
                "Either the User UID is not valid or the user has never handled a ticket."
              );
            }
          });
      }
    }

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
  };

  const createToken = () => {
    firebase
      .firestore()
      .collection("tickets")
      .add({
        status: "0",
        iat: firebase.firestore.Timestamp.now(),
      })
      .then((doc) => {
        const id = doc.id;

        const iat = Date.now() / 1000;

        setView({ id, iat });
        setData();
      })
      .catch((error) => setError(error.message));
  };

  const dateFormatter = (unix) => {
    if (!unix) return null;
    return new Date(unix * 1000).toString().split(" ").slice(0, 5).join(" ");
  };

  const priceFormatter = (type, iat) => {
    if (type === "Car") {
      const durationInMinutes = Math.ceil((Date.now() / 1000 - iat) / 60);
      if (durationInMinutes >= 1) return 5000 + 3000 * (durationInMinutes - 1);
      else return 5000;
    }
    if (type === "Motorcycle") {
      const durationInMinutes = Math.ceil((Date.now() / 1000 - iat) / 60);
      if (durationInMinutes >= 1) return 3000 + 1000 * (durationInMinutes - 1);
      else return 3000;
    }
  };

  const bill =
    type === ""
      ? null
      : type === "Car"
      ? "Rp" + priceFormatter(type, view.iat)
      : type === "Motorcycle"
      ? "Rp" + priceFormatter(type, view.iat)
      : null;

  const pay = () => {
    firebase.firestore().collection("tickets").doc(view.id).update({
      status: "1",
      exp: firebase.firestore.Timestamp.now(),
      type: type,
      registration: registration,
      bill: bill,
      handler: auth.uid,
    });

    setView({
      id: view.id,
      status: "1",
      iat: view.iat,
      exp: Date.now() / 1000,
      type: type,
      registration: registration,
      bill: bill,
    });
  };

  if (auth === "await") return <Loading />;
  else if (props.match.params.request === "operator")
    return (
      <div className="d-flex flex-fill">
        <Container>
          {error ? (
            <Alert className="mt-3" variant="warning">
              {error}
            </Alert>
          ) : null}
          <Form
            className="mt-3"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="token">
              <Form.Label>Search Operator</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter User UID"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid user UID.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          {data ? (
            <div className="mt-3">
              <p>Ticket handled by the user</p>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Issued At</th>
                    <th>Exit Time</th>
                    <th>Vehicle Type</th>
                    <th>Bill</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.id}</td>
                      <td>{dateFormatter(doc.iat)}</td>
                      <td>{dateFormatter(doc.exp)}</td>
                      <td>{doc.type}</td>
                      <td>{doc.bill}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : null}
        </Container>
      </div>
    );
  else if (props.match.params.request === "ticket")
    return (
      <div className="d-flex flex-fill">
        <Container>
          {error ? (
            <Alert className="mt-3" variant="warning">
              {error}
            </Alert>
          ) : (
            ""
          )}
          <Button className="mt-3" size="sm" onClick={createToken}>
            Print New Ticket
          </Button>
          <Form
            className="mt-3"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="token">
              <Form.Label>Scan Ticket Number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Ticket Number"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid ticket number
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          {view ? (
            <Table className="mt-3" responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Issued At</th>
                  {view.status === "1" ? <th>Exit Time</th> : null}
                  <th>Registration</th>
                  <th>Vehicle Type</th>
                  <th>Bill</th>
                  {view.status === "1" ? null : <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{view.id}</td>
                  <td>{dateFormatter(view.iat)}</td>
                  {view.status === "1" ? (
                    <td>{dateFormatter(view.exp)}</td>
                  ) : null}
                  {view.status === "1" ? (
                    <td>{view.registration}</td>
                  ) : (
                    <td>
                      <Form.Group controlId="registration">
                        <Form.Control
                          required
                          type="text"
                          size="sm"
                          placeholder="Registration Plate"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </td>
                  )}
                  {view.status === "1" ? (
                    <td>{view.type}</td>
                  ) : (
                    <td>
                      <Form.Group controlId="type">
                        <Form.Control
                          required
                          as="select"
                          size="sm"
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option>Car</option>
                          <option>Motorcycle</option>
                        </Form.Control>
                      </Form.Group>
                    </td>
                  )}
                  {view.status === "1" ? <td>{view.bill}</td> : <td>{bill}</td>}
                  {view.status === "1" ? null : bill && registration ? (
                    <td>
                      <Button size="sm" onClick={pay}>
                        Pay
                      </Button>
                    </td>
                  ) : (
                    <td>
                      <Button disabled={true} size="sm">
                        Pay
                      </Button>
                    </td>
                  )}
                </tr>
              </tbody>
            </Table>
          ) : null}
          {data ? (
            <div className="mt-3">
              <p>Ticket handled by you</p>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Issued At</th>
                    <th>Exit Time</th>
                    <th>Vehicle Type</th>
                    <th>Bill</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.id}</td>
                      <td>{dateFormatter(doc.iat)}</td>
                      <td>{dateFormatter(doc.exp)}</td>
                      <td>{doc.type}</td>
                      <td>{doc.bill}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : null}
        </Container>
      </div>
    );
}
