/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from "react";
import { StatusCodes } from "http-status-codes";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

import Table from "./components/Table";
import Button from "./components/Button";
import ErrorWindow from "./components/ErrorWindow";
import { IRowData } from "./types";

import "./App.scss";
import { MAX_NEW_USER } from "./constants";
import UserBlock from "./components/UserBlock";
import { reset } from "./store/usersData";
import { AppState } from "./store";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state: AppState) => state.usersDataState);
  const [rollingRetention, setRollingRetention] = useState("");
  const [tableData, setTableData] = useState<IRowData[]>([]);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleError = () => {
    setShowError(!showError);
  };

  const updateData = async () => {
    const result = await fetch("/user");
    if (result.status === StatusCodes.OK) {
      const newData = await result.json();
      setTableData(newData.data);
    } else {
      setErrorText("Server Error!");
      handleError();
    }
  };

  const updateAppData = () => {
    updateData();
    handleCalculate();
    dispatch(reset());
  };

  useEffect(() => {
    updateAppData();
  }, []);

  const handleSetUser = async () => {
    // check if registration date is greater than activity date
    for (let i = 0; i < usersData.length; i += 1) {
      if (usersData[i].registrationDate > usersData[i].lastActivityDate) {
        setErrorText(`Wrong User date on position = ${i} !`);
        handleError();
        return;
      }
    }

    try {
      const result = await fetch("/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ data: usersData }),
      });
      if (result.status === StatusCodes.OK) {
        updateAppData();
        setErrorText("Done!");
        handleError();
      } else {
        const data = await result.json();
        setErrorText(data.error);
        handleError();
      }
    } catch (error) {
      setErrorText("Something in App goes wrong. Please refresh the page.");
      handleError();
    }
  };

  const handleCalculate = async () => {
    const result = await fetch(`/report/rolling`);
    if (result.status === StatusCodes.OK) {
      const newData = await result.json();
      const data = parseFloat(newData.data).toFixed(2);
      setRollingRetention(data);
    } else {
      setErrorText("Server Error!");
      handleError();
    }
  };

  return (
    <div className="app">
      <h1>AB Test Real</h1>
      <main>
        <Table data={tableData} className="app-table" />
        <div className={clsx("app_block-user_block", "app-by_center")}>
          <h4 className="app-user_block-title">User Input</h4>
          <div className={clsx("app-user_block", "app-user_block-label")}>
            <div>Date Registration</div>
            <div>Date Last Activity</div>
          </div>
          {[...Array(MAX_NEW_USER)].map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <UserBlock id={index} key={`index-${index}`} />
          ))}
          <Button onClick={handleSetUser} value="save" />
        </div>
        <div className="app_block app_block-retention">
          <label>Rolling Retention 7 day:</label>
          <p className="app_block-rolling-retention">{rollingRetention} %</p>
        </div>
      </main>
      <ErrorWindow
        message={errorText}
        isShown={showError}
        callback={handleError}
      />
    </div>
  );
};

export default App;
