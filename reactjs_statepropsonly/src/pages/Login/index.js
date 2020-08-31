import React from "react";
import { Container, Alert, Form, FormGroup, FormLabel, FormControl } from "../../components";

export const Login = () => (
  <div className="min-vh-100 d-flex align-items-center">
    <Container className="container w-auto text-center">
      <Form>
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl type="text" placeholder="Enter username" />
        </FormGroup>
      </Form>
      {/* <form>
        <Alert variant="warning">Error</Alert>
        <div className="form-group">
          <label for="username">Username</label>
          <input type="text" className="form-control form-control-sm" id="username" placeholder="Enter username" />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control form-control-sm" id="password" placeholder="Enter password" />
        </div>
      </form> */}
    </Container>
  </div>
);
