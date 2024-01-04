import { useEffect } from "react";
import { DatePicker, Form, Select } from "antd";
import { Dayjs } from "dayjs";
import useCurrenciesQuery from "@/hooks/queries/useCurrenciesQuery";
import useAuthStore from "@/store";
import { ExpensesAndIncomesFilters } from "@/types";
import dayjs from "dayjs";

type DashboardFiltersProps = {
  onUpdateFilters: (key: string, value: number | Dayjs[]) => void;
  filters: ExpensesAndIncomesFilters;
};

const DashboardFilters = ({
  onUpdateFilters,
  filters,
}: DashboardFiltersProps) => {
  const currencyQuery = useCurrenciesQuery();
  const user = useAuthStore((state) => state.data?.user);

  const [form] = Form.useForm();

  const dateFormat = "DD/MM/YYYY";

  useEffect(() => {
    if (!form.getFieldValue("currencyId") && !form.getFieldValue("date")) {
      form.setFieldsValue({
        currencyId: filters?.currencyId,
        date: filters?.date?.gte &&
          filters?.date?.lte && [
            dayjs(filters.date.gte),
            dayjs(filters.date.lte),
          ],
      });
    }
  }, [filters, form]);

  return (
    <Form
      form={form}
      style={{ width: "100%", display: "flex", gap: "2.5rem" }}
      layout="vertical"
      onValuesChange={(values) => {
        const [key] = Object.keys(values);

        onUpdateFilters(key, values[key]);
      }}
    >
      <Form.Item name="currencyId" label="Moneda">
        <Select
          options={user?.userCurrencies.map((currency) => {
            const currencyFullData = currencyQuery.data?.find(
              (record) => record.id === currency.currencyId
            );

            return {
              label: currencyFullData?.name,
              value: currency.currencyId,
            };
          })}
          style={{ width: 303 }}
        />
      </Form.Item>

      <Form.Item name="date" label="Fecha">
        <DatePicker.RangePicker format={dateFormat} />
      </Form.Item>
    </Form>
  );
};

export default DashboardFilters;
