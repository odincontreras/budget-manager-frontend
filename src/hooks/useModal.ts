import React from "react";

const useModal = () => {
  const [open, setOpen] = React.useState<boolean | number | string>(false);

  const onToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const onSetOpen = (value: boolean | number | string) => {
    setOpen(value);
  };

  return {
    open: open,
    onToggleOpen,
    onSetOpen,
  };
};

export default useModal;
