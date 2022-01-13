import { TopProduct } from '../../models/SaleInterface';

export interface GetTopProductsResponse {
  ok:           boolean;
  by_frequency: TopProduct[];
  by_money:     TopProduct[];
}