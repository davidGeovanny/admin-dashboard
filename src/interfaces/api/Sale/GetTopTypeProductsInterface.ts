import { TopTypeProduct } from '../../models/SaleInterface';

export interface GetTopTypeProductsResponse {
  ok:           boolean;
  by_frequency: TopTypeProduct[];
  by_money:     TopTypeProduct[];
}