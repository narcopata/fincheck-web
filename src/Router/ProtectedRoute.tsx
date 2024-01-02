import { VNode } from "preact";
import { Route, RouteProps, useLocation } from "preact-iso";
import { useAuthContext } from "../app/contexts/AuthContext";

export function ProtectedRoute<Props>({
  isPrivate = false,
  ...props
}: RouteProps<Props> & Partial<Props> & { isPrivate?: boolean }): VNode {
  const { signedIn } = useAuthContext();
  const location = useLocation();

  if (!signedIn && isPrivate) {
    location.route("/access/login");
  }

  if (signedIn && !isPrivate) {
    location.route("/");
  }

  return <Route {...(props as RouteProps<Props> & Partial<Props>)} />;
}
