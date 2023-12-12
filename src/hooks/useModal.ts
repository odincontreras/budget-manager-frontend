import React from "react";

const useModal = () => {
  const [open, setOpen] = React.useState(false);

  const onToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  

  return {
    open,
    onToggleOpen,
  };
};

export default useModal;
