import React from "react";
import { NavigationBar } from "../../organisms";
import { Container } from "react-bootstrap";

export const PlacementTemplate = ({
  routes,
  ...props
}) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavigationBar routes={routes} />
      <div className="d-flex flex-fill mt-3">
        <Container>
        </Container>
      </div>
    </div>
  );
};
