// @flow
import { memo } from "react";
import moment from "moment";

type Props = {
  date?: Date,
  format?: string,
};

/* TODO: Replace this function with the useDateTimeFormat hook */
function FormattedDate({ date, format = "LLL" }: Props) {
  return moment(date).format(format);
}

export default memo<Props>(FormattedDate);
