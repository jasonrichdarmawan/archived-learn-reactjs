import React from "react";

import Container from "react-bootstrap/Container";

import { RenderItems } from "./ValuesData";

export const Values: React.FC = () => {
  return (
    <Container className="my-3">
      <div className="d-flex flex-wrap">
        <RenderItems />
      </div>
    </Container>
  );
};

export default Values;
