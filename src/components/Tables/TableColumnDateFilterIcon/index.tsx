import { CalendarOutlined } from "@ant-design/icons";

type TableColumnDateFilterIconProps = {
  filterIsActive: boolean;
};
const TableColumnDateFilterIcon = ({
  filterIsActive,
}: TableColumnDateFilterIconProps) => {
  return (
    <CalendarOutlined
      style={{ color: filterIsActive ? "#1677ff" : undefined }}
    />
  );
};

export default TableColumnDateFilterIcon;
