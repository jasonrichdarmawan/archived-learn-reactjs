import React from "react";
import { TopNavbarMiddleContent } from "../../components";
import { displayRouteMenu, routes } from "../../routes";
import { Accordion, Card, ListGroup } from "react-bootstrap";

const data = [
  {
    title: "About this website",
    ul: [
      "The purpose of this website is to present Jason's Curriculum Vitae in ReactJS with Atomic Design",
    ],
  },
  {
    title: {
      b: "Day 86:",
      text: "Calculator in JS (Live Preview)",
    },
    iframe: "https://kidfrom.github.io/calculator_js/index.html",
  },
  {
    title: {
      b: "Day 108:",
      text: "Guest List in JS with Local Storage (Live Preview)",
    },
    iframe:
      "https://raw.githack.com/kidfrom/bc_g2_learn_reactjs/offline-storage/learn_offline-storage/index.html",
  },
  {
    title: {
      b: "Day 112:",
      text: "Express, Firebase, Firestore, ReactJS",
      subtext: "(Source Code)",
    },
    content: [
      {
        bold: "Day 112:",
        text: "HRS Mockup with ReactJS and Local Storage",
        ahref:
          "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/hrs-mockup/learn_reactjs",
        ahrefText: "(Source Code)",
      },
      {
        bold: "Day 117:",
        text: "Client-side JWT Authentication with Express",
        ahref: "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/jwt",
        ahrefText: "(Source Code)",
      },
      {
        bold: "Day 118:",
        text: "Parking Management System with ReactJS, Firebase & Firestore",
        ahref:
          "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs-firebase/reactjs_firebase",
        ahrefText: "(Source Code)",
      },
      {
        bold: "Day 123:",
        text: "Designing Protected Routes",
        ahref:
          "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_sdr/reactjs_sdr",
        ahrefText: "(Source Code)",
      },
      {
        bold: "Day 123:",
        text:
          "Curriculum Vitae in ReactJS with Planned Routes and Atomic Design",
        ahref:
          "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_cv/reactjs_cv",
        ahrefText: "(Source Code)",
      },
    ],
  },
];

const contentJSX = (data) => {
  return (
    <Accordion defaultActiveKey="0">
      <React.Fragment>
        {data.map((cur, i) => (
          <Card key={"" + cur.title.text}>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey={"" + i}>
                {typeof cur.title === "object" ? (
                  <React.Fragment>
                    <b>{cur.title.b}</b> {cur.title.text}{" "}
                    <b>{cur.title.subtext}</b>
                  </React.Fragment>
                ) : (
                  cur.title
                )}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={"" + i}>
              <Card.Body>
                {cur.ul ? (
                  <ListGroup>
                    {cur.ul.map((cur) => (
                      <ListGroup.Item key={cur}>{cur}</ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : null}
                {cur.iframe ? (
                  <iframe
                    title={cur.title}
                    src={"" + cur.iframe}
                    className="w-100 vh-100"
                  />
                ) : null}
                {cur.content ? (
                  <ListGroup>
                    {cur.content.map((cur, i) => (
                      <ListGroup.Item key={cur.bold + i}>
                        <b>{cur.bold}</b> {cur.text}{" "}
                        <a href={"" + cur.ahref}>{cur.ahrefText}</a>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : null}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </React.Fragment>
    </Accordion>
  );
};

export const Home = () => {
  return (
    <TopNavbarMiddleContent
      routesJSX={displayRouteMenu(routes)}
      contentJSX={contentJSX(data)}
    />
  );
};
