import React from "react";
import { TopNavbarMiddleContent } from "../../components/templates";
import { displayRouteMenu, routes } from "../../routes";
import { Container } from "react-bootstrap";

const data = [
  {
    title: "Personal Details",
    content:
      "I am a 20 years old student with experience in corporate bookkeeping and financial budgeting. I'm seeking an experience in IT management.",
  },
  {
    title: "Professional Summary",
    content: [
      {
        strong: "Account Manager",
        italic: "Tempat Kerja Indonesia, Incorporated | 2020 - present",
        ul: [
          {
            text: "Prepared the incorporation's legal document.",
          },
          {
            text: "Built relationship with the suppliers in China.",
          },
          {
            text: "Identified potential partner in Indonesia.",
          },
        ],
      },
      {
        strong: "Business Process Improvement Intern",
        italic: "Step Point Indonesia, Incorporated | Jan 2018 - Mar 2018",
        ul: [
          {
            text:
              "Examined the office politics situations in the HR and Operation dept.",
          },
          {
            text: "Examined the workload of the Admin dept.",
          },
          {
            text:
              "Prepared the findings report and recommended the preliminary action.",
          },
        ],
      },
    ],
  },
  {
    title: "Skills/Interest",
    content: [
      {
        ul: [
          {
            text: "Reading fantasy books.",
          },
          {
            text: "Traveling and culinary.",
          },
          {
            text: "Know-how to deploy ERP software.",
          },
        ],
      },
    ],
  },
  {
    title: "Education",
    content: [
      {
        strong: "Prasetiya Mulya University",
        italic:
          "S1 Business Management | 2017 - present, currently in a gap year",
        ul: [
          {
            text: "GPA: 3.77",
          },
          {
            text:
              "Scholarship winner for the 2018/2019, 2019/2020 academic year.",
          },
        ],
      },
    ],
  },
  {
    title: "Working Experience",
    content: [
      {
        strong: "Sales and Quality Control Staff",
        italic: "AIESEC in Prasetiya Mulya | Mar 2018 - Mar 2019",
        ul: [
          {
            text: "Prepared the guest residence for the iGV participants.",
          },
          {
            text:
              "Prepared the iGV participants for the Global Village in Kota Tua.",
          },
        ],
      },
      {
        strong: "Organizing Committee President",
        italic: "AIESEC in Prasetiya Mulya | Jun 2018 - Aug 2018",
        ul: [
          {
            text:
              "Negotiated the terms for permissions to held Global Village.",
          },
          {
            text: "Worked with Polsek Metro Tamansari.",
          },
          {
            text:
              "The event was visited by Deputy Governor for Culture and Tourism.",
          },
        ],
      },
    ],
  },
  {
    title: "Reach Me At",
    content: [
      {
        mobile: "Mobile: +62 811 8751 555",
        email: "jason.onggo@tempatkerja.com",
      },
    ],
  },
];

const contentJSX = (data) => {
  return (
    <Container>
      <p className="text-center">Jason Rich Darmawan Onggo Putra</p>
      <p className="text-center">S1 Business Management</p>
      <div className="d-flex flex-wrap">
        {data.map((cur) => (
          <div className="w-50" key={cur.title}>
            <h5 className="text-center">{cur.title}</h5>
            <br />
            {typeof cur.content === "string" ? (
              cur.content
            ) : Array.isArray(cur.content) ? (
              <React.Fragment>
                {cur.content.strong ? (
                  <strong>{cur.content.strong}</strong>
                ) : null}
                {cur.content.italic ? <i>{cur.content.italic}</i> : null}
                {cur.content.map((cur) => (
                  <React.Fragment key={cur.strong}>
                    {cur.strong ? (
                      <React.Fragment>
                        <strong>{cur.strong}</strong>
                        <br />
                      </React.Fragment>
                    ) : null}
                    {cur.italic ? <i>{cur.italic}</i> : null}
                    {cur.mobile ? <p>{"Mobile: " + cur.mobile}</p> : null}
                    {cur.email ? <p>{"Email: " + cur.email}</p> : null}
                    <ul>
                      {Array.isArray(cur.ul)
                        ? cur.ul.map((cur) => <li key={cur.text}>{cur.text}</li>)
                        : null}
                    </ul>
                  </React.Fragment>
                ))}
                <br />
              </React.Fragment>
            ) : null}
          </div>
        ))}
      </div>
    </Container>
  );
};

export const About = () => {
  return (
    <TopNavbarMiddleContent
      routesJSX={displayRouteMenu(routes)}
      contentJSX={contentJSX(data)}
    />
  );
};
