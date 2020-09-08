import React from "react";
import { useParams } from "react-router-dom";
import {
  NavbarOrganism,
  TableOrganism,
  FormOrganism,
} from "components/organisms";
import { Container } from "react-bootstrap";
import firebase from "api/firebase";

function EditTemplate({ users }) {
  const { id } = useParams();

  const user =
    id && Array.isArray(users) && users.find((user) => user.uid === id);
  const [inputs, setInputs] = React.useState({
    profileUrl: id ? user.profileUrl : "",
    displayName: id ? user.displayName: "",
    quotes: id ? user.quotes : "",
    githubUrl: id ? user.githubUrl : "",
  });

  const [res, setRes] = React.useState();

  if (id && Array.isArray(users)) {
    const { profileUrl, displayName, quotes, githubUrl } = inputs;

    const forms = [
      {
        controlId: "profileUrl",
        label: "Profile Url",
        type: "text",
        value: profileUrl,
      },
      {
        controlId: "displayName",
        label: "Name",
        type: "text",
        value: displayName,
      },
      {
        controlId: "quotes",
        label: "Quotes",
        type: "text",
        value: quotes,
      },
      {
        controlId: "githubUrl",
        label: "Github Url",
        type: "text",
        value: githubUrl,
      },
    ];

    const handleChange = (event) => {
      const { id, value } = event.target;
      setInputs({ ...inputs, [id]: value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setRes("await");

      firebase
        .firestore()
        .collection("users")
        .doc(id)
        .set(
          {
            profileUrl: profileUrl,
            displayName: displayName,
            quotes: quotes,
            githubUrl: githubUrl,
          },
          { merge: true }
        )
        .then(setRes(true))
        .catch((error) => console.log(error));
    };

    return (
      <Container className="w-auto mt-3">
        <FormOrganism
          forms={forms}
          res={res}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    );
  } else if (!id && Array.isArray(users)) {
    return (
      <Container className="w-auto mt-3">
        <TableOrganism ArrayOfObjects={users} />
      </Container>
    );
  } else return "Loading";
}

export function EditPage({ userData, routes }) {
  const [users, setUsers] = React.useState();

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(function (snapshot) {
        !snapshot.empty &&
          setUsers(
            snapshot.docs.map((doc) => {
              return { uid: doc.id, ...doc.data() };
            })
          );
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavbarOrganism userData={userData} routes={routes} />
      {users && <EditTemplate users={users} />}
    </div>
  );
}
