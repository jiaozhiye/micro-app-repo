import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'antd';

import 'antd/dist/antd.css';

const Home = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const [microApps, setMicroApps] = React.useState([]);

  return (
    <>
      <Button
        onClick={() => {
          history.push('/dms/spa1001');
          if (microApps.some((x) => x.path === '/dms/spa1001')) return;
          setMicroApps([
            ...microApps,
            {
              path: '/dms/spa1001',
              host: 'http://localhost:9021/',
            },
          ]);
        }}
      >
        页面1
      </Button>
      <Button
        onClick={() => {
          history.push('/tds/car1001');
          if (microApps.some((x) => x.path === '/tds/car1001')) return;
          setMicroApps([
            ...microApps,
            {
              path: '/tds/car1001',
              host: 'http://localhost:9022/',
            },
          ]);
        }}
      >
        页面2
      </Button>
      {microApps.map((x) => {
        return (
          <micro-app
            key={x.path}
            name={x.path.replace(/\/+/g, '-').slice(1)}
            baseroute={x.path}
            url={x.host}
            style={{ display: pathname === x.path ? 'block' : 'none', height: '80vh' }}
          />
        );
      })}
    </>
  );
};

export default Home;
