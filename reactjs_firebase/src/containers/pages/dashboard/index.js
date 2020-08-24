import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthDataContext } from "../../../providers/authdata";
import { Loading } from "../../../components/loading";

export function Dashboard() {
  // question: what is the difference between useContext(Context) vs Context.Consumer which require function component ?
  const user = useContext(AuthDataContext);
  if (user === "await") {
    return <Loading />;
  } else {
    return (
      // <AuthDataContext.Consumer>
      // {(user) => (
      <div className="d-flex flex-fill align-items-center">
        <Container className="text-center">
          <p>Hello, {user.displayName}</p>
        </Container>
      </div>
      // )}
      // </AuthDataContext.Consumer>
    );
  }
}
