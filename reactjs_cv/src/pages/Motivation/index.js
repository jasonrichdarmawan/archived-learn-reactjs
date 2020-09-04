import React from "react";
import { TopNavbarMiddleContent } from "../../components/templates";
import { displayRouteMenu, routes } from "../../routes";
import { Container } from "react-bootstrap";

const contentJSX = () => {
  return (
    <Container>
      <blockquote className="blockquote text-justify">
        <p>
          At the age of 20, this year, marked my appreciation for hard work and
          the value of continuous improvement. I realized that I should not
          quickly satisfied and I should always improve my skills.
        </p>
        <p>
          I witnessed the impact of technology in China. Technology contributes
          to almost every aspect of poverty allevation program in China. From
          the economic policy to education policy.
        </p>
        <p className="mb-0">
          Through technology, I believe I can maximize my impact while also
          creating wealth.
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
        <br />
        <p className="mb-0">
          Apple suffered for several years from lousy engineering management. I
          have to say it. There were people that were going off in 18 different
          directions doing arguably interesting things in each one of them. Good
          engineers, lousy management. ... So we had to decide, what are the
          fundamental directions we are going in, what make sense and what
          doesn't ... And the results to that focus is gonna be some really
          great products ...
        </p>
        <footer className="blockquote-footer">
          Steve Jobs <cite title="Source Title">, Apple</cite>
        </footer>
      </blockquote>
    </Container>
  );
};

export const Motivation = () => {
  return (
    <TopNavbarMiddleContent
      routesJSX={displayRouteMenu(routes)}
      contentJSX={contentJSX()}
    />
  );
};
