import { TopBranch } from '../../models/SaleInterface';

export interface GetTopBranchesResponse {
  ok:           boolean;
  by_frequency: TopBranch[];
  by_money:     TopBranch[];
}
