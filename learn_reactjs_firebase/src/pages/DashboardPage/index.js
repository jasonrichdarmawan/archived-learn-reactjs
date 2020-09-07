import React from "react";
import { NavbarOrganism } from "components/organisms/NavbarOrganism";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import firebase from "api/firebase";

function ArraySplicer(array, lengthCol) {
  let res = [];
  let temporary = array.slice();
  for (let i = temporary.length / lengthCol; i > 0; i--) {
    res.push(temporary.splice(0, lengthCol));
  }
  return res;
}

function DashboardTemplate({ userData }) {
  const [editMode, setEditMode] = React.useState(false);
  const [res, setRes] = React.useState();
  const [inputs, setInputs] = React.useState({
    profileUrl: userData.profileUrl,
    displayName: userData.displayName,
    quotes: userData.quotes,
    githubUrl: userData.githubUrl,
  });

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
    if (editMode === true) {
      setRes("await");

      firebase
        .firestore()
        .collection("users")
        .doc(userData.uid)
        .set(
          {
            profileUrl: profileUrl,
            displayName: displayName,
            quoes: quotes,
            githubUrl: githubUrl,
          },
          { merge: true }
        )
        .then(() => {
          setRes(true);
        })
        .catch((error) => {
          setRes(false);
          console.error(error);
        });
    } else if (editMode === false) setEditMode(true);
  };

  return (
    <div className="d-flex flex-fill align-items-center">
      <Container className="w-auto">
        {/* {editMode === false && (
        )} */}
        {editMode ? (
          <Form className="mt-3" onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Button
                  type="submit"
                  className="float-right"
                  size="sm"
                  variant={res === true ? "success" : "outline-primary"}
                  disabled={res === "await" ? true : false}
                >
                  {res === true ? "Success" : "Submit"}
                </Button>
              </Col>
            </Row>
            {forms.map((form) => (
              <Form.Group key={form.label} controlId={form.controlId}>
                <Form.Label>{form.label}</Form.Label>
                <Form.Control
                  required
                  type={form.type}
                  value={form.value}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
          </Form>
        ) : (
          <>
            <Row>
              <Col>
                <Button
                  type="button"
                  className="float-right"
                  size="sm"
                  variant="outline-primary"
                  onClick={handleSubmit}
                >
                  Edit
                </Button>
              </Col>
            </Row>
            <div className="card mt-3" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                height="180"
                alt=""
                src={
                  userData.profileUrl ||
                  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1744ea317a8%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1744ea317a8%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.5234375%22%20y%3D%2297.4015625%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                }
              />
              <div className="card-body">
                <h5 className="card-title">
                  {userData.displayName || "lorem ipsum"}
                </h5>
                <p className="card-text">
                  {userData.quotes || "lorem ipsum lorem ipsum"}
                </p>
              </div>
              <div className="card-footer">
                <Button
                  variant="outline-primary"
                  href={userData.githubUrl || "https://github.com/"}
                >
                  Github
                </Button>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export function DashboardPage({ routesConfig, userData }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavbarOrganism />
      <DashboardTemplate userData={userData} />
    </div>
  );
}
