import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

export const renderRoutes = (routes = [], extraProps = {}) => {
  return (
    <Suspense fallback={null}>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props) => {
              return <route.component {...props} {...route.props} {...extraProps} route={route} />;
            }}
          />
        ))}
      </Switch>
    </Suspense>
  );
};

const routes = [
  {
    path: '/tds/car1001',
    component: React.lazy(() => import('./views/Home')),
  },
];

export default routes;
