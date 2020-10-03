import React from "react";
import { Card, Col, Container } from "react-bootstrap";
import { Item, Items } from "./ValuesData";

const RenderItems: React.FC<{ items: Item[] }> = ({ items }) => (
  <>
    {items.map((item, index) => (
      <Col sm={6} key={item.Text + index} className="my-3">
        <Card>
          <Card.Body>
            <Card.Title>{item.Title}</Card.Title>
            <Card.Subtitle>{item.Subtitle}</Card.Subtitle>
            <Card.Text>{item.Text}</Card.Text>
            <a href={item.href}>{item.TextHref}</a>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </>
);

export const Values: React.FC = () => {
  return (
    <Container className="my-3">
      <div className="d-flex flex-wrap">
        <RenderItems items={Items} />
      </div>
    </Container>
  );
};

export default Values;
