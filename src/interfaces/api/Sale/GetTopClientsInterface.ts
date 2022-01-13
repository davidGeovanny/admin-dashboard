import { TopClient } from '../../models/SaleInterface';

export interface GetTopClientsResponse {
  ok:           boolean;
  by_frequency: TopClient[];
  by_money:     TopClient[];
}
