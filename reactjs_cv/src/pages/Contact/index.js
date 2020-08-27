import React from "react";
import { TopNavbarMiddleContent } from "../../components/templates";
import { displayRouteMenu, routes } from "../../routes";
import { Container, Form, Button } from "react-bootstrap";

const contentJSX = () => {
  let target = "628118751555";
  let firstName = "";
  let message = "";

  const handleChange = (event) => {
    if (event.target.id === "firstName") firstName = event.target.value;
    if (event.target.id === "message") message = event.target.value;
  }

  const handleSubmit = (event) => {
    LinkToWhatsApp();
    event.preventDefault();
    event.stopPropagation();
  }

  const encode = (value) => {
    return value.replace(/\s/g, '%20');
  }

  const LinkToWhatsApp = () => {
    window.open(`https://wa.me/${target}5?text=My%20name%20is%20${encode(firstName)}.%20${encode(message)}`);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Your name" onChange={handleChange} />
          <Form.Text className="text-muted">
            Please send a shout out with your real name (please, I'd like to call you correctly)
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control type="text" placeholder="I have the following questions: " onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Send to WhatsApp
        </Button>
      </Form>
    </Container>
  );
};

export const Contact = () => {
  return (
    <TopNavbarMiddleContent
      routesJSX={displayRouteMenu(routes)}
      contentJSX={contentJSX()}
    />
  );
};
