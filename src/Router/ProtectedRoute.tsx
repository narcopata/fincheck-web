import { useSignal } from "@preact/signals";
import { VNode } from "preact";
import { Route, RouteProps, useLocation } from "preact-iso";

export function ProtectedRoute<Props>({
  isPrivate = false,
  ...props
}: RouteProps<Props> & Partial<Props> & { isPrivate?: boolean }): VNode {
  const signedIn = useSignal(false);
  const location = useLocation();

  if (!signedIn.value && isPrivate) {
    location.route("/access/login");
  }

  if (signedIn.value && !isPrivate) {
    location.route("/");
  }

  return <Route {...(props as RouteProps<Props> & Partial<Props>)} />;
}
