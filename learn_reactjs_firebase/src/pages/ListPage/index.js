import React from "react";
import { NavbarOrganism } from "components/organisms/NavbarOrganism";
import firebase from "api/firebase";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function ListTemplate({ users }) {
  return (
    <div className="d-flex flex-fill align-items-center">
      <Container className="mt-3">
        {/* TODO: refactor, this is temporary solution */}
        <Row>
          {Array.isArray(users) &&
            users.map((user, i) => {
              return (
                <Col md={3} key={"ColCard" + i} className="mt-3">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={
                        user.profileUrl ||
                        "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1744ea317a8%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1744ea317a8%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.5234375%22%20y%3D%2297.4015625%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                      }
                    />
                    <Card.Body>
                      <Card.Title>
                        {user.displayName || "lorem ipsum"}
                      </Card.Title>
                      <Card.Text>{user.quotes || "lorem ipsum"}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Button
                        variant="outline-primary"
                        href={user.githubUrl || "https://github.com/"}
                      >
                        Github
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}

export function ListPage({ userData, routes }) {
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
      <ListTemplate users={users} />
    </div>
  );
}
