import React from "react";
import { ComponentType, lazy, LazyExoticComponent } from "react";
import { Redirect } from "react-router-dom";

export interface RouteConfigProps {
  key: string;
  path: string;
  exact: boolean;
  component: LazyExoticComponent<ComponentType<any>> | (() => JSX.Element);
  routes?: RouteConfigProps[];
}

export const routes: RouteConfigProps[] = [
  {
    key: "ROOT",
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />,
  },
  // create new object here. This mimic shopee.co.id routing behavior.
  {
    key: "HOME_ROOT",
    path: "/",
    exact: false,
    component: lazy(() => import("features/Home/Home")),
    routes: [
      {
        key: "Home",
        path: "/home",
        exact: true,
        component: () => <div>Home</div>,
      },
      {
        key: "About",
        path: "/about",
        exact: true,
        component: () => <div>About</div>,
      },
      {
        key: "Contact",
        path: "/contact",
        exact: true,
        component: () => <div>Contact</div>,
      },
      {
        key: "Motivation",
        path: "/motivation",
        exact: true,
        component: () => <div>Motivation</div>,
      },
      {
        key: "Values",
        path: "/values",
        exact: true,
        component: () => <div>Values</div>,
      },
    ],
  },
];
