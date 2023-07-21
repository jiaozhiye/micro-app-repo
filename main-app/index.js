import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import routes, { renderRoutes } from './router';
import microApp from '@micro-zoe/micro-app';

microApp.start({
  'disable-memory-router': true,
  'disable-patch-request': true,
  // iframe: true,
  fetch: (url, options) => {
    const config = {};
    return window.fetch(url, Object.assign({}, options, config)).then((res) => res.text());
  },
});

const App = () => {
  return <Router basename="/">{renderRoutes(routes)}</Router>;
};

ReactDOM.render(React.createElement(App), document.querySelector('#app'));
