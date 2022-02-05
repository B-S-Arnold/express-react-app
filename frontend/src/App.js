import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route path={["/login", "/log-in"]}>
        <LoginFormPage />
      </Route>
      <Route>
        Page Not Found
      </Route>
    </Switch>
  );
}

export default App;
