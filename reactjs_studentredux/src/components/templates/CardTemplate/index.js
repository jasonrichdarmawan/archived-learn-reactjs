import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { ArraySplicer } from "../../../utils";

export const CardTemplate = ({
  database,
  setDatabase,
  authData,
  setAuthData,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [res, setRes] = useState();
  const [inputs, setInputs] = useState({
    profileUrl: authData.profileUrl,
    displayName: authData.displayName,
    quotes: authData.quotes,
    githubUrl: authData.githubUrl,
  });

  const { profileUrl, displayName, quotes, githubUrl } = inputs;

  if (authData.isAuthorized === true) {
    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (editMode === true) {
        setRes("await");
        setTimeout(() => {
          setRes(true);

          setDatabase(
            database.map((user) =>
              user.uid === authData.uid
                ? {
                    ...user,
                    profileUrl: profileUrl,
                    displayName: displayName,
                    quotes: quotes,
                    githubUrl: githubUrl,
                  }
                : user
            )
          );
          setAuthData({
            ...authData,
            profileUrl: profileUrl,
            displayName: displayName,
            quotes: quotes,
            githubUrl: githubUrl,
          });
        }, 1000);
      } else if (editMode === false) setEditMode(true);
    };

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

    return (
      <Container className="mt-3 w-auto">
        <Row>
          <Col>
            <Button
              type="submit"
              className="float-right"
              size="sm"
              variant={res === true ? "success" : "outline-primary"}
              onClick={handleSubmit}
              disabled={res === "await" ? true : false}
            >
              {editMode ? (res === true ? "Success" : "Submit") : "Edit"}
            </Button>
          </Col>
        </Row>
        {editMode ? (
          <Form className="mt-3" onSubmit={handleSubmit}>
            {forms.map((form) => (
              <Form.Group key={form.label} controlId={form.controlId}>
                <Form.Label>{form.label}</Form.Label>
                <Form.Control
                  type={form.type}
                  value={form.value}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
          </Form>
        ) : (
          <div className="card mt-3" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              height="180"
              alt=""
              src={
                authData.profileUrl ||
                "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1744ea317a8%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1744ea317a8%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.5234375%22%20y%3D%2297.4015625%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              }
            />
            <div className="card-body">
              <h5 className="card-title">
                {authData.displayName || "lorem ipsum"}
              </h5>
              <p className="card-text">
                {authData.quotes || "lorem ipsum lorem ipsum"}
              </p>
            </div>
            <div className="card-footer">
              <Button
                variant="outline-primary"
                href={authData.githubUrl || "https://github.com/"}
              >
                Github
              </Button>
            </div>
          </div>
        )}
      </Container>
    );
  } else if (authData.isAuthorized === false) {
    return (
      <Container className="mt-3">
        {/* why ArraySplicer change { database } value? */}
        {ArraySplicer(database, 3).map((row, i) => {
          return (
            <div className="card-deck mt-3" key={"RowCardGroup" + i}>
              {row.map((user, i) => {
                return (
                  <div className="card" style={{maxWidth: "30%"}} key={"ColCardGroup" + i}>
                    <img
                      className="card-img-top"
                      height="180"
                      alt=""
                      src={
                        user.profileUrl ||
                        "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1744ea317a8%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1744ea317a8%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.5234375%22%20y%3D%2297.4015625%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                      }
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {user.displayName || "lorem ipsum"}
                      </h5>
                      <p className="card-text">
                        {user.quotes || "lorem ipsum lorem ipsum"}
                      </p>
                    </div>
                    <div className="card-footer">
                      <Button
                        variant="outline-primary"
                        href={user.githubUrl || "https://github.com/"}
                      >
                        Github
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </Container>
    );
  }
};
