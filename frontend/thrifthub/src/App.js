import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes/routes';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  return (
    <Router>
      <ChakraProvider>
      <div>
        <Routes>
          {routes.map((route, index) => {
            if (route.children) {
              return (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children.map((childRoute, childIndex) => (
                    <Route
                      key={childIndex}
                      path={childRoute.path}
                      element={childRoute.element}
                    />
                  ))}
                </Route>
              );
            } else {
              return (
                <Route key={index} path={route.path} element={route.element} />
              );
            }
          })}
        </Routes>
      </div>
      </ChakraProvider>
    </Router>
  );
};

export default App;
