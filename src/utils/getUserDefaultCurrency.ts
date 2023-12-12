import { Currency, UserCurrency } from "@/types";

type Parameters = {
  currencies: Currency[] | undefined;
  userCurrencies: UserCurrency[] | undefined;
};

export default function getUserDefaultCurrency({
  currencies,
  userCurrencies,
}: Parameters) {
  if (currencies && userCurrencies) {
    const userDefaultCurrency = userCurrencies.find((uc) => uc.isDefault);

    if (userDefaultCurrency) {
      return currencies.find((c) => c.id === userDefaultCurrency.currencyId);
    }
  }

  return null;
}
