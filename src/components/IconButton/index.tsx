import { Button, ButtonProps, Tooltip } from "antd";

type IconButtonProps = {
  title?: string;
  icon?: React.ReactNode;
  buttonProps?: ButtonProps;
};

const IconButton = ({
  title = "Tooltip",
  icon = "search",
  buttonProps = {},
}: IconButtonProps) => {
  return (
    <Tooltip title={title}>
      <Button shape="circle" icon={icon} {...buttonProps} />
    </Tooltip>
  );
};

export default IconButton;
