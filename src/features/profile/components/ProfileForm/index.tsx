import { Form, Input, Select, Button, Modal } from "antd";
import { useEffect, useMemo, useState } from "react";
import useAuthStore from "@/store";
import useCurrenciesQuery from "@/hooks/queries/useCurrenciesQuery";
import getUserCurrencies from "@/utils/getUserCurrencies";
import SelectedCurrenciesList from "../SelectedCurrenciesList";
import { UserCurrency } from "@/types";
import CurrencyConfigForm from "../CurrencyConfigForm";

const ProfileForm = () => {
  const user = useAuthStore((state) => state.data?.user);
  const isLoadingUpdate = useAuthStore((state) => state.isLoading);
  const updateUserHandler = useAuthStore((state) => state.updateUserHandler);
  const currenciesQuery = useCurrenciesQuery();

  const [form] = Form.useForm();

  const [activeCurrencyConfidId, setActiveCurrencyConfidId] = useState<
    number | null
  >(null);

  const onOpenCurrencyConfigModal = (currencyId: number) => {
    setActiveCurrencyConfidId(currencyId);
  };

  const userCurrencies = useMemo(
    () =>
      getUserCurrencies({
        user,
        currencies: currenciesQuery.data,
      }),
    [user, currenciesQuery.data]
  );

  const selectedCurrenciesIds: number[] | undefined = Form.useWatch(
    "currencies",
    form
  );

  const currenciesConfig: UserCurrency[] | [] | undefined = Form.useWatch(
    "currenciesConfig",
    {
      form,
      preserve: true,
    }
  );

  const selectedCurrencies = useMemo(
    () =>
      currenciesQuery.data?.filter((currency) =>
        selectedCurrenciesIds?.includes(currency.id)
      ),
    [selectedCurrenciesIds, currenciesQuery.data]
  );

  useEffect(() => {
    form.setFieldsValue({
      currencies: user?.userCurrencies.map((currency) => currency.currencyId),
      currenciesConfig: user?.userCurrencies,
    });
  }, [form, user?.userCurrencies]);

  const onFinish = async (values: {
    name: string;
    lastName: string;
    currencies: number[];
  }) => {
    const update: {
      name?: string;
      lastName?: string;
      currencies?: UserCurrency[];
    } = {};

    const selectedCurrenciesConfig = currenciesConfig?.filter((currency) =>
      values.currencies.includes(currency.currencyId)
    );

    if (values.name !== user?.name) update["name"] = values.name;
    if (values.lastName !== user?.lastName)
      update["lastName"] = values.lastName;
    if (values.currencies?.length)
      update["currencies"] = selectedCurrenciesConfig;

    if (Object.keys(update).length) {
      await updateUserHandler(
        update as {
          name: string;
          lastName: string;
          currencies: UserCurrency[];
        }
      );
    }
  };

  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Nombre" name="name" initialValue={user?.name}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Apellido"
          name="lastName"
          initialValue={user?.lastName}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Monedas preferidas" name="currencies">
          <Select
            mode="multiple"
            options={currenciesQuery.data?.map((currency) => ({
              value: currency.id,
              label: currency.name,
            }))}
            defaultValue={userCurrencies.map((currency) => currency.id)}
          />
        </Form.Item>

        <SelectedCurrenciesList>
          {selectedCurrencies &&
            selectedCurrencies.map((currency) => (
              <SelectedCurrenciesList.Item
                key={currency.id}
                currency={currency}
                form={form}
                currencyConfig={currenciesConfig?.find(
                  (config) => config.currencyId === currency.id
                )}
                onOpenCurrencyConfigModal={onOpenCurrencyConfigModal}
              />
            ))}
        </SelectedCurrenciesList>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoadingUpdate}
            style={{ width: "100%" }}
          >
            Guardar
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={Boolean(activeCurrencyConfidId)}
        onCancel={() => setActiveCurrencyConfidId(null)}
        title="Configuración de moneda"
        destroyOnClose
        okButtonProps={{
          htmlType: "submit",
          form: "modal-form",
        }}
      >
        <CurrencyConfigForm
          currentConfig={currenciesConfig?.find(
            (config) => config.currencyId === activeCurrencyConfidId
          )}
          profileForm={form}
        />
      </Modal>
    </>
  );
};

export default ProfileForm;
