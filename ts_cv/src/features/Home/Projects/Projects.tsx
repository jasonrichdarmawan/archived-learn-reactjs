import React from "react";
import { Accordion, Button, Card, ListGroup, Nav } from "react-bootstrap";
import { Item, Items } from "./ProjectsData";

const RenderItems: React.FC<{items: Item[]}> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <ListGroup.Item key={item.TextLeft + index}>
          <a href={item.href}>
            <p className="mx-3 my-0">
              {item.TextLeft} <b>{item.TextCenter}</b> {item.TextRight}
            </p>
          </a>
        </ListGroup.Item>
      ))}
    </>
  );
};

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
          <ListGroup variant="flush">
            <p className="p-3 mb-0 border-bottom">
              Day 0 beginning on April 26th, 2020, the day I discovered GitHub:
            </p>
            <RenderItems items={Items} />
          </ListGroup>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Projects;
