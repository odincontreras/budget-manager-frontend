import React from "react";
import { Card, Typography, Flex, FormInstance } from "antd";
import {
  SettingFilled,
  HeartFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Currency, UserCurrency } from "@/types";

type SelectedCurrenciesListProps = {
  children: React.ReactNode;
};

const SelectedCurrenciesList = ({ children }: SelectedCurrenciesListProps) => {
  return (
    <Flex
      style={{ marginBottom: "1.5rem", flex: "1 0 auto", overflow: "auto" }}
      gap={"1rem"}
    >
      {children}
    </Flex>
  );
};

type ItemProps = {
  currency: Currency;
  form: FormInstance;
  currencyConfig: UserCurrency | undefined;
  onOpenCurrencyConfigModal: (currencyId: number) => void;
};

const Item = ({
  currency,
  form,
  currencyConfig,
  onOpenCurrencyConfigModal,
}: ItemProps) => {
  const favoriteClickHandler = () => {
    const currenciesConfig = [...form.getFieldValue("currenciesConfig")];

    const existsCurrencyConfig = currenciesConfig.find(
      (currencyConfig) => currencyConfig.currencyId === currency.id
    );

    if (!existsCurrencyConfig) {
      currenciesConfig.push({ currencyId: currency.id });
    }

    form.setFieldsValue({
      currenciesConfig: currenciesConfig.map((currencyConfig: UserCurrency) =>
        currencyConfig.currencyId !== currency.id
          ? { ...currencyConfig, isDefault: false }
          : { ...currencyConfig, isDefault: true }
      ),
    });
  };

  return (
    <Card
      key={currency.id}
      style={{ maxWidth: "125px", width: "125px", flex: "1 0 auto" }}
      actions={[
        <HeartFilled
          style={{
            fontSize: "16px",
            color: currencyConfig?.isDefault ? "red" : undefined,
          }}
          onClick={favoriteClickHandler}
        />,
        <SettingFilled
          style={{ fontSize: "16px" }}
          onClick={onOpenCurrencyConfigModal.bind(null, currency.id)}
        />,
      ]}
    >
      <Flex align="center" gap={"6px"} vertical style={{ fontSize: "16px" }}>
        <InfoCircleOutlined />
        <Typography.Text>{`${currency.name} (${currency.symbol})`}</Typography.Text>
      </Flex>
    </Card>
  );
};

SelectedCurrenciesList.Item = Item;

export default SelectedCurrenciesList;
