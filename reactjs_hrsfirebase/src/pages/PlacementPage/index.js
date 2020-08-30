import React from "react";
import { TopNavbarMiddleContent } from "../../components";
import { displayRouteMenu, routes } from "../../routes";
import { Container } from "react-bootstrap";

const useContentJSX = (props) => {
  return (
    <Container className="mt-3">
      <p className="font-weight-bold">Work Placement</p>
    </Container>
  );
};

export const PlacementPage = (props) => {
  return (
    <TopNavbarMiddleContent
      routesJSX={displayRouteMenu(routes)}
      contentJSX={useContentJSX(props)}
    />
  );
};
