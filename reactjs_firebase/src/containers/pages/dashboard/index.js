import React, { useContext, useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { AuthDataContext, UserDataContext } from "../../../providers/authdata";
import { Loading } from "../../../components/loading";
import { Line } from "react-chartjs-2";
import firebase from "../../../providers/firebase";

export function Dashboard() {
  // question: what is the difference between useContext(Context) vs Context.Consumer which require function component ?
  const auth = useContext(AuthDataContext);
  const user = useContext(UserDataContext);

  const [error, setError] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    if (auth.uid !== null && user.type === "0") {
      firebase
        .firestore()
        .collection("tickets")
        .orderBy("exp")
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            const data = snapshot.docs.map((doc) => {
              return doc.data();
            });

            // console.log('data', data);

            const dataDateEqualized = data.map((data) => {
              const date = new Date(
                new Date(data.exp.seconds * 1000).setHours(0, 0, 0, 0)
              );
              const bill = data.bill;

              return { exp: date, bill };
            });

            // console.log("dataDateEqualized", dataDateEqualized);

            const dataReduced = Object.values(
              dataDateEqualized.reduce((acc, { bill, ...cur }) => {
                const key = Object.entries(cur).join();
                acc[key] = (acc[key] || { bill: 0, ...cur });
                return (acc[key].bill += bill, acc);
              }, {})
            );

            // explaining how dataReduced works.
            // acc / accumulator intially does not hold value.
            // Therefore, on the first iteration acc[key] = acc[key] returns undefined so we fill it with a value { bill: 0, ...cur }.
            // accumulator value is remembered across iteration.
            // For comparison, in for loop statement, accumulator is similar to `let i = 0; for (i = 0; condition, execution);`
            // console.log(
            //   dataDateEqualized.reduce((acc, { bill, ...cur }) => {
            //     console.log("acc ", acc, " bill ", bill, " cur ", cur);
            //     const key = Object.entries(cur).join();

            //     console.log("acc ", acc, " key ", key, " before ", acc[key]);
            //     acc[key] = acc[key] || { bill: 0, ...cur };

            //     console.log("acc ", acc, " after ", acc[key], " bill ", bill);
            //     return (acc[key].bill += bill); // this is intentional
            //   }, {})
            // );

            // console.log("dataReduced ", dataReduced);

            // console.log(dataReduced.map(data => data.exp.toString().split(" ").slice(1, 4).join(" ")))

            setData({
              labels: dataReduced.map((data) =>
                data.exp.toString().split(" ").slice(1, 4).join(" ")
              ),
              datasets: [
                {
                  label: "Revenue Report",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: dataReduced.map((data) => data.bill),
                },
              ],
            });
          } else if (snapshot.empty) setData();
        })
        .catch((error) => setError(error.message));
    }
  }, [user, auth.uid]);

  const ErrorAlert = () => (
    <Alert className="mt-3" variant="warning">
      {error}
    </Alert>
  );

  if ((auth !== null && user === "await") || auth === "await")
    return <Loading />;
  else if (auth !== null && user !== "await") {
    if (user.type === "0") {
      return (
        <div>
          <Container>
            {error ? <ErrorAlert /> : null}
            <div className="mt-3">
              <Line data={data} />
            </div>
          </Container>
        </div>
      );
    } else
      return (
        // <AuthDataContext.Consumer>
        // {(auth) => (
        <div className="d-flex flex-fill align-items-center">
          <Container className="text-center">
            {error ? <ErrorAlert /> : null}
            <p className="mt-3">Hello, {auth.displayName}</p>
          </Container>
        </div>
        // )}
        // </AuthDataContext.Consumer>
      );
  } else if (auth === null || user === "await") return null;
}
