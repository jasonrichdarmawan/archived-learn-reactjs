import React, { useContext, useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { AuthDataContext } from "../../../providers/authdata";
// import firebase from "../../../providers/firebase";
import { Loading } from "../../../components/loading";

export function List() {
  const user = useContext(AuthDataContext);
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState("s");

  const [error, setError] = useState("s");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData();
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
  }, []);

  if (user === "await") {
    return <Loading />;
  } else {
    return (
      <div className="d-flex flex-fill">
        <Container>
          {error ? (
            <Alert className="mt-3" variant="warning">
              {error}
            </Alert>
          ) : (
            ""
          )}
          {data ? <div className="mt-3">TODO</div> : ""}
        </Container>
      </div>
    );
  }
}
