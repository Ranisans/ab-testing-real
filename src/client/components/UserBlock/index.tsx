import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DateInput } from "../Input";
import { setData } from "../../store/usersData";
import { IUserData } from "../../../core/interfaces";
import { AppState } from "../../store";

enum EDate {
  REGISTRATION,
  ACTIVITY,
}

interface IUserBlock {
  id: number;
}

const userInitialDate: IUserData = {
  registrationDate: new Date(),
  lastActivityDate: new Date(),
};

const UserBlock: React.FC<IUserBlock> = ({ id }: IUserBlock) => {
  const dispatch = useDispatch();
  const userBlockState = useSelector((state: AppState) => state.usersDataState)[
    id
  ];
  const [userData, setUserData] = useState<IUserData>(userInitialDate);

  const handleChange = (key: EDate) => (data: Date | string) => {
    if (key === EDate.REGISTRATION) {
      setUserData({ ...userData, registrationDate: data as Date });
    } else {
      setUserData({ ...userData, lastActivityDate: data as Date });
    }
  };

  useEffect(() => {
    dispatch(setData({ id, userData }));
  }, [userData]);

  return (
    <div className="app-user_block">
      <DateInput
        onChange={handleChange(EDate.REGISTRATION)}
        dateValue={userBlockState?.registrationDate}
      />
      <DateInput
        onChange={handleChange(EDate.ACTIVITY)}
        dateValue={userBlockState?.lastActivityDate}
      />
    </div>
  );
};

export default UserBlock;
