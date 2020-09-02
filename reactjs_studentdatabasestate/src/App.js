import React, { useState, useContext } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
  Navbar,
  Nav,
  Row,
  Col,
} from "react-bootstrap";

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => <route.component {...props} routes={route.routes} />}
  />
);

export const RenderRoutes = ({ routes }) => {
  const { authData } = useContext(AuthDataContext);

  routes = routes ? routes : Routes({ authData: authData });

  return (
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes key={route.key} {...route} />
      ))}
      <Route component={() => <h1>Not Found</h1>} />
    </Switch>
  );
};

// Fake Auth Req, Res
export const FetchAuthData = () => {
  const { authData, setAuthData } = useContext(AuthDataContext);

  if (authData.isAuthorized === "await") {
    const timer = setTimeout(() => {
      setAuthData({ isAuthorized: false });
    }, 1000);
    return "Loading";
  }
};

export const FormOrganism = ({ forms, res, handleChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      {forms.map((form) => (
        <Form.Group key={form.label} controlId={form.controlId}>
          <Form.Label>{form.label}</Form.Label>
          <Form.Control
            type={form.type}
            placeholder={form.placeholder}
            onChange={handleChange}
          />
        </Form.Group>
      ))}
      <Button
        type="submit"
        size="sm"
        variant={res === true ? "success" : "primary"}
        disabled={res === "await" ? true : false}
      >
        {res === true ? "Success" : "Submit"}
      </Button>
    </Form>
  );
};

