import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import useCategoriesQuery from "@/hooks/queries/useCategoriesQuery";
import useCurrenciesQuery from "@/hooks/queries/useCurrenciesQuery";
import useAuthStore from "@/store";
import getUserCurrencies from "@/utils/getUserCurrencies";
import { Expense, NewExpense } from "@/types";

type ExpenseFormProps = {
  onFinish?: (values: NewExpense) => void;
  action?: "create" | "update";
  expense?: Expense;
};

const logValues = (values: NewExpense) => {
  console.log(values);
};

const ExpenseForm = ({
  onFinish = logValues,
  action = "create",
  expense,
}: ExpenseFormProps) => {
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
        initialValue={action === "update" && expense?.currencyId}
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
        initialValue={action === "update" && expense?.categoryId}
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
        initialValue={action === "update" && expense?.amount}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Fecha"
        name="date"
        rules={[{ required: true, message: "Este campo es requerido" }]}
        initialValue={
          action === "update" && expense?.date && dayjs(expense?.date)
        }
      >
        <DatePicker format={"DD/MM/YYYY"} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="description"
        initialValue={action === "update" ? expense?.description : undefined}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default ExpenseForm;
