import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppContainer } from "react-hot-loader";
import App from "./components/App";

const mount = document.getElementById("mount");

function render(Component: any) {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    mount
  );
}

render(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const nextApp = require("./components/App").default;
    render(nextApp);
  });
}
