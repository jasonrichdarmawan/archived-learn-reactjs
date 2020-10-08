import React from "react";

import ListGroup from "react-bootstrap/ListGroup";

export interface Item {
  TextLeft: string;
  TextCenter: string;
  TextRight?: string;
  href: string;
}

export const Items: Item[] = [
  {
    TextLeft: "Day 24",
    TextCenter: "Zimbra:",
    TextRight: "Deployment",
    href: "https://github.com/kidfrom/docs/blob/master/EMAIL.md",
  },
  {
    TextLeft: "Day 36",
    TextCenter: "Odoo ERP:",
    TextRight: "Deployment",
    href: "https://github.com/tempatkerja/docker-odoo",
  },
  {
    TextLeft: "Day 86",
    TextCenter: "JavaScript",
    TextRight: "Calculator",
    href: "https://github.com/kidfrom/calculator_js",
  },
  {
    TextLeft: "Day 103",
    TextCenter: "JavaScript",
    TextRight: "Sudoku",
    href: "https://github.com/kidfrom/sudoku_js",
  },
  {
    TextLeft: "Day 108",
    TextCenter: "React JS with only Local Storage:",
    TextRight: "Guest List",
    href:
      "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/offline-storage/learn_offline-storage",
  },
  {
    TextLeft: "Day 112",
    TextCenter: "React JS with only Local Storage:",
    TextRight: "Human Resource Management",
    href:
      "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/hrs-mockup/learn_reactjs",
  },
  {
    TextLeft: "Day 117",
    TextCenter: "Express:",
    TextRight: "Client-side JWT Authentication",
    href: "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/jwt",
  },
  {
    TextLeft: "Day 118",
    TextCenter: "Firebase, Firestore:",
    TextRight: "Parking Management System",
    href:
      "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs-firebase/reactjs_firebase",
  },
  {
    TextLeft: "Day 123",
    TextCenter: "React-Router-DOM",
    TextRight: "Routes Config",
    href:
      "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_sdr/reactjs_sdr",
  },
  {
    TextLeft: "Day 123",
    TextCenter: "Atomic Design:",
    TextRight: "Curriculum Vitae",
    href:
      "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_cv/reactjs_cv",
  },
  {
    TextLeft: "Day 124",
    TextCenter: "Firebase, Firestore, Storage, Cloud Function:",
    TextRight: "Human Resource Management",
    href:
      "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_hrsfirebase/reactjs_hrsfirebase",
  },
  {
    TextLeft: "Day 127",
    TextCenter: "ReactJS with only Passing State & Props:",
    TextRight: "Human Resource Management",
    href:
      "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_statepropsonly/reactjs_statepropsonly",
  },
  {
    TextLeft: "Day 129",
    TextCenter: "ReactJS with only Passing State & Props:",
    TextRight: "Student Management System",
    href:
      "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_studentdatabasestate/reactjs_studentdatabasestate",
  },
  {
    TextLeft: "Day 130",
    TextCenter: "Refactor React Context -> Redux:",
    TextRight: "Student Database",
    href:
      "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_studentredux/reactjs_studentredux",
  },
  {
    TextLeft: "Day 131",
    TextCenter: "Refactor React Context -> Redux:",
    TextRight: "Human Resource Management",
    href:
      "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_hrsredux/reactjs_hrsredux",
  },
  {
    TextLeft: "Day 135",
    TextCenter: "Refactor State & Props -> Firebase:",
    TextRight: "Student Database",
    href:
      "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_studentfirebase/reactjs_studentfirebase",
  },
  {
    TextLeft: "Day 137",
    TextCenter: "React Native w/ React-Navigation",
    href: "https://github.com/kidfrom/g2_react_native/tree/UI_filter_crud",
  },
  {
    TextLeft: "Day 141",
    TextCenter: "Fetch API:",
    TextRight: "React Native",
    href:
      "https://github.com/kidfrom/g2_react_native/tree/lifecycles/lifecycles",
  },
  {
    TextLeft: "Day 143",
    TextCenter: "Render Protected Routes:",
    TextRight: "React-Navigation",
    href: "https://github.com/kidfrom/g2_react_native/tree/state/state",
  },
  {
    TextLeft: "Day 144",
    TextCenter: "Redux-Persist:",
    TextRight: "React Native",
    href:
      "https://github.com/kidfrom/g2_react_native/tree/redux-persist/redux-persist",
  },
  {
    TextLeft: "Day 145",
    TextCenter: "Android Filesystem:",
    TextRight: "React Native",
    href: "https://github.com/kidfrom/g2_react_native/tree/storage/storage",
  },
  {
    TextLeft: "Day 148",
    TextCenter: "Android Camera:",
    TextRight: "React Native",
    href: "https://github.com/kidfrom/g2_react_native/tree/camera/camera",
  },
  {
    TextLeft: "Day 151",
    TextCenter: "Android Google Maps, Geolocation:",
    TextRight: "GoJek Clone",
    href: "https://github.com/kidfrom/gojek_clone",
  },
  {
    TextLeft: "Day 155",
    TextCenter: "Unified Modeling Language:",
    TextRight: "Java",
    href: "https://github.com/kidfrom/g2_java/tree/main/Day_1",
  },
  {
    TextLeft: "Day 156",
    TextCenter: "Encapsulation => Getters and Setters",
    TextRight: "Java:",
    href: "https://github.com/kidfrom/g2_java/tree/main/Day_2",
  },
  {
    TextLeft: "Day 157",
    TextCenter: "Control Flow:",
    TextRight: "Java",
    href: "https://github.com/kidfrom/g2_java/tree/main/Day_3",
  },
  {
    TextLeft: "Day 158",
    TextCenter: "Stack and Heap Memory",
    TextRight: "Java",
    href: "https://github.com/kidfrom/g2_java/tree/main/Day_4",
  },
  {
    TextLeft: "Day 159",
    TextCenter: "Review Day 155 - 158",
    TextRight: "Java",
    href: "https://github.com/kidfrom/g2_java/tree/main/Day_5"
  },
  {
    TextLeft: "Day 161",
    TextCenter: "TypeScript:",
    TextRight: "Curriculum Vitae",
    href: "https://github.com/kidfrom/bc_g2_learn_reactjs/tree/newcv/ts_cv",
  },
  {
    TextLeft: "Day 162",
    TextCenter: "Bubble Sort, Binary Search Algorithm",
    TextRight: "Java",
    href: "https://github.com/kidfrom/g2_java/tree/main/Day_6"
  },
  {
    TextLeft: "Day 163",
    TextCenter: "Extends & Implements",
    TextRight: "Java",
    href: "https://github.com/kidfrom/g2_java/tree/main/Day_7"
  },
  {
    TextLeft: "Day 164",
    TextCenter: "Regex & Exception Handling",
    TextRight: "Java",
    href: "https://github.com/kidfrom/g2_java/tree/main/Day_8"
  },
  {
    TextLeft: "Day 165",
    TextCenter: "Normal Threads & ThreadPool",
    TextRight: "Java",
    href: "https://github.com/kidfrom/g2_java/tree/main/Day_9",
  },
];

export const RenderItems: React.FC = () => {
  return (
    <ListGroup variant="flush">
      <p className="p-3 mb-0 border-bottom">
        Day 0 beginning on April 26th, 2020, the day I discovered GitHub:
      </p>
      {Items.map((item, index) => (
        <ListGroup.Item key={item.TextLeft + index}>
          <a href={item.href}>
            <p className="mx-3 my-0">
              {item.TextLeft} <b>{item.TextCenter}</b> {item.TextRight}
            </p>
          </a>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