export const LoginTemplate = ({ database, setAuthData }) => {
  const [error, setError] = useState();

  const [res, setRes] = useState();

  const forms = [
    {
      controlId: "username",
      label: "username",
      type: "text",
      placeholder: "Enter username",
    },
    {
      controlId: "password",
      label: "password",
      type: "password",
      placeholder: "Enter password",
    },
  ];

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputs;

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setRes("await");

    const timer = setTimeout(() => {
      // TODO: Database.
      const res = database.find((object, index) =>
        object.username === username
          ? database[index].password === password && true
          : false
      );
      if (res) {
        setRes(true);
        setError();
        setAuthData({ ...res, isAuthorized: true });
      } else if (!res) {
        setRes(false);
        setError("Either username or password is incorrect.");
      }
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <Container className="w-auto">
        {error && <Alert variant="warning">{error}</Alert>}
        <FormOrganism
          forms={forms}
          res={res}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </div>
  );
};

export const LoginPage = () => {
  const { database } = useContext(DatabaseContext);
  const { setAuthData } = useContext(AuthDataContext);

  return <LoginTemplate database={database} setAuthData={setAuthData} />;
};

export const displayRouteNavbar = ({ authData, routes }) => {
  const singleRoute = (route) => (
    <Link to={route.path} className="nav-link" key={route.key}>
      {route.key}
    </Link>
  );

  return (
    <>
      {routes.map((route) =>
        route.routes ? (
          <React.Fragment key={route.key}>
            {displayRouteNavbar({ authData: authData, routes: route.routes })}
          </React.Fragment>
        ) : route.display ? (
          singleRoute(route)
        ) : (
          route.display !== false &&
          route.display >= authData.type &&
          singleRoute(route)
        )
      )}
    </>
  );
};

export const NavBarOrganism = ({ authData, setAuthData }) => {
  const routes = Routes({ authData: authData });

  const handleLogout = () => {
    setAuthData({ isAuthorized: false });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>HRS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {displayRouteNavbar({ authData, routes })}
        </Nav>
        {authData.isAuthorized && (
          <Form inline>
            <Button variant="danger" size="sm" onClick={handleLogout}>
              Log Out
            </Button>
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export const ArraySplicer = (array, lengthCol) => {
  let res = [];
  let temporary = array.slice();
  for (let i = temporary.length / lengthCol; i > 0; i--) {
    res.push(temporary.splice(0, lengthCol));
  }
  return res;
};

export const CardOrganism = ({
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
          <div className="card mt-3" style={{ width: "18" + "rem" }}>
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
            <div className="card-group mt-3" key={"RowCardGroup" + i}>
              {row.map((user, i) => {
                return (
                  <div className="card" key={"ColCardGroup" + i}>
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

export const DashboardTemplate = ({
  authData,
  setAuthData,
  database,
  setDatabase,
}) => (
  <div className="min-vh-100 d-flex flex-column">
    <NavBarOrganism authData={authData} setAuthData={setAuthData} />
    <CardOrganism
      database={database}
      setDatabase={setDatabase}
      authData={authData}
      setAuthData={setAuthData}
    />
  </div>
);

export const DashboardPage = () => {
  const { authData, setAuthData } = useContext(AuthDataContext);
  const { database, setDatabase } = useContext(DatabaseContext);
  return (
    <DashboardTemplate
      authData={authData}
      setAuthData={setAuthData}
      database={database}
      setDatabase={setDatabase}
    />
  );
};

export const AddTemplate = ({
  authData,
  setAuthData,
  database,
  setDatabase,
}) => {
  const [error, setError] = useState();

  const [res, setRes] = useState();

  const forms = [
    {
      controlId: "username",
      label: "username",
      type: "text",
      placeholder: "Enter username for the student",
    },
    {
      controlId: "password",
      label: "password",
      type: "password",
      placeholder: "Enter password for the student",
    },
    {
      controlId: "profileUrl",
      label: "Profile Url",
      type: "text",
      placeholder: "Enter student's profile Url",
    },
    {
      controlId: "displayName",
      label: "Name",
      type: "text",
      placeholder: "Enter student's name",
    },
    {
      controlId: "quotes",
      label: "Quotes",
      type: "text",
      placeholder: "Enter the student's quotes",
    },
    {
      controlId: "githubUrl",
      label: "Github Url",
      type: "text",
      placeholder: "Enter the student's Github Url",
    },
  ];

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    profileUrl: "",
    displayName: "",
    quotes: "",
    githubUrl: "",
  });

  const {
    username,
    password,
    profileUrl,
    displayName,
    quotes,
    githubUrl,
  } = inputs;

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setRes("await");

    const timer = setTimeout(() => {
      const res = database.find((object) =>
        object.username === username ? true : false
      );
      if (!res) {
        setRes(true);
        setError();

        setDatabase((database) => [
          ...database,
          { uid: database.length, type: 1, ...inputs },
        ]);
      } else if (res) {
        setRes(false);
        setError("Username is taken.");
      }
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBarOrganism authData={authData} setAuthData={setAuthData} />
      <Container className="w-auto mt-3">
        {error && <Alert variant="warning">{error}</Alert>}
        <FormOrganism
          forms={forms}
          res={res}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </div>
  );
};
export const AddPage = () => {
  const { database, setDatabase } = useContext(DatabaseContext);
  const { authData, setAuthData } = useContext(AuthDataContext);
  return (
    <AddTemplate
      authData={authData}
      setAuthData={setAuthData}
      database={database}
      setDatabase={setDatabase}
    />
  );
};

export const Routes = ({ authData }) => {
  return [
    {
      key: "ROOT",
      path: "/",
      exact: true,
      component: () => {
        if (authData.isAuthorized === true) return <Redirect to="/app" />;
        else if (authData.isAuthorized === false) return <DashboardPage />;
        else return <FetchAuthData />;
      },
    },
    {
      key: "LOGIN",
      path: "/login",
      exact: true,
      component: () => {
        if (authData.isAuthorized === true) return <Redirect to="/app" />;
        else if (authData.isAuthorized === false) return <LoginPage />;
        else return <FetchAuthData />;
      },
    },
    {
      key: "APP_ROOT",
      path: "/app",
      exact: false,
      component: (props) => {
        if (authData.isAuthorized === true) return <RenderRoutes {...props} />;
        else if (authData.isAuthorized === false)
          return <Redirect to="/login" />;
        else return <FetchAuthData />;
      },
      routes: [
        {
          key: "Dashboard",
          path: "/app",
          exact: true,
          display: true,
          component: DashboardPage,
        },
        {
          key: "ADD_ROOT",
          path: "/app/add",
          exact: false,
          component: (props) => {
            if (authData.type === 0) return <RenderRoutes {...props} />;
            else if (authData.type > 0) return <Redirect to="/app" />;
            else return <FetchAuthData />;
          },
          routes: [
            {
              key: "Add",
              path: "/app/add",
              exact: true,
              display: 0,
              component: AddPage,
            },
          ],
        },
      ],
    },
  ];
};

export const DatabaseContext = React.createContext();

export const DatabaseProvider = ({ children }) => {
  // question: why popping out component "DashboardPage" cause the { database } value to [] ?
  const [database, setDatabase] = useState([
    {
      uid: 0,
      type: 0,
      username: "jason",
      password: "0",
      profileUrl:
        "https://media-exp1.licdn.com/dms/image/C5103AQEHNSw5h-XKyQ/profile-displayphoto-shrink_400_400/0?e=1604534400&v=beta&t=q3mdmY5CS8fDIiY3eofXj1bAfJfpHROXfy_j_qAIqwo",
      displayName: "Jason Rich Darmawan Onggo Putra",
      quotes:
        "1. Focus on testing the MVP, everything else can wait. 2. Learn from the mistakes.",
      githubUrl: "https://github.com/kidfrom",
    },
    // TODO
    {
      uid: 1,
      type: 1,
      username: "fawwaazrahman",
      password: "1",
    },
    // TODO
    {
      uid: 2,
      type: 1,
      username: "jenedy",
      password: "2",
    },
    // TODO
    {
      uid: 3,
      type: 1,
      username: "taufik",
      password: "3",
      profile: "",
      displayName: "Taufik Muharrom",
      quotes: "Your future is created by what you to do today, not tommorow",
      githubUrl: "https://github.com/taufik-muharrom",
    },
    {
      uid: 4,
      type: 1,
      username: "aisah",
      password: "4",
      profileUrl:
        "https://avatars0.githubusercontent.com/u/57663851?s=460&u=7bd2cabb95e920ea9cc3bea599b9f9baff618e9f&v=4",
      displayName: "Aisah Taufik Hidayat Abdullah",
      quotes: "Do good and good will come to you",
      githubUrl: "https://github.com/athaisyah",
    },
    {
      uid: 5,
      type: 1,
      username: "fauzan",
      password: "5",
      profileUrl:
        "https://i.ibb.co/JnZrPVP/Whats-App-Image-2020-03-23-at-09-15-17.jpg",
      displayName: "Fauzan Muhtadi",
      quotes: "Today must better than yesterday",
      githubUrl: "https://github.com/fauzanmuhtadi/BootcampG2AcademyBatch2",
    },
    {
      uid: 6,
      type: 1,
      username: "rifqi",
      password: "6",
      profileUrl:
        "https://media-exp1.licdn.com/dms/image/C5103AQEjYXhFOKvyvg/profile-displayphoto-shrink_100_100/0?e=1599091200&v=beta&t=e7cIbyA6jPBM8nLwgTd_nmQfR7ltDd9DNsPFkBq_1Y8",
      displayName: "Rifqi Fakhirin",
      quotes: "Being good is about how to combine consistency and integrity",
      githubUrl: "https://github.com/rifqifakhirin",
    },
    // TODO
    {
      uid: 7,
      type: 1,
      username: "ryan",
      password: "7",
      profileUrl: "",
      displayName: "Ryan Suryohadiprojo S",
      quotes: "ASK! Attitude, Skill and Knowledge",
      githubUrl: "https://github.com/RYANSUTODIWIRYO",
    },
    // TODO
    {
      uid: 8,
      type: 1,
      username: "yusal",
      password: "8",
      profileUrl: "",
      displayName: "Yusal Sumardi",
      quotes:
        "Aku Lebih Memilih Untuk Merobek Otakku, Membawanya Ke Perempatan Terdekat, Dan Bermain Lompat Tali Dengannya Dari Pada Harus Jadi Tetangga Kalian",
      githubUrl: "https://github.com/yusalsumardi",
    },
    // TODO
    {
      uid: 9,
      type: 1,
      username: "nurul",
      password: "9",
    },
    {
      uid: 10,
      type: 1,
      username: "ahmad",
      password: "10",
      profileUrl: "https://i.ibb.co/yFkZY5y/photoku.jpg",
      displayName: "Ahmad Nabil",
      quotes:
        "Seharusnya kamu belajar berjalan dulu, nak! Barulah kamu bisa berlari.",
      githubUrl: "https://github.com/nbl77",
    },
  ]);
  return (
    <DatabaseContext.Provider value={{ database, setDatabase }}>
      {children}
    </DatabaseContext.Provider>
  );
};

// Fake Database
export const AuthDataContext = React.createContext();

export const AuthDataProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ isAuthorized: "await" });
  return (
    <AuthDataContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthDataContext.Provider>
  );
};

function App() {
  return (
    <DatabaseProvider>
      <AuthDataProvider>
        <RenderRoutes />
      </AuthDataProvider>
    </DatabaseProvider>
  );
}

export default App;
