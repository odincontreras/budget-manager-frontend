import { useState } from "react";
import { RangeValue } from "rc-picker/lib/interface";
import { Dayjs } from "dayjs";

const useControlledRangePicker = () => {
  const [dateFilterValue, setDateFilterValue] =
    useState<RangeValue<Dayjs> | null>(null);

  const onChange = (values: RangeValue<Dayjs> | null) => {
    setDateFilterValue(values);
  };

  const onReset = () => {
    setDateFilterValue(null);
  };

  return {
    dateFilterValue,
    onChange,
    onReset,
  };
};

export default useControlledRangePicker;
