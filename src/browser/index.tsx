// Load polyfills (once, on the top of our web app)
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./index.css";

/**
 * Frontend code running in browser
 */
import * as React from "react";
import { hydrate } from "react-dom";

import ConfigContext from "../components/ConfigContext";
import { Config } from "../server/config";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { newsApi } from "src/components/configs/newsApiSlice";
import { tasksApi } from "src/components/configs/tasksApiSlice";

const config = (window as any).__CONFIG__ as Config;
delete (window as any).__CONFIG__;

const basename = config.app.URL.match(/^(?:https?:\/\/)?[^\/]+(\/?.+)?$/i)?.[1];
const defaultTheme = createTheme();

const rootReducer = combineReducers({
  [newsApi.reducerPath]: newsApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(newsApi.middleware, tasksApi.middleware),
});
/** Components added here will _only_ be loaded in the web browser, never for server-side rendering */
const render = () => {
  hydrate(
    <>
      {/* The configuration is the outmost component. This allows us to read the configuration even in the theme */}
      <ConfigContext.Provider value={config}>
        <Provider store={store}>
          <ThemeProvider theme={defaultTheme}>
            <BrowserRouter basename={basename}>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </ConfigContext.Provider>
    </>,
    document.getElementById("root"),
  );
};

render();
