### SDR
- [ ] Data Schema
  - [ ] Collection: users
    ```
    uid = {
      type: number,
      name: string,
      email: string,
      phoneNumber: number,
    }
    ```
  - [ ] Collection: cv
    ```
    uid = {
      name: string,
      majors: string,
      content: [
        {
          title: string,
          content: [
            {
              title: string,
              subtitle: string,
              ul: array,
            },
            {},
          ]
        },
        {},
      ],
    }
    ```
  - [ ] Collection: departments
    ```
    uid = {
      name: string,
      members: array,
    }
    ```
- [ ] Routes
  - [ ] path: "/", key: "ROOT", exact: true,
    ```
    component: () => {
      if (isAuthorized) return <Redirect to={"/app"}
      else return <Redirect to={"/login"}
    },
    ```
  - [ ] path: "/login", key 'LOGIN', exact: true,
    ```
    component: () => {
      if (isAuthorized) return <Redirect to={"/app"}
      else return Login
    },
    ```
  - [ ] path: "/app", key: 'APP'
    ```
    component: props => {
      if (!isAuthorized) return <Redirect to={"/"} />
      else return <RenderRoutes {...props}> />
    },
    routes: [
      {
        path: "/app",
        key: 'APP_ROOT',
        exact: true,
        component: () => {
          if (user.type === 0) return HRD_DASHBOARD
          else if (user.type > 1) return EMPLOYEE_DASHBOARD
        },
      },
      {
        path: "/app/add",
        key: "APP_ADD",
        component: () => {
          if (user.type === 0) return <RenderRoutes {...props} />
          else if (user.type > 1) return <Redirect to={"/"} />
        },
        routes: [
          {
            path: "/app/add",
            key: "APP_ADD_ROOT",
            component: <Redirect to={"/app/add/employee"} />,
          },
          {
            path: "/app/add/:request",
            key: "APP_ADD_REQUEST",
            component: ADD_PAGE
          },
          {
            path: "/app/add/:request/:id",
            key: "APP_ADD_REQUEST_ID",
            component: ADD_PAGE,
          },
        ]
      },
      {
        path: "/app/list",
        key: "APP_LIST",
        component: () => {
          if (user.type === 0) return <RenderRoutes {...props} />
          else if (user.type > 1) return <Redirect to={"/"} />
        },
        routes: [
          {
            path: "/app/list",
            key: "APP_LIST_ROOT",
            component: <Redirect to={"/app/list/employee"} />
          },
          {
            path: "/app/list/:request",
            key: "APP_LIST_REQUEST",
            component: LIST_PAGE,
          },
          {
            path: "/app/list/:request/:id",
            key: "APP_LIST_REQUEST_ID",
            component: LIST_PAGE,
          },
        ]
      },
      {
        path: "app/placement",
        key: ""APP_PLACEMENT",
        component: PLACEMENT,
      },
    ]
    ```
- [ ] Page
  - [ ] Login
  - [ ] HRD Dashboard
    - [ ] Add New Employee + handler + passsword `/add/employee`
    - [ ] List Employee `/list/employee`
    - [ ] View Employee's Information (in CV format) `/list/employee/:id`
    - [ ] Add New Department `/add/department`
    - [ ] List Department `/list/department`
    - [ ] View Department's Information `/list/department/:id`
    - [ ] Work placement `/placement`
  - [ ] Employee Dashboard
    - [ ] View Employee's Information (in CV format) `/` -> `/list/employee/:id`
- [ ] Template
  - [ ] MinVH100Content(contentJSX)
  - [x] TopNavbarMiddleContent(routesJSX, contentJSX)
- [x] Organisms:
  - [x] NavigationBar(routesJSX)
  - [x] Content(contentJSX)