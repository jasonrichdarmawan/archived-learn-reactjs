import React from "react";

import { RenderItems } from "./AboutData";

export const About: React.FC = () => {
  return (
    <div className="m-3">
      <p className="text-center">Jason Rich Darmawan Onggo Putra</p>
      <p className="text-center">Undergraduate Business Management</p>
      <div className="d-flex flex-wrap">
        <RenderItems />
      </div>
    </div>
  );
};

export default About;
