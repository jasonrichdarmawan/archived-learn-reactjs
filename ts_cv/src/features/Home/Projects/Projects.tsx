import React from "react";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { RenderItems } from "./ProjectsData";

export const Projects: React.FC = () => {
  return (
    <Accordion defaultActiveKey="0" className="m-3">
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Progress
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <RenderItems />
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Projects;
