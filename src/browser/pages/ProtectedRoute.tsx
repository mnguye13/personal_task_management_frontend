import React, { ComponentType } from "react";
import { useSelector } from "react-redux";
import { Route, RouteProps, Redirect } from "react-router-dom";

interface ProtectedRouteProps extends RouteProps {
  component: ComponentType<any>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <>
            <Redirect to="/login" />
          </>
        )
      }
    />
  );
};
