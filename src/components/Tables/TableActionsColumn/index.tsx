import { Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import IconButton from "@/components/IconButton";
import { Expense, Income, ModalActions } from "@/types";
import { UseMutationResult } from "@tanstack/react-query";

type TableActionsColumnProps = {
  updateModal: ModalActions;
  deleteModal: ModalActions;
  deleteMutation: UseMutationResult<unknown, Error, unknown, unknown>;
  record: Expense | Income;
  deleteDescription?: string;
};

const TableActionsColumn = ({
  updateModal,
  deleteModal,
  deleteMutation,
  record,
  deleteDescription = "¿Está seguro de que desea eliminar este item?",
}: TableActionsColumnProps) => {
  return (
    <Space size={"middle"}>
      <IconButton
        title="Editar"
        icon={<EditOutlined />}
        buttonProps={{ onClick: () => updateModal.onSetOpen(record.id) }}
      />
      <Popconfirm
        title="Alerta"
        description={deleteDescription}
        cancelText="Cancelar"
        okText="Eliminar"
        open={deleteModal.open === record.id}
        onConfirm={() => {
          deleteMutation.mutate(record.id);
        }}
        onCancel={deleteModal.onToggleOpen}
        okButtonProps={{ loading: deleteMutation.isPending }}
      >
        <IconButton
          title="Eliminar"
          icon={<DeleteOutlined />}
          buttonProps={{
            onClick: () => deleteModal.onSetOpen(record.id),
          }}
        />
      </Popconfirm>
    </Space>
  );
};

export default TableActionsColumn;
