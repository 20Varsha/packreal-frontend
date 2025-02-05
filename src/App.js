import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { routes, renderRoutes } from './routes';
import "./assets/scss/custom.scss"

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>{renderRoutes(routes)}</BrowserRouter>
    </React.Fragment>
  );
};

export default App;
