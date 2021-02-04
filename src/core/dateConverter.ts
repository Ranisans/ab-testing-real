const convertDate = (d: Date, toDB?: boolean): string => {
  function pad(s: number) {
    return s < 10 ? `0${s}` : s;
  }

  if (toDB) {
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
  }
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(".");
};

export default convertDate;
