import { Form, FormInstance, InputNumber } from "antd";
import { UserCurrency } from "@/types";

type CurrencyConfigFormProps = {
  currentConfig?: UserCurrency;
  profileForm: FormInstance;
  currencyId?: number;
  onToggleOpen: () => void;
};

const CurrencyConfigForm = ({
  currentConfig,
  profileForm,
  currencyId,
  onToggleOpen,
}: CurrencyConfigFormProps) => {
  const onFinish = (values: {
    weeklySpendingGoal: number;
    monthlySpendingGoal: number;
  }) => {
    const currenciesConfig = [...profileForm.getFieldValue("currenciesConfig")];

    if (!currentConfig) {
      currenciesConfig.push({ currencyId });
    }

    profileForm.setFieldsValue({
      currenciesConfig: currenciesConfig.map((currencyConfig: UserCurrency) =>
        currencyConfig.currencyId !== currentConfig?.currencyId
          ? currencyConfig
          : { ...currencyConfig, ...values }
      ),
    });

    onToggleOpen();
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
