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
        component: lazy(() => import("features/Home/Projects/Projects")),
      },
      {
        key: "About",
        path: "/about",
        exact: true,
        component: lazy(() => import("features/Home/About/About")),
      },
      {
        key: "Contact",
        path: "/contact",
        exact: true,
        component: lazy(() => import("features/Home/Contact/Contact")),
      },
      {
        key: "Motivation",
        path: "/motivation",
        exact: true,
        component: lazy(() => import("features/Home/Motivation/Motivation")),
      },
      {
        key: "Values",
        path: "/values",
        exact: true,
        component: lazy(() => import("features/Home/Values/Values")),
      },
    ],
  },
];
