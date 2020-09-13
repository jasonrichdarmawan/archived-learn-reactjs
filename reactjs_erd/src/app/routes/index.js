import { Loading } from "components";
import {
  Login,
  Dashboard,
  Employee,
  Sales,
  Inventory,
  Purchase,
} from "features";
import { fetchAuthState } from "features/AuthState/AuthStateSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

export function Routes(props = {}) {
  const { authState } = props;
  // console.log("Routes()", authState);
  const dispatch = useDispatch();

  return [
    {
      key: "LOGIN",
      path: "/login",
      exact: true,
      display: false,
      component: () => {
        if (authState.isAuthorized === true && authState.document)
          return <Redirect to="/app/dashboard" />;
        else if (authState.isAuthorized === false) return <Login />;
        else {
          dispatch(fetchAuthState());
          return <Loading />;
        }
      },
    },
    {
      key: "Dashboard",
      path: "/app/dashboard",
      exact: true,
      display: true,
      component: () => {
        if (authState.isAuthorized === true && authState.document.access_rights)
          return <Dashboard />;
        else if (authState.isAuthorized === false)
          return <Redirect to="/login" />;
        else {
          dispatch(fetchAuthState());
          return <Loading />;
        }
      },
    },
    {
      key: "Employee",
      path: "/app/employee",
      display: "administration",
      component: (props) => {
        if (
          authState.isAuthorized === true &&
          authState.document.access_rights.administration >= 0
        )
          return <RenderRoutes {...props} />;
        else if (
          authState.isAuthorized === true &&
          !authState.document.access_rights.administration
        )
          return <Redirect to="/app/dashboard" />;
        else if (authState.isAuthorized === false)
          return <Redirect to="/login" />;
        else {
          dispatch(fetchAuthState());
          return <Loading />;
        }
      },
      routes: [
        {
          key: "List Employee",
          path: "/app/employee/:req(list)",
          exact: true,
          navpath: "/app/employee/list",
          display: true,
          component: () => <Employee />,
        },
        {
          key: "VIEW_EMPLOYEE",
          path: "/app/employee/:req(view)/:id",
          exact: true,
          display: false,
          component: () => <Employee />,
        },
        {
          key: "Add Employee",
          path: "/app/employee/:req(add)",
          exact: true,
          navpath: "/app/employee/add",
          display: true,
          component: () => <Employee />,
        },
      ],
    },
    {
      key: "Sales",
      path: "/app/sales",
      display: "sales",
      component: (props) => {
        if (authState.isAuthorized === true && authState.document.access_rights.sales >= 0)
          return <RenderRoutes {...props} />;
        else if (
          authState.isAuthorized === true &&
          !authState.document.access_rights.sales
        )
          return <Redirect to="/app/dashboard" />;
        else if (authState.isAuthorized === false)
          return <Redirect to="/login" />;
        else {
          dispatch(fetchAuthState());
          return <Loading />;
        }
      },
      routes: [
        {
          key: "Sales Orders",
          path: "/app/sales/:submodule(sales_orders)/:req(list)",
          exact: true,
          navpath: "/app/sales/sales_orders/list",
          display: true,
          component: () => <Sales />,
        },
        {
          key: "VIEW_SALES",
          path: "/app/sales/:submodule(sales_orders)/:req(view)/:id",
          exact: true,
          display: false,
          component: () => <Sales />,
        },
        {
          key: "ADD_SALES_ORDER",
          path: "/app/sales/:submodule(sales_orders)/:req(add)/:id",
          exact: true,
          display: false,
          component: () => <Sales />,
        },
        {
          key: "Invoices",
          path: "/app/sales/:submodule(invoices)/:req(list)",
          exact: true,
          navpath: "/app/sales/invoices/list",
          display: true,
          component: () => <Sales />,
        },
        {
          key: "VIEW_INVOICE",
          path: "/app/sales/:submodule(invoices)/:req(view)/:id",
          exact: true,
          display: false,
          component: () => <Sales />,
        },
        {
          key: "ADD_INVOICE",
          path: "/app/sales/:submodule(invoices)/:req(add)",
          exact: true,
          display: false,
          component: () => <Sales />,
        },
      ],
    },
    {
      key: "Inventory",
      path: "/app/inventory",
      display: "inventory",
      component: (props) => {
        if (
          authState.isAuthorized === true &&
          authState.document.access_rights.inventory >= 0
        )
          return <RenderRoutes {...props} />;
        else if (
          authState.isAuthorized === true &&
          !authState.document.access_rights.inventory
        )
          return <Redirect to="/app/dashboard" />;
        else if (authState.isAuthorized === false)
          return <Redirect to="/login" />;
        else {
          dispatch(fetchAuthState());
          return <Loading />;
        }
      },
      routes: [
        {
          key: "Products",
          path: "/app/inventory/:submodule(products)/:req(list)",
          exact: true,
          navpath: "/app/inventory/products/list",
          display: true,
          component: () => <Inventory />,
        },
        {
          key: "VIEW_PRODUCT",
          path: "/app/inventory/:submodule(products)/:req(view)/:id",
          exact: true,
          display: false,
          component: () => <Inventory />,
        },
        {
          key: "ADD_PRODUCT",
          path: "/app/inventory/:submodule(products)/:req(add)",
          exact: true,
          navpath: "/app/inventory/products/add",
          display: false,
          component: () => <Inventory />,
        },
        {
          key: "Delivery Orders",
          path: "/app/inventory/:submodule(delivery_orders)/:req(list)",
          exact: true,
          navpath: "/app/inventory/delivery_oders/list",
          display: true,
          component: () => <Inventory />,
        },
        {
          key: "VIEW_DELIVERY_ORDER",
          path: "/app/inventory/:submodule(delivery_orders)/:req(view)/:id",
          exact: true,
          display: false,
          component: () => <Inventory />,
        },
        {
          key: "ADD_DELIVERY_ORDER",
          path: "/app/inventory/:submodule(delivery_orders)/:req(add)",
          exact: true,
          display: false,
          component: () => <Inventory />,
        },
        {
          key: "Receipts",
          path: "/app/inventory/:submodule(receipts)/:req(list)",
          exact: true,
          navpath: "/app/inventory/receipts/list",
          display: true,
          component: () => <Inventory />,
        },
        {
          key: "VIEW_RECEIPT",
          path: "/app/inventory/:submodule(receipts)/:req(view)/:id",
          exact: true,
          display: false,
          component: () => <Inventory />,
        },
        {
          key: "ADD_RECEIPT",
          path: "/app/inventory/:submoudle(receipts)/:req(add)",
          exact: true,
          display: false,
          component: () => <Inventory />,
        },
      ],
    },
    {
      key: "Purchase",
      path: "/app/purchase",
      display: "purchase",
      component: (props) => {
        if (authState.isAuthorized === true && authState.document.access_rights.purchase >= 0)
          return <RenderRoutes {...props} />;
        else if (
          authState.isAuthorized === true &&
          !authState.document.access_rights.purchase
        )
          return <Redirect to="/app/dashboard" />;
        else if (authState.isAuthorized === false)
          return <Redirect to="/login" />;
        else {
          dispatch(fetchAuthState());
          return <Loading />;
        }
      },
      routes: [
        {
          key: "Purchase Orders",
          path: "/app/purchase/:submodule(purchase_orders)/:req(list)",
          exact: true,
          navpath: "/app/purchase/purchase_orders/list",
          display: true,
          component: () => <Purchase />,
        },
        {
          key: "VIEW_PURCHASE_ORDER",
          path: "/app/purchase/:submodule(purchase_orders)/:req(view)/:id",
          exact: true,
          display: false,
          component: () => <Purchase />,
        },
        {
          key: "ADD_PURCHASE_ORDER",
          path: "/app/purchase/:submodule(purchase_orders)/:req(add)",
          exact: true,
          display: false,
          component: () => <Purchase />,
        },
        {
          key: "Bills",
          path: "/app/purchase/:submodule(bills)/:req(list)",
          exact: true,
          navpath: "/app/purchase/bills/list",
          display: true,
          component: () => <Purchase />,
        },
        {
          key: "VIEW_BILL",
          path: "/app/purchase/:submodule(bills)/:req(view)/:id",
          exact: true,
          display: false,
          component: () => <Purchase />,
        },
        {
          key: "ADD_BILL",
          path: "/app/purchase/:submodule(bills)/:req(add)",
          exact: true,
          display: false,
          component: () => <Purchase />,
        },
      ],
    },
  ];
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes key={route.key} {...route} />
      ))}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
