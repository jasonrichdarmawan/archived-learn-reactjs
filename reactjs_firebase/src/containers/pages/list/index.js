import React, { useContext, useEffect, useState } from "react";
import { Container, Alert, Table, Form, Button } from "react-bootstrap";
import { AuthDataContext } from "../../../providers/authdata";
import firebase from "../../../providers/firebase";
import { Loading } from "../../../components/loading";
import { dateFormatter, priceFormatter } from "./formatter";

export function List(props) {
  const auth = useContext(AuthDataContext);

  useEffect(() => {
    if (auth.uid != null && props.match.params.request === "ticket") {
      const today = new Date(new Date().setHours(0, 0, 0, 0));

      firebase
        .firestore()
        .collection("tickets")
        .where("handler", "==", auth.uid)
        .where("exp", ">=", today)
        .orderBy("exp", "desc")
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

      setInputs((inputs) => ({ ...inputs, type: "" }));
      setView();
    } else if (props.match.params.request === "operator") {
      firebase
        .firestore()
        .collection("users")
        .where("type", "==", "1")
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            setDataOperator(
              snapshot.docs.map((doc) => {
                const id = doc.id;

                return { id };
              })
            );
          } else if (snapshot.empty) {
            setDataOperator();
          }
        })
        .catch((error) => setError(error.message));

      firebase
        .firestore()
        .collection("tickets")
        .where("status", "==", "0")
        .orderBy("iat", "desc")
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            setDataTicket(
              snapshot.docs.map((doc) => {
                const id = doc.id;

                const data = doc.data();
                const iat = data.iat ? data.iat.seconds : null;

                return { id, iat };
              })
            );
          } else if (snapshot.empty) {
            setDataTicket();
          }
        })
        .catch((error) => setError(error.message));

      setData();
    }

    setError();
  }, [props.match.params.request, auth.uid]);

  const [inputs, setInputs] = useState({
    token: "",
    type: "",
    registration: "",
  });
  const { token, type, registration } = inputs;
  const [validated, setValidated] = useState();

  const [error, setError] = useState();
  const [data, setData] = useState();
  const [dataOperator, setDataOperator] = useState();
  const [dataTicket, setDataTicket] = useState();
  const [view, setView] = useState();

  // question: is separating the JSX element like these a good idea?
  const ErrorAlert = () => (
    <Alert className="mt-3" variant="warning">
      {error}
    </Alert>
  );

  const OperatorTable = () => (
    <div className="mt-3">
      <p>Operator List</p>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {dataOperator.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const ActiveTicketTable = () => (
    <div className="mt-3">
      <p>Active Ticket List</p>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Issued At</th>
          </tr>
        </thead>
        <tbody>
          {dataTicket.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{dateFormatter(doc.iat)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const TicketHandledByUserTable = () => (
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
  );

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

              setView();
              setDataOperator();
              setDataTicket();
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

  const bill =
    type === ""
      ? null
      : type === "Car"
      ? priceFormatter(type, view.iat)
      : type === "Motorcycle"
      ? priceFormatter(type, view.iat)
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
          {error ? <ErrorAlert /> : null}
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
          {/* question: how to safely store firebase admin credentials? is it okay to store name, email, etc of a user in firestore? */}
          {dataOperator ? <OperatorTable /> : null}
          {dataTicket ? <ActiveTicketTable /> : null}
          {data ? <TicketHandledByUserTable /> : null}
        </Container>
      </div>
    );
  else if (props.match.params.request === "ticket")
    return (
      <div className="d-flex flex-fill">
        <Container>
          {error ? <ErrorAlert /> : null}
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
          {/* question: why separating the JSX element caused everytime you input a value the JSX element got remounted? */}
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
                          value={registration}
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
                          value={type}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option>Car</option>
                          <option>Motorcycle</option>
                        </Form.Control>
                      </Form.Group>
                    </td>
                  )}
                  {view.status === "1" ? (
                    <td>{"Rp" + view.bill}</td>
                  ) : bill !== null ? (
                    <td>{"Rp" + bill}</td>
                  ) : (
                    <td></td>
                  )}
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
          {data ? <TicketHandledByUserTable /> : null}
        </Container>
      </div>
    );
}
