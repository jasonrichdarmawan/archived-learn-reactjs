import React from "react";
import { Col, Container } from "react-bootstrap";
import { Item, Items } from "./AboutData";

const RenderItems: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <Col sm={6} key={item.TextHeading + index} className="px-3">
          <h5 className="text-center mb-3">{item.TextHeading}</h5>
          {item.Content}
        </Col>
      ))}
    </>
  );
};

export const About: React.FC = () => {
  return (
    <div className="m-3">
      <p className="text-center">Jason Rich Darmawan Onggo Putra</p>
      <p className="text-center">Undergraduate Business Management</p>
      <div className="d-flex flex-wrap">
        <RenderItems items={Items} />
      </div>
    </div>
  );
};

export default About;
