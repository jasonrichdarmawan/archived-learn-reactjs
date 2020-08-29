import React, { useContext, useEffect, useState } from "react";
import { AuthDataContext, UserDataContext } from "../../App";
import { TopNavbarMiddleContent } from "../../components";
import { displayRouteMenu, routes } from "../../routes";
import { Container } from "react-bootstrap";
import { firebase } from "../../providers";

// question: is it safe to define global variable?

const contentJSX = (userData, cvData) => {
  if (userData.type === 0)
    return (
      <div className="d-flex flex-fill align-items-center">
        <Container className="text-center">Hello, {userData.displayName}</Container>
      </div>
    );
  if (userData.type > 0) {
    return (
      <Container className="mt-3">
        {cvData ? (
          <React.Fragment>
            <p className="text-center">{cvData.name}</p>
            <p className="text-center">{cvData.majors}</p>
            <div className="d-flex flex-wrap">
              {cvData.content.map((cur) => (
                <div className="w-50" key={cur.title}>
                  <h5 className="text-center">{cur.title}</h5>
                  <br />
                  {cur.content.map((cur) => (
                    <React.Fragment
                      key={
                        cur.title
                          ? cur.title
                          : cur.subtitle
                          ? cur.subtitle
                          : cur.ul
                          ? cur.ul[0]
                          : null
                      }
                    >
                      {cur.title ? (
                        <React.Fragment>
                          <strong>{cur.title}</strong>
                          <br />
                        </React.Fragment>
                      ) : null}
                      {cur.subtitle ? (
                        <React.Fragment>
                          <i>{cur.subtitle}</i>
                          <br />
                        </React.Fragment>
                      ) : null}
                      {cur.ul ? (
                        <ul>
                          {cur.ul.map((cur) => (
                            <li key={cur}>{cur}</li>
                          ))}
                        </ul>
                      ) : null}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : null}
      </Container>
    );
  }
};

export const Dashboard = () => {
  const authData = useContext(AuthDataContext);
  const userData = useContext(UserDataContext);

  const [cvData, setCVData] = useState();

  // question: how to prevent Dashboard to render more than once?
  // console.log(userData);

  useEffect(() => {
    if (userData.type > 0) {
      firebase
        .firestore()
        .collection("cv")
        .doc(authData.uid)
        .get()
        .then((doc) =>
          doc.exists ? setCVData(doc.data()) : setCVData()
        );
    }
  }, [userData]);

  if (userData.type !== "await")
    return (
      <TopNavbarMiddleContent
        routesJSX={displayRouteMenu(routes)}
        contentJSX={contentJSX(userData, cvData)}
      />
    );
  else return "Loading";
};
