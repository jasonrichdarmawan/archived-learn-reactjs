import React from "react";
import Container from "react-bootstrap/Container";

export const Motivation: React.FC = () => {
  return (
    <Container className="my-3">
      <blockquote className="blockquote text-justify">
        <p>
          I witnessed the impact of technology in China. Technology contributes
          to almost every aspect of poverty allevation program in China. From
          the economic policy to education policy.
        </p>
        <p className="mb-0">
          At the age of 20, I realized that I should not quickly satisfied and I
          should always improve my skills. Through technology, I believe I can
          maximize my impact while also creating wealth.
        </p>
        <footer className="blockquote-footer">
          Jason <cite title="Source Title">from Indonesia</cite>
        </footer>
        <br />
        <p className="mb-0">
          Nothing is free. Nothing is easy. If you want to be successful, you
          have to pay the price.
        </p>
        <footer className="blockquote-footer">
          Jack Ma <cite title="Source Title">, Alibaba Group</cite>
        </footer>
      </blockquote>
    </Container>
  );
};

export default Motivation;
