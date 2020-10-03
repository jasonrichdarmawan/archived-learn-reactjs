import { ComponentType, lazy, LazyExoticComponent } from "react";

export interface RouteConfigProps {
  key: string;
  path: string;
  component: LazyExoticComponent<ComponentType<RouteConfigProps>>;
  routes?: RouteConfigProps[];
}

export const routes: RouteConfigProps[] = [
  {
    key: "ROOT",
    path: "/",
    component: lazy(() => import("features/Home/Home")),
  },
];
