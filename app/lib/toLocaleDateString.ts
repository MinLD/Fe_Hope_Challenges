import { format } from "date-fns";

export const dateStringFromBE = (date: string) => {
  const dateObject = new Date(date);
  const formattedDate = format(dateObject, "dd/MM/yyyy");
  return formattedDate;
};
