import React, { useState } from "react";

import Table from "./components/Table";
import { IRowData } from "./types";
import { DateInput } from "./components/Input";

import "./App.scss";
import Button from "./components/Button";

enum EDate {
  REGISTRATION,
  ACTIVITY,
}

interface INewRecord {
  registrationDate: Date | null;
  lastActivityDate: Date | null;
}

const newUserInitialDate: INewRecord = {
  registrationDate: null,
  lastActivityDate: null,
};

const App: React.FC = () => {
  const [userData, setUserData] = useState<INewRecord>(newUserInitialDate);
  const [rollingRetention, setRollingRetention] = useState(0);
  const handleChange = (key: EDate) => (date: Date) => {
    if (key === EDate.REGISTRATION) {
      setUserData({ ...userData, registrationDate: date });
    } else {
      setUserData({ ...userData, lastActivityDate: date });
    }
  };

  const handleSetUser = () => {
    console.log("OK");
  };

  const handleCalculate = () => {
    setRollingRetention(12);
  };

  const data: IRowData[] = [];

  return (
    <div className="app">
      <h1>AB Test Real</h1>
      <main>
        <Table data={data} className="app-table" />
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
    </div>
  );
};

export default App;
