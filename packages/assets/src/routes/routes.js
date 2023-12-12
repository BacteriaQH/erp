import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '@assets/loadables/Home';
import Samples from '@assets/loadables/Samples/Samples';
import Settings from '@assets/loadables/Settings/Settings';
import {routePrefix} from '@assets/config/app';
import NotFound from '@assets/loadables/NotFound';
import User from '@assets/loadables/User/User';
import {getStorageData} from '@assets/helpers/storage';
// eslint-disable-next-line react/prop-types
const user = getStorageData('user');
const router = {
  admin: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/samples',
      component: Samples
    },
    {
      path: '/settings',
      component: Settings
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/me',
      component: User
    }
  ],
  user: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/me',
      component: User
    }
  ]
};
const Routes = ({prefix = routePrefix}) => (
  <Switch>
    {router[user?.user?.role].map((route, index) => (
      <Route key={index} exact path={prefix + route.path} component={route.component} />
    ))}
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
