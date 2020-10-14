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
      <>
        <p className="text-justify">
          I’m seeking a position as a Software Engineer.{" "}
          <b>My focus is JavaScript, TypeScript (React) and Java (Spring).</b>{" "}
          My education background is Business Management. I am aiming to excel
          in the IT industry, starting as a Software Engineer.
        </p>
        <p className="text-justify">
          Please visit https://bit.ly/cvjason for my CV for position as a
          Software Engineer. Other professional experiences unrelated to the
          position which I am aiming for, can be found here on my LinkedIn
          https://linkedin.com/in/jasononggo
        </p>
      </>
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
    TextHeading: "Volunteer Experience",
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
        <p className="mb-0">Mobile: +62 811 8751 555</p>
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
