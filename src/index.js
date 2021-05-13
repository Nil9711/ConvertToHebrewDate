import React from "react";
import App from "./App.jsx";
import DateFnsUtils from "@date-io/date-fns";
import { render } from "react-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Provider } from "react-redux";
import store from "./store/index";

import "./App.css";

render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiPickersUtilsProvider>,
  document.getElementById("root")
);
