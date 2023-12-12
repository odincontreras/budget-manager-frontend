import { Button, Flex, Modal, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useModal from "@/hooks/useModal";

type DashboardPageShellType = {
  children: React.ReactNode;
  addItemForm?: React.ReactNode;
  buttonText?: string;
  title?: string;
  loading?: boolean;
};

const DashboardPageShell = ({
  children,
  addItemForm,
  buttonText = "Agregar Item",
  title = "Dashboard",
  loading = false,
}: DashboardPageShellType) => {
  const { onToggleOpen, open } = useModal();

  return (
    <>
      <Typography.Title level={3}>{title}</Typography.Title>

      {addItemForm && (
        <Flex justify="end" style={{ marginBottom: 16 }}>
          <Button icon={<PlusOutlined />} onClick={onToggleOpen}>
            {buttonText}
          </Button>
        </Flex>
      )}

      {children}

      {addItemForm && (
        <Modal
          open={open}
          onCancel={onToggleOpen}
          okButtonProps={{
            htmlType: "submit",
            form: "modal-form",
            loading,
          }}
          title={buttonText}
          destroyOnClose
        >
          {addItemForm}
        </Modal>
      )}
    </>
  );
};

export default DashboardPageShell;
