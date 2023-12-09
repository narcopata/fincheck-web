import { LocationProvider, Router } from "preact-iso";
import { AuthLayout, AuthLayoutProps } from "../view/layouts/AuthLayout";
import { Login } from "../view/pages/Login";
import { Register } from "../view/pages/Register";
import { ProtectedRoute } from "./ProtectedRoute";

const routes: AuthLayoutProps["routes"] = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];

export const AppRouter = () => {
  return (
    <LocationProvider>
      <Router>
        <ProtectedRoute
          path="/"
          text="Home"
          isPrivate
          component={() => null}
        />
        <ProtectedRoute
          path="/access/*"
          routes={routes}
          component={AuthLayout}
        />
      </Router>
    </LocationProvider>
  );
};
