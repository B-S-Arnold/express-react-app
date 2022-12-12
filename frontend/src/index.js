import React from "react";
import { createRoot } from 'react-dom/client';

// import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./context/Modal";

import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";

const container = document.getElementById('root');
const root = createRoot(container);
const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        {/* <BrowserRouter> */}
          <App />
        {/* </BrowserRouter> */}
      </ModalProvider>
    </Provider>
  );
}

root.render(
  // <React.StrictMode>
    <Root />
  // </React.StrictMode>,
  // document.getElementById('root')
);


