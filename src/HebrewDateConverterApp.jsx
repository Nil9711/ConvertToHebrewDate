import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { langActions } from "./store/lang";
import LanguageIcon from "@material-ui/icons/Language";

const useStyles = makeStyles((theme) => ({
  buttonsArea: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  getDateButton: {
    backgroundColor: "#404039",
    color: "white",
  },
  hebrewDate: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
    fontSize: "24px",
    color: "white",
    backgroundColor: "#404039",
    border: "1mm solid #404039",
    borderRadius: "1rem",
    width: "10.5rem",
    height: "2rem",
    lineHeight: "3rem",
    padding: "0rem 0rem 0.4rem 0rem",
    margin: "1rem 1rem 1rem 1rem",
  },
  hebrewDateParasha: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
    fontSize: "12px",
    color: "white",
    backgroundColor: "#404039",
    border: "1mm solid #404039",
    borderRadius: "1rem",
    width: "10.5rem",
    height: "2rem",
    lineHeight: "3rem",
    padding: "0rem 0rem 0.4rem 0rem",
    margin: "1rem 1rem 1rem 1rem",
  },
  changeLang: {
    color: "#404039",
    cursor: "pointer",
    fontSize: "2.5rem",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  hideHebrewDate: {
    opacity: "0",
  },
  showData: {
    display: "flex",
    marginTop: "1rem",
  },
}));

function HebrewDateConverterApp() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [parasha, setParasha] = useState("");
  const [hebrewDate, setHebrewDate] = useState("");
  const url = "https://www.hebcal.com/converter?cfg=json&";
  const classes = useStyles();
  const isEnglish = useSelector((state) => state.language.isEnglish);
  const dispatch = useDispatch();
  const switchLang = () => {
    dispatch(langActions.switchLang());
    clearData();
  };

  const clearData = () => {
    setHebrewDate("");
    setParasha("");
  };
  const getHebrewDate = (e) => {
    e.preventDefault();
    let [month, day, year] = selectedDate
      .toLocaleDateString("en-US")
      .split("/");

    axios
      .get(`${url}gy=${year}&gm=${month}&gd=${day}&g2h=1`)
      .then((response) => dateAndParashaProvider(response.data));
  };
  const dateAndParashaProvider = (data) => {
    console.log(isEnglish);
    if (isEnglish) {
      let res = "";
      res += `${data.hd} ${data.hm} ${data.hy}`;
      setHebrewDate(res);
      setParasha(data.events[0]);
    } else if (!isEnglish) {
      setHebrewDate(data.hebrew);
      setParasha("");
    }
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <LanguageIcon className={classes.changeLang} onClick={switchLang} />

      <div className={classes.center}>
        {isEnglish ? (
          <h1>Hebrew Date Calculator </h1>
        ) : (
          <h1>מחשבון תאריך עברי</h1>
        )}
        <form onSubmit={getHebrewDate}>
          <DatePicker
            label={isEnglish ? "Enter Date" : "הזן תאריך לבדיקה"}
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
              {isEnglish ? "Get Date" : "חשב תאריך עברי"}
            </Button>
          </div>
        </form>

        <div className={classes.showData}>
          <p
            className={
              hebrewDate ? classes.hebrewDateParasha : classes.hideHebrewDate
            }
          >
            {hebrewDate}
          </p>
          <p
            className={
              parasha ? classes.hebrewDateParasha : classes.hideHebrewDate
            }
          >
            {parasha}
          </p>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default HebrewDateConverterApp;
