import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  buttonsArea: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  getDateButton: {
    backgroundColor: "#aee02d",
    color: "white",
  },
  hebrewDate: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
    fontSize: "20px",
  },
}));

function HebrewDateConverterApp() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [hebrewDate, setHebrewDate] = useState("");
  const url = "https://www.hebcal.com/converter?cfg=json&";
  const classes = useStyles();

  const getHebrewDate = (e) => {
    e.preventDefault();
    let [month, day, year] = selectedDate
      .toLocaleDateString("en-US")
      .split("/");

    axios
      .get(`${url}gy=${year}&gm=${month}&gd=${day}&g2h=1`)
      .then((response) => setHebrewDate(response.data.hebrew));
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={getHebrewDate}>
        <DatePicker
          label="Enter date to convert"
          value={selectedDate}
          onChange={handleDateChange}
          format="dd/MM/yyyy"
        ></DatePicker>

        <div className={classes.buttonsArea}>
          <Button
            className={classes.getDateButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Get Date
          </Button>
        </div>
      </form>
      <p className={classes.hebrewDate}>{hebrewDate}</p>
    </MuiPickersUtilsProvider>
  );
}

export default HebrewDateConverterApp;
