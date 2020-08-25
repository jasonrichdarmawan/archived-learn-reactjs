import React, { useContext, useEffect, useState } from "react";
import { Container, Alert, Table, Form, Button } from "react-bootstrap";
import { AuthDataContext, UserDataContext } from "../../../providers/authdata";
import firebase from "../../../providers/firebase";
import { Loading } from "../../../components/loading";
import { Redirect } from "react-router-dom";

export function List(props) {
  const auth = useContext(AuthDataContext);
  const user = useContext(UserDataContext);

  const [error, setError] = useState();
  const [data, setData] = useState([]);

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
        .get()
        .then((snapshot) => {
          setData(
            snapshot.docs.map((doc) => {
              const id = doc.id;
              const data = doc.data();

              const iat = data.iat ? data.iat.seconds : null;
              const exp = data.exp ? data.exp.seconds : null;

              return { id, ...data, iat, exp };
            })
          );
        })
        .catch((error) => setError(error.message));
    }
  }, [props.match.params.request]);

  if (props.match.params.request === "operator" && user.type === "1")
    return <Redirect to="/list" />;

  const handleChange = (event) => {
    const { id, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
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
    }

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
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
          ) : (
            ""
          )}
          {data ? <div className="mt-3">TODO</div> : ""}
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
          <Form
            className="mt-3"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="token">
              <Form.Label>Ticket Number</Form.Label>
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
                  <th>Exit Time</th>
                  <th>Registration</th>
                  <th>Vehicle Type</th>
                  <th>Bill</th>
                  {view.status === "1" ? "" : <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{view.id}</td>
                  <td>{dateFormatter(view.iat)}</td>
                  <td>{dateFormatter(view.exp)}</td>
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
                  {view.status === "1" ? (
                    ""
                  ) : bill && registration ? (
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
          ) : (
            ""
          )}
          {data ? (
            <Table className="mt-3" responsive>
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
          ) : (
            ""
          )}
        </Container>
      </div>
    );
}
