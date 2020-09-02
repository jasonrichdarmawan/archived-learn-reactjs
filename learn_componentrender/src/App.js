import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function App() {
  return (
    <ContextProvider>
      <AlertTest />
      <FormTest />
    </ContextProvider>
  );
}

class ContextProvider extends React.Component {
  state = {
    data: {},
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

const Context = React.createContext();

const FormTest = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // const { email, password } = inputs;

  const formInputs = [
    {
      controlId: "email",
      label: "email",
      type: "text",
      placeholder: "Enter email",
      text: "We'll never share your email with anyone else.",
    },
    {
      controlId: "password",
      label: "password",
      type: "password",
      placeholder: "Password",
    },
    {
      controlId: "checkbox",
      label: "Check me out",
      type: "checkbox",
    },
  ];

  const handleChange = (event) => {
    const { id, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  };

  return (
    <React.Fragment>
      <Form>
        {formInputs.map((input) => (
          <FormGroupTest
            controlId={input.controlId}
            label={input.label}
            type={input.type}
            placeholder={input.placeholder}
            text={input.text}
          />
        ))}
        {/* <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

const FormGroupTest = ({ controlId, label, type, placeholder, text }) => (
  <Form.Group controlId={controlId}>
    {type !== "checkbox" && (
      <React.Fragment>
        <Form.Label>{label}</Form.Label>
        <Form.Control type={type} placeholder={placeholder} />
      </React.Fragment>
    )}
    {text && <Form.Text className="text-muted">{text}</Form.Text>}
    {type === "checkbox" && <Form.Check type={type} label={label} />}
  </Form.Group>
);

const AlertTest = () => {
  return <Alert variant="warning"></Alert>;
};

export default App;
