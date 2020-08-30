### SDR

Notice: The SDR does not reflect actual logic used. The SDR is written in a Notepad and has not been tested. However, if the checkbox is checked, it means it has been successfully implemented either with exact logic or slightly different logic.

- [x] Data Schema
  - [x] Collection: users
    ```
    uid = {
      type: number,
      name: string,
      email: string,
      phoneNumber: number,
    }
    ```
  - [x] Collection: cv
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
  - [x] Collection: departments
    ```
    uid = {
      name: string,
      members: array,
    }
    ```
- [x] Routes
  - [x] path: "/", key: "ROOT", exact: true,
    ```
    component: () => {
      if (isAuthorized) return <Redirect to={"/app"}
      else return <Redirect to={"/login"}
    },
    ```
  - [x] path: "/login", key 'LOGIN', exact: true,
    ```
    component: () => {
      if (isAuthorized) return <Redirect to={"/app"}
      else return Login
    },
    ```
  - [x] path: "/app", key: 'APP'
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
  - [x] Login
  - [ ] HRD Dashboard
    - [x] Add New Employee + handler + passsword `/add/employee`
    - [ ] List Employee `/list/employee`
    - [ ] View Employee's Information (in CV format) `/list/employee/:id`
    - [x] Add New Department `/add/department`
    - [ ] List Department `/list/department`
    - [ ] View Department's Information `/list/department/:id`
    - [ ] Work placement `/placement`
  - [x] Employee Dashboard
    - [x] View Employee's Information (in CV format) `/` -> `/list/employee/:id`
- [ ] Template
  - [ ] MinVH100Content(contentJSX) `cancelled`
  - [x] TopNavbarMiddleContent(routesJSX, contentJSX)
- [x] Organisms:
  - [x] NavigationBar(routesJSX)
  - [x] Content(contentJSX)