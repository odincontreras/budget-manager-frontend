import { Category } from "@/types";
import Axios from "../libs/axios";

export async function getExpenses(): Promise<Category[]> {
  const { data } = await Axios.get("/categories");

  return data;
}
