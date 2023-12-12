import { Currency, User } from "@/types";

type Parameters = {
  user: User | undefined;
  currencies: Currency[] | undefined;
};

export default function getUserCurrencies({ user, currencies }: Parameters) {
  if (user && currencies) {
    return currencies.filter((currency) =>
      user?.userCurrencies.find((uc) => uc.currencyId === currency.id)
    );
  }

  return [];
}
