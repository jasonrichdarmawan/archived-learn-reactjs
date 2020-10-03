import React from "react";
import { ComponentType, lazy, LazyExoticComponent } from "react";

export interface RouteConfigProps {
  key: string;
  path?: string;
  exact?: boolean;
  component: LazyExoticComponent<ComponentType<RouteConfigProps>> | (() => JSX.Element);
  routes?: RouteConfigProps[];
}

export const routes: RouteConfigProps[] = [
  {
    key: "ROOT",
    path: "/",
    exact: true,
    component: lazy(() => import("features/Home/Home")),
  },
  {
    key: "NOT_FOUND",
    component: () => <div>Not Found!</div>,
  },
];
