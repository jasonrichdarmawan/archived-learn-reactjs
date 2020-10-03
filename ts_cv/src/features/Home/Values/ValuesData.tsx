import React from "react";
import { Card } from "react-bootstrap";

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
      "In my early days of coding. I wanted to have my own @jason.com email without paying premium. I built the mail server. After a month, I must relied on notes to maintain the mail server.",
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
