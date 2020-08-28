import React from "react";
import { TopNavbarMiddleContent } from "../../components/templates";
import { displayRouteMenu, routes } from "../../routes";
import { Container, Row, Col, Card } from "react-bootstrap";

const data = [
  {
    title: "Minimum Viable Product",
    subtitle: "Focus on testing the MVP, everything else can wait.",
    text:
      "In my early days of coding. I tried to create an algorithm to generate a Puzzle in 30ms. It took 4 days to create and test the idea. But after the idea works on paper, it only took 1 hour to refactor the code.",
    ahrefLink:
      "https://github.com/kidfrom/sudoku_js/blob/master/dump/white_paper.MD",
    ahrefText: "Day 103th of coding",
  },
  {
    title: "Documentation",
    subtitle: "Learn from the mistakes.",
    text:
      "In my early days of coding. I wanted to have my own @jason.com email without paying premium. I built the mail server. After a month, I must relied on notes to maintain the mail server.",
    ahrefLink: "https://github.com/kidfrom/docs/blob/master/EMAIL.md",
    ahrefText: "Day 24th of coding",
  },
];

const contentJSX = (data) => {
  return (
    <Container>
      <Row>
        {data.map((cur) => (
          <Col key={cur.ahrefText}>
            <Card>
              <Card.Body>
                <Card.Title>{cur.title}</Card.Title>
                <Card.Subtitle>{cur.subtitle}</Card.Subtitle>
                <Card.Text>{cur.text}</Card.Text>
                <a href={"" + cur.ahrefLink}>{cur.ahrefText}</a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export const CoreValues = () => {
  return (
    <TopNavbarMiddleContent
      routesJSX={displayRouteMenu(routes)}
      contentJSX={contentJSX(data)}
    />
  );
};
