import moment from "moment";

export const timerelative = (time: any) => {
  const dateT = new Date(time);
  return moment(dateT.getTime()).startOf("second").fromNow();
};
