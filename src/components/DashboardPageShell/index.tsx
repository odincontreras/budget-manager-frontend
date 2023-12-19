import { Button, Flex, Modal, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type DashboardPageShellType = {
  children: React.ReactNode;
  addItemForm?: React.ReactNode;
  buttonText?: string;
  title?: string;
  loading?: boolean;
  openAddItemForm?: boolean;
  onToggleOpenItemForm?: () => void;
};

const DashboardPageShell = ({
  children,
  addItemForm,
  buttonText = "Agregar Item",
  title = "Dashboard",
  loading = false,
  openAddItemForm = false,
  onToggleOpenItemForm = () => {},
}: DashboardPageShellType) => {
  return (
    <>
      <Typography.Title level={3}>{title}</Typography.Title>

      {addItemForm && (
        <Flex justify="end" style={{ marginBottom: 16 }}>
          <Button icon={<PlusOutlined />} onClick={onToggleOpenItemForm}>
            {buttonText}
          </Button>
        </Flex>
      )}

      {children}

      {addItemForm && (
        <Modal
          open={openAddItemForm}
          onCancel={onToggleOpenItemForm}
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
