/**
 * Server Side Rendering
 */
import { APIGatewayEvent } from "aws-lambda";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "../App";
import ConfigContext from "../components/ConfigContext";
import config from "./config";
import html from "./html";
import { Stats } from "./types";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { newsApi } from "src/components/configs/newsApiSlice";
import { tasksApi } from "src/components/configs/tasksApiSlice";
import userReducer from "src/components/configs/usersSlice";
import AuthProvider from "src/browser/AuthProvider";

const rootReducer = combineReducers({
  [newsApi.reducerPath]: newsApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(newsApi.middleware, tasksApi.middleware),
});

/**
 * Server-side rendering
 */
export default async function render(_event: APIGatewayEvent): Promise<string> {
  // The stats are generated by the Webpack Stats Plugin (`webpack-stats-plugin`)
  const stats = (await import("../../dist/stats.json")) as unknown as Stats;
  const content = renderToString(
    <ConfigContext.Provider value={config}>
      <Provider store={store}>
        <StaticRouter basename={config.app.URL} location={_event.path}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </StaticRouter>
      </Provider>
    </ConfigContext.Provider>,
  );
  return html({ stats, content, config });
}
