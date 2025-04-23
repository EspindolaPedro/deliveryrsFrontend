import { Category } from "../types/CategoryAndProductData";
import { api } from "./api";

export async function  getCategoryAndProduct(): Promise<Category[]> {
    const res = await api.get("/categorias/lista");
    return res.data;
}