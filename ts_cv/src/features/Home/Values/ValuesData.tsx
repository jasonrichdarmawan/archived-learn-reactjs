import React from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export interface Item {
  Title: string;
  Subtitle: string;
  Text: string;
  TextHref: string;
  href: string;
}

export const Items: Item[] = [
  {
    Title: "Documentation",
    Subtitle: "Learn from the mistakes.",
    Text:
      "In my early days of coding. I wanted to have my own @jason.com email without paying premium. I built the mail server. After a month, I use the documents to maintain the mail server.",
    TextHref: "Day 24th of coding",
    href: "https://github.com/kidfrom/docs/blob/master/EMAIL.md",
  },
  {
    Title: "Minimum Viable Product",
    Subtitle: "Focus on testing the MVP, everything else can wait.",
    Text:
      "I tried to create an algorithm to generate a Puzzle in 30ms. It took 4 days to create and test the idea. But after the idea works on paper, it only took 1 hour to refactor the code.",
    TextHref: "Day 103th of coding",
    href:
      "https://github.com/kidfrom/sudoku_js/blob/master/dump/white_paper.MD",
  },
];

export const RenderItems: React.FC = () => (
  <>
    {Items.map((item, index) => (
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