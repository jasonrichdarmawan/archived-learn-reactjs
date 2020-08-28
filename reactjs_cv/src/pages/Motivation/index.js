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
        <p class="mb-0">
          Through technology, I believe I can maximize my impact while also
          creating wealth.
        </p>
        <footer class="blockquote-footer">
          Jason <cite title="Source Title">from Indonesia</cite>
        </footer>
        <br />
        <p class="mb-0">
          Nothing is free. Nothing is easy. If you want to be successful, you
          have to pay the price.
        </p>
        <footer class="blockquote-footer">
          Jack Ma <cite title="Source Title">, Alibaba Group</cite>
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
