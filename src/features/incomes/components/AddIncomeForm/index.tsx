import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import useCurrenciesQuery from "@/hooks/queries/useCurrenciesQuery";
import useAuthStore from "@/store";
import { NewIcome } from "@/types";
import getUserCurrencies from "@/utils/getUserCurrencies";

type AddIncomeFormProps = {
  onFinish?: (values: NewIcome) => void;
};

const logValues = (values: NewIcome) => {
  console.log(values);
};

const AddIncomeForm = ({ onFinish = logValues }: AddIncomeFormProps) => {
  const user = useAuthStore((state) => state.data?.user);
  const { data } = useCurrenciesQuery();

  const userCurrencies = getUserCurrencies({ currencies: data, user: user });

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

export default AddIncomeForm;
