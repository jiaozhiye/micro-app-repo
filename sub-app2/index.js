import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import routes, { renderRoutes } from './router';

const App = () => {
  return <Router basename="/">{renderRoutes(routes)}</Router>;
};

function render() {
  ReactDOM.render(React.createElement(App), document.querySelector('#app'));
}

function doMount() {
  if (window.__MICRO_APP_ENVIRONMENT__) {
    __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__;
    const __MICRO_APP_UMD__ = true; // 开启 umd 模式 - 内存优化
    if (__MICRO_APP_UMD__) {
      Object.assign(window, { mount, unmount });
    } else {
      mount();
      window.addEventListener('unmount', () => {
        ReactDOM.unmountComponentAtNode(document.querySelector('#app'));
      });
    }
  } else {
    render();
  }
}

doMount();

export async function mount() {
  render();
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.querySelector('#app'));
}
