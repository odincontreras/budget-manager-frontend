import { useMemo } from "react";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import useCurrenciesQuery from "@/hooks/queries/useCurrenciesQuery";
import useAuthStore from "@/store";
import { Income, NewIcome } from "@/types";
import getUserCurrencies from "@/utils/getUserCurrencies";

type IncomeFormProps = {
  onFinish?: (values: NewIcome) => void;
  action?: "create" | "update";
  income?: Income;
};

const logValues = (values: NewIcome) => {
  console.log(values);
};

const IncomeForm = ({
  onFinish = logValues,
  action = "create",
  income,
}: IncomeFormProps) => {
  const user = useAuthStore((state) => state.data?.user);
  const { data } = useCurrenciesQuery();

  const userCurrencies = getUserCurrencies({ currencies: data, user: user });

  const defaultCurrency = useMemo(
    () => user?.userCurrencies.find((uc) => uc.isDefault),
    [user?.userCurrencies]
  );

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
        initialValue={
          action === "update" ? income?.currencyId : defaultCurrency?.currencyId
        }
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
        initialValue={action === "update" && income?.amount}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Fecha"
        name="date"
        rules={[{ required: true, message: "Este campo es requerido" }]}
        initialValue={
          action === "update" && income?.date ? dayjs(income?.date) : dayjs()
        }
      >
        <DatePicker format={"DD/MM/YYYY"} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="description"
        initialValue={action === "update" ? income?.description : undefined}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default IncomeForm;
