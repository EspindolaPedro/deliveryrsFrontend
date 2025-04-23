import { api } from "./api";
import { companyProps } from "../types/companyData";

export async function  getCompanyData(): Promise<companyProps> {
    const res = await api.get("/dados");
    return res.data;
}