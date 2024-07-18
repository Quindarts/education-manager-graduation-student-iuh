import { IndexRouteProps, LayoutRouteProps, PathRouteProps, Route } from 'react-router-dom';

type RouteProps = PathRouteProps | LayoutRouteProps | IndexRouteProps;

export type ProtectRouterProps = {
  roles: string[];
  features: string[];
};
