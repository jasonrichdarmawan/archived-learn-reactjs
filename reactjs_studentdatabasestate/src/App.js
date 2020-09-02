import React, { useState, useContext } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => <route.component {...props} routes={route.routes} />}
  />
);

export const RenderRoutes = () => {
  const { authData } = useContext(AuthDataContext);

  const routes = Routes({ authData: authData });

  return (
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes key={route.key} {...route} />
      ))}
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

export const FormOrganism = ({ forms, handleSubmit }) => {
  // example in React.Component
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     username: "",
  //     password: "",
  //   }
  // }

  // handleChange = (event) => {
  //   this.setState({ [event.target.id]: event.target.value });
  // }

  // <Form.Control onChange={this.handleChange} />
  // <Form.Control onChange={() => this.handleChange} />

  // const [username, setUsername] = useState();
  // const [password, setPassword] = useState();

  // const [inputs, setInputs] = useState();

  // const handleChange = useCallback((event) => {
  //   console.log('hi')
  //   setInputs({ ...inputs, [event.target.id]: event.target.value });
  //   // if (event.target.id === "username") setUsername(event.target.value);
  //   // else if (event.target.id === "password") setPassword(event.target.value);
  // }, []);

  // const handleChange = (event) => {
  //   setInputs({ ...inputs, [event.target.id]: event.target.value });
  //   console.log("s", inputs);
  // };

  const [inputs, setInputs] = useState();

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
    // if (event.target.id === "username") setUsername(event.target.value);
    // else if (event.target.id === "password") setPassword(event.target.value);
  };

  // <Form.Group controlId="formBasicEmail">
  //   <Form.Label>Email address</Form.Label>
  //   <Form.Control type="email" placeholder="Enter email" />
  //   <Form.Text className="text-muted">
  //     We'll never share your email with anyone else.
  //   </Form.Text>
  // </Form.Group>;
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
      <Button type="submit" size="sm" variant="primary">
        Submit
      </Button>
    </Form>
  );
};

export const LoginTemplate = () => {
  const [error, setError] = useState();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const timer = setTimeout(() => {
      // TODO: authDatabase.
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <Container className="w-auto">
        {error && <Alert variant="warning">{error}</Alert>}
        <FormOrganism forms={forms} handleSubmit={handleSubmit} />
      </Container>
    </div>
  );
};

export const LoginPage = () => {
  return <LoginTemplate />;
};

export const Routes = ({ authData }) => {
  return [
    {
      key: "ROOT",
      path: "/",
      exact: true,
      component: () => {
        if (authData.isAuthorized === true) return <Redirect to="/app" />;
        else if (authData.isAuthorized === false)
          return <Redirect to="/login" />;
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
    // {
    //   key: "APP_ROOT",
    //   path: "/app",
    //   exact: false,
    //   component: (props) => {
    //     if (authData.isAuthorized === true) return <RenderRoutes {...props} />;
    //     else if (authData.isAuthorized === false) return <Redirect to="/login" />;
    //     else return "Loading";
    //   },
    // },
  ];
};

export const DatabaseContext = React.createContext();

export const DatabaseProvider = ({ children }) => {
  const [database, setDatabase] = useState([
    {
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
      username: "fawwaazrahman",
      password: "1",
    },
    // TODO
    {
      username: "jenedy",
      password: "2",
    },
    // TODO
    {
      username: "taufik",
      password: "3",
      profile: "",
      displayName: "Taufik Muharrom",
      quotes: "Your future is created by what you to do today, not tommorow",
      githubUrl: "https://github.com/taufik-muharrom",
    },
    {
      username: "aisah",
      password: "4",
      profileUrl:
        "https://avatars0.githubusercontent.com/u/57663851?s=460&u=7bd2cabb95e920ea9cc3bea599b9f9baff618e9f&v=4",
      displayName: "Aisah Taufik Hidayat Abdullah",
      quotes: "Do good and good will come to you",
      githubUrl: "https://github.com/athaisyah",
    },
    {
      username: "fauzan",
      password: "5",
      profileUrl:
        "https://i.ibb.co/JnZrPVP/Whats-App-Image-2020-03-23-at-09-15-17.jpg",
      displayName: "Fauzan Muhtadi",
      quotes: "Today must better than yesterday",
      githubUrl: "https://github.com/fauzanmuhtadi/BootcampG2AcademyBatch2",
    },
    {
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
      username: "ryan",
      password: "7",
      profileUrl: "",
      displayName: "Ryan Suryohadiprojo S",
      quotes: "ASK! Attitude, Skill and Knowledge",
      githubUrl: "https://github.com/RYANSUTODIWIRYO",
    },
    // TODO
    {
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
      username: "nurul",
      password: "9",
    },
    {
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
        {/* <RenderRoutes routes={Routes({ authData: authData })} /> */}
        <RenderRoutes />
      </AuthDataProvider>
    </DatabaseProvider>
  );
}

export default App;
