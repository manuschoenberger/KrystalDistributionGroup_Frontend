import { ReactNode, useContext } from "react";
import SecurityContext from "../context/SecurityContext";

export interface RouteGuardProps {
  children: ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated, login } = useContext(SecurityContext);

  if (isAuthenticated()) {
    return children;
  } else {
    return <button onClick={login}>Log in</button>;
  }
}
