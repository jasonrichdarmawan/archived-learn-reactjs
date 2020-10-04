import React from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";

export const Contact: React.FC = () => {
  const target: string = "628118751555";
  let firstName: string;
  let message: string;

  const handleChange = (event: { target: { id: string; value: string } }) => {
    if (event.target.id === "firstName") firstName = event.target.value;
    if (event.target.id === "message") message = event.target.value;
  };

  const encode = (value: string) => {
    return value.replace(/\s/g, "%20");
  };

  const handleSubmit = (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    window.open(
      `https://wa.me/${target}?text=My%20name%20is%20${encode(
        firstName
      )}.%20${encode(message)}`
    );
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Container className="my-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Please send a shout out with your real name (please, I'd like to
            call you correctly)
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="I have the following questions: "
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Send to WhatsApp
        </Button>
      </Form>
    </Container>
  );
};

export default Contact;
