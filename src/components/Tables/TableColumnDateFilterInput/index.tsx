import { Space, DatePicker, Button } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import dayjs from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";

type TableColumnDateFilterInputProps = {
  dropdownProps: FilterDropdownProps;
  dateFilterValue: RangeValue<dayjs.Dayjs> | null;
  onChange: (values: RangeValue<dayjs.Dayjs> | null) => void;
  onReset: () => void;
};

const TableColumnDateFilterInput = ({
  dropdownProps,
  dateFilterValue,
  onChange,
  onReset,
}: TableColumnDateFilterInputProps) => {
  const { close, setSelectedKeys, confirm } = dropdownProps;

  return (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <DatePicker.RangePicker value={dateFilterValue} onChange={onChange} />
      <div style={{ display: "block" }}>
        <Space>
          <Button
            onClick={() => {
              onReset();
              setSelectedKeys([]);
              confirm({ closeDropdown: true });
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              if (dateFilterValue?.length) {
                setSelectedKeys([
                  dayjs(dateFilterValue[0]).toISOString(),
                  dayjs(dateFilterValue[1]).toISOString(),
                ]);
                confirm({ closeDropdown: true });
              } else {
                close();
              }
            }}
          >
            OK
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default TableColumnDateFilterInput;
