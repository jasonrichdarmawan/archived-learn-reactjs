import React from "react";

import Col from "react-bootstrap/Col";
export interface Item {
  TextHeading: string;
  Content: JSX.Element;
}

export const Items: Item[] = [
  {
    TextHeading: "Personal Details",
    Content: (
      <p className="text-justify">
        I am a 20 years old student with experience in corporate bookkeeping and
        financial budgeting. I’m seeking a position as a Software Engineer.{" "}
        <b>My focus is JavaScript, TypeScript (React) and Java (Spring).</b> I'm also
        seeking an experience in IT management within 2 years.
      </p>
    ),
  },
  {
    TextHeading: "Professional Summary",
    Content: (
      <>
        <p className="font-weight-bold my-0">Account Manager</p>
        <p className="font-italic my-0">
          Tempat Kerja Indonesia, Incorporated | 2020 - present
        </p>
        <ul>
          <li>Prepared the incorporation's legal document.</li>
          <li>Built relationship with the suppliers in China.</li>
          <li>Identified potential partner in Indonesia.</li>
        </ul>
        <p className="font-weight-bold my-0">
          Business Process Improvement Intern
        </p>
        <p className="font-italic my-0">
          Step Point Indonesia, Incorporated | Jan 2018 - Mar 2018
        </p>
        <ul>
          <li>
            Examined the office politics situations in the HR and Operation
            dept.
          </li>
          <li>Examined the workload of the Admin dept.</li>
          <li>
            Prepared the findings report and recommended the preliminary action.
          </li>
        </ul>
      </>
    ),
  },
  {
    TextHeading: "Skills/Interest",
    Content: (
      <ul>
        <li>Reading fantasy books.</li>
        <li>Traveling and culinary.</li>
        <li>Know-how to deploy ERP software.</li>
      </ul>
    ),
  },
  {
    TextHeading: "Education",
    Content: (
      <>
        <p className="font-weight-bold my-0">Prasetiya Mulya Univeristy</p>
        <p className="font-italic">
          S1 Business Management | 2017 - present, currently in a gap year
        </p>
        <ul>
          <li>GPA 3.77</li>
          <li>
            Scholarship winner for the 2018/2019, 2019/2020 academic year.
          </li>
        </ul>
      </>
    ),
  },
  {
    TextHeading: "Working Experience",
    Content: (
      <>
        <p className="font-weight-bold my-0">Sales and Quality Control Staff</p>
        <p className="font-italic">
          AIESEC in Prasetiya Mulya | Mar 2018 - Mar 2019
        </p>
        <ul>
          <li>Prepared the guest residence for the iGV participants.</li>
          <li>
            Prepared the iGV participants for the Global Village in Kota Tua.
          </li>
        </ul>
        <p className="font-weight-bold my-0">Organizing Committee President</p>
        <p className="font-italic">
          AIESEC in Prasetiya Mulya | Jun 2018 - Aug 2018
        </p>
        <ul>
          <li>Negotiated the terms for permissions to held Global Village.</li>
          <li>Worked with Polsek Metro Tamansari.</li>
          <li>
            The event was visited by Deputy Governor for Culture and Tourism.
          </li>
        </ul>
      </>
    ),
  },
  {
    TextHeading: "Reach Me At",
    Content: (
      <>
        <p className="mb-0">Mobile: Mobile: +62 811 8751 555</p>
        <p className="mb-0">Email: jason.onggo@tempatkerja.com</p>
      </>
    ),
  },
];

export const RenderItems: React.FC = () => {
  return (
    <>
      {Items.map((item, index) => (
        <Col sm={6} key={item.TextHeading + index} className="px-3">
          <h5 className="text-center mb-3">{item.TextHeading}</h5>
          {item.Content}
        </Col>
      ))}
    </>
  );
};