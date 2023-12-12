import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import useCategoriesQuery from "@/hooks/queries/useCategoriesQuery";
import useCurrenciesQuery from "@/hooks/queries/useCurrenciesQuery";
import useAuthStore from "@/store";
import getUserCurrencies from "@/utils/getUserCurrencies";
import { NewExpense } from "@/types";

type AddExpenseFormProps = {
  onFinish?: (values: NewExpense) => void;
};

const logValues = (values: NewExpense) => {
  console.log(values);
};

const AddExpenseForm = ({ onFinish = logValues }: AddExpenseFormProps) => {
  const categoriesQuery = useCategoriesQuery();
  const currenciesQuery = useCurrenciesQuery();

  const user = useAuthStore((state) => state.data?.user);

  const userCurrencies = getUserCurrencies({
    currencies: currenciesQuery.data,
    user: user,
  });

  return (
    <Form
      name="modal-form"
      layout="vertical"
      onFinish={onFinish}
      preserve={false}
    >
      <Form.Item
        label="Moneda"
        name="currencyId"
        rules={[{ required: true, message: "Este campo es requerido" }]}
      >
        <Select
          style={{ width: "100%" }}
          options={userCurrencies?.map((currency) => ({
            label: currency.name,
            value: currency.id,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Categoria"
        name="categoryId"
        rules={[{ required: true, message: "Este campo es requerido" }]}
      >
        <Select
          style={{ width: "100%" }}
          options={categoriesQuery.data?.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Cantidad"
        name="amount"
        rules={[{ required: true, message: "Este campo es requerido" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Fecha"
        name="date"
        rules={[{ required: true, message: "Este campo es requerido" }]}
      >
        <DatePicker format={"DD/MM/YYYY"} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Descripción" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default AddExpenseForm;
