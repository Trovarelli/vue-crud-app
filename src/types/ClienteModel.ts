import { Produto } from "./ProdutoModel";

export interface Cliente {
  id: number;
  name: string;
  document: string;
  phone: string;
  ativo: "Sim" | "Não";
  email: string;
  produtos: Produto[];
}
