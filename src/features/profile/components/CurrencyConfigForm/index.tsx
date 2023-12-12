import { Form, FormInstance, InputNumber } from "antd";
import { UserCurrency } from "@/types";

type CurrencyConfigFormProps = {
  currentConfig?: UserCurrency;
  profileForm: FormInstance;
};

const CurrencyConfigForm = ({
  currentConfig,
  profileForm,
}: CurrencyConfigFormProps) => {
  const onFinish = (values: {
    weeklySpendingGoal: number;
    monthlySpendingGoal: number;
  }) => {
    const currenciesConfig = [...profileForm.getFieldValue("currenciesConfig")];

    const existsCurrencyConfig = currenciesConfig.find(
      (currencyConfig) =>
        currencyConfig.currencyId === currentConfig?.currencyId
    );

    if (!existsCurrencyConfig) {
      currenciesConfig.push({ currencyId: currentConfig?.currencyId });
    }

    profileForm.setFieldsValue({
      currenciesConfig: currenciesConfig.map((currencyConfig: UserCurrency) =>
        currencyConfig.currencyId !== currentConfig?.currencyId
          ? currencyConfig
          : { ...currencyConfig, ...values }
      ),
    });
  };

  return (
    <Form layout="vertical" name="modal-form" onFinish={onFinish}>
      <Form.Item
        label="Meta de gasto semanal"
        name="weeklySpendingGoal"
        initialValue={currentConfig?.weeklySpendingGoal}
        rules={[{ required: true, message: "Este campo es requerido" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Meta de gasto mensual"
        name="monthlySpendingGoal"
        initialValue={currentConfig?.monthlySpendingGoal}
        rules={[{ required: true, message: "Este campo es requerido" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
    </Form>
  );
};

export default CurrencyConfigForm;
