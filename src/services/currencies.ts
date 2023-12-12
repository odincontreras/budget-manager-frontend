import { Currency } from "@/types";
import Axios from "../libs/axios";

export async function getCurrencies(): Promise<Currency[]> {
  const { data } = await Axios.get("/currencies");

  return data;
}
