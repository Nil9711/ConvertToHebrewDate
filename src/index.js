import React from "react";
import App from "./App.jsx";
import DateFnsUtils from "@date-io/date-fns";
import { render } from "react-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./App.css";

render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <App />
  </MuiPickersUtilsProvider>,
  document.querySelector("#root")
);
