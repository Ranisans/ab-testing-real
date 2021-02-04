import React, { useEffect, useState } from "react";
import { StatusCodes } from "http-status-codes";

import Table from "./components/Table";
import { DateInput } from "./components/Input";
import Button from "./components/Button";
import ErrorWindow from "./components/ErrorWindow";
import { IRowData } from "./types";

import "./App.scss";

enum EDate {
  REGISTRATION,
  ACTIVITY,
}

interface INewRecord {
  registrationDate: Date;
  lastActivityDate: Date;
}

const newUserInitialDate: INewRecord = {
  registrationDate: new Date(),
  lastActivityDate: new Date(),
};

const App: React.FC = () => {
  const [userData, setUserData] = useState<INewRecord>(newUserInitialDate);
  const [rollingRetention, setRollingRetention] = useState(0);
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

  useEffect(() => {
    updateData();
  }, []);

  const handleChange = (key: EDate) => (date: Date) => {
    if (key === EDate.REGISTRATION) {
      setUserData({ ...userData, registrationDate: date });
    } else {
      setUserData({ ...userData, lastActivityDate: date });
    }
  };

  const handleSetUser = async () => {
    if (userData.registrationDate > userData.lastActivityDate) {
      setErrorText("Wrong User date!");
      handleError();
    } else {
      const result = await fetch("/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      });
      if (result.status === StatusCodes.OK) {
        updateData();
        setUserData(newUserInitialDate);
        setErrorText("Done!");
        handleError();
      } else {
        setErrorText(result.statusText);
        handleError();
      }
    }
  };

  const handleCalculate = () => {
    setRollingRetention(12);
  };

  return (
    <div className="app">
      <h1>AB Test Real</h1>
      <main>
        <Table data={tableData} className="app-table" />
        <div className="app_block">
          <div className="app-input_block">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>Date Registration</label>
            <DateInput onChange={handleChange(EDate.REGISTRATION)} />
          </div>
          <div className="app-input_block">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>Date Last Activity</label>
            <DateInput onChange={handleChange(EDate.ACTIVITY)} />
          </div>
          <Button
            onClick={handleSetUser}
            className="user_button"
            value="add user"
          />
        </div>
        <div className="app_block">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Rolling Retention X day:</label>
          <p className="app_block-rolling-retention">{rollingRetention}</p>
          <Button
            onClick={handleCalculate}
            className="calculate_button"
            value="calculate"
          />
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
